import { getAccessToken } from "./authHelper";

export async function fetchSchools() {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getSchools`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function fetchCourses(schoolUUID) {
  let accessToken = await getAccessToken();
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getCourses/${schoolUUID}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function fetchCourse(courseUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/getCourseInfo/${courseUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  for (let key in data) {
    return data[key];
  }

  throw new Error("No course found");
}

export async function fetchCourseContent(courseUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/courseElements/${courseUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function fetchSchoolClasses(schoolUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/classes/${schoolUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function fetchSchoolPersons(schoolUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/getPersons/${schoolUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function fetchSchoolDepartments(schoolUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/departments/${schoolUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return response.json();
}