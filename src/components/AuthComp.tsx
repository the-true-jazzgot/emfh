import { AuthContext, useCredentialData, UserCredentials } from "@/services/authentification.service";
import { AuthData } from "@/types";
import { useContext, useEffect } from "react";
import { Button } from "./ui/Button";

interface AuthCompProps{
  credentials: UserCredentials | undefined,
  setAuthData:React.Dispatch<React.SetStateAction<AuthData | undefined>>,
  logoutFn: () => void
}

export function AuthComp({credentials, setAuthData, logoutFn}:AuthCompProps){
  const { isSuccess, data } = useCredentialData({password: credentials?.password || "", username: credentials?.username || ""});
  const authContext = useContext<AuthData | undefined>(AuthContext);

  useEffect(()=>{
    setAuthData(data);
  }, [isSuccess]);

  return (
    !!authContext && <>
      <span className="font-bold mx-4">{!!authContext && authContext.username}</span>
      <Button text={"Logout"} fn={logoutFn} type="reset"/>
    </>
  );
}