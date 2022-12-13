export interface IUser extends TRole, TWalletStatus {
  readonly id: number;
  email: string;
  profile_image?: string;
  wallet_address?: string;
}

export type TWalletStatus = {
  wallet_status: 0 | 1 | 2;
};

export type TRole = {
  role:
    | ERole.nft
    | ERole.donor
    | ERole.charity
    | ERole.volunteer
    | ERole.charity_coordinator
    | ERole.vendor
    | ERole.patron;
};

export interface IUserDetails extends IUser {
  address_line1: string;
  address_line2: string;
  city: string;
  county: string;
  facebook_url: string;
  image_url: string;
  linkedin_url: string;
  name: string;
  state: string;
  website_url: string;
  zip: string;
  password?: string;
  password_confirmation?: string;
  identification_photo?: File | string;
  hasWalletAddress?: boolean;
  limit?: number;
}

export enum ERole {
  nft = "nft",
  donor = "donor",
  charity = "charity_admin",
  volunteer = "volunteer",
  charity_coordinator = "charity_coordinator",
  vendor = "vendor",
  patron = "patron",
}
