import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { getAccessToken } from "../../../misc/authHelper";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

export type SideDashboardProps = {};

const SchoolList = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "5vh 20vw",
  gap: "50px",

  "@mobileOnly": {
    gridTemplateColumns: "1fr",
    gap: "10px",
    padding: "5vh 10vw",
  },
});

const SchoolLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  margin: "20px auto",
  padding: "20px 40px",
  borderRadius: "15px",
  backgroundColor: "$backgroundTertiary",
  transition: "all 200ms ease-in-out",
  "&:hover": {
    backgroundColor: "$backgroundSecondary",
  },
  cursor: "pointer",
  placeSelf: "center",
});

const SchoolName = styled("p", {
  fontSize: "30px",
  fontWeight: "bold",
  width: "100%",
  textAlign: "left",
  margin: 0,
  color: "$fontPrimary",
});

const SchoolDescription = styled("p", {
  fontSize: "14px",
  textAlign: "left",
  margin: 0,
  color: "$fontPrimary",
});

export const SchoolSelectionList: React.FC<SideDashboardProps> = ({}) => {
  const [schools, setSchools] = useState([]);
  const router = useRouter();
  useEffect(() => {
    updateSchoolsFromDatabase();

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
        if (fetchedSchools.length == 0) {
          router.push("/school/join");
        } else if (fetchedSchools.length == 1) {
          // redirectRoute(router, fetchedSchools[0]);
        }
        setSchools(fetchedSchools);
      }
    }
  }, [router]);

  return (
    <>
      <SchoolList>
        {schools.length > 0 ? (
          schools.map((school) => (
            <SchoolLayout
              key={school.schoolUUID}
              onClick={() => {
                redirectRoute(router, school);
              }}
            >
              <SchoolName>{school.schoolName}</SchoolName>
              <SchoolDescription>
                {
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia"
                }
              </SchoolDescription>
            </SchoolLayout>
          ))
        ) : (
          <>
            <Skeleton width="100%" height={150}></Skeleton>
            <Skeleton width="100%" height={150}></Skeleton>
          </>
        )}
      </SchoolList>
    </>
  );
};

function redirectRoute(router, school) {
  let redirectPath: string = Array.isArray(router.query.redirect)
    ? router.query.redirect[0]
    : router.query.redirect;
  if (router.query && redirectPath) {
    // router.push to the redirect url with decoded url
    router.push(
      "/school/" + school.schoolUUID + decodeURIComponent(redirectPath)
    );
  } else {
    router.push(`/school/${school.schoolUUID}/course`);
  }
}
