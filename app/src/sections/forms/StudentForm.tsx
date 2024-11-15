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

import CustomGridContainer from "@/src/components/form/CustomGridContainer";
import DEFAULT_STUDENT_VALUES from "src/constants/defaultsValues/students.default.values";
import FormContainer from "@/src/components/form/FormContainer";
import { IStudent } from "@/src/types/Student";
import Image from "next/image";
import RHFAutocomplete from "@/src/components/form/RHFAutocomplete";
import RHFTextField from "@/src/components/form/RHFTextField";
import { createStudents } from "@/src/services/students";
import dayjs from "dayjs";
import { isNumber } from "lodash";
import schema from "@/src/schemas/student.schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

export default function StudentForm() {
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

  const mutation = useMutation({
    mutationFn: createStudents,
    onSuccess: () => {
      alert(`Student creado`);
      reset();
    },
  });

  const createStudent = (formValues: IStudent) => mutation.mutate(formValues);

  const birthDate = watch("birthDate");
  const age = dayjs().diff(birthDate, "year");
  const currentGrade = watch("grade");
  const currentGradeType = watch("level");
  const nextGrade = watch("nextGrade");

  const gradesOptions = currentGradeType
    ? currentGradeType === "kup"
      ? KUP_GRADES
      : DAN_GRADES
    : [];

  const ageLabel = birthDate && `${age} años`;
  const displayNextGrade = isNumber(currentGrade);
  const nextGradeLabel =
    nextGrade.grade === 0
      ? `Eiby ${nextGrade.level}`
      : `${nextGrade.grade}° ${nextGrade.level}`;

  const disableForms = isLoading || isSubmitting || isValidating;

  useEffect(() => {
    if (currentGrade === null || !currentGradeType) return;

    const currentBlackType =
      currentGradeType === "dan" || currentGradeType === "poom";
    const typeBlackGrade = age < 15 ? "poom" : "dan";
    let nextGrade = DEFAULT_STUDENT_VALUES.nextGrade;

    if (currentBlackType)
      nextGrade = {
        grade: Number(currentGrade) + 1,
        level: typeBlackGrade,
      };
    if (currentGradeType === "kup")
      nextGrade = {
        grade: Number(currentGrade) - 1,
        level: "kup",
      };
    if (currentGradeType === "kup" && currentGrade === 0) {
      resetField("grade");
      resetField("nextGrade");
    }
    if (currentGradeType === "kup" && currentGrade === 1)
      nextGrade = {
        grade: 0,
        level: typeBlackGrade,
      };
    setValue("nextGrade", nextGrade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGrade, currentGradeType, age]);

  return (
    <Stack direction={"column"} gap={4}>
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Image src={"/logo.png"} alt={"Logo"} width={130} height={130} />
      </Stack>
      <Typography align="center" variant="h4">
        Registro de alumnos
      </Typography>
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
        <RHFTextField
          name="school"
          label="Escuela"
          type="text"
          disabled={disableForms}
        />
        <RHFTextField
          name="teacher"
          label="Profesor"
          type="text"
          disabled={disableForms}
        />
        <CustomGridContainer
          itemSize={{ xs: 6 }}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
        >
          <RHFAutocomplete
            name="level"
            label="Nivel actual"
            options={TYPE_GRADES}
            disableClearable
            disabled={disableForms}
          />
          <RHFAutocomplete
            disableClearable
            name="grade"
            label="Grado actual"
            noOptionsText="Seleccionar nivel actual"
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
