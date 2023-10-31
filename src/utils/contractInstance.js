import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../data/contractdetails";

export const contractInstance = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  return contract;
};

export const contractInstanceForReading = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://goerli.infura.io/v3/7fa06c473ce3459f8358a3751f048048"
  );

  const contract = new ethers.Contract(contractAddress, contractAbi, provider);

  return contract;
};
