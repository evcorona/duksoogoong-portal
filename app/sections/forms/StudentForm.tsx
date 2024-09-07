"use client";

import {
  CIVIL_STATUSES,
  DAN_GRADES,
  KUP_GRADES,
  TIME_PERIODS,
  TYPE_GRADES,
} from "@/constants/business";
import { Stack, Typography } from "@mui/material";

import CustomGridContainer from "@/components/form/CustomGridContainer";
import DEFAULT_STUDENT_VALUES from "constants/defaultsValues/students.default.values";
import FormContainer from "@/components/form/FormContainer";
import { IStudent } from "@/types/Student";
import Image from "next/image";
import RHFAutocomplete from "@/components/form/RHFAutocomplete";
import RHFDatePicker from "@/components/form/RHFDatePicker";
import RHFTextField from "@/components/form/RHFTextField";
import dayjs from "dayjs";
import { isNumber } from "lodash";
import schema from "schema/student.schema";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function StudentForm() {
  const methods = useForm<IStudent>({
    mode: "onTouched",
    defaultValues: DEFAULT_STUDENT_VALUES,
    resolver: zodResolver(schema),
  });

  const { watch, setValue, resetField } = methods;

  const birthDate = watch("birthDate");
  const age = dayjs().diff(birthDate, "year");
  const currentGrade = watch("currentGrade.grade");
  const currentGradeType = watch("currentGrade.level");
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

  console.log(currentGrade);

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
      resetField("currentGrade.grade");
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
        submitAction={() => false}
        buttonLabel={"Guardar"}
      >
        <RHFTextField name="name" label="Nombre" type="text" />
        <RHFTextField name="lastName" label="Apellidos" type="text" />
        <RHFAutocomplete
          name="civilStatus"
          label="Estado civil"
          options={CIVIL_STATUSES}
          disableClearable
        />
        <RHFTextField name="occupation" label="Ocupación" type="text" />
        <CustomGridContainer
          itemSize={[{ xs: 9 }, { xs: 3 }]}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RHFDatePicker
            name="birthDate"
            label="Fecha de nacimiento"
            maxDate={dayjs()}
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
          />
          <RHFAutocomplete
            disableClearable
            name="periodTime"
            label="Periodo de tiempo"
            options={TIME_PERIODS}
          />
        </CustomGridContainer>
        <RHFTextField name="school" label="Escuela" type="text" />
        <RHFTextField name="teacher" label="Profesor" type="text" />
        <CustomGridContainer
          itemSize={{ xs: 6 }}
          columnSpacing={{ xs: 2 }}
          rowSpacing={{ xs: 2 }}
        >
          <RHFAutocomplete
            name="currentGrade.level"
            label="Nivel actual"
            options={TYPE_GRADES}
            disableClearable
          />
          <RHFAutocomplete
            disableClearable
            name="currentGrade.grade"
            label="Grado actual"
            noOptionsText="Seleccionar nivel actual"
            options={gradesOptions}
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
