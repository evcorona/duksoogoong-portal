import { ITableData } from "@/src/types/table/TableData";
import { CIVIL_STATUSES, TIME_PERIODS } from "@/src/constants/business";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

export const STUDENTS_HEADERS: ITableData[] = [
  {
    accessor: "name",
    label: "Nombre",
    align: "left",
    customRow: (value) => ({ value, styles: { textTransform: "capitalize" } }),
  },
  {
    accessor: "lastName",
    label: "Apellidos",
    align: "left",
    customRow: (value) => ({ value, styles: { textTransform: "capitalize" } }),
  },
  {
    accessor: "birthDate",
    label: "Fecha de nacimiento",
    align: "left",
    customRow: (value) => ({ value: dayjs(value).format("YYYY/MM/DD") }),
  },
  {
    accessor: "birthDate",
    label: "Edad",
    align: "left",
    customRow: (value) => ({ value: `${dayjs().diff(value, "year")} años` }),
  },
  {
    accessor: "civilStatus",
    label: "Estado Civil",
    align: "left",
    customRow: (value: string) => ({
      value:
        CIVIL_STATUSES.find((status) => status.value === value)?.label ?? "",
      styles: { textTransform: "capitalize" },
    }),
  },
  {
    accessor: "curp",
    label: "CURP",
    align: "left",
  },
  {
    accessor: "enrollmentDate",
    label: "Fecha de inscripción",
    align: "left",
    customRow: (value) => ({ value: dayjs(value).format("YYYY/MM/DD") }),
  },
  {
    accessor: "grade",
    label: "Grado",
    align: "left",
    customRow: (value) => {
      const grade = value?.value === 0 ? "Ieby" : value?.value;
      const level = value?.level;

      return { value: `${grade}° ${level}` };
    },
  },

  {
    accessor: "occupation",
    label: "Ocupación",
    align: "left",
    customRow: (value) => ({ value, styles: { textTransform: "capitalize" } }),
  },
  {
    accessor: "priorExperienceDays",
    label: "Tiempo de practica previa",
    align: "left",
    customRow: (value) => {
      const duration = dayjs.duration({ days: value });
      const valueLabel =
        duration.asDays() < 365
          ? `${duration.asMonths()} meses`
          : `${duration.asYears()} años`;

      return {
        value: value ? valueLabel : "0",
      };
    },
  },
  {
    accessor: "ruf",
    label: "RUF",
    align: "left",
  },
  {
    accessor: "teacherId",
    label: "Profesor",
    align: "left",
    customRow: (value) => ({
      value: `${value?.name} ${value?.lastName}`,
      styles: { textTransform: "capitalize" },
    }),
  },
  {
    accessor: "schoolId",
    label: "Escuela",
    align: "left",
    customRow: (value) => ({
      value: value?.name,
      styles: { textTransform: "capitalize" },
    }),
  },
];
