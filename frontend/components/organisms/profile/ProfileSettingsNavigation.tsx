import React from "react";
import { SideDashboardChildrenBar } from "../../../components/organisms/SideDashboardChildrenBar";
const Navbar = dynamic(() => import("../../../components/organisms/Navbar"));
import Footer from "../../../components/organisms/Footer";
import dynamic from "next/dynamic";
import { styled } from "@stitches/react";
import { SiteLayout } from "../../atoms/SiteLayout";
import SvgUser from "../../atoms/svg/SvgUser";
import SvgQuality from "../../atoms/svg/SvgQuality";
import SvgCreditCard from "../../atoms/svg/SvgCreditCard";
import SvgGlobe from "../../atoms/svg/SvgGlobe";
import SvgSecurity from "../../atoms/svg/SvgSecurity";
import SvgPencilAndRuler from "../../atoms/svg/SvgPencilAndRuler";

type Props = {
  active: string;
  children: React.ReactNode;
};

const FirstBoxLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100vw",
  gap: "$8x",
  marginTop: "$8x",
});

const ElementsLayout = styled("div", {
  display: "flex",
  width: "100%",
  flexDirection: "column",
});

export const ProfileSettingsNavigation: React.FC<Props> = ({
  active,
  children,
}) => {
  return (
    <>
      <Navbar />
      <SiteLayout>
        <FirstBoxLayout>
          <SideDashboardChildrenBar
            items={[
              {
                name: "Personal",
                children: [
                  {
                    name: "Account",
                    value: "account",
                    icon: SvgUser,
                    href: "/settings/account",
                  },
                  {
                    name: "Public profile",
                    value: "public-profile",
                    icon: SvgGlobe,
                    href: "/settings/public-profile",
                  },
                  {
                    name: "Badges",
                    value: "badges",
                    icon: SvgQuality,
                    href: "/settings/badges",
                  },
                  {
                    name: "Appearance",
                    value: "appearance",
                    icon: SvgPencilAndRuler,
                    href: "/settings/appearance",
                  },
                ],
              },
              {
                name: "Access",
                children: [
                  {
                    name: "Security",
                    value: "security",
                    icon: SvgSecurity,
                    href: "/settings/security",
                  },
                  {
                    name: "Billing & Plans",
                    value: "billing-plans",
                    icon: SvgCreditCard,
                    href: "/settings/billing-plans",
                  },
                ],
              },
            ]}
            active={active}
          ></SideDashboardChildrenBar>
          <ElementsLayout>{children}</ElementsLayout>
        </FirstBoxLayout>
      </SiteLayout>
      <Footer />
    </>
  );
};
