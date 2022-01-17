import React, { useEffect, useState } from "react";
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
import { getAccessToken, logout } from "../misc/authHelper";
import { SettingsHeader } from "./SettingsHeader";
import { SettingsEntry } from "./SettingsEntry";
import { SettingsPopUp } from "./SettingsPopUp";
import cookie from "js-cookie";
import { SvgIcon } from "./SvgIcon";
import { LoadingAnimation } from "./LoadingAnimation";

type Props = {};

const ProfileLayout = styled("div", {
  display: "grid",
  justifyContent: "center",
  padding: "3vh 6vw 10vh",
  gridTemplateColumns: "4fr 1fr 6fr 6fr",
});

const GeneralProfileNavbarLayout = styled("div", {});

const ProfileImageLayout = styled("div", {
  borderRadius: "50%",
  margin: "0 30%",
  marginBottom: "20px",
  border: "$fontPrimary solid 2px",
  padding: "7%",
  color: "$fontPrimary",
});

const ProfileName = styled("div", {
  width: "100%",
  textAlign: "center",
  color: "$fontPrimary",
});

const ProfileNavigationLinks = styled("div", {});

const LinkArrow = styled("div", {
  width: "20px",
  height: "20px",
});

const IconLayout = styled("div", {
  width: "30px",
  height: "30px",
});

const LinkContentLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "70%",
});

const SpecialLinkLayout = styled("div", {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  color: "$fontPrimary",
});

const LinkLayout = styled("a", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "20px",
  width: "100%",
  padding: "24px",
  borderRadius: "$normal",
  backgroundColor: "$backgroundTertiary",
  cursor: "pointer",
  "&[data-size='small']": {
    justifyContent: "center",
    width: "fit-content",
  },
  variants: {
    color: {
      primary: {},
      secondary: {
        backgroundColor: "$fontPrimary",
      },
      special: {
        backgroundColor: "$specialPrimary",
      },
    },
  },
});

const LinkLabel = styled("p", {
  fontWeight: "bold",
  variants: {
    color: {
      primary: {
        color: "$fontPrimary",
      },
      secondary: {
        color: "$backgroundTertiary",
      },
      special: {
        fontWeight: "normal",
      },
    },
  },
});

const SettingsSpacer = styled("div", {
  height: "100%",
  width: "3px",
  backgroundColor: "$fontPrimary",
  margin: "0 auto",
  marginBottom: "20px",
});

const ProfileDataColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginRight: "40px",
  gap: "10px",
});

const InputLabel = styled("p", {
  fontWeight: "500",
  fontSize: "1.8rem",
  color: "$fontPrimary",
  margin: "0",
  marginBottom: "10px",
  textAlign: "left",
  width: "100%",
});

const StatusInfo = styled("p", {
  fontWeight: "500",
  fontSize: "1.8rem",
  color: "$fontPrimary",
  margin: "0",
  marginBottom: "10px",
  textAlign: "left",
  width: "100%",
});

const ButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

const SchoolList = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "25px",
});

const SchoolLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "22px 20px",
  borderRadius: "20px",
  backgroundColor: "$backgroundTertiary",
  transition: "all 100ms ease-in-out",
  // boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.1)",
  "&:hover": {
    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.1)",
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

const NoSchoolsText = styled("p", {
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginBottom: "10px",
  margin: 0,
  color: "$fontPrimary",
});

const ActionButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  marginTop: "20px",
});

