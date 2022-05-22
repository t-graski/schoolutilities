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
    throw new Error(formatErrorMessage(response));
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
    throw new Error(formatErrorMessage(response));
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
    throw new Error(formatErrorMessage(response));
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
    throw new Error(formatErrorMessage(response));
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
    throw new Error(formatErrorMessage(response));
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
    throw new Error(formatErrorMessage(response));
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
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function addSchoolClass(data) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/class`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function deleteSchoolClass(classUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/class`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ classUUID }),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function editSchoolClass(data) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/class`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function addDepartment(data) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/department`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function deleteDepartment(departmentUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/department`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ departmentUUID }),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function editDepartment(data) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/department`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function deleteSchoolPerson(data) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/leaveSchool`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function editSchoolPerson(data) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/role`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function fetchSchoolJoinCodes(schoolUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinCode/${schoolUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function addSchoolJoinCode(data) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinCode`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function deleteJoinCode(joinCode) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinCode`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ joinCode }),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function editJoinCode(data) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/schooladmin/joinCode`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

function formatErrorMessage(error) {
  return `Error ${error.status} - ${error.statusText}`;
}

export async function fetchSubmissions(submissionUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/submissions/${submissionUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}

export async function fetchCourseElement(courseElementUUID) {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/course/element/${courseElementUUID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(formatErrorMessage(response));
  }

  return response.json();
}
