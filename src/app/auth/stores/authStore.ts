import login from "../apis/login";
import logout from "../apis/logout";
import { IUser } from "../interfaces/user";

export default class AuthStore {
  private currentUser: IUser | null;

  constructor() {
    this.currentUser = null;
  }

  async login(email: string, password: string): Promise<IUser> {
    if (!this.currentUser) {
      const user = await login(email, password);
      this.currentUser = user;
      return user;
    } else {
      throw new Error("already logged in");
    }
  }

  async logout(): Promise<void> {
    if (this.currentUser) {
      await logout(this.currentUser);
      this.currentUser = null;
    } else {
      throw new Error("no user logged in");
    }
  }

  get user(): IUser | null {
    return this.currentUser;
  }
}
