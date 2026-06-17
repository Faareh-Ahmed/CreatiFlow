import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 flex justify-center text-center">
        <div className="absolute top-1/2 left-1/2 -z-10 opacity-30 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/40 via-secondary/40 to-primary/40 blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto px-margin-desktop flex flex-col items-center">
          <div className="space-y-8 flex flex-col items-center">
            <h1 className="font-display-lg text-display-lg md:text-[72px] leading-tight text-on-background">
              Professional AI Image Editing for <span className="text-gradient">Modern Teams</span>
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-2xl text-xl leading-relaxed">
              Elevate your creative workflow with our suite of powerful, intuitive AI tools. From generative fill to seamless object removal, achieve stunning, professional-grade results in seconds.
            </p>
            <div className="flex flex-wrap gap-4 pt-8 justify-center">
              <SignedOut>
                <Link href="/sign-up" className="gradient-bg text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform text-lg">Start Free Trial</Link>
              </SignedOut>
              <SignedIn>
                <Link href="/features" className="gradient-bg text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform text-lg">Explore Features</Link>
              </SignedIn>

            </div>
          </div>
        </div>
      </section>

      {/* AI Features Grid Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-container-max-width mx-auto px-margin-desktop">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="font-headline-lg text-headline-lg text-on-background">Powerful AI Features</h2>
            <p className="font-body-md text-on-surface-variant">Everything you need to create, restore, and transform your visuals with a single click. Professional tools redefined for everyone.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Feature Cards */}
            <div className="group bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-outline-variant/10">
              <div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">auto_fix_high</span>
              </div>
              <h3 className="font-headline-lg text-xl mb-3">Image Restore</h3>
              <p className="font-body-sm text-on-surface-variant mb-6">Breathe new life into old, grainy, or low-resolution photos with advanced neural upscaling and noise reduction.</p>
              <div className="w-full h-40 rounded-lg overflow-hidden relative">
                <Image alt="Restore" className="object-cover grayscale opacity-40" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjMTe-njddo0TlrReZ2ZFQeBqeXuZZqjgTXXclf75mMjwmMtDLF-vS5V6RigkSmNuc3plD-sAkkCb5puyaZ0k8m2bQfimOT9Va8PHwHTt_r5m9ikvK5rA8A1NP-MU8aL9bCa5uYlxWlJcAq3-213xDsqq68CTjUfyXrsWTRjrO5S9SjB_e6b6IvZQjXiqJQl4jv4ZyxqG-0gy5rQ5LBYYksfJ_iKv95nTV7dmYMDZX2-w19cPc1Ga5PzQy47T8isfuhff-VIK1fZ4H" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/10"></div>
              </div>
            </div>

            <div className="group bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-outline-variant/10">
              <div className="w-12 h-12 rounded-lg bg-secondary-container/10 flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">brush</span>
              </div>
              <h3 className="font-headline-lg text-xl mb-3">Generative Fill</h3>
              <p className="font-body-sm text-on-surface-variant mb-6">Expand horizons or add objects simply by describing them. Our AI creates seamless, context-aware textures.</p>
              <div className="w-full h-40 rounded-lg overflow-hidden relative">
                <Image alt="Generative Fill" className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" src="/assets/images/generative-fill.png" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/10"></div>
              </div>
            </div>

            <div className="group bg-surface-container-lowest p-stack-lg rounded-xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-outline-variant/10">
              <div className="w-12 h-12 rounded-lg bg-error-container/10 flex items-center justify-center text-error mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">ink_eraser</span>
              </div>
              <h3 className="font-headline-lg text-xl mb-3">Object Remove</h3>
              <p className="font-body-sm text-on-surface-variant mb-6">Erase photobombers, wires, or blemishes instantly. The background is filled automatically with zero artifacts.</p>
              <div className="relative h-40 bg-surface rounded-lg flex items-center justify-center overflow-hidden">
                <Image alt="Object Remove" className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" src="/assets/images/object-removal.png" />
                <div className="absolute inset-0 bg-primary/5"></div>
              </div>
            </div>

            <Link href="/features" className="md:col-span-3 group bg-gradient-to-r from-primary to-primary-container p-stack-lg rounded-xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 border border-primary/20 flex flex-col sm:flex-row items-center justify-between text-left gap-8 mt-4">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl">dashboard_customize</span>
                </div>
                <div>
                  <h3 className="font-headline-lg text-2xl mb-1 text-white">Unlock All AI Features</h3>
                  <p className="font-body-md text-white/80">Discover Background Remove, Object Recolor, and more professional tools.</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-bold group-hover:bg-opacity-90 transition-all shrink-0">
                Explore Features <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-container-max-width mx-auto px-margin-desktop">
          <div className="gradient-bg rounded-3xl p-12 md:p-24 text-center text-on-primary relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </div>
            <div className="relative z-10 space-y-8">
              <h2 className="font-display-lg text-display-lg md:text-[56px]">Ready to Elevate Your Workflow?</h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto font-body-md">Join thousands of creatives using CreatiFlow to turn hours of manual editing into minutes of AI-powered magic.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <SignedOut>
                  <Link href="/sign-up" className="bg-white text-primary px-10 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all shadow-xl active:scale-95 flex items-center justify-center">Start for Free</Link>
                </SignedOut>
                <SignedIn>
                  <Link href="/features" className="bg-white text-primary px-10 py-4 rounded-lg font-bold hover:bg-opacity-90 transition-all shadow-xl active:scale-95 flex items-center justify-center">Explore Features</Link>
                </SignedIn>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
