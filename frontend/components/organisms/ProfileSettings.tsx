import React, { useState } from "react";
import { styled } from "../../stitches.config";
import { InputField } from "../atoms/input/InputField";
import { Button } from "../atoms/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { Spacer } from "../atoms/Spacer";
import { setSelectedSchool } from "../../utils/authHelper";
import Separator from "../atoms/Separator";
import SvgUser from "../atoms/svg/SvgUser";
import SvgHome from "../atoms/svg/SvgHome";
import SvgRightArrow from "../atoms/svg/SvgRightArrow";
import SvgSchool from "../atoms/svg/SvgSchool";
import {
  fetchSchools,
  fetchUserInfo,
  requestPasswordReset,
} from "../../utils/requests";
import { useQuery } from "react-query";
import Skeleton from "react-loading-skeleton";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { keyframes } from "@stitches/react";
import { Cross2Icon } from "@radix-ui/react-icons";

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
  fontWeight: "$bold",
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
  fontWeight: "$medium",
  fontSize: "1.8rem",
  color: "$fontPrimary",
  margin: "0",
  marginBottom: "10px",
  textAlign: "left",
  width: "100%",
});

const StatusInfo = styled("p", {
  fontWeight: "$medium",
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

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: "$medium",
  color: "$fontPrimary",
  fontSize: 17,
  marginBottom: 10,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: "$fontPrimary",
  fontSize: 15,
  lineHeight: 1.5,
});

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.8 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "$backgroundSecondary",
  position: "fixed",
  opacity: 0.8,
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledDialogContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$backgroundPrimary",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "600px",
  maxHeight: "85vh",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 30,
  width: 30,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$fontPrimary",
  position: "absolute",
  top: 10,
  right: 10,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  "&:hover": { backgroundColor: "$fontPrimary", color: "$backgroundPrimary" },
  "&:focus": { boxShadow: `0 0 0 2px $specialPrimary` },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledDialogContent {...props}>{children}</StyledDialogContent>
    </DialogPrimitive.Portal>
  );
}

// Exports
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = Content;
const DialogTitle = StyledTitle;
const DialogDescription = StyledDescription;
const DialogClose = DialogPrimitive.Close;

export const ProfileSettings: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [passwordResetSucessfull, setPasswordResetSucessfull] = useState(false);
  const { data: userInfo, status: userInfoStatus } = useQuery(
    "userInfo",
    fetchUserInfo
  );
  const { data: schools, status: schoolsStatus } = useQuery(
    "schools",
    fetchSchools
  );

  if (userInfoStatus === "loading" || schoolsStatus === "loading") {
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
            <InputLabel>Date of Birth</InputLabel>
            <Skeleton width={300} height={50}></Skeleton>
            <Spacer size="verySmall"></Spacer>
          </ProfileDataColumn>
          <ProfileDataColumn>
            <Spacer size="verySmall"></Spacer>
            <InputLabel>Email</InputLabel>
            <Skeleton width={300} height={50}></Skeleton>
            <Spacer size="verySmall"></Spacer>
            <InputLabel>User Since</InputLabel>
            <Skeleton width={300} height={50}></Skeleton>
          </ProfileDataColumn>
        </ProfileLayout>
      </>
    );
  }

  if (userInfoStatus === "error" || schoolsStatus === "error") {
    return <></>;
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
              <Spacer size="verySmall"></Spacer>
              <InputLabel>Date of Birth</InputLabel>
              <InputField
                inputType="text"
                label="Date of Birth"
                showLabel={false}
                value={new Date(userInfo.birthday).toLocaleDateString()}
                onChange={(e) => {}}
                editable={false}
              />
              <Spacer size="verySmall"></Spacer>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={async () => {
                      try {
                        await requestPasswordReset(userInfo.email);
                        setPasswordResetSucessfull(true);
                      } catch (e) {
                        setPasswordResetSucessfull(false);
                      }
                    }}
                    backgroundColor="primary"
                    color="primary"
                  >
                    Change password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    {passwordResetSucessfull ? "You got an email" : "Error"}
                  </DialogTitle>
                  <DialogDescription>
                    {passwordResetSucessfull
                      ? `We just sent you an email with a link to change your
                    password.`
                      : "Something went wrong. Please try again later."}
                  </DialogDescription>
                  <DialogClose asChild>
                    <IconButton>
                      <Cross2Icon />
                    </IconButton>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </ProfileDataColumn>
            <ProfileDataColumn>
              <Spacer size="verySmall"></Spacer>
              <InputLabel>Email</InputLabel>
              <InputField
                inputType="email"
                label="Email"
                showLabel={false}
                value={userInfo.email}
                onChange={(e) => {}}
              />
              <Spacer size="verySmall"></Spacer>
              <InputLabel>User Since</InputLabel>
              <InputField
                inputType="text"
                label="User Since"
                showLabel={false}
                value={longDateCreationDate}
                onChange={(e) => {}}
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
                      setSelectedSchool(school.schoolUUID);
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
                      onClick={() => {}}
                    >
                      JOIN A SCHOOL
                    </Button>
                  </a>
                </Link>
                <Spacer size="verySmall"></Spacer>
                <Link href="/school/create">
                  <a>
                    <Button
                      backgroundColor={"secondary"}
                      color={"primary"}
                      onClick={() => {}}
                    >
                      CREATE A SCHOOL
                    </Button>
                  </a>
                </Link>
              </ButtonLayout>
            </ProfileDataColumn>
          </>
        )}
      </ProfileLayout>
    </>
  );
};
