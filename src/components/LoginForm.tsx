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
    console.log(data);
  }

  return (
    <header className={"col-span-5 row-span-1" + (isSuccess? ' b':' a')}>
      <form>
        <label htmlFor="email">
          <input type="email" name="email" id="email"></input>
        </label>
        <label htmlFor="password">
          <input type="password" name="password" id="password"></input>
        </label>
        <button type="submit" onClick={ (e)=> {handleLogin(e)}}>Login</button>
        <span>{isSuccess ? `${data.username}` : ""}</span>
      </form>
    </header>
  )
}