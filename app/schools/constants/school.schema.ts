import * as yup from "yup";

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
  isActive: yup.boolean().default(true),
  address: yup.object().shape({
    address: stringSchema,
    state: stringSchema,
    city: stringSchema,
    zipCode: stringSchema, // TODO: Revisar schema de zip code
  }),
});
