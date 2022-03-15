import React from "react";
import { Item } from "react-nestable";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import "./CourseContent.module.css";
import { styled } from "@stitches/react";
import { elementsToChoose } from "./CourseComponentDetailViews";

type Props = {
  items: Item[];
};

const ComponentLayout = styled("div", {
  padding: "10px 20px",
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  flexDirection: "row",
});

const ElementsLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "30px",
});

const ChildElement = styled("div", {
  width: "100%",
  paddingLeft: "50px",
});

const ParentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  border: "solid 1px $fontPrimary",
  borderRadius: "15px",
  padding: "10px 20px",
});

export const CourseContent: React.FC<Props> = ({
  items,
}) => {
  return (
    <>
      <ElementsLayout>
        {items.map((element) => {
          return <Content item={mapElementOptions(element)}></Content>;
        })}
      </ElementsLayout>
    </>
  );
};

export default CourseContent;

function mapElementOptions(element) {
  const { type, visible, ...elementConfig } = element.options;
  const mappedElement = {
    id: element.elementUUID,
    config: {
      ...elementConfig,
      choosenElement: elementsToChoose.find(
        (e) => e.id === element.options.type
      ),
    },
    children: [],
  };
  if (element.children) {
    element.children.forEach((child) => {
      mappedElement.children.push(mapElementOptions(child));
    });
  }
  return mappedElement;
}

function Content({ item }) {
  const { choosenElement, ...additionalProps } = item.config;
  const Component = choosenElement.component;
  if (item.children.length > 0) {
    return (
      <>
        <ParentContainer>
          <ComponentLayout>
            <Component
              {...additionalProps}
              {...choosenElement.props}
            ></Component>
          </ComponentLayout>
          <ChildElement>
            {item.children.map((child) => (
              <Content item={child}></Content>
            ))}
          </ChildElement>
        </ParentContainer>
      </>
    );
  } else {
    return (
      <>
        <ComponentLayout>
          <Component {...additionalProps} {...choosenElement.props}></Component>
        </ComponentLayout>
      </>
    );
  }
}
