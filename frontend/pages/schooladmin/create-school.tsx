import React, { useState } from "react";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { Progressbar } from "../../components/Progressbar";
import { Spacer } from "../../components/Spacer";
import { styled } from "../../stitches.config";

const CreateSchoolLayout = styled("div", {
  display: "flex",
  width: "100%",
  padding: "50px",
});

export default function CreateSchool() {
  const [progressSteps, setProgressSteps] = useState([
    {
      label: "School Details",
      isDone: true,
      isActive: true,
    },
    {
      label: "Departments",
      isDone: false,
      isActive: false,
    },
    {
      label: "Students",
      isDone: false,
      isActive: false,
    },
    {
      label: "Classes",
      isDone: false,
      isActive: false,
    },
  ]);

  return (
    <>
      <Navbar
        links={[
          {
            href: "/",
            label: "Home",
          },
          {
            href: "/features",
            label: "Features",
          },
        ]}
      ></Navbar>
      <Spacer size="medium"></Spacer>
      <CreateSchoolLayout>
        <Progressbar steps={progressSteps}></Progressbar>
      </CreateSchoolLayout>
      <Footer
        links={[
          {
            href: "/data-policy",
            label: "Data Policy",
          },
          {
            href: "/imprint",
            label: "Imprint",
          },
          {
            href: "/logout",
            label: "Logout",
          },
        ]}
      ></Footer>
    </>
  );
}
