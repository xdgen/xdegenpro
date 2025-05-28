// components/auth/VerifyLoginForm.tsx
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

type Props = {
  onVerified: () => void;
};

const VerifyLoginForm: React.FC<Props> = ({ onVerified }) => {
  const [otp, setOtp] = useState("");
  const { login } = useAuth();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp === "123456") {
      await login("demo@example.com", "password"); // use real data if needed
      onVerified();
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <form onSubmit={handleVerify} className="flex flex-col gap-2">
      <p className="text-sm text-gray-600">
        Enter the 6-digit OTP sent to your email
      </p>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        Verify
      </button>
    </form>
  );
};

export default VerifyLoginForm;
