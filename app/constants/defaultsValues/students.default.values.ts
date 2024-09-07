import { IStudent } from "@/types/Student";
import dayjs from "dayjs";

const DEFAULT_STUDENT_VALUES: IStudent = {
  name: "",
  lastName: "",
  civilStatus: "single",
  occupation: "",
  dateBirth: null,
  timePracticing: 1,
  periodTime: "months",
  school: "",
  currentGrade: {
    grade: null,
    type: null,
  },
  nextGrade: {
    grade: null,
    type: null,
  },
  professor: "",
};

export default DEFAULT_STUDENT_VALUES;
