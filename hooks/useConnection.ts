import { Cluster, clusterApiUrl, Connection } from "@solana/web3.js";

export const useCustomConnection = (net: Cluster = "devnet") => {
  return new Connection(clusterApiUrl(net), "confirmed");
};
