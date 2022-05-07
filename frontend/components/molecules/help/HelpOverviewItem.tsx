import React from "react";
import { Separator } from "../../atoms/Separator";
import Link from "next/link";
import { styled } from "@stitches/react";

type Props = {
  title: string;
  href: string;
  description: string;
  iconName: string;
};

const GeneralListItemLayout = styled("a", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
  justifyContent: "center",
  width: "22%",
  padding: "8px",
  color: "$fontPrimary",
  boxShadow: "0px 0px 10px rgba(206, 206, 206, 0.3)",
  cursor: "pointer",
  borderRadius: "10px",
  textDecoration: "none",
  transition: "all 200ms",

  "&:hover": {
    boxShadow: "0px 0px 10px rgba(107, 107, 107, 0.5)",
  },
});

const IconLayout = styled("div", {
  display: "flex",
  width: "100px",
  height: "100px",
  padding: "10px",
  color: "$specialSecondary",
});

const TitleLayout = styled("div", {
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "0.5vh",
  textAlign: "center",
});

const DescriptionLayout = styled("div", {
  fontSize: "0.9rem",
  marginBottom: "1rem",
  textAlign: "center",
});

export const HelpOverviewItem: React.FC<Props> = ({
  title,
  href,
  description,
  iconName,
}) => {
  return (
    <>
      <Link href={href} passHref>
        <GeneralListItemLayout>
          <IconLayout>
            <SvgIcon iconName={iconName} />
          </IconLayout>
          <TitleLayout>{title}</TitleLayout>
          <Separator width={"ultraSmall"} alignment={"center"}></Separator>
          <DescriptionLayout>{description}</DescriptionLayout>
        </GeneralListItemLayout>
      </Link>
    </>
  );
};
