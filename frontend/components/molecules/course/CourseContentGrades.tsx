import React from "react";
import { Item } from "react-nestable";

// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import { styled } from "@stitches/react";
import { elementsToChoose } from "../../atoms/course/CourseComponentDetailViews";

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

export const CourseContentGrades: React.FC<Props> = ({ items }) => {
  const mappedItems = items.map((item) => mapElementOptions(item));
  let grades = calculateGrades(mappedItems);
  let weightSum = calculateWeightSum(grades.items);
  grades.grade = grades.items.reduce((acc, item) => {
    return acc + item.grade / weightSum;
  }, 0);
  console.log(grades);
  return (
    <>
      <ElementsLayout>
        {grades.items.map((element, index) => {
          return <Content item={element} key={index}></Content>;
        })}
        Overall: {formatGrade(grades.grade)}
      </ElementsLayout>
    </>
  );
};

export default CourseContentGrades;

function mapElementOptions(element) {
  const { type, visible, ...elementConfig } = element.options;
  const mappedElement = {
    id: element.elementUUID,
    config: {
      ...elementConfig,
      elementUUID: element.elementUUID,
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
    console.log(item);
    return (
      <>
        <ParentContainer>
          <ComponentLayout>
            <Component
              {...additionalProps}
              {...choosenElement.props}
            ></Component>
            {formatWeightAsPercentage(item.config.weight)} /{" "}
            {item.grade
              ? formatGrade(item.grade)
              : formatGrade(item.config.grade)}
          </ComponentLayout>
          <ChildElement>
            {item.children.map((child, index) => (
              <Content item={child} key={index}></Content>
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
          {item.config.grade < 0
            ? "0%"
            : formatWeightAsPercentage(item.config.weight)}{" "}
          / {item.config.grade < 0 ? "Not graded" : item.config.grade}
        </ComponentLayout>
      </>
    );
  }
}

function calculateGrades(items) {
  let grades = 0;
  let weightSum = calculateWeightSum(items);
  console.log(weightSum);
  items = items.map((item) => {
    if (item.children && item.children.length > 0) {
      item.config.weight = item.config.weight / weightSum;
      return {
        ...item,
        grade: calculateGrades(item.children).grade,
      };
    } else {
      item.config.weight = item.config.weight / weightSum;
      grades +=
        item.config.grade < 0 ? 0 : item.config.grade * item.config.weight;
      return item;
    }
  });

  return {
    items,
    grade: grades,
  };
}

function calculateWeightSum(items) {
  let weightSum = items.reduce((acc, item) => {
    if (item.config.grade == "" || item.config.grade < 0) {
      return acc;
    }
    return acc + item.config.weight;
  }, 0);
  return weightSum;
}

function formatGrade(grade) {
  return grade.toFixed(2);
}

function formatWeightAsPercentage(weight) {
  return (weight * 100).toFixed(2) + "%";
}
