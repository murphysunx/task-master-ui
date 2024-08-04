import { IUser } from "../interfaces/user";

export const LOGOUT_ENDPOINT = "http://localhost:3000/logout";

export default async function logout(user: IUser) {
  const response = await fetch(LOGOUT_ENDPOINT, {
    method: "post",
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("logout fail");
  }
  return;
}
