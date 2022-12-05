import { api } from "./api";

export const getHomeData = () => {
  return api.get("http://localhost:8055/items/homedata");
};
