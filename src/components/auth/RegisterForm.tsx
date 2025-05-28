import { useState } from "react";
import type { FormEvent } from "react";

const RegisterForm : React.FC<{ onSuccess: () => void }> = ({ onSuccess }) =>{
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reenter, setReenter] = useState<string>("");
  const [role, setRole] = useState<string>("user");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== reenter) {
      alert("Passwords do not match.");
      return;
    }

    onSuccess();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Role:", role);
    // Add actual registration logic here
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-2xl w-full max-w-md">
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
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="reenter"
              className="block text-sm font-medium text-gray-700"
            >
              Re-enter Password
            </label>
            <input
              id="reenter"
              type="password"
              value={reenter}
              onChange={(e) => setReenter(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="user">Trader</option>
              <option value="admin">Investor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm
