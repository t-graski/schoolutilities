import { styled } from "@stitches/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../misc/authHelper";
import { Button } from "../../atoms/Button";
import { Separator } from "../../atoms/Separator";
import { InputField } from "../../atoms/InputField";
import { MarkdownEditor } from "../cockpit/MarkdownEditor";

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

export const ArticleEdit: React.FC<Props> = ({}) => {
  const [title, setTitle] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const articleUUID = router.query.articleUUID;

  useEffect(() => {
    getContent();
  }, [articleUUID]);

  const getContent = async () => {
    let accessToken = await getAccessToken();
    if (accessToken && articleUUID) {
      const getRequest = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/article/${articleUUID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const getResponse = await getRequest.json();
      setTitle(getResponse.headline);
      setCatchPhrase(getResponse.catchPhrase);
      setContent(getResponse.content);
    }
  };

  const saveContent = async () => {
    let accessToken = await getAccessToken();
    if (accessToken) {
      const saveRequest = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            articleUUID,
            headline: title,
            catchPhrase,
            content,
            type: 1,
            isPublic: true,
          }),
        }
      );
      const saveResponse = await saveRequest.json();
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
        value={title}
      ></InputField>
      <InputField
        inputType={"textfield"}
        onChange={setCatchPhrase}
        iconName={""}
        label={"Beschreibung"}
        value={catchPhrase}
      ></InputField>
      <MarkdownEditor saveContent={setContent} value={content}></MarkdownEditor>
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
