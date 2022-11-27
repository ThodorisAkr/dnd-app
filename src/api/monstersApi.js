import { api } from "./api";

export const getAllMonsters = () => {
  return api.get(`api/monsters`);
};

export const getMonster = (payload) => {
  return api.get(`api/monsters/${payload}`);
};
