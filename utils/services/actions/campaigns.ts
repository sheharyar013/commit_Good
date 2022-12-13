import {
  ADD_CAMPAIGN_ENDPOINT,
  APPLY_FOR_VOLUNTEER,
  AreasOfInterestEndPoint,
  CAMPAIGN_TOGGLE_COMPLETION,
  GetCampaigns,
  GET_CAMPAIGN_VOLUNTEERS,
  ProjectCoordinatorsEndPoint,
  VOLUNTEER_TASKS,
  GET_CAMPAIGN_BY_ID,
  GET_PAID_STATUS,
  CLEAR_HOURS,
} from "../end-points";

import { api } from "..";
import { TApplyAsVolunteer } from "../../../interfaces/general";
import { CampaignVolunteers, IProject } from "../../../interfaces/project";
import { toast } from "react-toastify";
import { toasterMessages } from "../../../constants/messages";

export type AppliedVolunteer = {
  id: number;
  name: string;
  wallet_address: string;
  user_id: number;
  image: string;
  hours: number;
  payed: boolean;
};

export type TAppliedVolunteers = {
  campiagn_admin_id: number;
  campaign_coordinator: number;
  volunteer_appliers: AppliedVolunteer[];
};

export const getCampaigns = (
  country: string = "",
  projectName: string = "",
  page: number = 1
) =>
  api.get(GetCampaigns, {
    params: {
      country,
      search: projectName,
      page,
    },
  });

export const getAreasOfInterest = () => api.get(AreasOfInterestEndPoint);
export const getCoordinators = () => api.get(ProjectCoordinatorsEndPoint);

export const addCampaign = (data: any) => api.post(ADD_CAMPAIGN_ENDPOINT, data);

export const getCampaignVolunteers = (id: string | number) =>
  api.get<{ volunteers: CampaignVolunteers[] }>(GET_CAMPAIGN_VOLUNTEERS(id));

export const getAppliedVolunteers = (
  id: string | number,
  campaign_voluteer = true
) =>
  api.get<TAppliedVolunteers>(GET_CAMPAIGN_VOLUNTEERS(id), {
    params: {
      campaign_voluteer,
    },
  });

export const applyForVolunteer = (data: TApplyAsVolunteer) =>
  api.post(APPLY_FOR_VOLUNTEER, data);

export const toggleCampaignCompletion = (id: string | number) =>
  api.get(CAMPAIGN_TOGGLE_COMPLETION(id)).then(() => {
    toast.success(toasterMessages.toggleCampaignStatus, {
      toastId: "toggle-campaign-status",
    });
  });

export const volunteerTasksApi = () => api.get(VOLUNTEER_TASKS);

export const getCampaignDetailsByID = (campaign_id: string | number) =>
  api.get<IProject>(GET_CAMPAIGN_BY_ID(campaign_id));
export const getPaidStaus = (
  campaign_id: string | number,
  volunteer_id: string | number
) => api.post(GET_PAID_STATUS(campaign_id, volunteer_id));

export const clearHours = () => api.post(CLEAR_HOURS);
