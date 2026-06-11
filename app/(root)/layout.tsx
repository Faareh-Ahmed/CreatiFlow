'use client';

import React from 'react';
import { TopNavBar } from '@/components/shared/TopNavBar';
import { Footer } from '@/components/shared/Footer';
import { Toaster } from '@/components/ui/sonner';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-screen w-full bg-background selection:bg-secondary-container/30">
      <TopNavBar />
      <div className="flex-grow pt-24 pb-stack-lg">
        {children}
      </div>
      <Footer />
      <Toaster />
    </main>
  );
};

export default Layout;
