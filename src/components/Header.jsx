import React from 'react';

const Header = () => {
  return (
    <header className="h-[160px] bg-gradient-to-r from-orange-900 to-blue-700 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-black text-4xl tracking-wider uppercase pb-5">
          Bacha Khan Lab technologist
        </h1>
        <p className="font-bold text-2xl tracking-widest opacity-90">
          Laboratory Management System
        </p>
      </div>
    </header>
  );
};

export default Header;