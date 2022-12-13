export type generalIdParamType<T = number | string> = {
  id: T;
};

export type TApplyAsVolunteer = {
  campaign_id: number | string;
  volunteer_id: number | string;
  hours?: number;
};
