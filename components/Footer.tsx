import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <img 
            src="https://res.cloudinary.com/dhrt0nopd/image/upload/v1764016692/Lexel-RaaS-Logo-RGB_wu4ko9.png" 
            alt="Lexel Resourcing" 
            className="h-14 w-auto"
          />
          <p className="text-gray-500 text-sm mt-4 font-medium">Modern Talent Infrastructure</p>
        </div>
        
        <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Lexel Systems Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};