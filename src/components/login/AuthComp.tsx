import { AuthContext } from "./lib/authentication";
import { AuthData } from "@/types";
import { useContext } from "react";
import { Button } from "../ui/Button";

export function AuthComp({logoutFn}:{logoutFn: ()=>void}){
  const authContext = useContext<AuthData | undefined>(AuthContext);

  return (
    <>
      <span className="font-bold mx-4">{!!authContext && authContext.username}</span>
      <Button text={"Logout"} fn={logoutFn} type="reset"/>
    </>
  );
}