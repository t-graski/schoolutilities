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

export const CourseEditContent: React.FC<Props> = ({
  courseId,
  items,
  setItems,
}) => {
  const router = useRouter();

  console.log(items);

  const requestBody = {
    courseUUID: courseId,
    elements: [],
  };
  const [deletedItems, setDeletedItems] = useState([]);
  items.forEach((item) => {
    requestBody.elements.push(mapElementOptions(item));
  });
  console.log(deletedItems);
  requestBody.elements.push(...addDeletedTag(deletedItems));
  console.log(requestBody);

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
              console.log(items);
              console.log(config);
              setItems((items) => {
                return items.map((currentItem) => {
                  if (currentItem.id === item.id) {
                    return {
                      id: item.id,
                      config: { ...config, choosenElement },
                      children: currentItem.children,
                    };
                  }
                  return currentItem;
                });
              });
            }}
            deleteEntry={() => {
              setItems((items) => {
                return items.filter((currentItem) => {
                  if (currentItem.id === item.id) {
                    setDeletedItems((deletedItems) => [
                      ...deletedItems,
                      currentItem,
                    ]);
                  }
                  return currentItem.id !== item.id;
                });
              });
            }}
          ></CourseEditActionButtons>
        </ComponentLayout>
      </>
    );
  };
  return (
    <>
      <Nestable
        items={items}
        renderItem={renderItem}
        maxDepth={2}
        renderCollapseIcon={() => <SvgIcon iconName="SvgAlert" />}
        onChange={(changeEvent) => {
          setItems(changeEvent.items);
        }}
      />
    </>
  );
};

export default CourseEditContent;

function mapElementOptions(element) {
  const { choosenElement, ...elementConfig } = element.config;
  const mappedElement = {
    elementUUID: Number.isNaN(element.id) ? element.id : "",
    options: {
      type: choosenElement.id,
      visible: true,
      ...elementConfig,
    },
    tag: element.tag ? element.tag : "",
    children: [],
  };
  element.children.forEach((child) => {
    mappedElement.children.push(mapElementOptions(child));
  });
  return mappedElement;
}

function addDeletedTag(children) {
  return children.map((child) => {
    if (child.children.length > 0) {
      return {
        ...child,
        tag: "deleted",
        children: addDeletedTag(child.children),
      };
    }
    return {
      ...child,
      tag: "deleted",
    };
  });
}
