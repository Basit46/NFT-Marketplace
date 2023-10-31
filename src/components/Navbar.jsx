import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useGlobalContext } from "../context/globalContext";

const Navbar = () => {
  const { userAddress, connectwalletHandler } = useGlobalContext();

  return (
    <nav className="w-full py-[20px] flex justify-between items-center">
      <Link to="/" className="font-Sec text-[2rem]">
        ArtsOnChain
      </Link>

      <ul className="flex gap-[40px]">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/market">Marketplace</NavLink>
        </li>
        {/* <li>
          <a onClick={() => alert("Coming soon")} href="">
            Community
          </a>
        </li> */}
      </ul>

      <div className="flex gap-[10px] items-center">
        <Link
          to="/create"
          className="border-white border-[2px] px-[20px] py-[8px] flex items-center gap-[4px]"
        >
          CREATE <FaPlus />
        </Link>

        {userAddress == null ? (
          <button
            onClick={connectwalletHandler}
            className="border-white border-[2px] bg-purple-900 text-white px-[20px] py-[8px]"
          >
            CONNECT WALLET
          </button>
        ) : (
          <Link
            to="/profile"
            className="border-white border-[2px] bg-purple-900 text-white px-[20px] py-[8px]"
          >
            {userAddress.slice(0, 5)}...{userAddress.slice(-3)}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
