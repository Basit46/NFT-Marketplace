import React from "react";
import { useGlobalContext } from "../context/globalContext";

const Loader = () => {
  const { isLoading } = useGlobalContext();
  return (
    <div
      className={`${
        !isLoading && "hidden"
      } fixed top-0 left-0 h-screen w-screen bg-black/50 flex items-center justify-center`}
    >
      <div className="custom-loader"></div>
    </div>
  );
};

export default Loader;
