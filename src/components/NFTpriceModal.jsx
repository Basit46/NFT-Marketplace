import React, { useState, useEffect } from "react";
import { contractInstance } from "../utils/contractInstance";
import { FaTimes } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";

const NFTpriceModal = () => {
  //GLobal state
  const { isModalOpen, setIsModalOpen, newPrice, setNewPrice } =
    useGlobalContext();

  //Local state
  const [listingFee, setListingFee] = useState("");

  useEffect(() => {
    const getListingFee = async () => {
      const contract = contractInstance();
      let listFee = await contract.getListingFee();
      setListingFee(listFee.toString() * 10 ** -18);
    };

    getListingFee();
  }, []);
  return (
    <div
      className={`${
        !isModalOpen && "hidden"
      } bg-black/50 fixed top-0 left-0 w-screen h-screen flex justify-center items-center`}
    >
      <div className="relative h-fit w-fit px-[25px] pt-[35px] pb-[20px] bg-white text-black ">
        <FaTimes
          onClick={() => setIsModalOpen(false)}
          className="absolute top-[10px] right-[10px] text-[red] text-[25px]"
        />
        <p className="text-center font-bold">Insert your NFT price</p>
        <input
          className="w-full mt-[20px] border-black border-[2px] px-[10px] py-[4px] "
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(parseFloat(e.target.value))}
        />
        <button
          className="block mt-[10px] mb-[20px] mx-auto bg-[green] text-white
         px-[10px] py-[4px]"
        >
          LIST NFT
        </button>
        <p className="text-[0.8rem] italic ">
          Note: Listing fee is{" "}
          <span className="font-extrabold">{listingFee}</span>
          goerliEth
        </p>
      </div>
    </div>
  );
};

export default NFTpriceModal;
