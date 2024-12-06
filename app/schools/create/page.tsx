"use client";

import TitleBar from "@/src/components/TitleBar";
import SchoolForm from "@/schools/sections/SchoolForm";
import Page from "@/src/components/Page";

export default function CreateSchool() {
  return (
    <Page>
      <TitleBar title="Crear escuela" />
      <SchoolForm />
    </Page>
  );
}
