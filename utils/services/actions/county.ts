import { GetCountries } from "../end-points";
import { api } from "..";

export const getCountries = () => api.get(GetCountries);
