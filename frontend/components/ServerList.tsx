import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { styled } from "../stitches.config";
import { FeatureOverview, FeatureOverviewProps } from "./FeatureOverview";
import { Separator } from "./Separator";
import cookie from "js-cookie";

type Props = {};

const ServerListLayout = styled("div", {
  width: "100%",
  padding: "0 15vw",
});

export const ServerList: React.FC<Props> = ({}) => {
  const router = useRouter();
  const [serverList, setServerList] = React.useState([]);
  if (cookie.get("access_token")) {
    let token = cookie.get("access_token");
    useEffect(() => {
      fetch(`${process.env.BACKEND_URL}/serverlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((jsonResponse) => {
          setServerList(jsonResponse);
          console.log(jsonResponse);
        });
    }, []);
  } else {
    // router.push("/");
  }

  return (
    <>
      <ServerListLayout></ServerListLayout>
    </>
  );
};
