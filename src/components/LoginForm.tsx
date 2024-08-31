import { MouseEvent } from "react";
import { useCredentialData } from "../services/authentification.service";
import { toDosQuery } from "../services/todos.service";
import { useQueryClient } from "@tanstack/react-query";

export function LoginForm() {
  const { mutate, isSuccess, data, status } = useCredentialData();
  const { refetch, data:elo } = toDosQuery();
  const queryClient = useQueryClient();

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
        <button type="reset" className="p-2 px-4 text-white bg-green-900 rounded-full" onClick={ ()=> {handleLogout()}}>Logout</button>
      </>:<>
        <label htmlFor="email">
          <input type="email" name="email" id="email"></input>
        </label>  
        <label htmlFor="password">
          <input type="password" name="password" id="password"></input>
        </label>
        <button type="submit" className="p-2 px-4 text-white bg-green-900 rounded-full" onClick={ (e)=> {handleLogin(e)}}>Login</button>
      </>}
      </form>
    </header>
  )
}
