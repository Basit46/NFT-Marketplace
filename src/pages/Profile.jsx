import React, { useEffect, useState } from "react";
import bg from "../assets/profileBg.jpg";
import { useGlobalContext } from "../context/globalContext";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router";
import NFT from "../components/NFT";
import { contractInstance } from "../utils/contractInstance";

const Profile = () => {
  const navaigate = useNavigate();

  //Global state
  const { userAddress, setUserAddress, NFTsdata } = useGlobalContext();

  //Local state
  //This usestate store only the nfts owned by the user
  const [userNFTs, setUserNFTs] = useState([]);

  useEffect(() => {
    if (!userAddress) {
      navaigate("/");
    }
  }, [userAddress]);

  useEffect(() => {
    setUserNFTs(NFTsdata.filter((item) => item.seller == userAddress));
  }, [NFTsdata]);

  return (
    <div className="w-full py-[20px]">
      <h1 className=" text-[1.5rem] font-JetbrainsMono">Your profile</h1>

      <div className="w-full h-[250px]">
        <img
          className="h-full w-full object-cover object-center"
          src={bg}
          alt="profile header: The beautiful universe"
        />
      </div>

      <div className="mt-[40px] w-full">
        <div className="w-full">
          <div className="w-full flex gap-[10px] items-center">
            <FaEthereum />
            <p>{userAddress}</p>
            <button
              onClick={() => setUserAddress(null)}
              className="ml-auto border-white border-[2px] bg-purple-900 text-white px-[20px] py-[8px]"
            >
              DISCONNECT WALLET
            </button>
          </div>

          <p className="mt-[5px]">
            Items owned: <span>{userNFTs.length}</span>
          </p>
        </div>

        <p className="mt-[40px] mb-[10px] text-[1.3rem] font-JetbrainsMono">
          Your NFTs:
        </p>
        <div className="flex flex-wrap gap-[30px]">
          {userNFTs.length > 0 &&
            userNFTs.map((item, index) => <NFT key={index} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Profile;
