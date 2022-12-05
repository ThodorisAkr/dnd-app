import { directusApi } from "./api";

export const getHomeData = () => {
  return directusApi.get("items/homedata");
};
