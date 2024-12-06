"use client";

import TitleBar from "@/src/components/TitleBar";
import TeacherForm from "@/schools/[schoolId]/teachers/sections/TeacherForm";
import Page from "@/src/components/Page";

export default function CreateSchool() {
  return (
    <Page>
      <TitleBar title="Crear profesor" />
      <TeacherForm />
    </Page>
  );
}
