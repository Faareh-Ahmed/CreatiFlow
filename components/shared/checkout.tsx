"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { Toaster } from '@/components/ui/sonner'
import { toast } from "sonner"
import { checkoutCredits } from "@/lib/actions/transaction.actions";

import { Button } from "../ui/button";

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
}: {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
}) => {
//   const { toast } = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
        toast("Order Placed. You will receive an email confirmation.", {
          duration: 5000
        })
    }

    if (query.get("canceled")) {
        toast("Order Cancelled. Continue Shopping and come back later.", {
            duration: 5000
          })
    }
  }, []);

  const onCheckout = async () => {
    const transaction = {
      plan,
      amount,
      credits,
      buyerId,
    };

    await checkoutCredits(transaction);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-purple-100 bg-cover text-purple-500"
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;