import React, { useEffect } from "react";
import { styled } from "../../../stitches.config";
import { InputField } from "../../atoms/input/InputField";
import { Button } from "../../atoms/Button";
import { regex } from "../../../utils/regex";
import { Headline } from "../../atoms/Headline";
import { Separator } from "../../atoms/Separator";
import SvgEdit from "../../atoms/svg/SvgEdit";
import SvgDelete from "../../atoms/svg/SvgDelete";

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
  color: "$fontPrimary",
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
  color: "$fontPrimary",
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
  padding: "10px",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialSecondary",
  cursor: "pointer",
  color: "$fontPrimary",
});

const DepartmentDeleteIcon = styled("div", {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  padding: "10px",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialTertiary",
  cursor: "pointer",
  color: "$fontPrimary",
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

const Description = styled("p", {
  fontSize: "1.2rem",
  color: "$fontPrimary",
  margin: "15px 0",
});

export const DepartmentsDetailField: React.FC<Props> = ({ setDisabled }) => {
  const [departments, setDepartments] = React.useState(["Default Department"]);
  const [isFirstTime, setIsFirstTime] = React.useState(true);
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [popUpIsVisible, setPopUpIsVisible] = React.useState(false);
  const [departmentName, setDepartmentName] = React.useState("");
  const [departmentNameValid, setDepartmentNameValid] = React.useState(false);
  const [departmentId, setDepartmentId] = React.useState(-1);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("departments"));
    if (isFirstTime) {
      if (storage && !storage.departments) {
        localStorage.setItem(
          "departments",
          JSON.stringify({
            departments: [],
          })
        );
      }
      if (storage && storage.departments) {
        setDepartments(storage.departments);
      } else if (!isDisabled) {
        setIsDisabled(false);
        setDisabled(false);
      }
      setIsFirstTime(false);
    } else if (storage && departments !== storage.departments) {
      if (isDisabled && departments.length > 0) {
        setIsDisabled(false);
        setDisabled(false);
      }
      localStorage.setItem(
        "departments",
        JSON.stringify({
          departments,
        })
      );
    }
  }, [isFirstTime, departments, isDisabled, setDisabled]);

  function savePopUpInput() {
    if (departmentId == -1) {
      setDepartments([...departments, departmentName]);
      setDisabled(false);
    } else {
      const newDepartments = departments.map((department, index) => {
        if (index == departmentId) {
          return departmentName;
        } else {
          return department;
        }
      });
      setDepartments(newDepartments);
    }

    localStorage.setItem(
      "departments",
      JSON.stringify({
        departments,
      })
    );
    setPopUpIsVisible(false);
  }

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
                  regex={regex.schoolName}
                  setValidInput={setDepartmentNameValid}
                  min="2"
                  max="30"
                />
              </StyledInputField>
              <PopUpButtonLayout>
                <Button
                  onClick={() => {
                    setDepartmentName("");
                    setPopUpIsVisible(false);
                  }}
                  backgroundColor={"secondary"}
                  color={"primary"}
                >Close</Button>
                <Button
                  onClick={savePopUpInput}
                  backgroundColor={"primary"}
                  color={"primary"}
                  disabled={
                    !departmentNameValid ||
                    (departmentId != -1 &&
                      departmentName == departments[departmentId])
                  }
                  type="submit"
                >{departmentId == -1 ? "Add" : "Edit"}</Button>
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
            <Description>
              Here you can add and edit the departments of your school.
            </Description>
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
                  <SvgEdit />
                </DepartmentEditIcon>
                <DepartmentDeleteIcon
                  onClick={() => {
                    let newDepartments = departments.filter(
                      (department, departmentIndex) => departmentIndex !== index
                    );
                    setDepartments(newDepartments);
                    if (newDepartments.length == 0) {
                      setDepartments([]);
                      console.log(departments);
                    }
                  }}
                >
                  <SvgDelete />
                </DepartmentDeleteIcon>
              </DepartmentIcons>
            </DepartmentLayout>
          ))}
        </DepartmentsLayout>
      </SchoolDetailLayout>
    </>
  );
};
