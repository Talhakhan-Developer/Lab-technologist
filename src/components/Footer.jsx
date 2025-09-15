import React from 'react';

const Footer = () => {
  return (
    <footer className="h-[40px] bg-gray-800 text-gray-300 flex items-center justify-center text-xs font-medium tracking-wide">
      &copy; {new Date().getFullYear()} LabSys — Built with care for science
    </footer>
  );
};

export default Footer;