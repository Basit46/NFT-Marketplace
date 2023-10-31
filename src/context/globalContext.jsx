import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractInstanceForReading } from "../utils/contractInstance";
import { GetIpfsUrlFromPinata } from "../utils/pinata";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress")
      ? localStorage.getItem("userAddress")
      : null
  );
  const [NFTsdata, setNFTsdata] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPrice, setNewPrice] = useState("");

  // Save userAddress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("userAddress", userAddress);
  }, [userAddress]);

  async function fetchNFTs() {
    setNFTsdata([]);
    setIsFetching(true);

    //Pull the deployed contract instance
    let contract = contractInstanceForReading();
    let nftTokens = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      nftTokens.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          isListed: i.isListed,
          img: meta.img,
          name: meta.name,
          desc: meta.desc,
        };
        return item;
      })
    );

    setNFTsdata(items);
    setIsFetching(false);
  }

  useEffect(() => {
    fetchNFTs();
  }, []);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const connectwalletHandler = () => {
    if (window.ethereum) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler(provider.getSigner());
      });
    } else {
      console.log("Please Install MetaMask!!!");
      setUserAddress(null);
    }
  };

  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setUserAddress(address);
  };

  return (
    <GlobalContext.Provider
      value={{
        fetchNFTs,
        userAddress,
        connectwalletHandler,
        setUserAddress,
        NFTsdata,
        isFetching,
        isLoading,
        setIsLoading,
        isModalOpen,
        setIsModalOpen,
        newPrice,
        setNewPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
