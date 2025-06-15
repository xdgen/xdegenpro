import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/api/axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

const registerUser = async (payload: {
  email: string;
  username: string;
  role: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};

const checkUsername = async (username: string) => {
  const response = await axiosInstance.post("/users/check-username", {
    username,
  });
  return response.data; // Assumes API returns { available: boolean }
};

const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reenter, setReenter] = useState("");
  const [role, setRole] = useState("Trader");
  const [showPassword, setShowPassword] = useState(false);
  const [showReenter, setShowReenter] = useState(false);
  const { setUser } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [passwordStrengthError, setPasswordStrengthError] = useState<
    string | null
  >(null);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  useEffect(() => {
    if (!username.trim()) {
      setIsUsernameAvailable(null);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsCheckingUsername(true);
      try {
        const available = await checkUsername(username);
        setIsUsernameAvailable(!available);
      } catch {
        setIsUsernameAvailable(false);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [username]);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrengthError(validatePassword(newPassword));
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser({ email, username, role });
      onSuccess();
    },
    onError: (error: any) => {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    },
  });

  const isLoading = mutation.isPending;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || isUsernameAvailable === false) {
      setError("Username is taken. Please choose another one.");
      return;
    }

    if (password !== reenter) {
      setError("Passwords do not match.");
      return;
    }

    const strengthError = validatePassword(password);
    if (strengthError) {
      setPasswordStrengthError(strengthError);
      setError(null);
      return;
    }

    setError(null);
    setPasswordStrengthError(null);

    mutation.mutate({
      email,
      username,
      role,
      password,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
            {isCheckingUsername && (
              <p className="text-blue-500 text-sm mt-1">
                Checking username availability...
              </p>
            )}
            {isUsernameAvailable === false && (
              <p className="text-red-600 text-sm mt-1">
                Username is taken. Please choose another one.
              </p>
            )}
            {isUsernameAvailable === true && username && (
              <p className="text-green-600 text-sm mt-1">
                Username is available!
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-4 text-sm text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {passwordStrengthError && (
              <p className="text-red-600 text-sm mt-1">
                {passwordStrengthError}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="reenter"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter Password
            </label>
            <div className="relative">
              <input
                id="reenter"
                type={showReenter ? "text" : "password"}
                value={reenter}
                onChange={(e) => setReenter(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowReenter((prev) => !prev)}
                className="absolute right-2 top-4 text-sm text-gray-600 focus:outline-none"
              >
                {showReenter ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="Trader">Trader</option>
              <option value="Investor">Investor</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={
              isLoading ||
              !!passwordStrengthError ||
              isCheckingUsername ||
              isUsernameAvailable === false ||
              !username
            }
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

