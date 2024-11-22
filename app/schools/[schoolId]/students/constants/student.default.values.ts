import ADDRESS_DEFAULT_VALUES from "@/src/constants/defaultsValues/address.default.values";
import { IStudent } from "@/src/types/Student";

const DEFAULT_STUDENT_VALUES: IStudent = {
  name: "",
  lastName: "",
  curp: "",
  ruf: "",
  civilStatus: "single",
  occupation: "",
  birthDate: null,
  enrollmentDate: null,
  priorExperienceDays: 0,
  isActive: true,
  grade: {
    value: null,
    level: null,
    lastGradeUpdatedAt: undefined,
  },
  schoolId: "",
  teacherId: "",
  userId: undefined,
  tutorId: undefined,
  address: ADDRESS_DEFAULT_VALUES,
  nextGrade: {
    value: null,
    level: null,
  },
};

export default DEFAULT_STUDENT_VALUES;
