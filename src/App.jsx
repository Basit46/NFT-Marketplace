import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Marketplace from "./pages/Marketplace";
import CreateNFT from "./pages/CreateNFT";
import Profile from "./pages/Profile";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NFTpriceModal from "./components/NFTpriceModal";

function App() {
  return (
    <div className="max-w-[1400px] w-full h-[100vh] overflow-y-auto overflow-x-hidden mx-auto font-JetbrainsMono text-white px-[50px]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Marketplace />} />
        <Route path="/create" element={<CreateNFT />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer className="mt-[50px]" autoClose={2000} />
      <Loader />
      <NFTpriceModal />
    </div>
  );
}

export default App;
