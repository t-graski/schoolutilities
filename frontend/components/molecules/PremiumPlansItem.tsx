import React from "react";
import { styled } from "../../stitches.config";
import { Button } from "../atoms/Button";
import SvgCheck from "../atoms/svg/SvgCheck";
import SvgClose from "../atoms/svg/SvgClose";
import SvgOffer from "../atoms/svg/SvgOffer";

type Props = {
  name: string;
  highlighted: boolean;
  priceForValueGood: boolean;
  onClick: () => void;
  price: string;
  benefits: {
    name: string;
    included: boolean;
  }[];
};

const PlanLayout = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  borderRadius: "40px",
  padding: "20px",

  backgroundColor: "$surface2",
  color: "$onSurface",

  variants: {
    highlighted: {
      true: {
        border: "$warning solid 5px",
      },
      false: {},
    },
  },
});

const PlanName = styled("span", {
  padding: "7px 30px",
  borderRadius: "50000px",
  margin: "0 auto",

  fontSize: "1.2rem",
  fontWeight: "500",

  variants: {
    highlighted: {
      true: {
        backgroundColor: "$secondary",
        color: "$onSecondary",
      },
      false: {
        backgroundColor: "$secondaryContainer",
        color: "$onSecondaryContainer",
      },
    },
  },
});

const PlanPrice = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "7px",
  padding: "10px 0",
});

const PlanPriceNumber = styled("span", {
  fontSize: "2.5rem",
  fontWeight: "500",
  lineHeight: "2.5rem",
});

const PlanPriceAddon = styled("span", {
  alignSelf: "flex-end",

  fontSize: "1rem",
  fontWeight: "500",
});

const PlanBenefits = styled("ul", {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
  justifyContent: "center",
  alignItems: "left",
  padding: "10px 40px",
  listStyle: "none",
});

const PlanBenefit = styled("li", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",

  variants: {
    included: {
      true: {},
      false: {},
    },
  },
});

const PlanButtonText = styled("span", {});

const ButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  justifyContent: "center",
});

const PlanGoodValueIcon = styled("div", {
  display: "flex",
  width: "20px",
  height: "20px",

  color: "#DB8A8A",
});

const PlanBenefitIconLayout = styled("div", {
  display: "flex",
  width: "30px",
  height: "30px",
  padding: "9px",
  borderRadius: "50%",

  backgroundColor: "$surface",

  variants: {
    included: {
      true: {
        color: "#B8D8B8",
      },
      false: {
        color: "#DB8A8A",
      },
    },
  },
});

export const PremiumPlansItem: React.FC<Props> = ({
  name,
  highlighted,
  priceForValueGood,
  onClick,
  price,
  benefits,
}) => {
  return (
    <>
      <PlanLayout highlighted={highlighted}>
        <PlanName highlighted={highlighted}>{name}</PlanName>
        <PlanPrice>
          {priceForValueGood && (
            <PlanGoodValueIcon>
              <SvgOffer></SvgOffer>
            </PlanGoodValueIcon>
          )}
          <PlanPriceNumber>{price}</PlanPriceNumber>
          <PlanPriceAddon>/month</PlanPriceAddon>
        </PlanPrice>
        <PlanBenefits>
          {benefits.map((benefit, index) => (
            <PlanBenefit key={index} included={benefit.included}>
              <PlanBenefitIconLayout included={benefit.included}>
                {benefit.included ? (
                  <SvgCheck></SvgCheck>
                ) : (
                  <SvgClose></SvgClose>
                )}
              </PlanBenefitIconLayout>
              {benefit.name}
            </PlanBenefit>
          ))}
        </PlanBenefits>
        <ButtonLayout>
          <Button onClick={onClick} backgroundColor="primary" color="primary">
            <PlanButtonText>CHOOSE</PlanButtonText>
          </Button>
        </ButtonLayout>
      </PlanLayout>
    </>
  );
};
