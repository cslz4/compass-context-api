import { createContext, useState } from "react";

type User = {
  name: string
}

type AuthContextData = {
  user: User | null
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null)

  const signIn = () => {
    setUser({name: "Carlos"})
  }

  const signOut = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{user, signIn, signOut}}>{children}</AuthContext.Provider>
}
