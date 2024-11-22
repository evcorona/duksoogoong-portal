import api from "src/services/index";
import { get } from "lodash";
import { ITutor } from "@/src/types/Tutor";

export const getTutors = async () => {
  const response = await api.get("/tutors");

  return get(response, "data.data.tutors", []);
};

export const getTutorsBySchoolId = async (schoolId: string) => {
  const response = await api.get(`/tutors/school/${schoolId}`);

  return get(response, "data.data.tutors", []);
};

export const getTutorById = async (id: string) => {
  const response = await api.get(`/tutors/${id}`);

  return get(response, "data.data.tutor", []);
};

export const createTutor = async (data: ITutor) => {
  const response = await api.post("/tutors", data);

  return get(response, "data.data.tutor", undefined);
};

export const editTutor = async (data: ITutor) => {
  const response = await api.put(`/tutors/${data._id}`, data);

  return get(response, "data.data.tutor", undefined);
};

export const deleteTutor = async (id: string) => {
  const response = await api.delete(`/tutors/${id}`);

  return get(response, "message", undefined);
};
