import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRegister } from "../hooks/useRegister";

export default function Register() {
  const {
    confirmPassword,
    error,
    handleRegister,
    password,
    name,
    setName,
    setConfirmPassword,
    setError,
    setPassword,
    setUsername,
    username,
  } = useRegister();

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && name && confirmPassword) {
      handleRegister(name, username, password, confirmPassword);
    } else {
      setError("Please enter all fields.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500 sm:justify-center">
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2"></div>
            <Link
              className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-100"
              to="/login"
              // prefetch={false}
            >
              Login
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow rounded-lg sm:px-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create an account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter your details below to create your account
              </p>
            </div>
            <form onSubmit={handleEmailLogin} className="mb-0 space-y-6">
              <div>
                <Input
                  id="name"
                  placeholder="John doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <Input
                  id="email"
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
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <Input
                  id="confirm_password"
                  type="password"
                  autoComplete="password"
                  placeholder="Confirm-Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="dark:bg-gray-700 dark:text-gray-100"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-[#1ebd39] hover:bg-[#0dcb06] text-white "
                >
                  Register
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

// function GaugeIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m12 14 4-4" />
//       <path d="M3.34 19a10 10 0 1 1 17.32 0" />
//     </svg>
//   );
// }
