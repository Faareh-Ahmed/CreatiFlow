'use client';

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { toast } from "sonner";
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
  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) toast("Order Placed…", { duration: 5000 });
    if (query.get("canceled")) toast("Order Canceled…", { duration: 5000 });
  }, []);

  const onCheckout = async () => {
    await checkoutCredits({ plan, amount, credits, buyerId });
  };

  return (
    <Button
      onClick={onCheckout}
      className="w-full rounded-full bg-purple-100 text-purple-500"
    >
      Buy Credit
    </Button>
  );
};

export default Checkout;
