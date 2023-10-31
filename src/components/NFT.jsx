import { ethers } from "ethers";
import { useGlobalContext } from "../context/globalContext";
import { contractInstance } from "../utils/contractInstance";
import { toast } from "react-toastify";

const NFT = ({ item }) => {
  const { userAddress, setIsLoading, fetchNFTs, newPrice, setIsModalOpen } =
    useGlobalContext();

  const buyNFT = async () => {
    try {
      setIsLoading(true);
      const price = ethers.utils.parseUnits(item.price, "ether");
      const contract = await contractInstance();
      const transaction = await contract.executeSale(item.tokenId, {
        value: price,
      });
      await transaction.wait();
      toast("Successfull bought");
      setIsLoading(false);
      fetchNFTs();
    } catch (e) {
      console.log(e);
      toast(e.reason);
      setIsLoading(false);
    }
  };

  const listNFT = async () => {
    try {
      setIsLoading(true);
      setIsModalOpen();

      const contract = contractInstance();

      let price = ethers.utils.parseUnits(newPrice, "ether");

      let listFee = await contract.getListingFee();
      listFee = listFee.toString();

      const transaction = await contract.listToken(item.tokenId, price, {
        value: listFee,
      });
      await transaction.wait();
      setIsLoading(false);
      fetchNFTs();
      toast("Your NFT is now listed");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  const delistNFT = async () => {
    try {
      setIsLoading(true);
      const contract = contractInstance();
      const transaction = await contract.delistToken(item.tokenId);
      await transaction.wait();
      setIsLoading(false);
      fetchNFTs();
      toast("Your NFT is now delisted");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  };

  return (
    <div className="w-[280px] h-fit">
      <div className="w-full h-[270px]">
        <img
          src={item.img}
          className="w-full h-full object-cover"
          alt="NFT Art"
        />
      </div>

      <div className="py-[6px] flex items-center justify-between">
        {/* NFT name */}
        <p className="font-semibold">{item.name}</p>

        {/* NFT price in eth */}
        <p className="font-medium">{item.price} gEth</p>
      </div>

      <div className="border-t-[1px] border-white pt-[6px] flex items-center justify-between">
        {/* NFT Owner */}
        {item.seller !== userAddress ? (
          <p className="text-stone-300">
            {item.seller.slice(0, 3)}...{item.seller.slice(-3)}
          </p>
        ) : (
          <div className="py-[2px] rounded-[10px]">OWNED BY YOU</div>
        )}

        {/* Buy Button*/}
        {item.seller !== userAddress &&
          (item.isListed ? (
            <button
              onClick={buyNFT}
              className="border-[1px] border-neutral-200 px-[10px] py-[2px] rounded-[10px]"
            >
              BUY
            </button>
          ) : (
            <div className="border-[1px] border-neutral-200 px-[10px] py-[2px] rounded-[10px]">
              NOT LISTED
            </div>
          ))}

        {/* List Nft */}
        {item.seller == userAddress &&
          (item.isListed ? (
            <button
              onClick={delistNFT}
              className="border-[1px] border-neutral-200 px-[10px] py-[2px] rounded-[10px]"
            >
              DELIST NFT
            </button>
          ) : (
            <button
              onClick={listNFT}
              className="border-[1px] border-neutral-200 px-[10px] py-[2px] rounded-[10px]"
            >
              LIST NFT
            </button>
          ))}
      </div>
    </div>
  );
};

export default NFT;
