"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export const TopNavBar = ({ creditBalance }: { creditBalance?: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", route: "/" },
    { label: "Features", route: "/features" },
    { label: "Pricing", route: "/pricing" },
    { label: "My Edits", route: "/my-edits" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-xl border-b border-white/20 dark:border-outline-variant/20 shadow-sm"
          : "bg-surface/50 dark:bg-surface-dim/50 backdrop-blur-md"
      }`}
    >
      <div className="flex justify-between items-center px-gutter py-4 max-w-container-max-width mx-auto">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed-dim">
            CreatiFlow
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.route}
                href={link.route}
                className={`font-body-md text-body-md transition-colors ${
                  pathname === link.route
                    ? "text-secondary dark:text-secondary-fixed-dim font-bold border-b-2 border-secondary"
                    : "text-on-surface-variant dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <Link href="/sign-in" className="font-body-md text-body-md text-primary dark:text-primary-fixed-dim px-4 py-2 hover:bg-primary/5 rounded-lg transition-colors">
              Login
            </Link>
            <Link href="/sign-up" className="bg-primary text-on-primary font-body-md text-body-md px-6 py-2 rounded-lg hover:opacity-90 active:scale-95 transition-all">
              Sign up
            </Link>
          </SignedOut>
          <SignedIn>
            {creditBalance !== undefined && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 shadow-sm" title={`${creditBalance} Credits Remaining`}>
                <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
                <span className="font-body-sm font-bold text-primary">{creditBalance}</span>
              </div>
            )}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center gap-4">
          <SignedIn>
            {creditBalance !== undefined && (
              <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full border border-primary/20" title={`${creditBalance} Credits Remaining`}>
                <span className="material-symbols-outlined text-primary text-[18px]">bolt</span>
                <span className="font-body-sm font-bold text-primary">{creditBalance}</span>
              </div>
            )}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-surface dark:bg-surface-dim border-b border-outline-variant/20 shadow-lg flex flex-col items-center py-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.route}
              href={link.route}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-headline-lg text-xl transition-colors ${
                pathname === link.route
                  ? "text-secondary font-bold"
                  : "text-on-surface hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <SignedOut>
            <div className="flex flex-col items-center gap-4 w-full px-8 mt-4">
              <Link
                href="/sign-in"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center font-body-md text-primary border border-primary py-3 rounded-lg hover:bg-primary/5"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-primary text-on-primary font-body-md py-3 rounded-lg hover:opacity-90 active:scale-95"
              >
                Sign up
              </Link>
            </div>
          </SignedOut>
        </div>
      )}
    </nav>
  );
};
