import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://res.cloudinary.com/dhrt0nopd/image/upload/v1764016692/Lexel-RaaS-Logo-RGB_wu4ko9.png" 
            alt="Lexel Resourcing" 
            className="h-14 w-auto"
          />
        </div>
        <nav className="hidden md:flex gap-8">
          <a href="#simulator" className="text-lexel-dark hover:text-lexel-teal font-medium transition-colors">Risk Simulator</a>
          <a href="#talent" className="text-lexel-dark hover:text-lexel-teal font-medium transition-colors">Talent Bench</a>
          <a href="https://outlook.office.com/bookwithme/user/2b3ce858461d463b8e553100325d600b@lexel.co.nz/meetingtype/My6tgxY1d0GgJMIgaHvYCA2?anonymous&ep=mlink" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-lexel-teal text-white rounded font-semibold hover:bg-opacity-90 transition-all shadow-sm">
            Book Strategy Call
          </a>
        </nav>
      </div>
    </header>
  );
};