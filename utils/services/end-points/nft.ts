export const SAVE_NFT_ENDPOINT = `/api/v1/nfts`;
export const UPDATE_NFT_STATUS = (data: { mint_id: string; id: number }) =>
  `/api/v1/nfts?mint_id=${data.mint_id}&id=${data.id}&nft_status=${"Created"}`;

export const VERIFY_USER = `/api/v1/verify_account`;

export const Get_open_api_images = (query: string) =>
  `/api/v1/campaigns/open_api_images?text=${query}`;

export const GET_WALLETS = (campaign_id: string | number) =>
  `api/v1/wallet_address/${campaign_id}`;
export const GET_ALL_NFT = (projectId: number) =>
  projectId
    ? `/api/v1/nfts/fetch_nfts?project_id=${projectId}`
    : `/api/v1/nfts/fetch_nfts`;
