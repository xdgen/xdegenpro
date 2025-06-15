// import ForgotPassword from "./ForgotPaasword";
// import LoginForm from "./LoginForm";
// import RegisterForm from "./RegisterForm";
// import ResetPassword from "./ResetPassword";
// import VerifyEmailForm from "./VerifyEmailForm";

// type AuthModalProps = {
//   open: boolean;
//   mode: "login" | "register" | "verify"  | "forgot" | "reset";
//   onClose: () => void;
//   onSwitchMode: (
//     mode: "login" | "register" | "verify" | "forgot" | "reset"
//   ) => void;
// };

// const AuthModal: React.FC<AuthModalProps> = ({ open, mode, onClose, onSwitchMode }) => {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-100">
//       <div className="bg-white p-6 rounded w-full max-w-md relative">
//         <button className="absolute top-4 right-4" onClick={onClose}>
//           ✖
//         </button>
//         {mode === "login" && (
//           <>
//             <LoginForm onNext={() => onClose()} />

//             <div className="flex justify-between">
//               <p className="text-sm mt-4">
//                 Don't have an account?{" "}
//                 <button
//                   className="text-blue-500 cursor-pointer"
//                   onClick={() => onSwitchMode("register")}
//                 >
//                   Register
//                 </button>
//               </p>

//               <p className="text-sm mt-4">
//                 <button
//                   className="text-blue-500 cursor-pointer"
//                   onClick={() => onSwitchMode("forgot")}
//                 >
//                   Forgot Password
//                 </button>
//               </p>
//             </div>
//           </>
//         )}

//         {mode === "register" && (
//           <>
//             <RegisterForm onSuccess={() => onSwitchMode("verify")} />
//             <p className="text-sm mt-4">
//               Already have an account?{" "}
//               <button
//                 className="text-blue-500 cursor-pointer"
//                 onClick={() => onSwitchMode("login")}
//               >
//                 Login
//               </button>
//             </p>
//           </>
//         )}

//         {mode === "verify" && (
//           <VerifyEmailForm onVerified={() => onSwitchMode("login")} />
//         )}

//         {mode === "forgot" && (
//           <ForgotPassword onNext={() => onSwitchMode("reset")} />
//         )}

//         {mode === "reset" && (
//           <ResetPassword onNext={() => onSwitchMode("login")} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthModal;




import React, { useState, useEffect } from "react";
import ForgotPassword from "./ForgotPaasword";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetPassword from "./ResetPassword";
import VerifyEmailForm from "./VerifyEmailForm";

type Mode = "login" | "register" | "verify" | "forgot" | "reset";

type AuthModalProps = {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onSwitchMode: (mode: Mode) => void;
};

const AuthModal: React.FC<AuthModalProps> = ({
  open,
  mode,
  onClose,
  onSwitchMode,
}) => {
  const [history, setHistory] = useState<Mode[]>([]);

  useEffect(() => {
    if (open) {
      setHistory([mode]); // reset history when modal opens
    }
  }, [open]);

  useEffect(() => {
    if (open && history[history.length - 1] !== mode) {
      setHistory((prev) => [...prev, mode]);
    }
  }, [mode]);

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // remove current
      const previous = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      onSwitchMode(previous);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-100">
      <div className="bg-white p-6 rounded w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          {history.length > 1 ? (
            <button
              onClick={handleBack}
              className="text-gray-600 text-sm hover:text-black cursor-pointer"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}{" "}
          {/* placeholder to keep ✖ aligned */}
          {/* <button
            onClick={onClose}
            className="text-gray-600 text-sm hover:text-black"
          >
            ✖
          </button> */}
        </div>

        {mode === "login" && (
          <>
            <LoginForm onNext={() => onClose()} />

            <div className="flex justify-between">
              <p className="text-sm mt-4">
                Don't have an account?{" "}
                <button
                  className="text-blue-500 cursor-pointer"
                  onClick={() => onSwitchMode("register")}
                >
                  Register
                </button>
              </p>

              <p className="text-sm mt-4">
                <button
                  className="text-blue-500 cursor-pointer"
                  onClick={() => onSwitchMode("forgot")}
                >
                  Forgot Password
                </button>
              </p>
            </div>
          </>
        )}

        {mode === "register" && (
          <>
            <RegisterForm onSuccess={() => onSwitchMode("verify")} />
            <p className="text-sm mt-4">
              Already have an account?{" "}
              <button
                className="text-blue-500 cursor-pointer"
                onClick={() => onSwitchMode("login")}
              >
                Login
              </button>
            </p>
          </>
        )}

        {mode === "verify" && (
          <VerifyEmailForm onVerified={() => onSwitchMode("login")} />
        )}

        {mode === "forgot" && (
          <ForgotPassword onNext={() => onSwitchMode("reset")} />
        )}

        {mode === "reset" && (
          <ResetPassword onNext={() => onSwitchMode("login")} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
