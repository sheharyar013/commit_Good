import { api } from "..";
import { NFT_ENDPOINTS } from "../end-points";
import { TProjectWalletAddresses } from "../../../interfaces/project";
import { AxiosResponse } from "axios";
import { IExtendedNftData } from "../../../hooks/useMoralis";

export type TSaveNFT =
  | {
      title: string;
      price: number;
      description?: string;
      campaign_id: number;
      created_by: string;
      rewards: any[];
      tx_id: string;
    }
  | FormData;
export interface IimageNft {
  Blob: { size: number; type: string };
}
export interface ISaveNftRes {
  success: boolean;
  message: string;
  id: number;
}

export const SaveNftToDB = (
  data: TSaveNFT
): Promise<AxiosResponse<ISaveNftRes>> =>
  api.post(NFT_ENDPOINTS.SAVE_NFT_ENDPOINT, data);

export const updateNftStatus = (data: { mint_id: string; id: number }) =>
  api.get(NFT_ENDPOINTS.UPDATE_NFT_STATUS(data));

export const verifyUserByWalletHash = (wallet_address: string) =>
  api.post(NFT_ENDPOINTS.VERIFY_USER, { wallet_address });

export const fetchWalletAddressesOfProject = (
  campaign_id: string | number
): Promise<AxiosResponse<{ wallet_addresses: TProjectWalletAddresses }>> =>
  api.get(NFT_ENDPOINTS.GET_WALLETS(campaign_id));

export const getOpenAiImages = (query: string) =>
  api.get(NFT_ENDPOINTS.Get_open_api_images(query));

export const getAllNfts = (
  projectId: number
): Promise<AxiosResponse<{ nft: IExtendedNftData[] }>> =>
  api.get(NFT_ENDPOINTS.GET_ALL_NFT(projectId));
