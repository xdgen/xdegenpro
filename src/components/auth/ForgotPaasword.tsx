import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

type Props = {
  onNext: () => void;
};

const ForgotPassword: React.FC<Props> = ({ onNext }) => {
  const [email, setEmail] = useState("");
  const { user, setUser } = useAuth();

  const mutation = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      return response.data;
    },
    onSuccess: () => {
      if (user) {
        setUser({ ...user, email }); // update email if user exists
      } else {
        setUser({ email, username: "", role: "" }); // fallback user structure
      }
      showSuccessToast("OTP sent to your email.");
      onNext();
    },
    onError: (error: any) => {
      showErrorToast(
        error.response?.data?.message ||
          "Failed to send verification code. Please try again."
      );
    },
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showErrorToast("Please enter your email.");
      return;
    }

    mutation.mutate({ email });
  };

  return (
    <form onSubmit={handleVerify} className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        Enter your email and an OTP will be sent to you
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded bg-white text-gray-900"
        placeholder="Enter your email"
        required
      />

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        {mutation.isPending ? "Verifying..." : "Verify"}
      </button>
    </form>
  );
};

export default ForgotPassword;
