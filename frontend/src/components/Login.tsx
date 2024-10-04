import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    setError,
    handleLogin,
  } = useLogin();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      await handleLogin(username, password);
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 md:justify-center">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2"></div>
            <Link
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
              to="/register"
              //   prefetch={false}
            >
              Register
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg sm:px-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Login to account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter your username and password below to login to your account
              </p>
            </div>
            <form onSubmit={handleEmailLogin} className="mb-0 space-y-6">
              <div>
                <Input
                  id="username"
                  placeholder="Name@e123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-[#1ebd39] hover:bg-[#0dcb06] text-white "
                >
                  Sign In with Username
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="relative"></div>
            </form>
            <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
              By clicking continue, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
