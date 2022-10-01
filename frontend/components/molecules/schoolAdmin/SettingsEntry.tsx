import React from "react";
import { styled } from "../../../stitches.config";
import Image from "next/image";
import SvgDelete from "../../atoms/svg/SvgDelete";

type Props = {
  editFunction?: Function;
  deleteFunction: Function;
  highlighted?: boolean;
};

const SettingsEntryLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  width: "100%",
  alignItems: "center",
  padding: "20px",
  justifyContent: "space-between",
  backgroundColor: "$neutral-300",
  borderRadius: "20px",
  variants: {
    highlighted: {
      true: {
        border: "4px solid $warning",
      },
      false: {},
    },
  },
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
  backgroundColor: "$primary-400",
  cursor: "pointer",
});

const SettingsEntryDeleteIcon = styled("div", {
  display: "flex",
  width: "40px",
  height: "40px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  backgroundColor: "$error",
  cursor: "pointer",
  padding: "10px",
  color: "$neutral-500",
});

export const SettingsEntry: React.FC<Props> = ({
  children,
  editFunction,
  deleteFunction,
  highlighted = false,
}) => {
  return (
    <>
      <SettingsEntryLayout highlighted={highlighted}>
        <div>{children}</div>
        <SettingsEntryIcons>
          {editFunction && (
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
          )}
          <SettingsEntryDeleteIcon
            onClick={() => {
              deleteFunction();
            }}
          >
            <SvgDelete />
          </SettingsEntryDeleteIcon>
        </SettingsEntryIcons>
      </SettingsEntryLayout>
    </>
  );
};
