import { Dayjs } from "dayjs";

export interface WeekFilterDetailed {
  endDate: Dayjs;
  endDay: string;
  month: string;
  number: number;
  startDate: Dayjs;
  startDay: string;
}

export interface FilterProps {
  limit: number;
  page: number;
  search: string;
}

export interface IFilterTrips {
  page: number;
  limit: number;
  client_id: string;
  carrier_id: string;
  route_id: string;
  driver_id: string;
  vehicle_id: string;
  status_id: string;
  date_init: string;
  date_end: string;
  sort_asc?: boolean;
  filter: string;
  duplicates: boolean;
}
