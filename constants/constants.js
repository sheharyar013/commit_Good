const globalIdToastId = "globalIdToastId";

const roleNames = {
  nft: "nft",
  donor: "donor",
  charity: "charity_admin",
  volunteer: "volunteer",
  charity_coordinator: "charity_coordinator",
  vendor: "vendor",
  patron: "patron",
};

const USER_WALLET_STATUS = {
  0: "Unverified",
  1: "Pending",
  2: "Approved",
};

const PROFILE_UPDATE = `PROFILE_UPDATE`;

export const MORALIS_API_KEY = process.env.NEXT_PUBLIC_MORALIS_API;
export const MORALIS_NETWORK = process.env.NEXT_PUBLIC_MORALIS_NETWORK;
export const MORALIS_BASE_URL = `https://solana-gateway.moralis.io`;
export const TEMP_WALLET = process.env.NEXT_PUBLIC_TEMP_WALLET;

export const MORALIS_HEADER = {
  headers: {
    accept: "application/json",
    "X-API-Key": MORALIS_API_KEY,
  },
};

export const loaderOverlayStyle = {
  position: "absolute",
  background: "#6464646e",
  zIndex: 1,
  width: "75%",
  height: "94vh",
  backdropFilter: "blur(2px)",
};

export { globalIdToastId, roleNames, USER_WALLET_STATUS, PROFILE_UPDATE };
