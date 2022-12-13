import { AccountInfo, PublicKey } from "@solana/web3.js";
import { u64 } from "@project-serum/anchor/dist/esm/coder/spl-token/buffer-layout";

export interface TokenAccount {
  pubkey: string;
  account: AccountInfo<Buffer>;
  info: any;
}

export type MintInfo = {
  mintAuthority: null | PublicKey;
  supply: u64;
  decimals: number;
  isInitialized: boolean;
  freezeAuthority: null | PublicKey;
};

export const MAX_NAME_LENGTH = 32;

export const MAX_SYMBOL_LENGTH = 10;

export const MAX_URI_LENGTH = 200;

export const MAX_CREATOR_LIMIT = 5;

export const MAX_CREATOR_LEN = 32 + 1 + 1;
export const MAX_METADATA_LEN =
  1 +
  32 +
  32 +
  MAX_NAME_LENGTH +
  MAX_SYMBOL_LENGTH +
  MAX_URI_LENGTH +
  MAX_CREATOR_LIMIT * MAX_CREATOR_LEN +
  2 +
  1 +
  1 +
  198;

export enum MetadataCategory {
  Audio = "audio",
  Video = "video",
  Image = "image",
  VR = "vr",
  HTML = "html",
}

export type StringPublicKey = string;
export const pubkeyToString = (key: PublicKey | null | string = "") => {
  return typeof key === "string" ? key : key?.toBase58() || "";
};
export class Creator {
  address: StringPublicKey;
  verified: boolean;
  share: number;

  constructor(args: {
    address: StringPublicKey;
    verified: boolean;
    share: number;
  }) {
    this.address = args.address;
    this.verified = args.verified;
    this.share = args.share;
  }
}

export type Collection = {
  key: StringPublicKey;
  verified: number;
};

export type Attribute = {
  trait_type?: string;
  display_type?: string;
  value: string | number;
};

export type MetadataFile = {
  uri: string;
  type: string;
};

export type FileOrString = MetadataFile | string;

export interface IMetadataExtension {
  name: string;
  symbol: string;
  collection: string;
  creators: Creator[] | null;
  description: string;
  // preview image absolute URI
  image: string;
  merchantizedImages: string[];
  animation_url?: string;

  attributes?: Attribute[];

  // stores link to item on meta
  external_url: string;

  seller_fee_basis_points: number;

  price?: number;

  properties: {
    files?: FileOrString[];
    merchantFiles?: FileOrString[];
    category: MetadataCategory;
    maxSupply?: number;
    creators?: {
      address: string;
      shares: number;
    }[];
  };
}
