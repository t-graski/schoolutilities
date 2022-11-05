import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { InputField } from "../atoms/input/InputField";
import { useRouter } from "next/router";
import { Spacer } from "../atoms/Spacer";
import { Separator } from "../atoms/Separator";
import { fetchUserInfo } from "../../utils/requests";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";

type Props = {};

const ProfileLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2x",

  "@mobileOnly": {
    gridTemplateColumns: "1fr",
    padding: "3vh 6vw",
  },
});

const GeneralProfileNavbarLayout = styled("div", {});

const ProfileName = styled("div", {
  marginBottom: "10px",
  width: "100%",
  fontWeight: "$bold",
  fontSize: "1.5rem",
  textAlign: "center",
  color: "$neutral-500",
});

const ProfileNavigationLinks = styled("div", {});

const SpecialLinkLayout = styled("div", {
  padding: "15px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  color: "$neutral-500",

  "@mobileOnly": {
    padding: "15px 0",
  },
});

const ProfileDataColumn = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$5x",

  "@mobileOnly": {
    marginRight: "0",
  },
});

const ProfileDataLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$1x",
  width: "100%",
});

const ProfileDataHeader = styled("span", {
  fontWeight: "$bold",
  fontSize: "1.2rem",
  color: "$onSurface",
});

const ProfileData = styled("span", {
  fontSize: "1.1rem",
  color: "$onSurface",
});

export const ProfileSettings: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [passwordResetSucessfull, setPasswordResetSucessfull] = useState(0);
  const { data: userInfo, status: userInfoStatus } = useQuery(
    "userInfo",
    fetchUserInfo
  );

  if (userInfoStatus === "loading") {
    return (
      <>
        <ProfileLayout>
          <GeneralProfileNavbarLayout>
            <ProfileName>
              <Skeleton width={100} height={100} circle={true}></Skeleton>
              <Spacer size="small"></Spacer>
              <Skeleton width={300} height={60}></Skeleton>
            </ProfileName>
            <ProfileNavigationLinks>
              <SpecialLinkLayout>
                <Skeleton width={300} height={40}></Skeleton>
                <Spacer size="verySmall" />
                <Skeleton width={300} height={40}></Skeleton>
              </SpecialLinkLayout>
            </ProfileNavigationLinks>
          </GeneralProfileNavbarLayout>
          <Separator
            width={"big"}
            alignment={"left"}
            orientation={"vertical"}
            hideOnMobile={true}
          />
          <ProfileDataColumn>
            <Spacer size="verySmall"></Spacer>
            <Skeleton width={300} height={50}></Skeleton>
            <Spacer size="verySmall"></Spacer>
          </ProfileDataColumn>
          <ProfileDataColumn>
            <Spacer size="verySmall"></Spacer>
            <Skeleton width={300} height={50}></Skeleton>
            <Spacer size="verySmall"></Spacer>
            <Skeleton width={300} height={50}></Skeleton>
          </ProfileDataColumn>
        </ProfileLayout>
      </>
    );
  }

  if (userInfoStatus === "error") {
    return <></>;
  }

  const longDateCreationDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(userInfo.userCreationTimestamp));

  return (
    <>
      <ProfileLayout>
        <Spacer size="1x"></Spacer>
        <ProfileDataColumn>
          <ProfileDataLayout>
            <ProfileDataHeader>Firstname</ProfileDataHeader>
            <ProfileData>{userInfo.userFirstname}</ProfileData>
          </ProfileDataLayout>
          <ProfileDataLayout>
            <ProfileDataHeader>Lastname</ProfileDataHeader>
            <ProfileData>{userInfo.userLastname}</ProfileData>
          </ProfileDataLayout>
          <ProfileDataLayout>
            <ProfileDataHeader>Email</ProfileDataHeader>
            <ProfileData>{userInfo.userEmail}</ProfileData>
          </ProfileDataLayout>
          <ProfileDataLayout>
            <ProfileDataHeader>User Since</ProfileDataHeader>
            <ProfileData>{longDateCreationDate}</ProfileData>
          </ProfileDataLayout>
        </ProfileDataColumn>
      </ProfileLayout>
    </>
  );
};
