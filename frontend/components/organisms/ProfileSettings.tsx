import React, { useCallback, useEffect, useState } from "react";
import { styled } from "../../stitches.config";
import { InputField } from "../atoms/input/InputField";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { Spacer } from "../atoms/Spacer";
import { getAccessToken, logout } from "../../utils/authHelper";
import cookie from "js-cookie";
import { LoadingAnimation } from "../molecules/LoadingAnimation";
import { Separator } from "../atoms/Separator";
import SvgUser from "../atoms/svg/SvgUser";
import SvgHome from "../atoms/svg/SvgHome";
import SvgRightArrow from "../atoms/svg/SvgRightArrow";
import SvgSchool from "../atoms/svg/SvgSchool";

type Props = {};

const ProfileLayout = styled("div", {
  display: "grid",
  justifyContent: "center",
  padding: "3vh 6vw 10vh",
  gridTemplateColumns: "4fr 1fr 6fr 6fr",

  "@mobileOnly": {
    gridTemplateColumns: "1fr",
    padding: "3vh 6vw",
  },
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
  marginBottom: "10px",
  width: "100%",
  fontWeight: 700,
  fontSize: "1.5rem",
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
  padding: "15px 20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  color: "$fontPrimary",

  "@mobileOnly": {
    padding: "15px 0",
  },
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
  color: "$fontPrimary",
  textDecoration: "none",
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

const ProfileDataColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginRight: "40px",
  gap: "10px",

  "@mobileOnly": {
    marginRight: "0",
  },
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

export const ProfileSettings: React.FC<Props> = ({ }) => {
  const router = useRouter();
  const [statusInfo, setStatusInfo] = useState("");
  const [userInfo, setUserInfo] = useState({
    firstName: "Firstname",
    lastName: "Lastname",
    email: "Email",
    creationDate: new Date().toISOString(),
    birthday: new Date().toISOString(),
  });
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    if (isFirstTime) {
      getUserInfo();
      updateSchoolsFromDatabase();
      setIsFirstTime(false);
    }

    async function updateSchoolsFromDatabase() {
      let accessToken = await getAccessToken();
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
      setSchools(fetchedSchools);
    }

    async function getUserInfo() {
      const token = await getAccessToken();
      if (!token) {
        router.push("/auth?tab=login");
      }
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) {
        setStatusInfo("Error: " + response.status);
      } else {
        console.log(response);
        const data = await response.json();

        setUserInfo(data);
        console.log(data);
      }
      setIsLoading(false);
    }
  }, [isFirstTime, router]);

  async function getUserInfo2() {
    const token = await getAccessToken();
    if (!token) {
      router.push("/auth?tab=login");
    }
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      setStatusInfo("Error: " + response.status);
    } else {
      console.log(response);
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/changeEmail`,
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
      getUserInfo2();
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
            <SvgUser />
          </ProfileImageLayout>
          <ProfileName>
            {userInfo.firstName} {userInfo.lastName}
          </ProfileName>
          <ProfileNavigationLinks>
            <SpecialLinkLayout>
              <Link href="/profile/settings" passHref>
                <LinkLayout
                  color={router.query.tab !== "schools" ? "special" : "primary"}
                >
                  <IconLayout>
                    <SvgHome />
                  </IconLayout>
                  <LinkContentLayout>
                    <LinkLabel color="special">Account</LinkLabel>

                    <LinkArrow color="special">
                      <SvgRightArrow />
                    </LinkArrow>
                  </LinkContentLayout>
                </LinkLayout>
              </Link>
            </SpecialLinkLayout>
            <SpecialLinkLayout>
              <Link href="/profile/settings?tab=schools" passHref>
                <LinkLayout
                  color={router.query.tab == "schools" ? "special" : "primary"}
                >
                  <IconLayout>
                    <SvgSchool />
                  </IconLayout>
                  <LinkContentLayout>
                    <LinkLabel color="special">Schools</LinkLabel>

                    <LinkArrow color="special">
                      <SvgRightArrow />
                    </LinkArrow>
                  </LinkContentLayout>
                </LinkLayout>
              </Link>
            </SpecialLinkLayout>
          </ProfileNavigationLinks>
        </GeneralProfileNavbarLayout>
        <Separator
          width={"big"}
          alignment={"left"}
          orientation={"vertical"}
          hideOnMobile={true}
        />
        {router.query.tab !== "schools" ? (
          <>
            <ProfileDataColumn>
              {/* <InputLabel>Firstname</InputLabel>
              <InputField
                inputType="text"
                label="Firstname"
                value={userInfo.firstName}
                onChange={(e) => {}}
                editable={false}
              /> */}
              <Spacer size="verySmall"></Spacer>
              <InputLabel>Date of Birth</InputLabel>
              <InputField
                inputType="text"
                label="Date of Birth"
                showLabel={false}
                value={new Date(userInfo.birthday).toLocaleDateString()}
                onChange={(e) => { }}
                editable={false}
              />
              <Spacer size="verySmall"></Spacer>
              <ActionButtonLayout>
                <Button
                  backgroundColor={"primary"}
                  color={"primary"}
                  onClick={saveChanges}
                >SAVE CHANGES</Button>
              </ActionButtonLayout>
              {statusInfo && <StatusInfo>{statusInfo}</StatusInfo>}
            </ProfileDataColumn>
            <ProfileDataColumn>
              <Spacer size="verySmall"></Spacer>
              <InputLabel>Email</InputLabel>
              <InputField
                inputType="email"
                label="Email"
                showLabel={false}
                value={userInfo.email}
                onChange={(e) => {
                  setUserInfo({ ...userInfo, email: e });
                }}
              />
              <Spacer size="verySmall"></Spacer>
              <InputLabel>User Since</InputLabel>
              <InputField
                inputType="text"
                label="User Since"
                showLabel={false}
                value={longDateCreationDate}
                onChange={(e) => { }}
                editable={false}
              />
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
                      router.push(`/school/${school.schoolUUID}/edit`);
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
                <Link href="/school/join">
                  <a>
                    <Button
                      backgroundColor={"primary"}
                      color={"primary"}
                      onClick={() => {
                        setStatusInfo("");
                        getUserInfo2();
                      }}
                    >JOIN A SCHOOL</Button>
                  </a>
                </Link>
                <Spacer size="verySmall"></Spacer>
                <Link href="/school/create">
                  <a>
                    <Button
                      backgroundColor={"secondary"}
                      color={"primary"}
                      onClick={() => {
                        setStatusInfo("");
                        getUserInfo2();
                      }}
                    >CREATE A SCHOOL</Button>
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
