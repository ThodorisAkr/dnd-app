import { api } from "./api";

export const getClass = (payload) => {
  return api.get(`api/classes/${payload.class}`);
};

export const getAllClasses = () => {
  return api.get("api/classes");
};
