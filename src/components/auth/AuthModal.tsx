
import EmailCheck from "./EmailCheck";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import VerifyLoginForm from "./VerifyLoginForm";

type AuthModalProps = {
  open: boolean;
  mode: "login" | "register" | "verify" | "emailCheck";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "register" | "verify" | "emailCheck") => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ open, mode, onClose, onSwitchMode }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-100">
      <div className="bg-white p-6 rounded w-full max-w-md relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          ✖
        </button>
        {mode === "login" && (
          <>
            <LoginForm onNext={() => onSwitchMode("verify")} />
            <p className="text-sm mt-4">
              Don't have an account?{" "}
              <button
                className="text-blue-500 cursor-pointer"
                onClick={() => onSwitchMode("register")}
              >
                Register
              </button>
            </p>
          </>
        )}

        {mode === "register" && (
          <>
            <RegisterForm onSuccess={() => onSwitchMode("emailCheck")} />
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

        {mode === "verify" && <VerifyLoginForm onVerified={onClose} />}

        {mode === "emailCheck" && (
          <EmailCheck onDone={() => onSwitchMode("login")} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;