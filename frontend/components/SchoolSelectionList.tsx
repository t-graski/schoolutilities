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
  borderRadius: "5px",
  backgroundColor: "$backgroundTertiary",
  transition: "all 200ms ease-in-out",
  "&:hover": {
    backgroundColor: "$backgroundSecondary",
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
  const [schools, setSchools] = useState([]);
  useEffect(() => {
    updateSchoolsFromDatabase();
  }, []);
  const router = useRouter();

  async function updateSchoolsFromDatabase() {
    let accessToken = await getAccessToken();
    if (!accessToken) {
      router.push("/auth?tab=login");
    } else {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getSchools`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      let fetchedSchools = await response.json();
      console.log(fetchedSchools);
      if (fetchedSchools.length == 0) {
        router.push("/school/join");
      }
      setSchools(fetchedSchools);
    }
  }

  return (
    <>
      <SchoolList>
        {schools.map((school) => (
          <SchoolLayout
            key={school.schoolUUID}
            onClick={() => {
              let redirectRoute: string = Array.isArray(router.query.redirect)
                ? router.query.redirect[0]
                : router.query.redirect;
              if (router.query && redirectRoute) {
                // router.push to the redirect url with decoded url
                router.push(
                  "/school/" +
                    school.schoolUUID +
                    decodeURIComponent(redirectRoute)
                );
              } else {
                router.push(`/school/${school.schoolUUID}/edit`);
              }
            }}
          >
            <SchoolName>{school.schoolName}</SchoolName>
          </SchoolLayout>
        ))}
      </SchoolList>
    </>
  );
};
