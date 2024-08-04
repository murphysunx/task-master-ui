import AuthStore from "../auth/stores/authStore";
import { observer } from "mobx-react-lite";

interface HeaderProps {
  auth: AuthStore;
}

export const Header = observer(({ auth }: HeaderProps) => {
  return (
    <div>
      {auth.user && <button data-testid="logout-button">Log Out</button>}
      {!auth.user && <button data-testid="login-button">Log In</button>}
    </div>
  );
});
