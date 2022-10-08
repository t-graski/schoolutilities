import { getAccessToken } from "../authHelper";

export async function fetchData(url: string, method: string, statusCode: number, body?: any) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${url}`,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (response.status !== statusCode) {
    throw new Error(getErrorMessage(response));
  }

  const responseBody = await response.json();

  return responseBody.data;
}

export function getErrorMessage(error) {
  return `Error (${error.status}): ${error.message}`;
}