import api from "src/services/index";
import { get } from "lodash";
import { ICredentials } from "@/src/types/Users";

export const login = async (data: ICredentials) => {
  const response = await api.post("/auth/login", data);

  const token = get(response, "data.data.token", null);

  sessionStorage.setItem("DSG", token);

  return;
};
