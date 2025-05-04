'use client';

import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex items-center justify-center min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="assets/videos/background.mp4"   
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-black/60" />

      {/* Children Content */}
      <div className="relative z-10 w-full max-w-md mx-auto p-4">
        {children}
      </div>
    </main>
  );
};

export default Layout;
