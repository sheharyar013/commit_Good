export interface IProject {
  address_city: string;
  address_country: string;
  address_state: string;
  address_zip: string;
  campaign_coordinator_id: null | number | string;
  days_left: number;
  description: string;
  expiration_date: string;
  goal_amount: string;
  good_goal_amount: string;
  readonly id: number;
  images: any[];
  name: string;
  time_length: number;
  total_amount: null | number | string;
  total_good_amount: number;
  readonly user_id: number;
  workflow_state: string;
  is_completed: boolean;
  donation_amount_in_good: number;
  donation_amount_in_usd: number;
}

export type CampaignVolunteers = {
  readonly id: number;
  title: string;
  description: string;
  readonly campaign_id: number;
  hours: number;
  number: number;
  is_applied: boolean;
};

export type TProjectWalletAddresses = {
  charity_cordinator_wallet_address: string;
  charity_admin_wallet_address: string;
};
