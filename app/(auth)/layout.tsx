'use client';

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex items-center justify-center min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/assets/images/bg1.jpg')]">


      <div className="absolute inset-0 bg-black/60" />

      {/* Children Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-4">
        {children}
      </div>
    </main>
  );
};

export default Layout;
