import React from "react";
import NFT from "../components/NFT";
import { useGlobalContext } from "../context/globalContext";

const Marketplace = () => {
  const { NFTsdata, isFetching } = useGlobalContext();

  return (
    <div className="py-[40px]">
      <h1 className="font-Sec text-[7rem] text-center leading-[1]">Artworks</h1>
      <p className="text-center text-[1.3rem]">
        View all artworks as e dey hot 🔥
      </p>

      <div className="mt-[30px] flex flex-wrap gap-[30px] justify-center">
        {isFetching && <h1 className="text-[1.5rem] mt-[30px]">Loading...</h1>}
        {NFTsdata.length > 0 &&
          NFTsdata.map((item, index) => <NFT key={index} item={item} />)}
      </div>
    </div>
  );
};

export default Marketplace;
