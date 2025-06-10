// import React from "react";
import { useNavigate } from "react-router-dom";


const Activation = () => {
const navigate = useNavigate();
  return (
    <div className="text-center px-4 h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <img
          src="/assets/images/checked.png"
          alt="email check"
          className="w-32 h-32"
        />


        <p className="text-center text-sm">
        Congratulations your Account has been activated.
        </p>

        <button
          className="w-full py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 font-semibold transition shadow-md"
          onClick={() => navigate("/")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Activation;
