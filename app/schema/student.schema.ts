import * as yup from "yup";

import dayjs from "dayjs";

const stringSchema = yup
  .string()
  .trim()
  .lowercase()
  .required("Campo requerido");

const numberSchema = yup
  .number()
  .transform((value) => (value ? Number(value) : null))
  .required("Campo requerido");

export default yup.object().shape({
  name: stringSchema,
  lastName: stringSchema,
  civilStatus: stringSchema.nullable(),
  occupation: stringSchema,
  birthDate: yup
    .string()
    .transform((value) => value && dayjs(value).format("YYYY/MM/DD"))
    .required("Campo requerido"),
  timePracticing: numberSchema.min(1, { message: "Debe ser mayor a 1" }),
  periodTime: yup.string().required("Campo requerido"),
  school: stringSchema,
  teacher: stringSchema,
  grade: numberSchema
    .min(0, "Valor inválido")
    .nullable()
    .required("Campo requerido"),
  level: yup.string().nullable().required("Campo requerido"),
  nextGrade: yup.object({
    grade: numberSchema
      .min(0, "Valor inválido")
      .nullable()
      .required("Campo requerido"),
    level: yup.string().nullable().required("Campo requerido"),
  }),
});
