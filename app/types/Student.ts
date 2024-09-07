import { Dayjs } from "dayjs";

export interface IStudent {
  name: string;
  lastName: string;
  civilStatus: string;
  occupation: string;
  dateBirth: Dayjs | null;
  timePracticing: number;
  periodTime: "months" | "years";
  school: string;
  professor: string;
  currentGrade: IGrade;
  nextGrade: IGrade;
}

interface IGrade {
  grade: string | "ieby" | null;
  type: "dan" | "kup" | "poom" | null;
}
