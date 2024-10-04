import { useAuthState } from "../context/AuthProvider";
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setProfile, setIsLoggedIn } = useAuthState();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      if (email && password) {
        try {
          const response = await axios.post("/auth/login", {
            username: email,
            password,
          });
          // console.log(response.data);
          localStorage.setItem("profile", JSON.stringify(response.data.data));
          setProfile(response.data.data);
          setIsLoggedIn(true);
          setError("");
          navigate("/", { replace: true });
        } catch (error: any) {
          console.log(error);
          let errorMessage = error.response.data.error;
          if (error instanceof Error) {
            errorMessage = errorMessage ? errorMessage : error.message;
          }
          setError(errorMessage);
        }
      } else {
        setError("Please enter both username and password");
      }
    },
    [setProfile, setIsLoggedIn, navigate]
  );

  return {
    password,
    setPassword,
    error,
    setError,
    handleLogin,
    username,
    setUsername,
  };
};
