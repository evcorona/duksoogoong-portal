"use client";

import TeacherForm from "@/schools/[schoolId]/teachers/sections/TeacherForm";
import Page from "@/src/components/Page";
import TitleBar from "@/src/components/TitleBar";

export default function TeacherJoin() {
  return (
    <Page>
      <TitleBar title="Registro de Profesor" />
      <TeacherForm />
    </Page>
  );
}
