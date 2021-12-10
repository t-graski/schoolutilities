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
  const accessTokenResponse = await fetch(
    "http://localhost:8888/api/auth/refresh",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    }
  );
  const responseJson = await accessTokenResponse.json();
  if (responseJson.token) {
    cookie.set("accessToken", responseJson.token, {
      expires: 1 / 96,
    });
    return responseJson.token;
  } else {
    return "";
  }
}

export async function getUserData(): Promise<any> {
  const accessToken = await getAccessToken();
  let userProfile = cookie.get("userProfile");
  if (accessToken && !userProfile) {
    const userDataResponse = await fetch(
      "http://localhost:8888/api/user/profile",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const responseJson = await userDataResponse.json();
    if (responseJson.firstName) {
      cookie.set("userProfile", JSON.stringify(responseJson), {
        expires: 1,
      });
      return responseJson;
    } else {
      return {};
    }
  } else if (userProfile) {
    return JSON.parse(userProfile);
  } else {
    return {};
  }
}
