import { MouseEvent, useContext, useState } from "react";
import { AuthContext, UserCredentials } from "../services/authentification.service";
import { Button } from "./ui/Button";
import { AuthComp } from "./AuthComp";
import { AuthData } from "@/types";

export function LoginForm({setAuthData}:{setAuthData: React.Dispatch<React.SetStateAction<AuthData | undefined>>}) {
  const [credentials, setCredentials] = useState<UserCredentials>();
  const authContext = useContext<AuthData | undefined>(AuthContext);

  function handleLogin(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    setCredentials({
      username: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value
    });
  }

  function handleLogout():void {
    window.sessionStorage.removeItem("emfh");
    setAuthData(undefined);
  }

  return (
    <header className={"col-span-5 row-span-1"}>
      <form>
      {!authContext && <>
        <label htmlFor="email">
          <input type="email" name="email" id="email"></input>
        </label>  
        <label htmlFor="password">
          <input type="password" name="password" id="password"></input>
        </label>
        <Button text="Submit" fn={(e)=> {handleLogin(e)}} type="submit" />
      </>}
      {!!AuthContext && <AuthComp credentials={credentials} setAuthData={setAuthData} logoutFn={handleLogout} />}
      </form>
    </header>
  )
}
