import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import type * as Stitches from "@stitches/react";
import { InputField } from "./InputField";
import { Button } from "./Button";
import Link from "next/link";
import { regex } from "../misc/regex";
import { useRouter } from "next/router";
import { Headline } from "./Headline";
import { Separator } from "./Separator";

type Props = {
  setDisabled: Function;
};

const SchoolDetailLayout = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const HeaderLayout = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
});

const InformationLayout = styled("div", {});

const AddIconLayout = styled("div", {
  display: "flex",
  width: "80px",
  height: "80px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialPrimary",
  cursor: "pointer",
});

const AddIconPlus = styled("p", {
  fontSize: "80px",
});

const DepartmentsLayout = styled("div", {});

const DepartmentLayout = styled("div", {});

const DepartmentName = styled("p", {});

const DepartmentEditIcon = styled("div", {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialSecondary",
  cursor: "pointer",
});

const DepartmentDeleteIcon = styled("div", {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialSecondary",
  cursor: "pointer",
});

const PopUpLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "10",
});

const PopUpContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "50%",
});

export const DepartmentsDetailField: React.FC<Props> = ({ setDisabled }) => {
  const [departments, setDepartments] = React.useState([]);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [popUpIsVisible, setPopUpIsVisible] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentId, setDepartmentId] = React.useState(-1);

  useEffect(() => {
    if (departments.length > 0) {
      if (isDisabled) {
        setIsDisabled(false);
        setDisabled(false);
      }
      // save schoolName, schoolLanguage, schoolTimezone as schoolDetails with to localStorage
      localStorage.setItem(
        "departments",
        JSON.stringify({
          departments,
        })
      );
    } else {
      // read data from localStorage
      const departments = JSON.parse(localStorage.getItem("departments"));
      if (departments) {
        setDepartments(departments);
      } else if (!isDisabled) {
        setIsDisabled(true);
        setDisabled(true);
      }
    }
  });

  return (
    <>
      <SchoolDetailLayout>
        {popUpIsVisible && (
          <PopUpLayout>
            <PopUpContentLayout>
              <Headline
                label={
                  departmentId == -1
                    ? "Add a new department"
                    : "Edit a department"
                }
              ></Headline>
              <Separator width="ultraSmall" alignment="left" />
              <InputField
                label="Department name"
                inputType="text"
                value={departmentName}
                onChange={(e) => {
                  setDepartmentName(e.target.value);
                }}
                iconSrc={""}
                iconAlt={""}
              />
              <Button
                label={departmentId == -1 ? "Add" : "Edit"}
                onClick={() => {
                  setPopUpIsVisible(false);
                }}
                backgroundColor={"primary"}
                color={"primary"}
              />
            </PopUpContentLayout>
          </PopUpLayout>
        )}
        <HeaderLayout>
          <InformationLayout>
            <Headline
              label="Abteilungsverwaltung"
              alignment="left"
              fontWeight="bold"
            ></Headline>
            <Separator width="small" alignment="left"></Separator>
          </InformationLayout>
          <AddIconLayout
            onClick={() => {
              setDepartmentName("");
              setDepartmentId(-1);
              setPopUpIsVisible(true);
            }}
          >
            <AddIconPlus>+</AddIconPlus>
          </AddIconLayout>
        </HeaderLayout>
        <DepartmentsLayout>
          {departments.map((department, index) => (
            <DepartmentLayout key={index}>
              <DepartmentName>{department.name}</DepartmentName>
              <DepartmentEditIcon>
                <Image src="/images/edit.svg" alt="" width={20} height={20} />
              </DepartmentEditIcon>
              <DepartmentDeleteIcon>
                <Image src="/images/delete.svg" alt="" width={20} height={20} />
              </DepartmentDeleteIcon>
            </DepartmentLayout>
          ))}
        </DepartmentsLayout>
      </SchoolDetailLayout>
    </>
  );
};
