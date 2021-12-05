import React from "react";
import { styled } from "../stitches.config";
import Image from "next/image";
import { SvgIcon } from "./SvgIcon";

type Props = {
  editFunction: Function;
  deleteFunction: Function;
};

const SettingsEntryLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  width: "100%",
  alignItems: "center",
  padding: "20px",
  justifyContent: "space-between",
  backgroundColor: "$backgroundTertiary",
  borderRadius: "20px",
});

const SettingsEntryIcons = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

const SettingsEntryEditIcon = styled("div", {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialSecondary",
  cursor: "pointer",
});

const SettingsEntryDeleteIcon = styled("div", {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$specialTertiary",
  cursor: "pointer",
  padding: "10px",
  color: "$fontPrimary",
});

export const SettingsEntry: React.FC<Props> = ({
  children,
  editFunction,
  deleteFunction,
}) => {
  return (
    <>
      <SettingsEntryLayout>
        <div>{children}</div>
        <SettingsEntryIcons>
          <SettingsEntryEditIcon
            onClick={() => {
              editFunction();
            }}
          >
            <Image
              src="/images/icons/edit_icon.svg"
              alt=""
              width={20}
              height={20}
            />
          </SettingsEntryEditIcon>
          <SettingsEntryDeleteIcon
            onClick={() => {
              deleteFunction();
            }}
          >
            <SvgIcon iconName="SvgDelete"></SvgIcon>
          </SettingsEntryDeleteIcon>
        </SettingsEntryIcons>
      </SettingsEntryLayout>
    </>
  );
};
