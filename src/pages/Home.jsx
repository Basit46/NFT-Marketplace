import React from "react";
import arrow from "../assets/arrow.svg";
import img1 from "../assets/heroImg1.png";
import img2 from "../assets/heroImg2.gif";
import img3 from "../assets/heroImg3.png";
import img from "../assets/heroDgn.png";
import textImg from "../assets/Group.png";
import shapePng from "../assets/Subtract.png";

const Home = () => {
  return (
    <div className="mt-[40px] relative w-full">
      <section className="w-full flex justify-between gap-[30px]">
        <div>
          <h1 className="text-[110px] font-extrabold font-Sec leading-[100px]">
            Create <br />
            Your Own
            <br />
            NFT Dream
            <br />
            Gallery
          </h1>
          <div className="mt-[40px] flex gap-[40px] items-baseline">
            <div className="bg-[#1C51FE] w-[127px] h-[127px] rounded-full flex flex-col items-center justify-center gap-[10px]">
              <img src={arrow} alt="arrow" />
              <p className="text-[0.8rem]">Discover NFT</p>
            </div>
            <div>
              <p className="text-white text-opacity-60 text-lg leading-7">
                Artworks
              </p>
              <p className="text-2xl">25.5k</p>
            </div>
            <div>
              <p className="text-white text-opacity-60 text-lg leading-7">
                Artists
              </p>
              <p className="text-2xl">500+</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-white text-opacity-70 text-lg leading-7">
            The largest NFT marketplace. Authentic and truly unique
            <br />
            digital creation. Signed and issued by the creator,made
            <br />
            possible by blockchain technology
          </p>
          <div className="mt-[30px] w-full">
            <div className="w-[549px] h-[708px] relative">
              <img
                src={img3}
                className="absolute top-[50%] translate-y-[-50%] right-[-60px] w-full h-[70%] object-cover rounded-[20px] border-black border-[2px]"
                alt="nft"
              />
              <img
                src={img2}
                className="absolute top-[50%] translate-y-[-50%] right-[-30px] w-full h-[80%] object-cover rounded-[20px] border-black border-[2px]"
                alt="nft"
              />
              <img
                src={img1}
                className="absolute top-0 left-0 object-cover w-full h-full rounded-[20px] border-black border-[2px]"
                alt="nft"
              />
              <div className="absolute left-[-50px] bottom-[-50px] w-[137px] h-[137px] bg-[#8F8CFF] rounded-full grid place-items-center">
                <img src={textImg} alt="text" />
                <img src={shapePng} className="mt-[-110px]" alt="pentagon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <img
        className="absolute top-[640px] left-[-200px]"
        height={628}
        width={628}
        src={img}
        alt="img"
      />
    </div>
  );
};

export default Home;
