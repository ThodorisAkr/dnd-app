import { api } from "./api";

export const getClass = (payload) => {
  return api.get(`api/classes/${payload.class}`);
};
