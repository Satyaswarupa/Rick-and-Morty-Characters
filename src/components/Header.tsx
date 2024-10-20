// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white text-center p-4 sticky top-0 z-10">
      <h1 className="text-xl font-bold">Rick and Morty Characters</h1>
    </header>
  );
};

export default Header;
