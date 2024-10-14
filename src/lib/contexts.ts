import { AuthData } from "@/lib/types";
import { createContext } from "react";

export const AuthContext = createContext<AuthData | undefined>(undefined);