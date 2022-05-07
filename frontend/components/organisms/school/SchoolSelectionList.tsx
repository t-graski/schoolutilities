import React, { useEffect, useState } from "react";
import { styled } from "../../../stitches.config";
import { getAccessToken } from "../../../utils/authHelper";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

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

async function fetchSchools() {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getSchools`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export const SchoolSelectionList: React.FC<SideDashboardProps> = ({}) => {
  const { data: schools, status } = useQuery("schools", fetchSchools);
  const router = useRouter();

  if (status == "loading") {
    return (
      <SchoolList>
        <Skeleton width="100%" height={150}></Skeleton>
        <Skeleton width="100%" height={150}></Skeleton>
      </SchoolList>
    );
  }

  if (status == "error") {
    return <div>Error</div>;
  }

  if (status == "success") {
    if (schools.length == 0) {
      router.push("/school/join");
    }
    if (schools.length == 1) {
      redirectRoute(router, schools[0]);
    }
  }

  return (
    <>
      <SchoolList>
        {schools.map((school) => (
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
        ))}
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
