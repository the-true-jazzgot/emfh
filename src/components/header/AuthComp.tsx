import { AuthContext } from "./lib/authentication";
import { AuthData } from "@/types";
import { useContext } from "react";
import { Button } from "../ui/Button";
import { updateCredentials } from "./lib/use-auth-data";

export function AuthComp(){
  const authContext = useContext<AuthData | undefined>(AuthContext);

  function handleLogout():void {
    window.sessionStorage.removeItem("emfh_login");
    updateCredentials({username: "", password:""});
  }

  return (
    <>
      <span className="font-bold mx-4">{!!authContext && authContext.username}</span>
      <Button text={"Logout"} fn={handleLogout} type="reset"/>
    </>
  );
}