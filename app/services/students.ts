import { IStudent } from "@/types/Student";
import api from "services/index";
import { get } from "lodash";

export const getStudents = async () => {
  const response = await api.get("/students");

  return get(response, "data.data.students", []);
};

export const createStudents = async (data: IStudent) => {
  const response = await api.post("/students", data);

  console.log(response);
  return get(response, "data.student", undefined);
};