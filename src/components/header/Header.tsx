import { useContext } from "react";
import { AuthContext } from "@/components/header/lib/authentication"
import { AuthComp } from "./AuthComp";
import { AuthData } from "@/types";
import { LoginForm } from "./LoginForm";

export function Header() {
  const authContext = useContext<AuthData | undefined>(AuthContext);

  return (
    <header className={"col-span-5 row-span-1"}>
      {!authContext && <LoginForm />}
      {!!authContext && <AuthComp />}
    </header>
  )
}
