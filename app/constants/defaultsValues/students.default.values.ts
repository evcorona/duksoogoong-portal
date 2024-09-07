import { IStudent } from "@/types/Student";

const DEFAULT_STUDENT_VALUES: IStudent = {
  name: "",
  lastName: "",
  civilStatus: "single",
  occupation: "",
  birthDate: "",
  timePracticing: 1,
  periodTime: "months",
  school: "",
  grade: null,
  level: null,
  nextGrade: {
    grade: null,
    level: null,
  },
  teacher: "",
};

export default DEFAULT_STUDENT_VALUES;
