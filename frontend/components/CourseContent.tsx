import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nestable, { Item } from "react-nestable";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import "./CourseContent.module.css";
import { SvgIcon } from "./SvgIcon";
import { Headline } from "./Headline";
import { styled } from "@stitches/react";
import CourseEditActionButtons from "./CourseEditActionButtons";

type Props = {
  courseId: string;
  items: Item[];
  setItems: Function;
};

const ComponentLayout = styled("div", {
  border: "1px solid $fontPrimary",
  padding: "10px 20px",
  borderRadius: "15px",
  cursor: "pointer",
  backgroundColor: "$backgroundPrimary",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  flexDirection: "row",
});

export const CourseContent: React.FC<Props> = ({
  courseId,
  items,
  setItems,
}) => {
  const router = useRouter();

  const renderItem = ({ item }) => {
    const { choosenElement, ...additionalProps } = item.config;
    const Component = choosenElement.component;

    return (
      <>
        <ComponentLayout>
          <Component {...additionalProps} {...choosenElement.props}></Component>
          <CourseEditActionButtons
            item={item}
            safeEntry={(choosenElement, config) => {
              setItems((items) => {
                const newItems = items.map((currentItem) => {
                  if (currentItem.id === item.id) {
                    return {
                      id: item.id,
                      config: { ...config, choosenElement },
                    };
                  }
                  return item;
                });
                return newItems;
              });
              console.log(choosenElement);
            }}
            deleteEntry={() => {
              setItems((items) => {
                const newItems = items.filter((currentItem) => currentItem.id !== item.id);
                return newItems;
              });
            }}
          ></CourseEditActionButtons>
        </ComponentLayout>
      </>
    );
  };
  console.log(items);
  return (
    <>
      <Nestable
        items={items}
        renderItem={renderItem}
        maxDepth={3}
        renderCollapseIcon={() => <SvgIcon iconName="SvgAlert" />}
        onChange={(changeEvent) => {
          setItems(changeEvent.items);
        }}
      />
    </>
  );
};

export default CourseContent;
