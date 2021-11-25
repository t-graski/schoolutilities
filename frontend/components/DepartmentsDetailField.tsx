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
import { Spacer } from "./Spacer";

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

const DepartmentsLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
});

const DepartmentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  width: "100%",
  alignItems: "center",
  padding: "20px",
  justifyContent: "space-between",
  backgroundColor: "$backgroundTertiary",
  borderRadius: "20px",
});

const DepartmentName = styled("p", {
  fontSize: "2rem",
  fontWeight: "bold",
});

const DepartmentIcons = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

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
  backgroundColor: "$specialTertiary",
  cursor: "pointer",
});

const PopUpLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.7)",
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "10",
});

const PopUpContentLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "50%",
  backgroundColor: "$backgroundPrimary",
  padding: "30px",
  borderRadius: "20px",
});

const StyledInputField = styled("div", {
  marginTop: "15px",
  marginBottom: "15px",
});

const StyledPopUpHeadline = styled("h2", {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "$fontPrimary",
  margin: "0",
});

const PopUpButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: "20px",
});

export const DepartmentsDetailField: React.FC<Props> = ({ setDisabled }) => {
  const initialState = {
    departments: [],
  };
  const [{ departments }, setDepartments] = React.useState(initialState);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [popUpIsVisible, setPopUpIsVisible] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentNameValid, setDepartmentNameValid] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState(-1);

  useEffect(() => {
    if (departments.length > 0) {
      if (isDisabled) {
        setIsDisabled(false);
        setDisabled(false);
      }
      localStorage.setItem(
        "departments",
        JSON.stringify({
          departments,
        })
      );
    } else {
      const storage = JSON.parse(localStorage.getItem("departments"));
      if (storage && storage.departments) {
        setDepartments({ departments: storage.departments });
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
              <StyledPopUpHeadline>
                {departmentId == -1
                  ? "Add a new department"
                  : "Edit a department"}
              </StyledPopUpHeadline>
              <Separator width="ultraSmall" alignment="left" />
              <StyledInputField>
                <InputField
                  label="Department name"
                  inputType="text"
                  value={departmentName}
                  onChange={(event) => {
                    setDepartmentName(event);
                    if (regex.name.test(event)) {
                      setDepartmentNameValid(true);
                    } else {
                      setDepartmentNameValid(false);
                    }
                  }}
                  iconSrc={""}
                  iconAlt={""}
                  regex={regex.name}
                  setValidInput={setDepartmentNameValid}
                  min="2"
                  max="30"
                />
              </StyledInputField>
              <PopUpButtonLayout>
                <Button
                  label="Close"
                  onClick={() => {
                    setDepartmentName("");
                    setPopUpIsVisible(false);
                  }}
                  backgroundColor={"secondary"}
                  color={"primary"}
                />
                <Button
                  label={departmentId == -1 ? "Add" : "Edit"}
                  onClick={() => {
                    if (departmentId == -1) {
                      setDepartments({
                        departments: [...departments, departmentName],
                      });
                    } else {
                      const newDepartments = departments.map(
                        (department, index) => {
                          if (index == departmentId) {
                            return departmentName;
                          } else {
                            return department;
                          }
                        }
                      );
                      setDepartments({ departments: newDepartments });
                    }
                    setPopUpIsVisible(false);
                  }}
                  backgroundColor={"primary"}
                  color={"primary"}
                  disabled={!departmentNameValid}
                />
              </PopUpButtonLayout>
            </PopUpContentLayout>
          </PopUpLayout>
        )}
        <HeaderLayout>
          <InformationLayout>
            <Headline
              label="Department Setup"
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
              <DepartmentName>{department}</DepartmentName>
              <DepartmentIcons>
                <DepartmentEditIcon
                  onClick={() => {
                    setDepartmentName(department);
                    setDepartmentId(index);
                    setPopUpIsVisible(true);
                  }}
                >
                  <Image
                    src="/images/icons/edit_icon.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </DepartmentEditIcon>
                <DepartmentDeleteIcon
                  onClick={() => {
                    let newDepartments = departments.filter(
                      (department, departmentIndex) => departmentIndex !== index
                    );
                    setDepartments({ departments: newDepartments });
                    if (newDepartments.length == 0) {
                      setDepartments(initialState);
                    }
                  }}
                >
                  <Image
                    src="/images/icons/delete_icon.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                </DepartmentDeleteIcon>
              </DepartmentIcons>
            </DepartmentLayout>
          ))}
        </DepartmentsLayout>
      </SchoolDetailLayout>
    </>
  );
};
