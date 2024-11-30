/* eslint-disable  @typescript-eslint/no-explicit-any */
"use client";

import {
  CIVIL_STATUSES,
  DAN_GRADES,
  KUP_GRADES,
  TIME_PERIODS,
  TYPE_GRADES,
} from "@/src/constants/business";
import { Stack, Typography } from "@mui/material";
import CustomGridContainer from "@/src/components/CustomGridContainer";
import FormContainer from "@/src/components/form/FormContainer";
import { IStudent } from "@/src/types/Student";
import Image from "next/image";
import RHFAutocomplete from "@/src/components/form/RHFAutocomplete";
import RHFTextField from "@/src/components/form/RHFTextField";
import { createStudents } from "@/src/services/students";
import dayjs from "dayjs";
import { isNumber } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import DEFAULT_STUDENT_VALUES from "../constants/student.default.values";
import schema from "../constants/student.schema";
import TitleBar from "@/src/components/TitleBar";
import { ISchool } from "@/src/types/School";
import { getSchools } from "@/src/services/schools";
import { getTeachersBySchoolId } from "@/src/services/teachers";
import { ITeacher } from "@/src/types/Teacher";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getTutorById } from "@/src/services/tutors";

export default function StudentForm2() {
  const { tutorId } = useParams<{ tutorId: string }>();
  const { push, back } = useRouter();
  const pathname = usePathname();

  const methods = useForm<any>({
    mode: "onTouched",
    defaultValues: DEFAULT_STUDENT_VALUES,
    resolver: yupResolver(schema),
  });

  const {
    watch,
    setValue,
    resetField,
    reset,
    formState: { isLoading, isSubmitting, isValidating },
  } = methods;

  const birthDate = watch("birthDate");
  const age = dayjs().diff(birthDate, "year");
  const currentGrade = watch("grade.value");
  const currentGradeLevel = watch("grade.level");
  const nextGrade = watch("nextGrade");
  const schoolId = watch("schoolId");

  const timePracticing = watch("timePracticing");
  const periodTime = watch("periodTime");

  const { data: tutor } = useQuery({
    queryKey: ["tutor", tutorId],
    enabled: !!tutorId,
    queryFn: () => getTutorById(tutorId),
  });

  const { data: schools, isLoading: isLoadingSchools } = useQuery({
    queryKey: ["schools"],
    queryFn: () => getSchools(),
    select: (data: ISchool[]) =>
      data.map(({ _id, name }) => ({
        value: _id ?? "",
        label: name.toUpperCase(),
      })),
  });
  const { data: teachers, isLoading: isLoadingTeachers } = useQuery({
    queryKey: ["teachers", schoolId],
    queryFn: () => getTeachersBySchoolId(schoolId),
    enabled: !!schoolId,
    select: (data: ITeacher[]) =>
      data.map(({ _id, name, lastName }) => ({
        value: _id ?? "",
        label: `${name.toUpperCase()} ${lastName.toUpperCase()}`,
      })),
  });

  const mutation = useMutation({
    mutationFn: createStudents,
    onSuccess: () => {
      if (pathname.includes("join")) push(`${pathname.replace("student", "")}`);
      else back();
    },
  });

  const createStudent = (formValues: IStudent) =>
    mutation.mutate({ ...formValues, tutorId, address: tutor?.address });

  const gradesOptions = currentGradeLevel
    ? currentGradeLevel === "kup"
      ? KUP_GRADES
      : DAN_GRADES
    : [];

  const ageLabel = birthDate && `${age} años`;
  const displayNextGrade = isNumber(currentGrade);
  const nextGradeLabel =
    nextGrade.value === 0
      ? `Eiby ${nextGrade.level}`
      : `${nextGrade.value}° ${nextGrade.level}`;

  const disableForms = isLoading || isSubmitting || isValidating;

  useEffect(() => {
    if (currentGrade === null || !currentGradeLevel) return;

    const currentBlackType =
      currentGradeLevel === "dan" || currentGradeLevel === "poom";
    const typeBlackGrade = age < 15 ? "poom" : "dan";
    let nextGrade = DEFAULT_STUDENT_VALUES.nextGrade;

    if (currentBlackType)
      nextGrade = {
        value: Number(currentGrade) + 1,
        level: typeBlackGrade,
      };
    if (currentGradeLevel === "kup")
      nextGrade = {
        value: Number(currentGrade) - 1,
        level: "kup",
      };
    if (currentGradeLevel === "kup" && currentGrade === 0) {
      resetField("grade");
      resetField("nextGrade");
    }
    if (currentGradeLevel === "kup" && currentGrade === 1)
      nextGrade = {
        value: 0,
        level: typeBlackGrade,
      };
    setValue("nextGrade", nextGrade);
  }, [currentGrade, currentGradeLevel, age]);

  useEffect(() => {
    if (timePracticing === null || periodTime === null)
      setValue("priorExperienceDays", 0);

    const periodTimeMultiplier = periodTime === "months" ? 30 : 365;
    const timePracticingInDays = timePracticing * periodTimeMultiplier;

    setValue("priorExperienceDays", timePracticingInDays);
  }, [timePracticing, periodTime]);

  useEffect(() => {
    teachers && setValue("teacherId", teachers[0]?.value);
  }, [teachers]);

  return (
    <Stack direction={"column"} gap={4}>
      {/* <Stack justifyContent={'center'} alignItems={'center'}>
        <Image src={'/logo.png'} alt={'Logo'} width={130} height={130} />
      </Stack>
      <Typography align='center' variant='h4'>
        Registro de alumnos
      </Typography> */}
      <FormContainer
        methods={methods}
        submitAction={createStudent}
        buttonLabel={"Guardar"}
        isLoading={isLoading}
        disabled={disableForms}
      >
        <RHFTextField
          name="name"
          label="Nombre"
          type="text"
          disabled={disableForms}
        />
        <RHFTextField
          name="lastName"
          label="Apellidos"
          type="text"
          disabled={disableForms}
        />

        <RHFAutocomplete
          name="civilStatus"
          label="Estado civil"
          options={CIVIL_STATUSES}
          disabled={disableForms}
          disableClearable
        />
        <RHFTextField
          name="occupation"
          label="Ocupación"
          type="text"
          disabled={disableForms}
        />
        <RHFTextField
          name="curp"
          label="CURP"
          type="text"
          disabled={disableForms}
        />
        <CustomGridContainer
          itemSize={[{ xs: 9 }, { xs: 3 }]}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RHFTextField
            name="birthDate"
            label="Fecha de nacimiento"
            type="date"
            disabled={disableForms}
          />
          {ageLabel && (
            <Typography fontStyle={"italic"} fontSize={"small"}>
              {ageLabel}
            </Typography>
          )}
        </CustomGridContainer>
        <RHFTextField
          name="enrollmentDate"
          label="Fecha de inscripción"
          type="date"
          disabled={disableForms}
        />
        <TitleBar title="Tiempo de practica previa" isSectionTitle />
        <CustomGridContainer
          itemSize={{ xs: 6 }}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RHFTextField
            name="timePracticing"
            label="Tiempo de práctica"
            type="number"
            disabled={disableForms}
          />
          <RHFAutocomplete
            disabled={disableForms}
            disableClearable
            name="periodTime"
            label="Periodo de tiempo"
            options={TIME_PERIODS}
          />
        </CustomGridContainer>
        <RHFAutocomplete
          disableClearable
          name="schoolId"
          label="Escuela"
          noOptionsText="Seleccionar escuela"
          options={schools || []}
          loading={isLoadingSchools}
          disabled={disableForms}
        />
        <RHFAutocomplete
          disableClearable
          name="teacherId"
          label="Profesor"
          noOptionsText="Seleccionar profesor"
          options={teachers || []}
          loading={isLoadingTeachers}
          disabled={disableForms}
        />
        <CustomGridContainer
          itemSize={{ xs: 6 }}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
        >
          <RHFAutocomplete
            name="grade.level"
            label="Nivel actual"
            options={TYPE_GRADES}
            disableClearable
            disabled={disableForms}
            noOptionsText="Seleccionar nivel actual"
          />
          <RHFAutocomplete
            disableClearable
            name="grade.value"
            label="Grado actual"
            noOptionsText="Seleccionar grado actual"
            options={gradesOptions}
            disabled={disableForms}
          />
          {displayNextGrade && (
            <Typography
              whiteSpace="nowrap"
              fontStyle={"italic"}
              fontSize={"small"}
            >
              Siguiente grado:
            </Typography>
          )}
          {displayNextGrade && (
            <Typography textTransform={"capitalize"} fontSize={"small"}>
              {nextGradeLabel}
            </Typography>
          )}
        </CustomGridContainer>
      </FormContainer>
    </Stack>
  );
}
