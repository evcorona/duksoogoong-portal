"use client";

import DEFAULT_TUTOR_VALUES from "@/schools/[schoolId]/tutors/constants/tutor.default.values";
import { createTutor, editTutor, getTutorById } from "@/src/services/tutors";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import schema from "@/schools/[schoolId]/tutors/constants/tutor.schema";
import RHFTextField from "@/src/components/form/RHFTextField";
import FormContainer from "@/src/components/form/FormContainer";
import { useEffect } from "react";
import { ITutor } from "@/src/types/Tutor";
import { PHONE_MASK } from "@/src/constants/inputMasks";
import RHFAddressForm from "@/src/components/form/RHFAddressForm";
import TitleBar from "@/src/components/TitleBar";

export default function TutorForm() {
  const { push, back } = useRouter();
  const pathname = usePathname();

  const { schoolId, tutorId } = useParams<{
    schoolId: string;
    tutorId: string;
  }>();

  const { data, isLoading } = useQuery({
    queryKey: ["tutor", tutorId],
    queryFn: () => getTutorById(tutorId as string),
    enabled: !!tutorId,
  });

  const methods = useForm<any>({
    mode: "onTouched",
    defaultValues: DEFAULT_TUTOR_VALUES,
    resolver: yupResolver(schema),
  });

  const {
    reset,
    formState: { isLoading: isLoadingForm, isSubmitting, isValidating },
  } = methods;

  const { mutate: createTutorSubmit } = useMutation({
    mutationFn: createTutor,
    onSuccess(data) {
      push(`${pathname}/${data._id}/student`);
    },
  });

  const { mutate: editTutorSubmit } = useMutation({
    mutationFn: editTutor,
    onSuccess: () => back(),
  });

  useEffect(() => {
    data &&
      reset({ ...data, email: data?.userId?.email, userId: data?.userId?._id });
  }, [data]);

  const buttonLabel = data ? "Actualizar" : "Crear";

  const submitAction = data
    ? (formData: ITutor) =>
        editTutorSubmit({ ...formData, _id: tutorId, schoolId })
    : (formData: ITutor) => createTutorSubmit({ ...formData, schoolId });

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
      <RHFTextField
        name="name"
        label="Nombre"
        capitalize
        disabled={disableForms}
      />
      <RHFTextField
        name="lastName"
        label="Apellidos"
        capitalize
        disabled={disableForms}
      />
      <RHFTextField
        name="phone"
        label="Teléfono"
        capitalize
        disabled={disableForms}
        maskoptions={{
          mask: PHONE_MASK,
          unmask: true,
        }}
      />
      <RHFTextField
        name="email"
        label="Email de acceso"
        disabled={data || disableForms}
      />
      <TitleBar title="Ubicación" isSectionTitle />
      <RHFAddressForm />
    </FormContainer>
  );
}
