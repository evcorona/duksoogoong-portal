import { IAddress } from "@/types/Address";

export interface ISchool {
  _id?: string;
  name: string;
  address: IAddress;
  isActive: boolean;
}
