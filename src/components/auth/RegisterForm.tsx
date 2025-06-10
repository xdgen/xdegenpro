// import { useState } from "react";
// import type { FormEvent } from "react";
// // import axios from "axios";
// import { Eye, EyeOff } from "lucide-react";
// import axiosInstance from "@/api/axios";

// const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [reenter, setReenter] = useState<string>("");
//   const [role, setRole] = useState<string>("Trader");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showReenter, setShowReenter] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (password !== reenter) {
//       alert("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const payload = {
//         email,
//         password,
//         role,
//     }

//     try {
//       const response = await axiosInstance.post("/register", {
//  payload
//       });

//       console.log("Registration successful:", response.data);
//       onSuccess();
//     } catch (err: any) {
//       console.error("Registration error:", err);
//       setError(
//         err.response?.data?.message || "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100">
//       <div className="bg-white rounded-2xl w-full max-w-md p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-2 top-4 text-sm text-gray-600 focus:outline-none"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="reenter"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Re-enter Password
//             </label>
//             <div className="relative">
//               <input
//                 id="reenter"
//                 type={showReenter ? "text" : "password"}
//                 value={reenter}
//                 onChange={(e) => setReenter(e.target.value)}
//                 className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowReenter((prev) => !prev)}
//                 className="absolute right-2 top-4 text-sm text-gray-600 focus:outline-none"
//               >
//                 {showReenter ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Role
//             </label>
//             <select
//               id="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//             >
//               <option value="Trader">Trader</option>
//               <option value="Investor">Investor</option>
//             </select>
//           </div>

//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;







// import { useState } from "react";
// import type { FormEvent } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import axiosInstance from "@/api/axios";

// const BASIC_AUTH_USERNAME =
//   import.meta.env.VITE_BASIC_AUTH_USERNAME ||
//   "your_frontend_basic_auth_username"; // Using VITE_ for Vite, adjust for your build tool
// const BASIC_AUTH_PASSWORD =
//   import.meta.env.VITE_BASIC_AUTH_PASSWORD ||
//   "your_frontend_basic_auth_password"; // Using VITE_ for Vite, adjust for your build tool

// // Encode the credentials once
// const basicAuthToken = btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`);

// const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [reenter, setReenter] = useState<string>("");
//   const [role, setRole] = useState<string>("Trader");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showReenter, setShowReenter] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (password !== reenter) {
//       alert("Passwords do not match.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const payload = {
//       email,
//       password,
//       "passwordRe-enter": reenter, // Corrected key based on API documentation
//       role,
//     };

//     try {
//       const response = await axiosInstance.post("/register", payload, {
//         headers: {
//           Authorization: `Basic ${basicAuthToken}`,
//           "Content-Type": "application/json", // Good practice to explicitly set this
//         },
//       });

//       console.log("Registration successful:", response.data);
//       onSuccess();
//     } catch (err: any) {
//       console.error("Registration error:", err);
//       setError(
//         err.response?.data?.message || "Registration failed. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center bg-gray-100">
//       <div className="bg-white rounded-2xl w-full max-w-md p-6">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-2 top-4 text-sm text-gray-600 focus:outline-none"
//               >
//                 {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="reenter"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Re-enter Password
//             </label>
//             <div className="relative">
//               <input
//                 id="reenter"
//                 type={showReenter ? "text" : "password"}
//                 value={reenter}
//                 onChange={(e) => setReenter(e.target.value)}
//                 className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowReenter((prev) => !prev)}
//                 className="absolute right-2 top-4 text-sm text-gray-600 focus:outline-none"
//               >
//                 {showReenter ? <EyeOff size={16} /> : <Eye size={16} />}
//               </button>
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Role
//             </label>
//             <select
//               id="role"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//             >
//               <option value="Trader">Trader</option>
//               <option value="Investor">Investor</option>
//             </select>
//           </div>

//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;








import { useState } from "react";
import type { FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/api/axios";

const BASIC_AUTH_USERNAME =
  import.meta.env.VITE_BASIC_AUTH_USERNAME ||
  "your_frontend_basic_auth_username"; // Using VITE_ for Vite, adjust for your build tool
const BASIC_AUTH_PASSWORD =
  import.meta.env.VITE_BASIC_AUTH_PASSWORD ||
  "your_frontend_basic_auth_password"; // Using VITE_ for Vite, adjust for your build tool

// Encode the credentials once
const basicAuthToken = btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`);

const RegisterForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reenter, setReenter] = useState<string>("");
  const [role, setRole] = useState<string>("Trader");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showReenter, setShowReenter] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrengthError, setPasswordStrengthError] = useState<
    string | null
  >(null); // New state for password strength error

  // Function to validate password strength
  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/\d/.test(pwd)) {
      return "Password must contain at least one number.";
    }
    return null; // Password is strong enough
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrengthError(validatePassword(newPassword)); // Validate on change
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== reenter) {
      setError("Passwords do not match.");
      return;
    }

    const strengthError = validatePassword(password);
    if (strengthError) {
      setPasswordStrengthError(strengthError);
      setError(null); // Clear other errors if strength is the issue
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    setPasswordStrengthError(null); // Clear password strength error

    const payload = {
      email,
      password,
      passwordConfirmation: reenter, // Corrected key based on API documentation
      role,
    };

    try {
      const response = await axiosInstance.post("/register", payload, {
        // headers: {
        //   Authorization: `Basic ${basicAuthToken}`,
        //   "Content-Type": "application/json", // Good practice to explicitly set this
        // },
      });

      console.log("Registration successful:", response.data);
      onSuccess();
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
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
                onChange={handlePasswordChange} // Use the new handler
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
            disabled={loading || !!passwordStrengthError} // Disable if there's a password strength error
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
