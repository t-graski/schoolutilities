import React from "react";
import { styled } from "../../stitches.config";
import { PremiumPlansItem } from "../molecules/PremiumPlansItem";

type Props = {};

const PlansLayout = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "20px",
  padding: "20px 0",
  width: "100%",
  margin: "0 auto",
  justifyContent: "center",
  alignItems: "center",
});

export const PremiumPlansList: React.FC<Props> = ({}) => {
  return (
    <>
      <PlansLayout>
        <PremiumPlansItem
          name="Basic Plan"
          highlighted={false}
          priceForValueGood={false}
          onClick={() => {}}
          price="0€"
          benefits={[
            { name: "1 user", included: true },
            { name: "storage", included: false },
            { name: "translation", included: false },
          ]}
        ></PremiumPlansItem>
        <PremiumPlansItem
          name="Popular Plan"
          highlighted={true}
          priceForValueGood={true}
          onClick={() => {}}
          price="3.99€"
          benefits={[
            { name: "1 user", included: true },
            { name: "storage", included: true },
            { name: "translation", included: false },
          ]}
        ></PremiumPlansItem>
        <PremiumPlansItem
          name="Premium Plan"
          highlighted={false}
          priceForValueGood={false}
          onClick={() => {}}
          price="7.99€"
          benefits={[
            { name: "1 user", included: true },
            { name: "storage", included: true },
            { name: "translation", included: true },
          ]}
        ></PremiumPlansItem>
      </PlansLayout>
    </>
  );
};
