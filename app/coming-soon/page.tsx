import React from "react";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 sm:px-6 lg:px-8">
      <style>
        {`
          @keyframes pulseEmoji {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.7; }
          }

          .pulse-emoji {
            animation: pulseEmoji 2.5s ease-in-out infinite;
            display: inline-block;
          }

          .fade-in {
            animation: fadeIn 1.5s ease forwards;
            opacity: 0;
            animation-delay: 0.2s;
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}
      </style>

      <div className="bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-2xl p-8 sm:p-10 max-w-md sm:max-w-lg lg:max-w-xl text-center shadow-2xl fade-in">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 select-none">
          <span className="pulse-emoji">🚧</span> Coming Soon
        </h1>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-10 leading-relaxed px-2 sm:px-0">
          We’re putting the finishing touches on something amazing. Stay tuned!
        </p>
        <a
          href="/"
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition text-sm sm:text-base"
          tabIndex={0}
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
