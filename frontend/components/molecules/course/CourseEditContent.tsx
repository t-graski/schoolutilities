import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nestable, { Item } from "react-nestable";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import { SvgIcon } from "../../atoms/SvgIcon";
import { styled } from "@stitches/react";
import CourseEditActionButtons from "./CourseEditActionButtons";
import { elementsToChoose } from "../../atoms/CourseComponentDetailViews";
import { getAccessToken } from "../../../misc/authHelper";

type Props = {
  courseId: string;
  items: Item[];
  setItems: Function;
  setResponseBody: Function;
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
  setResponseBody,
}) => {
  console.log(courseId);
  const router = useRouter();

  console.log(items);
  const [deletedItems, setDeletedItems] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState(true);

  if (isFirstTime && courseId) {
    updateElements();
    setIsFirstTime(false);
  }

  async function updateElements() {
    console.log(courseId);
    let accessToken = await getAccessToken();
    const elementsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/courseElements/${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (elementsResponse) {
      if (elementsResponse.status == 200) {
        const courseData = await elementsResponse.json();
        console.log(courseData);
        const newElements = [];
        courseData.forEach((element) => {
          newElements.push(mapElementOptionsToFrontend(element));
        });
        setItems(newElements);
      } else {
      }
    }
  }

  useEffect(() => {
    updateResponseBody();
  }, [items]);

  function updateResponseBody() {
    const requestBody = {
      courseUUID: courseId,
      elements: [],
    };
    items.forEach((item) => {
      requestBody.elements.push(mapElementOptions(item));
    });
    requestBody.elements.push(...addDeletedTag(deletedItems));
    setResponseBody(requestBody);
  }

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
                  const childElement = currentItem.children.find(
                    (child) => child.id === item.id
                  );
                  if (currentItem.id === item.id) {
                    return {
                      id: item.id,
                      config: { ...config, choosenElement },
                      children: currentItem.children,
                    };
                  } else if (childElement) {
                    return {
                      ...currentItem,
                      children: currentItem.children.map((child) => {
                        if (child.id === item.id) {
                          return {
                            ...child,
                            config: { ...config, choosenElement },
                          };
                        } else {
                          return child;
                        }
                      }),
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
                      mapElementOptions(currentItem),
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
    elementUUID: typeof element.id == "string" ? element.id : "",
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

function mapElementOptionsToFrontend(element) {
  console.log(element);
  const { type, visible, ...elementConfig } = element.options;
  console.log(element);
  let choosenElement = elementsToChoose.find((e) => e.id === type);
  const mappedElement = {
    id: element.elementUUID,
    config: {
      ...elementConfig,
      choosenElement,
    },
    children: [],
  };
  if (element.children) {
    element.children.forEach((child) => {
      console.log(child);
      mappedElement.children.push(mapElementOptionsToFrontend(child));
    });
  }
  console.log(mappedElement);
  return mappedElement;
}
