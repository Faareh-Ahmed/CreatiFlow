import React from "react";
import { navLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const featureHighlights = navLinks.slice(1, 5).map((link) => ({
  ...link,
  description: `Use AI to ${link.label.toLowerCase()} your images effortlessly.`,
}));

const Home = async () => {

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/assets/images/bg1.jpg')]">
        {/* <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/videos/background.mp4"
          autoPlay
          loop
          muted
          playsInline
        /> */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 max-w-4xl drop-shadow-md">
            Unleash Your Creative Vision with{' '}
            <span className="text-purple-300">CreatiFlow AI</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl drop-shadow-sm">
            Transform your images with powerful AI tools. Restore, enhance, generate, and recolor like never before.
          </p>
          <Link href="/home">
            <Button className=" size-min bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 hover:from-purple-600 hover:via-indigo-500 hover:to-blue-600 text-white transition duration-300 ease-in-out transform hover:scale-105 px-8 py-3 rounded-full text-lg font-semibold shadow-lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat bg-[url('/assets/images/bg1.jpg')]">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Explore Powerful AI Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureHighlights.map((feature) => (
              <Link
                key={feature.route}
                href={feature.route}
                className="group block transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 hover:from-purple-600 hover:via-indigo-500 hover:to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center border border-white/10 hover:border-white/30">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Image src={feature.icon} alt={`${feature.label} icon`} width={32} height={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.label}</h3>
                  <p className="text-white text-sm flex-grow">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* "How It Works" / Video Showcase Section */}
      <section className="relative py-16 md:py-24 min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/assets/images/bg1.jpg')] text-white">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            See CreatiFlow in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Generative Fill Demo */}
            <div className="bg-cover bg-center bg-no-repeat bg-[url('/assets/images/generative-fill.png')]   hover:scale-105 transition-all duration-300 bg-opacity-80 rounded-lg overflow-hidden shadow-xl">
              {/* <video className="w-full h-auto" autoPlay loop muted playsInline >
                <source src="assets/videos/bg4.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Generative Fill</h3>
                <p className="text-gray-300 text-sm">Add, remove, or expand content seamlessly.</p>
              </div>
            </div>

            {/* Object Remove Demo */}
            <div className="bg-cover bg-center bg-no-repeat bg-[url('/assets/images/object-removal.png')]  hover:scale-105 transition-all duration-300 bg-opacity-80 rounded-lg overflow-hidden shadow-xl">
              {/* <video className="w-full h-auto" autoPlay loop muted playsInline >
                <source src="/assets/videos/bg6.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Object Remove</h3>
                <p className="text-gray-300 text-sm">Clean up photos by removing unwanted objects.</p>
              </div>
            </div>

            {/* Additional demo cards here */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
