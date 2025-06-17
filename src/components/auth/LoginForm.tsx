import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/api/axios";
import { showErrorToast, showSuccessToast } from "@/utils/toast"; // import reusable toasts
import { fetchAndStoreWallet } from "@/hooks/useFetchWallet";

type Props = {
  onNext: () => void;
};

const LoginForm: React.FC<Props> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = response.data;

      // Save tokens to localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      // ✅ Fetch and store wallet
      await fetchAndStoreWallet();
      showSuccessToast("Login successful!");
      onNext();
    } catch (err: any) {
      showErrorToast(
        err.response?.data?.message || "Login failed. Please try again."
      );
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
          className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative flex items-center">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 text-sm text-gray-600 focus:outline-none"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
