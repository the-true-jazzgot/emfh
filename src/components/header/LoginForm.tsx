import { Button } from "../ui/Button";
import { updateCredentials } from "../../lib/hooks/use-auth-data";
import { MouseEvent } from "react";
import { UserCredentials } from "@/lib/types";

export function LoginForm() {
  function handleLogin(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    updateCredentials({
      username: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value
    } as UserCredentials);
  }

  return (
    <form>
      <label htmlFor="email">
        <input type="email" name="email" id="email"></input>
      </label>  
      <label htmlFor="password">
        <input type="password" name="password" id="password"></input>
      </label>
      <Button text="Submit" fn={(e)=> {handleLogin(e)}} type="submit" />
    </form>
  )
}
