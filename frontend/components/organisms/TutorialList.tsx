import { styled } from "@stitches/react";
import React from "react";
import { TutorialListItem, TutorialListItemProps } from "../molecules/TutorialListItem";

type Props = {
    tutorials: TutorialListItemProps[];
};

const TutorialListLayout = styled("div", {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: "50px",
});

export const TutorialList: React.FC<Props> = ({ tutorials }) => {
    return (
        <>
            <TutorialListLayout>
                {tutorials.map((tutorial, index) => (
                    <TutorialListItem key={index} {...tutorial} />
                ))}
            </TutorialListLayout>
        </>
    );
};
