"use client";

import StudentForm2 from "@/schools/[schoolId]/students/sections/StudentForm2";
import Page from "@/src/components/Page";
import TitleBar from "@/src/components/TitleBar";

export default function StudentJoin() {
  return (
    <Page>
      <TitleBar title="Registro de Estudiantes" />
      <StudentForm2 />
    </Page>
  );
}
