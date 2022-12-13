import { useState } from "react";
import { getAllNfts } from "../utils/services/actions/nft";
import { useLocation, useParams } from "react-router-dom";
import { useGoodTokenPrice } from "./useGoodPrice";
import { ethers } from "ethers";
import { toast } from "react-toastify";
declare global {
  interface Window {
    ethereum: any;
  }
}
export interface IExtendedNftData {
  campaign_id: number;
  created_by: string | null;
  description: string;
  id: number;
  image: string;
  mint_id: string;
  price: number;
  redeem_limit: number;
  remaining_limit: number;
  reward_title: string;
  title: string;
  charity_name: string;
}

export const useMoralis = (pubKey?: string) => {
  const [listedNftBE, setListedNftBE] = useState<IExtendedNftData[]>([]);

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const { price: nftPrice } = useGoodTokenPrice();
  const { pathname } = useLocation();

  const param = useParams<{ id: string }>();
  const projectId = parseInt(param.id);

  const fetchAllNfts = async () => {
    console.log("check function call");
    let resdATE = (await getAllNfts(projectId)) as unknown as {
      nft: IExtendedNftData[];
    };
    setLoading(false);
    if (param.id) {
      const filteredNftsToBuy = resdATE?.nft?.filter(
        (el) => el.campaign_id === projectId
      );
      setListedNftBE(filteredNftsToBuy.reverse());
    } else if (pathname.includes("artworks")) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const filteredNftsToList = resdATE?.nft?.filter(
        (el) => el.created_by === signerAddress
      );
      setListedNftBE(filteredNftsToList);
    }
  };

  return {
    fetchAllNfts,
    disabled,
    loading,
    nftPrice,
    listedNftBE,
  };
};
