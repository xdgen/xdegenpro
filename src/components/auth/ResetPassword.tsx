import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { showErrorToast, showSuccessToast } from "@/utils/toast"; // import reusable toasts

type Props = {
  onNext: () => void;
};

const ResetPassword: React.FC<Props> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<number | undefined>(undefined);
  const [newPassword, setNewPassword] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: async ({
      email,
      code,
      newPassword,
    }: {
      email: string;
      code: number;
      newPassword: string;
    }) => {
      const response = await axiosInstance.post("/auth/password/reset", {
        email,
        code,
        newPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      showSuccessToast("Password reset successfully.");
      onNext();
    },
    onError: (error: any) => {
      showErrorToast(
        error.response?.data?.message ||
          "Password reset failed. Please try again."
      );
    },
  });

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !code || !newPassword) {
      showErrorToast("All fields are required.");
      return;
    }

    mutation.mutate({ email, code, newPassword });
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        Enter the OTP sent to your email and your new password
      </p>

      <input
        type="email"
        value={email}
        disabled
        className="border p-2 rounded bg-gray-100 text-gray-500"
      />

      <input
        type="number"
        value={code ?? ""}
        onChange={(e) => setCode(Number(e.target.value))}
        className="border p-2 rounded bg-white text-gray-900"
        placeholder="Enter OTP code"
        required
      />

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border p-2 rounded bg-white text-gray-900"
        placeholder="Enter new password"
        required
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        {mutation.isPending ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;
