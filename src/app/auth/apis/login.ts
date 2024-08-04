import { IUser } from "../interfaces/user";

export const LOGIN_ENDPOINT = "http://localhost:3003/login";

export default async function login(
  email: string,
  password: string
): Promise<IUser> {
  const response = await fetch(LOGIN_ENDPOINT, {
    method: "post",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("login failed");
  }

  const json: IUser = await response.json();
  return json;
}
