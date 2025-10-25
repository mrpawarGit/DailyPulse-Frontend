// components/auth/SignupPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { authApi } from "../../services/api";
import { ArrowLeft } from "lucide-react";

const SignupPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.signup(name, email, password);

      // Store token and user data
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthenticated", "true");

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center font-sans antialiased text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-white ${theme}`}
    >
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-blue-600 p-3 rounded-full">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Join DailyPulse
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Start building better habits today.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
              className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters
            </p>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-blue-600 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
