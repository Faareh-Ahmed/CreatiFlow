import React from "react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-tertiary dark:bg-tertiary-container">
      <div className="flex flex-col items-center justify-center gap-2 px-margin-desktop py-12 max-w-container-max-width mx-auto text-center">
        <span className="font-headline-lg text-headline-lg font-bold text-on-tertiary dark:text-on-tertiary-container">
          CreatiFlow
        </span>
        <p className="font-body-sm text-body-sm text-on-tertiary/70 dark:text-on-tertiary-container/70 max-w-md">
          Empowering the next generation of creative professionals with high-performance, AI-driven editing tools.
        </p>
        <p className="font-body-sm text-body-sm text-on-tertiary/50 dark:text-on-tertiary-container/50 mt-4">
          © 2024 CreatiFlow. Built for creators.
        </p>
      </div>
    </footer>
  );
};
