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
    `https://backend.schoolutilities.net/api/auth/refresh`,
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
      `https://backend.schoolutilities.net/api/user/profile`,
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

export function logout() {
  cookie.remove("accessToken");
  cookie.remove("refreshToken");
  cookie.remove("userProfile");
}

export function calculatePasswordStrengthIndex(password) {
  let score = 0;
  if (!password) {
    return score;
  }

  // award every unique letter until 5 repetitions
  var letters = new Object();
  for (var i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // bonus points for mixing it up
  var variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password),
  };

  let variationCount = 0;
  for (var check in variations) {
    variationCount += variations[check] == true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  if (score > 100) {
    score = 100;
  }

  return score;
}
