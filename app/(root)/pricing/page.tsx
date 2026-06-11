import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { plans } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
import Checkout from "@/components/shared/checkout";

const PricingPage = async () => {
  const { userId } = await auth();
  
  let user = null;
  if (userId) {
    user = await getUserById(userId);
  }

  return (
    <div className="max-w-container-max-width mx-auto px-6 md:px-margin-desktop py-12 md:py-24 universal">
      <header className="mb-16 text-center max-w-3xl mx-auto space-y-4">
        <div className="mb-2"></div>
        <h1 className="font-display-lg text-display-lg md:text-[56px] leading-tight text-on-background">
          Flexible Plans for <span className="text-gradient">Every Creator</span>
        </h1>
        <p className="font-body-md text-on-surface-variant text-lg">
          Choose the perfect credit package to fuel your creativity. No hidden fees, cancel anytime.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative flex flex-col p-8 rounded-3xl transition-all duration-300 shadow-[0_4px_24px_rgba(26,35,126,0.05)] hover:shadow-[0_12px_40px_rgba(26,35,126,0.1)] hover:-translate-y-2 border ${plan.name === 'Pro Package' ? 'bg-primary-container/10 border-primary shadow-[0_0_40px_rgba(46,76,219,0.15)] md:scale-105 z-10' : 'bg-surface-container-lowest border-outline-variant/50'}`}>
            
            {plan.name === 'Pro Package' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-headline-lg text-2xl mb-2 text-on-surface">{plan.name}</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-on-surface">${plan.price}</span>
              </div>
              <p className="font-body-sm text-on-surface-variant font-medium">Includes {plan.credits} Credits</p>
            </div>

            <ul className="flex flex-col gap-4 mb-10 flex-1">
              {plan.inclusions.map((inclusion) => (
                <li key={plan.name + inclusion.label} className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${inclusion.isIncluded ? 'text-primary' : 'text-on-surface-variant/30'}`}>
                    {inclusion.isIncluded ? 'check_circle' : 'cancel'}
                  </span>
                  <span className={`font-body-md ${inclusion.isIncluded ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>
                    {inclusion.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              {plan.name === "Free" ? (
                <div className="w-full text-center px-6 py-4 border-2 border-outline-variant text-on-surface-variant rounded-xl font-bold bg-surface-container/30 cursor-not-allowed">
                  Free Consumable
                </div>
              ) : (
                <>
                  <SignedIn>
                    {user && (
                      <Checkout
                        plan={plan.name}
                        amount={plan.price}
                        credits={plan.credits}
                        buyerId={user._id}
                      />
                    )}
                  </SignedIn>
                  <SignedOut>
                    <Link href="/sign-up" className="w-full inline-flex items-center justify-center px-6 py-4 bg-primary text-on-primary rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg">
                      Buy Now
                    </Link>
                  </SignedOut>
                </>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;