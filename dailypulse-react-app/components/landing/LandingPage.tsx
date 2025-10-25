// components/landing/LandingPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, TrendingUp, Zap } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const LandingPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen font-sans antialiased text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-white ${theme}`}
    >
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg
                className="w-6 h-6 text-white"
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
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              DailyPulse
            </h1>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-24">
        <section className="text-center container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Build habits that last.
            <br />
            <span className="text-blue-600">Master your day.</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            DailyPulse is your personal companion for building consistency,
            tracking your mood, and achieving your wellness goals, one day at a
            time.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-8 px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-transform hover:scale-105"
          >
            Get Started for Free
          </button>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">
              Why you'll love DailyPulse
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full mb-4">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Effortless Tracking
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Log your habits and mood with a simple, intuitive interface
                  designed for speed.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full mb-4">
                  <TrendingUp size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">Visual Analytics</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand your progress with beautiful charts that reveal
                  patterns and trends.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-block p-4 bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-300 rounded-full mb-4">
                  <Zap size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-2">Stay Motivated</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Build powerful streaks and get daily motivational quotes to
                  keep you inspired.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} DailyPulse. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
