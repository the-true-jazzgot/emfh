import { MouseEvent, useContext } from "react";
import { AuthContext } from "@/components/login/lib/authentication"
import { Button } from "../ui/Button";
import { AuthComp } from "./AuthComp";
import { AuthData } from "@/types";
import { updateCredentials } from "./lib/use-auth-data";

export function LoginForm() {
  const authContext = useContext<AuthData | undefined>(AuthContext);

  function handleLogin(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    updateCredentials({
      username: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value
    });
  }

  function handleLogout():void {
    window.sessionStorage.removeItem("emfh_login");
    updateCredentials({username: "", password:""});
  }

  return (
    <header className={"col-span-5 row-span-1"}>
      {!authContext && 
        <form>
          <label htmlFor="email">
            <input type="email" name="email" id="email"></input>
          </label>  
          <label htmlFor="password">
            <input type="password" name="password" id="password"></input>
          </label>
          <Button text="Submit" fn={(e)=> {handleLogin(e)}} type="submit" />
        </form>
      }
      {!!authContext && <AuthComp logoutFn={handleLogout} />}
    </header>
  )
}
