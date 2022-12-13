import { ADD_DONATE_TOKENS, GetWalletTokens } from "../end-points";
import { api } from "..";

export const getWalletTokens = (paramString = "") =>
  api.get(`${GetWalletTokens}${paramString}`);


export const addTransactionToCampaign = (data: FormData) => api.post(ADD_DONATE_TOKENS, data);
