import { MouseEvent } from "react";

export function LoginForm() {
  function handleLogin(e: MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    
  }

  return (
    <form>
      <label htmlFor="email">
        <input type="email" name="email" id="email"></input>
      </label>
      <label htmlFor="password">
        <input type="password" name="password" id="password"></input>
      </label>
      <button type="submit" onClick={ (e)=> {handleLogin(e)}}>Login</button>
    </form>
  )
}