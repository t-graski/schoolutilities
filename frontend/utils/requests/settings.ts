import { fetchData } from "./default";

export async function changePassword(passwordData: {
    oldPassword: string;
    newPassword: string;
}) {
    console.log(passwordData);
    return fetchData("user/changePassword", "POST", 200, passwordData);
}

export async function requestEmailChange(email: string) {
    return fetchData("user/requestEmailChange", "POST", 200, { email });
}