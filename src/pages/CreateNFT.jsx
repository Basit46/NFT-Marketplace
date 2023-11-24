import React, { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/pinata";
import { ethers } from "ethers";
import { contractInstance } from "../utils/contractInstance";
import { useGlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateNFT = () => {
  const navigate = useNavigate();

  //Global state
  const { isLoading, setIsLoading, fetchNFTs } = useGlobalContext();

  //Local state
  const [selectedImg, setSelectedImg] = useState(null);
  const [nftdata, setNftData] = useState({
    name: "",
    img: "",
    desc: "",
    price: "",
  });

  const handleImgChange = async (e) => {
    try {
      const file = e.target.files[0];

      //This will display the image on the UI
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImg(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedImg(null);
      }

      //Ths uploads the img to pinata and then set the url res to the state
      const response = await uploadFileToIPFS(file);
      setNftData({ ...nftdata, img: response.pinataURL });
    } catch (e) {
      console.log(e);
    }
  };

  const handleMint = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await uploadJSONToIPFS(nftdata);
      const price = ethers.utils.parseUnits(nftdata.price, "ether");
      const contract = contractInstance();
      let listFee = await contract.getListingFee();
      listFee = listFee.toString();

      //actually create the NFT
      let transaction = await contract.createToken(response.pinataURL, price, {
        value: listFee,
      });
      await transaction.wait();
      setIsLoading(false);
      toast("NFT Successfully minted");
      navigate("/market");
      fetchNFTs();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-[30px]">
      <h1 className="font-Sec text-[2rem] leading-[1]">Create your NFT</h1>

      <div className="mt-[30px] w-full flex gap-[50px]">
        <div className="">
          <h1 className="text-[1.3rem]">Preview</h1>
          {/* Preview */}
          <div className="w-[280px] h-fit">
            <div className="w-full h-[270px] bg-gray-400">
              {selectedImg && (
                <img
                  src={selectedImg}
                  className="w-full h-full object-cover"
                  alt="NFT Art"
                />
              )}
            </div>

            <div className="py-[6px] flex items-center justify-between">
              {/* NFT name */}
              <p className="font-semibold">{nftdata.name}</p>

              {/* NFT price in eth */}
              <p className="font-medium">{nftdata.price} gEth</p>
            </div>

            <div className="border-t-[1px] border-white pt-[6px] flex items-center justify-between">
              {/* NFT Owner */}
              <p className="text-stone-300">Ox3..efe</p>

              {/* Buy Button*/}
              <button className="border-[1px] border-neutral-200 px-[10px] py-[2px] rounded-[10px]">
                BUY
              </button>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => handleMint(e)}
          className="flex-1 flex gap-[20px] "
        >
          <div className="w-[50%]">
            <label>Upload Image</label>
            <div className="relative w-full h-[400px] border-dashed overflow-hidden border-[2px] border-white grid place-items-center">
              {selectedImg && (
                <img
                  className="w-full h-full object-cover"
                  src={selectedImg}
                  alt="selectedImg"
                />
              )}

              <input
                onChange={(e) => handleImgChange(e)}
                className="w-fit absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
                type="file"
                accept="image/*"
                required
              />
            </div>
          </div>

          <div className="flex-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={nftdata.name}
              onChange={(e) => setNftData({ ...nftdata, name: e.target.value })}
              required
              placeholder="Shayo Ape"
            />

            <label htmlFor="desc">Description</label>
            <textarea
              id="desc"
              value={nftdata.desc}
              onChange={(e) => setNftData({ ...nftdata, desc: e.target.value })}
              required
              placeholder="Forged from the realms of Igbo and Shayo"
            ></textarea>

            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={nftdata.price}
              onChange={(e) =>
                setNftData({ ...nftdata, price: e.target.value })
              }
              required
              placeholder="1.5 (Values are in goerliEth)"
            />

            <button className="block mx-auto mt-[50px] rounded-[20px] px-[50px] py-[10px]">
              {isLoading ? "Minting..." : "MINT NFT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;
