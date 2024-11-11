export interface IStudent {
  name: string;
  lastName: string;
  civilStatus: string | null;
  occupation: string;
  birthDate: string;
  timePracticing: number | null;
  periodTime: string | null;
  school: string;
  teacher: string;
  grade: number | null;
  level: string | null;
  nextGrade: IGrade;
}

interface IGrade {
  grade: number | null;
  level: string | null;
}
