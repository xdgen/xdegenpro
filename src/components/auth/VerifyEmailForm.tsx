import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { showSuccessToast, showErrorToast } from "@/utils/toast"; // optional if using toast

type Props = {
  onVerified: () => void;
};

const verifyOtp = async (payload: { email: string; code: number }) => {
  const response = await axiosInstance.post("/auth/verify-mail", payload);
  return response.data;
};

const resendOtp = async (email: string) => {
  const response = await axiosInstance.post("/auth/resend-verification-mail", {
    email,
  });
  return response.data;
};

const VerifyEmailForm: React.FC<Props> = ({ onVerified }) => {
  const [otp, setOtp] = useState<number | undefined>(undefined);
  const { user } = useAuth();

  const verifyMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      onVerified();
    },
    onError: (error: any) => {
      showErrorToast(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    },
  });

  const resendMutation = useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      showSuccessToast("Verification email resent successfully.");
    },
    onError: (error: any) => {
      showErrorToast(
        error.response?.data?.message || "Failed to resend verification email."
      );
    },
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.email) {
      showErrorToast("User email is missing.");
      return;
    }

    verifyMutation.mutate({
      email: user.email,
      code: Number(otp),
    });
  };

  const handleResendOtp = () => {
    if (!user?.email) {
      showErrorToast("User email is missing.");
      return;
    }

    resendMutation.mutate(user.email);
  };

  return (
    <form onSubmit={handleVerify} className="flex flex-col gap-4">
      <p className="text-sm text-gray-600">
        Enter the 6-digit OTP sent to your email
      </p>

      <input
        type="email"
        value={user?.email || ""}
        disabled
        className="border p-2 rounded bg-gray-100 text-gray-500"
      />

      <input
        type="number"
        value={otp ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          setOtp(value === "" ? undefined : Number(value));
        }}
        placeholder="Enter OTP"
        className="border p-2 rounded"
        required
      />

      <button
        type="submit"
        disabled={verifyMutation.isPending}
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        {verifyMutation.isPending ? "Verifying..." : "Verify"}
      </button>

      <button
        type="button"
        onClick={handleResendOtp}
        disabled={resendMutation.isPending}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {resendMutation.isPending ? "Resending..." : "Resend OTP"}
      </button>
    </form>
  );
};

export default VerifyEmailForm;
