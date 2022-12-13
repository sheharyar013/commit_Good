import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { setAccount } from "../app/slices/walletSlice";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
declare global {
  interface Window {
    ethereum: any;
  }
}
export default function useMetaWallet() {
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState("");
  const dispatch = useDispatch();

  const provider =
    typeof window !== "undefined" && window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();

  useEffect(() => {
    if (!defaultAccount) connectwalletHandler();
  }, [defaultAccount]);

  const connectwalletHandler = () => {
    if (window.ethereum) {
      (provider as any).send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler((provider as any).getSigner());
      });
    } else {
      setErrorMessage("Please Install Metamask!!!");
    }
  };

  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    dispatch(setAccount(address));
    const balance = await newAccount.getBalance();
    setUserBalance(ethers.utils.formatEther(balance));
    await getuserBalance(address);
  };

  const getuserBalance = async (address) => {
    await provider.getBalance(address, "latest");
  };

  return { defaultAccount, connectwalletHandler };
}
