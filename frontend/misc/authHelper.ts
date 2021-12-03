import cookie from "js-cookie";

export async function getAccessToken(): Promise<string> {
  if (cookie.get("accessToken")) {
    return cookie.get("accessToken");
  } else if (cookie.get("refreshToken")) {
    return await refreshAccessToken(cookie.get("refreshToken"));
  } else {
    return "";
  }
}

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const accessTokenResponse = await fetch("localhost:8888/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });
  const responseJson = await accessTokenResponse.json();
  if (responseJson.accessToken) {
    cookie.set("accessToken", responseJson.accessToken, {
      expires: 1 / 96,
    });
    return responseJson.accessToken;
  } else {
    return "";
  }
}
