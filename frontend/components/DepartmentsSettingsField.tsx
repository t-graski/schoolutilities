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
import { getAccessToken } from "../misc/authHelper";

type Props = {
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

export const DepartmentsDetailField: React.FC<Props> = ({
}) => {
  const [departments, setDepartments] = React.useState([]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [popUpIsVisible, setPopUpIsVisible] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentNameValid, setDepartmentNameValid] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState("");
  const [error, setError] = React.useState("");

  useEffect(() => {
    if (isFirstTime) {
      updateDepartmentsFromDatabase();
      setIsFirstTime(false);
    }
  });

  async function updateDepartmentsFromDatabase() {
    let accessToken = await getAccessToken();
    const returnValue = await fetch(
      "http://localhost:8080/api/schooladmin/getDepartments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const json = await returnValue.json();
    setDepartments(json);
  }

  function savePopUpInput() {
    if (departmentId == "") {
      addDepartment();
    } else {
      editDepartment();
    }
    setPopUpIsVisible(false);
  }

  async function addDepartment() {
    const data = {
      name: departmentName,
      isVisible: true,
      childsVisible: true,
    };
    const returnValue = await fetch(
      "http://localhost:8080/api/schooladmin/addDepartment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Fehler beim hinzufügen");
    } else {
      const body = await returnValue.json();
      setError("");
      setDepartments([
        ...departments,
        {
          name: departmentName,
          departmentUUID: body.departmentUUID,
        },
      ]);
    }
  }

  async function editDepartment() {
    const data = {
      departmentUUID: departmentId,
      name: departmentName,
      isVisible: true,
      childsVisible: true,
    };
    const returnValue = await fetch(
      "http://localhost:8080/api/schooladmin/updateDepartment",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Fehler beim Speichern");
    } else {
      setError("");
      const newDepartments = departments.map((department, index) => {
        if (department.departmentUUID == departmentId) {
          department.name = departmentName;
          return department;
        } else {
          return department;
        }
      });
      setDepartments(newDepartments);
    }
  }

  async function deleteDepartment(id) {
    const data = {
      departmentUUID: id,
    };
    const returnValue = await fetch(
      "http://localhost:8080/api/schooladmin/removeDepartment",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (returnValue.status !== 200) {
      setError("Fehler beim löschen");
    } else {
      setError("");
      let newDepartments = departments.filter(
        (department) => department.departmentUUID == id
      );

      setDepartments(newDepartments);
      if (newDepartments.length == 0) {
        setDepartments([]);
      }
    }
  }

  return (
    <>
      <SchoolDetailLayout>
        {popUpIsVisible && (
          <PopUpLayout>
            <PopUpContentLayout>
              <StyledPopUpHeadline>
                {departmentId == ""
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
                  label={departmentId == "" ? "Add" : "Edit"}
                  onClick={savePopUpInput}
                  backgroundColor={"primary"}
                  color={"primary"}
                  disabled={
                    !departmentNameValid ||
                    (departmentId != "" &&
                      departmentName == departments[departmentId])
                  }
                  type="submit"
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
              setDepartmentId("");
              setPopUpIsVisible(true);
            }}
          >
            <AddIconPlus>+</AddIconPlus>
          </AddIconLayout>
        </HeaderLayout>
        {error}
        <DepartmentsLayout>
          {departments.map((department, index) => (
            <DepartmentLayout key={index}>
              <DepartmentName>{department}</DepartmentName>
              <DepartmentIcons>
                <DepartmentEditIcon
                  onClick={() => {
                    setDepartmentName(department.name);
                    setDepartmentId(department.departmentUUID);
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
                    deleteDepartment(index);
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
