import React, { useEffect, useState } from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import Link from "next/link";
import { SvgIcon } from "./SvgIcon";
import { getAccessToken } from "../misc/authHelper";
import cookie from "js-cookie";
import { useRouter } from "next/router";

export type SideDashboardProps = {};

const SchoolList = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const SchoolLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  marginTop: "20px",
  marginBottom: "20px",
  padding: "20px 40px",
  borderRadius: "25px",
  backgroundColor: "$backgroundTertiary",
  transition: "all 100ms ease-in-out",
  boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.1)",
  "&:hover": {
    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.3)",
  },
  cursor: "pointer",
});

const SchoolName = styled("p", {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
  margin: 0,
  color: "$fontPrimary",
});

export const SchoolSelectionList: React.FC<SideDashboardProps> = ({}) => {
  const [schools, setSchools] = useState([
    {
      id: "1",
      name: "School 1",
    },
    {
      id: "2",
      name: "School 2",
    },
    {
      id: "3",
      name: "School 3",
    },
  ]);
  useEffect(() => {
    updateSchoolsFromDatabase();
  }, []);
  const router = useRouter();

  async function updateSchoolsFromDatabase() {
    let accessToken = await getAccessToken();
    // let response = await fetch("https://api.school-dashboard.com/api/schools", {
    //     method: "GET",
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // let schools = await response.json();
    // setSchools(schools);
  }

  return (
    <>
      <SchoolList>
        {schools.map((school) => (
          <SchoolLayout
            key={school.id}
            onClick={() => {
              cookie.set("schoolId", school.id);
              router.push("/school/admin/settings");
            }}
          >
            <SchoolName>{school.name}</SchoolName>
          </SchoolLayout>
        ))}
      </SchoolList>
    </>
  );
};
