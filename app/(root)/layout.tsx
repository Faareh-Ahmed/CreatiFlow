'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import MobileNav from '@/components/shared/mobileNav';
import Sidebar from '@/components/shared/sidebar';
import { Toaster } from '@/components/ui/sonner';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log('pathname', pathname);

  // Split into segments, remove empty strings
  const segments = pathname.split('/').filter(Boolean);

  // If this layout lives in e.g. /dashboard/layout.tsx,
  // then `/dashboard` → segments = ['dashboard'] → index page
  const isIndexOfThisFolder = segments.length === 0;

  return (
    <main className="root">
      {/* Only show navs when NOT on the folder's index page */}
      {!isIndexOfThisFolder && (
        <>
          <Sidebar />
          <MobileNav />
        </>
      )}

      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>

      <Toaster />
    </main>
  );
};

export default Layout;
