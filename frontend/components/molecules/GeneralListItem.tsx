import React from "react";
import { styled } from "../../stitches.config";
import { Button } from "../atoms/Button";
import { useRouter } from "next/router";

type Props = {
  title: string;
  href: string;
  buttonText: string;
  description: string;
  icon: any;
};

const GeneralListItemLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  justifyContent: "center",
  width: "100%",
  color: "$fontPrimary",
});

const IconLayout = styled("div", {
  display: "flex",
  width: "120px",
  height: "150px",
  color: "$specialSecondary",
});

const TitleLayout = styled("div", {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
});

const DescriptionLayout = styled("div", {
  fontSize: "1.5rem",
  marginBottom: "1rem",
  textAlign: "center",
});

export const GeneralListItem: React.FC<Props> = ({
  title,
  href,
  buttonText,
  description,
  icon,
}) => {
  const router = useRouter();
  const Icon = icon;
  return (
    <>
      <GeneralListItemLayout>
        <IconLayout>
          <Icon />
        </IconLayout>
        <TitleLayout>{title}</TitleLayout>
        <DescriptionLayout>{description}</DescriptionLayout>
        <Button
          backgroundColor={"primary"}
          color={"primary"}
          onClick={() => {
            router.push(href);
          }}
        >
          {buttonText}
        </Button>
      </GeneralListItemLayout>
    </>
  );
};
