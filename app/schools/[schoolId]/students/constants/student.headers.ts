import { ITableData } from "@/src/types/table/TableData";
import { CIVIL_STATUSES, TIME_PERIODS } from "@/src/constants/business";

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
    accessor: "occupation",
    label: "Ocupación",
    align: "left",
    customRow: (value) => ({ value, styles: { textTransform: "capitalize" } }),
  },
  {
    accessor: "birthDate",
    label: "Fecha de nacimiento",
    align: "left",
  },
  {
    accessor: "timePracticing",
    label: "Tiempo practicando",
    align: "left",
  },
  {
    accessor: "periodTime",
    label: "Periodo de tiempo",
    align: "left",
    customRow: (value: string) => ({
      value: TIME_PERIODS.find((status) => status.value === value)?.label ?? "",
      styles: { textTransform: "capitalize" },
    }),
  },
  {
    accessor: "school",
    label: "Escuela",
    align: "left",
    customRow: (value) => ({ value, styles: { textTransform: "capitalize" } }),
  },
  {
    accessor: "teacher",
    label: "Profesor",
    align: "left",
    customRow: (value) => ({ value, styles: { textTransform: "capitalize" } }),
  },
  {
    accessor: "grade",
    label: "Grado",
    align: "left",
    customRow: (value) => ({ value: value === 0 ? "Ieby" : value }),
  },
  {
    accessor: "level",
    label: "Nivel",
    align: "left",
    customRow: (value) => ({ value, styles: { textTransform: "capitalize" } }),
  },
];
