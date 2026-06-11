import React from 'react';
import Link from 'next/link';
import { transformationTypes } from '@/constants';
import { auth } from '@clerk/nextjs/server';

const FeaturesPage = async () => {
  const { userId } = await auth();

  // Create an array of features to map over
  const features = Object.values(transformationTypes);

  return (
    <div className="max-w-container-max-width mx-auto px-margin-desktop py-12 md:py-16 universal">
      <header className="mb-16 text-center max-w-3xl mx-auto space-y-4">
        <div className="mb-2"></div>
        <h1 className="font-display-lg text-display-lg md:text-[56px] leading-tight text-on-surface">
          Explore Our <span className="text-gradient">Features</span>
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-lg">
          Transform your creative workflow with our suite of powerful, intuitive AI editing tools. Click any feature below to get started.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {features.map((feature) => (
          <div key={feature.type} className="group relative bg-surface-container-lowest rounded-3xl p-8 shadow-[0_4px_24px_rgba(26,35,126,0.05)] hover:shadow-[0_12px_40px_rgba(26,35,126,0.1)] transition-all duration-300 hover:-translate-y-2 border border-outline-variant/50 overflow-hidden flex flex-col h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-surface flex items-center justify-center text-primary mb-6 shadow-sm border border-outline-variant/30">
              <img src={`/assets/icons/${feature.icon}`} alt={feature.title} className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            
            <h2 className="font-headline-lg text-2xl text-on-surface mb-3 group-hover:text-primary transition-colors">{feature.title}</h2>
            <p className="font-body-md text-on-surface-variant mb-8 flex-1">{feature.subTitle}</p>
            
            <Link 
              href={userId ? `/transformations/add/${feature.type}` : '/sign-in'} 
              className="mt-auto w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold hover:bg-opacity-90 transition-all active:scale-95 shadow-md hover:shadow-lg"
            >
              Start Editing
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
