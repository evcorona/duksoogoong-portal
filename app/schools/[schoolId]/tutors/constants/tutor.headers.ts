import { PHONE_MASK } from "@/src/constants/inputMasks";
import formatNumberWithMask from "@/src/utils/formatNumberWithMask";
import { ITableData } from "@/src/types/table/TableData";

export const TUTORS_HEADERS: ITableData[] = [
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
    accessor: "phone",
    label: "Teléfono",
    align: "left",
    customRow: (value) => ({
      value: formatNumberWithMask(value, PHONE_MASK),
      styles: { whiteSpace: "nowrap" },
    }),
  },
  {
    accessor: "address",
    label: "Domicilio",
    align: "left",
    customRow: (value) => ({
      value: value?.address,
      styles: { textTransform: "capitalize" },
    }),
  },
  {
    accessor: "address",
    label: "Estado",
    align: "left",
    customRow: (value) => ({
      value: value?.state,
      styles: { textTransform: "capitalize" },
    }),
  },
  {
    accessor: "address",
    label: "Ciudad",
    align: "left",
    customRow: (value) => ({
      value: value?.city,
      styles: { textTransform: "capitalize" },
    }),
  },
  {
    accessor: "address",
    label: "Código postal",
    align: "left",
    customRow: (value) => ({ value: value?.zipCode }),
  },
  {
    accessor: "userId",
    label: "Email",
    align: "left",
    customRow: (value) => ({ value: value?.email }),
  },
];