export const ProfileSettings: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [statusInfo, setStatusInfo] = useState("");
  const [userInfo, setUserInfo] = useState({
    firstName: "Firstname",
    lastName: "Lastname",
    email: "Email",
    creationDate: new Date().toISOString(),
    birthDate: new Date().toISOString(),
  });
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [schools, setSchools] = useState([]);

  async function updateSchoolsFromDatabase() {
    let accessToken = await getAccessToken();
    let response = await fetch(
      `https://backend.schoolutilities.net/api/user/getSchools`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    let fetchedSchools = await response.json();
    setSchools(fetchedSchools);
  }

  useEffect(() => {
    if (isFirstTime) {
      getUserInfo();
      updateSchoolsFromDatabase();
      setIsFirstTime(false);
    }
  });

  async function getUserInfo() {
    const token = await getAccessToken();
    if (!token) {
      router.push("/auth?tab=login");
    }
    setIsLoading(true);
    const response = await fetch(
      `https://backend.schoolutilities.net/api/user/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      setStatusInfo("Error: " + response.status);
    } else {
      const data = await response.json();
      setUserInfo(data);
      console.log(data);
    }
    setIsLoading(false);
  }

  async function saveChanges() {
    const token = await getAccessToken();
    console.log(token);
    if (!token) {
      router.push("/auth?tab=login");
    }
    setIsLoading(true);
    const response = await fetch(
      `https://backend.schoolutilities.net/api/user/changeEmail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newEmail: userInfo.email,
        }),
      }
    );
    if (response.status !== 200) {
      setStatusInfo("Error: " + response.status);
    } else {
      getUserInfo();
      setStatusInfo(
        "You now have to verify your new email address to complete the change."
      );
    }
    setIsLoading(false);
  }

  const longDateCreationDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(new Date(userInfo.creationDate));

  return (
    <>
      <ProfileLayout>
        <GeneralProfileNavbarLayout>
          <ProfileImageLayout>
            <SvgIcon iconName="SvgUser" />
          </ProfileImageLayout>
          <ProfileName>
            {userInfo.firstName} {userInfo.lastName}
          </ProfileName>
          <ProfileNavigationLinks>
            <SpecialLinkLayout>
              <Link href="/profile/settings">
                <LinkLayout
                  color={router.query.tab !== "schools" ? "special" : "primary"}
                >
                  <IconLayout>
                    <SvgIcon iconName="SvgHome" />
                  </IconLayout>
                  <LinkContentLayout>
                    <LinkLabel color="special">Account</LinkLabel>

                    <LinkArrow color="special">
                      <SvgIcon iconName="SvgRightArrow" />
                    </LinkArrow>
                  </LinkContentLayout>
                </LinkLayout>
              </Link>
            </SpecialLinkLayout>
            <SpecialLinkLayout>
              <Link href="/profile/settings?tab=schools">
                <LinkLayout
                  color={router.query.tab == "schools" ? "special" : "primary"}
                >
                  <IconLayout>
                    <SvgIcon iconName="SvgUser" />
                  </IconLayout>
                  <LinkContentLayout>
                    <LinkLabel color="special">Schools</LinkLabel>

                    <LinkArrow color="special">
                      <SvgIcon iconName="SvgRightArrow" />
                    </LinkArrow>
                  </LinkContentLayout>
                </LinkLayout>
              </Link>
            </SpecialLinkLayout>
          </ProfileNavigationLinks>
        </GeneralProfileNavbarLayout>
        <SettingsSpacer></SettingsSpacer>
        {router.query.tab !== "schools" ? (
          <>
            <ProfileDataColumn>
              {/* <InputLabel>Firstname</InputLabel>
              <InputField
                inputType="text"
                label="Firstname"
                value={userInfo.firstName}
                onChange={(e) => {}}
                iconName={""}
                editable={false}
              /> */}
              <Spacer size="verySmall"></Spacer>
              <InputLabel>Date of Birth</InputLabel>
              <InputField
                inputType="text"
                label="Date of Birth"
                value={new Date(userInfo.birthDate).toLocaleDateString()}
                onChange={(e) => {}}
                iconName={""}
                editable={false}
              />
              <Spacer size="verySmall"></Spacer>
              <ActionButtonLayout>
                <Button
                  backgroundColor={"primary"}
                  color={"primary"}
                  label="SAVE CHANGES"
                  onClick={saveChanges}
                ></Button>
                {/* <Button
                  backgroundColor={"secondary"}
                  color={"primary"}
                  label="RESET"
                  onClick={() => {
                    setStatusInfo("");
                    getUserInfo();
                  }}
                ></Button> */}
              </ActionButtonLayout>
              {statusInfo && <StatusInfo>{statusInfo}</StatusInfo>}
            </ProfileDataColumn>
            <ProfileDataColumn>
              {/* <InputLabel>Lastname</InputLabel>
              <InputField
                inputType="text"
                label="Lastname"
                value={userInfo.lastName}
                onChange={(e) => {}}
                iconName={""}
                editable={false}
              /> */}
              <Spacer size="verySmall"></Spacer>
              <InputLabel>Email</InputLabel>
              <InputField
                inputType="email"
                label="Email"
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e });
                }}
                iconName={""}
              />
              <Spacer size="verySmall"></Spacer>
              {/* <Button
                backgroundColor={"secondary"}
                color={"primary"}
                label="LOGOUT"
                onClick={() => {
                  logout();
                  router.push("/auth?tab=login");
                }}
              ></Button> */}
              <InputLabel>User Since</InputLabel>
              <InputField
                inputType="text"
                label="User Since"
                value={longDateCreationDate}
                onChange={(e) => {}}
                iconName={""}
                editable={false}
              />
            </ProfileDataColumn>

            <ProfileDataColumn>
              {statusInfo && <StatusInfo>{statusInfo}</StatusInfo>}
            </ProfileDataColumn>
          </>
        ) : (
          <>
            <ProfileDataColumn>
              <InputLabel>Your schools</InputLabel>
              <SchoolList>
                {schools.map((school) => (
                  <SchoolLayout
                    key={school.schoolUUID}
                    onClick={() => {
                      cookie.set("schoolUUID", school.schoolUUID);
                      router.push("/school/admin/settings");
                    }}
                  >
                    <SchoolName>{school.schoolName}</SchoolName>
                  </SchoolLayout>
                ))}
                {schools.length == 0 && (
                  <NoSchoolsText>You have no schools yet.</NoSchoolsText>
                )}
              </SchoolList>
              <Spacer size="verySmall"></Spacer>
              <ButtonLayout>
                <Link href="/profile/school-join">
                  <a>
                    <Button
                      backgroundColor={"primary"}
                      color={"primary"}
                      label="JOIN A SCHOOL"
                      onClick={() => {
                        setStatusInfo("");
                        getUserInfo();
                      }}
                    ></Button>
                  </a>
                </Link>
                <Spacer size="verySmall"></Spacer>
                <Link href="/school/admin/create-school">
                  <a>
                    <Button
                      backgroundColor={"secondary"}
                      color={"primary"}
                      label="CREATE A SCHOOL"
                      onClick={() => {
                        setStatusInfo("");
                        getUserInfo();
                      }}
                    ></Button>
                  </a>
                </Link>
              </ButtonLayout>
            </ProfileDataColumn>
          </>
        )}
      </ProfileLayout>
      <LoadingAnimation isVisible={isLoading} />
    </>
  );
};
