import React from "react";
import { styled } from "../../../stitches.config";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";
import { fetchSchools } from "../../../utils/requests";

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

  backgroundColor: "$neutral-300",
  transition: "all 200ms ease-in-out",
  cursor: "pointer",
  placeSelf: "center",

  "&:hover": {
    backgroundColor: "$neutral-400",
  },
});

const SchoolName = styled("p", {
  width: "100%",
  margin: 0,

  textAlign: "left",
  color: "$neutral-500",
  fontSize: "30px",
  fontWeight: "bold",
});

const SchoolDescription = styled("p", {
  margin: 0,

  fontSize: "14px",
  textAlign: "left",
  color: "$neutral-500",
});

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
