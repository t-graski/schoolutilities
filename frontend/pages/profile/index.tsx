import { styled } from "../../stitches.config";
const Navbar = dynamic(() => import("../../components/organisms/Navbar"));
import Footer from "../../components/organisms/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import { SideDashboardChildrenBar } from "../../components/organisms/SideDashboardChildrenBar";
import SvgAlert from "../../components/atoms/svg/SvgAlert";
import SvgBuilding from "../../components/atoms/svg/SvgBuilding";
import SvgAttendance from "../../components/atoms/svg/SvgAttendance";

const Maincontent = styled("div", {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100vw",
});

const FirstBoxLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100vw",
});

export default function Home() {
  return (
    <>
      <Maincontent>
        <Head>
          <title>SchoolUtilities</title>
          <meta property="og:type" content="SchoolUtilities"></meta>
          <meta property="og:url" content="https://schoolutilities.net/"></meta>
          <meta property="og:title" content="SchoolUtilities"></meta>
          <meta
            property="og:description"
            content="LET’S MAKE SCHOOL EASY."
          ></meta>
          <meta
            property="og:image"
            content="https://i.imgur.com/KJ63K3r.png"
          ></meta>
        </Head>
        <Navbar />
        <FirstBoxLayout>
          <SideDashboardChildrenBar
            items={[
              {
                name: "Profile",
                children: [
                  {
                    name: "Profile",
                    value: "profile",
                    icon: SvgAlert,
                    href: "/profile",
                  },
                  {
                    name: "Settings2",
                    value: "settings2",
                    icon: SvgBuilding,
                    href: "/profile/settings2",
                  },
                ],
              },
              {
                name: "School",
                children: [
                  {
                    name: "Settings",
                    value: "settings",
                    icon: SvgAttendance,
                    href: "/profile/settings",
                  },
                ],
              },
            ]}
            active="settings"
          ></SideDashboardChildrenBar>
        </FirstBoxLayout>
        <Footer />
      </Maincontent>
    </>
  );
}
