import { MouseEvent } from "react";
import { useCredentialData } from "../services/authentification.service";
import { toDosQuery } from "../services/tasks.service";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui_elements/Button";

export function LoginForm() {
  const { mutate, isSuccess, data, status } = useCredentialData();
  const { refetch, data:elo } = toDosQuery();
  const queryClient = useQueryClient(); //handle logout

  function handleLogin(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    mutate({
      username: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value
    });
    refetch();
  }

  function handleLogout() {
    console.log(data);
    console.log(elo);
  }

  return (
    <header className={"col-span-5 row-span-1" + (isSuccess? ' b':' a')}>
      <form className={isSuccess ? "js-loggedIn" : "js-anonymous"}>
      {status === "success" ? <>
        <span className="font-bold mx-4">{data.username}</span>
        <Button text={"Logout"} fn={handleLogout} type="reset"/>
      </>:<>
        <label htmlFor="email">
          <input type="email" name="email" id="email"></input>
        </label>  
        <label htmlFor="password">
          <input type="password" name="password" id="password"></input>
        </label>
        <Button text="Submit" fn={(e)=> {handleLogin(e)}} type="submit" />
      </>}
      </form>
    </header>
  )
}
