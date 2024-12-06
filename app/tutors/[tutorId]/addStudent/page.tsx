"use client";

import StudentForm2 from "@/schools/[schoolId]/students/sections/StudentForm2";
import TitleBar from "@/src/components/TitleBar";
import Page from "@/src/components/Page";

export default function StudentJoin() {
  return (
    <Page>
      <TitleBar title="Registro de Estudiantes" />
      <StudentForm2 />
    </Page>
  );
}
