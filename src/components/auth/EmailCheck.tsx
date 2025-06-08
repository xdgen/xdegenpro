import React from "react";

type EmailCheckProps = {
  onDone: () => void;
};

const EmailCheck: React.FC<EmailCheckProps> = ({ onDone }) => {
  return (
    <div className="text-center px-4 ">
      <div className="flex flex-col items-center space-y-6">
        <img
          src="/assets/images/email.png"
          alt="email check"
          className="w-32 h-32"
        />

        <h1 className="text-2xl font-bold text-green-600">Check Your Email</h1>

        <p className="text-center text-sm">
          We’ve sent an activation link to your inbox. Follow the instructions
          to activate your account.
        </p>

        <button
          className="w-full py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 font-semibold transition shadow-md"
          onClick={onDone}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default EmailCheck;
