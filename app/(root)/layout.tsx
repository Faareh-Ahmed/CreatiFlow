import React from 'react';
import { TopNavBar } from '@/components/shared/TopNavBar';
import { Footer } from '@/components/shared/Footer';
import { Toaster } from '@/components/ui/sonner';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/user.actions';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();
  let user = null;
  if (userId) {
    user = await getUserById(userId);
  }

  return (
    <main className="flex flex-col min-h-screen w-full bg-background selection:bg-secondary-container/30">
      <TopNavBar creditBalance={user?.creditBalance} />
      <div className="flex-grow pt-24 pb-stack-lg">
        {children}
      </div>
      <Footer />
      <Toaster />
    </main>
  );
};

export default Layout;
