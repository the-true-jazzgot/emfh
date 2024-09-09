import { MouseEvent, useEffect, useState } from "react";
import { useCredentialData, UserCredentials } from "../services/authentification.service";
import { toDosQuery } from "../services/tasks.service";
import { Button } from "./ui_elements/Button";

export function LoginForm() {
  const [ credentials, setCredentials ] = useState<UserCredentials>();
  const { isSuccess, data, status, error } = useCredentialData({password: credentials?.password || "", username: credentials?.username || ""});
  const { refetch } = toDosQuery();

  useEffect(()=>{
    refetch();
  }, [data, status]);

  function handleLogin(e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    e.preventDefault();
    setCredentials({
      username: (document.getElementById("email") as HTMLInputElement).value,
      password: (document.getElementById("password") as HTMLInputElement).value
    });
  }

  function handleLogout() {
    console.log(data);
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
        <p>{status === "error" ? error.message : "Use your Habitica account credentials"}</p>
      </>}
      </form>
    </header>
  )
}
