import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  profile: {
    name: string;
    username: string;
    id: string;
    token: string;
  };
  setProfile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      username: string;
      id: string;
      token: string;
    }>
  >;
}
const AuthContext = React.createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  profile: {
    name: "",
    username: "",
    id: "",
    token: "",
  },
  setProfile: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuthState = () => {
  if (!AuthContext) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return React.useContext(AuthContext);
};

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [profile, setProfile] = React.useState(
    JSON.parse(localStorage.getItem("profile") || "{}")
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (profile && profile.token && !isLoggedIn) {
      setIsLoggedIn(true);
      navigate("/");
      // console.log(profile);
    }
  }, [navigate, isLoggedIn, profile]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
