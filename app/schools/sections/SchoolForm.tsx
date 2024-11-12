"use client";

import DEFAULT_SCHOOL_VALUES from "@/schools/constants/school.default.values";
import {
  createSchool,
  editSchool,
  getSchoolById,
} from "@/src/services/schools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import schema from "@/schools/constants/school.schema";
import RHFTextField from "@/src/components/form/RHFTextField";
import FormContainer from "@/src/components/form/FormContainer";
import RHFAddressForm from "@/src/components/form/RHFAddressForm";
import TitleBar from "@/src/components/TitleBar";
import { useEffect } from "react";
import { ISchool } from "@/src/types/School";

export default function SchoolForm() {
  const { back } = useRouter();

  const { schoolId } = useParams<{ schoolId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["school", schoolId],
    queryFn: () => getSchoolById(schoolId as string),
    enabled: !!schoolId,
  });

  const methods = useForm<any>({
    mode: "onTouched",
    defaultValues: DEFAULT_SCHOOL_VALUES,
    resolver: yupResolver(schema),
  });

  const {
    reset,
    formState: { isLoading: isLoadingForm, isSubmitting, isValidating },
  } = methods;

  const { mutate: createSchoolSubmit } = useMutation({
    mutationFn: createSchool,
    onSuccess: () => back(),
  });

  const { mutate: editSchoolSubmit } = useMutation({
    mutationFn: editSchool,
    onSuccess: () => back(),
  });

  useEffect(() => {
    data && reset(data);
  }, [data]);

  const buttonLabel = data ? "Actualizar" : "Crear";

  const submitAction = data
    ? (formData: ISchool) => editSchoolSubmit({ ...formData, _id: schoolId })
    : createSchoolSubmit;

  const disableForms =
    isLoading || isLoadingForm || isSubmitting || isValidating;

  return (
    <FormContainer
      methods={methods}
      submitAction={submitAction}
      buttonLabel={buttonLabel}
      isLoading={isLoading}
      disabled={disableForms}
    >
      <RHFTextField name="name" label="Nombre de la escuela" capitalize />
      <TitleBar title="Ubicación" isSectionTitle />
      <RHFAddressForm />
    </FormContainer>
  );
}
