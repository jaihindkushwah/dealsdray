import { useAuthState } from "../context/AuthProvider";
import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setProfile, setIsLoggedIn } = useAuthState();

  const handleRegister = useCallback(
    async (
      name: string,
      username: string,
      password: string,
      confirmPassword: string
    ) => {
      if (name && username && password && confirmPassword) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        try {
          const response = await axios.post("/auth/register", {
            name,
            username,
            password,
          });
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
    handleRegister,
    username,
    setUsername,
    confirmPassword,
    setConfirmPassword,
    name,
    setName,
  };
};
