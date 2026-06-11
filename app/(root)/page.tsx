import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

const LandingPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-32 md:pb-48">
        <div className="absolute top-0 right-0 -z-10 opacity-20 transform translate-x-1/4 -translate-y-1/4">
          <div className="w-[600px] h-[600px] rounded-full gradient-bg blur-[100px]"></div>
        </div>
        <div className="max-w-container-max-width mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-stack-lg">
            <div className="mb-2"></div>
            <h1 className="font-display-lg text-display-lg md:text-[64px] leading-tight text-on-background">
              Transform Your <span className="text-gradient">Creativity</span> with AI.
            </h1>
            <p className="font-body-md text-on-surface-variant max-w-xl text-lg">
              Unlock professional-grade image editing in seconds. Our neural engine handles the complex work, letting you focus on the vision.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <SignedOut>
                <Link href="/sign-up" className="gradient-bg text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform">Get Started</Link>
              </SignedOut>
              <SignedIn>
                <Link href="/features" className="gradient-bg text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform">Explore Features</Link>
              </SignedIn>
              <Link href="/my-edits" className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-bold hover:bg-primary/5 transition-colors flex items-center justify-center">View My Edits</Link>
            </div>

          </div>
          <div className="relative group hover:translate-y-[-4px] transition-transform duration-300">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative glass-card rounded-xl overflow-hidden shadow-2xl">
              <img alt="AI Editing Dashboard" className="w-full aspect-[4/3] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYqQxKduT-tHANLydW0gHundPam3sKkYRjaY76CHzvcjG8SoyhfV5vNZvIarq4JcA-OTrFFWM5Rm9bNi8zjxsj6KGCdhnxvtJcSxnHdn5vRYBkjXDmMQcQD6PYw6LQsmRNGhK3IKAF8VCNbiLib_YEDlkFx9CxZ9nLWl6DSB4Lwao-nVnyRjHn9GZElpayVM4RYJ5z1SQMn11HeKhfaT0yjexoXfHdP7aih624Fiizh-EWyyLjqabQqhdRvuLWg8UnQMvYFq2vZ-N9" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-white font-label-caps text-[10px]">CURRENT PROCESS</p>
                  <p className="text-white font-bold">Generative Fill: Cinematic Lighting</p>
                </div>
                <div className="bg-white/90 px-3 py-1 rounded-full text-primary font-bold text-sm">84% Done</div>
              </div>
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
                <img alt="Restore" className="w-full h-full object-cover grayscale opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjMTe-njddo0TlrReZ2ZFQeBqeXuZZqjgTXXclf75mMjwmMtDLF-vS5V6RigkSmNuc3plD-sAkkCb5puyaZ0k8m2bQfimOT9Va8PHwHTt_r5m9ikvK5rA8A1NP-MU8aL9bCa5uYlxWlJcAq3-213xDsqq68CTjUfyXrsWTRjrO5S9SjB_e6b6IvZQjXiqJQl4jv4ZyxqG-0gy5rQ5LBYYksfJ_iKv95nTV7dmYMDZX2-w19cPc1Ga5PzQy47T8isfuhff-VIK1fZ4H" />
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
                <img alt="Generative Fill" className="w-full h-full object-cover" src="/assets/images/generative-fill.png" />
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
                <img alt="Object Remove" className="w-full h-full object-cover" src="/assets/images/object-removal.png" />
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
                <Link href="/contact" className="bg-primary-container text-on-primary-container border border-white/20 px-10 py-4 rounded-lg font-bold hover:bg-white/10 transition-all backdrop-blur-sm active:scale-95 flex items-center justify-center">Book a Demo</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
