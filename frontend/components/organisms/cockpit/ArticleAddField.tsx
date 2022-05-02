import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getAccessToken } from "../../../misc/authHelper";
import { Button } from "../../atoms/Button";
import { Headline } from "../../atoms/Headline";
import { InputField } from "../../atoms/input/InputField";
import { Separator } from "../../atoms/Separator";
import { Spacer } from "../../atoms/Spacer";
import { SideDashboardBar } from "../SideDashboardBar";
import { MarkdownEditor } from "./MarkdownEditor";

type Props = {};

const ArticleAddFieldLayout = styled("div", {
  display: "flex",
  padding: "40px 0",
  flexDirection: "column",
  gap: "30px",
});

const CreateHeadline = styled("h1", {
  fontSize: "3rem",
});

const ButtonLayout = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});

export const ArticleAddField: React.FC<Props> = ({}) => {
  const [title, setTitle] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const saveContent = async () => {
    let accessToken = await getAccessToken();
    if (accessToken) {
      const saveRequest = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            headline: title,
            catchPhrase,
            content,
            type: 1,
            isPublic: true,
          }),
        }
      );
      const saveResponse = await saveRequest.json();
      console.log(saveResponse);
      if (saveResponse) {
        router.push("/cockpit/articles");
      }
    }
  };

  return (
    <ArticleAddFieldLayout>
      <div>
        <CreateHeadline>Create new Article</CreateHeadline>
        <Separator width={"small"} alignment={"left"}></Separator>
      </div>
      <InputField
        inputType={"text"}
        onChange={setTitle}
        iconName={""}
        label={"Title"}
      ></InputField>
      <InputField
        inputType={"textfield"}
        onChange={setCatchPhrase}
        iconName={""}
        label={"Beschreibung"}
      ></InputField>
      <MarkdownEditor saveContent={setContent} value=""></MarkdownEditor>
      <ButtonLayout>
        <Button
          backgroundColor={"primary"}
          color={"primary"}
          label={"Save"}
          onClick={saveContent}
        ></Button>
        <Button
          backgroundColor={"secondary"}
          color={"primary"}
          label={"Cancel"}
          onClick={() => {
            router.push("/cockpit/articles");
          }}
        ></Button>
      </ButtonLayout>
    </ArticleAddFieldLayout>
  );
};
