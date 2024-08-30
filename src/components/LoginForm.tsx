import { MouseEvent } from "react";
import { useCredentialData } from "../services/authentification.service";

export function LoginForm() {
  const { mutate, isSuccess, data } = useCredentialData();

  function handleLogin(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    mutate({
      username: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value
    });
  }

  return (
    <header className={"col-span-5 row-span-1" + (isSuccess? ' b':' a')}>
      <form className={isSuccess ? "js-loggedIn" : "js-anonymous"}>
        <label htmlFor="email">
          <input type="email" name="email" id="email"></input>
        </label>
        <label htmlFor="password">
          <input type="password" name="password" id="password"></input>
        </label>
        <button type="submit" className="" onClick={ (e)=> {handleLogin(e)}}>{isSuccess ? "Logout" : "Login"}</button>
        <span>{isSuccess ? `${data.username}` : ""}</span>
      </form>
    </header>
  );
}
