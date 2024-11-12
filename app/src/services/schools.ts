import api from "src/services/index";
import { get } from "lodash";
import { ISchool } from "@/src/types/School";

export const getSchools = async () => {
  const response = await api.get("/schools");

  return get(response, "data.data.schools", []);
};

export const getSchoolById = async (id: string) => {
  const response = await api.get(`/schools/${id}`);

  return get(response, "data.data.school", []);
};

export const createSchool = async (data: ISchool) => {
  const response = await api.post("/schools", data);

  return get(response, "data.school", undefined);
};

export const editSchool = async (data: ISchool) => {
  const response = await api.put(`/schools/${data._id}`, data);

  return get(response, "data.school", undefined);
};

export const deleteSchool = async (id: string) => {
  const response = await api.delete(`/schools/${id}`);

  return get(response, "message", undefined);
};
