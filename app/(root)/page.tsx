import { Collection } from "@/components/shared/collection"
import { navLinks } from "@/constants"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"
import type { SearchParamProps } from "@/types";

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <section className="home">
        <h1 className="home-heading">
          Unleash Your Creative Vision with Imaginify
        </h1>
        <ul className="flex items-center justify-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex items-center justify-center flex-col gap-2"
            >
              <li className="flex items-center justify-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-4 text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      {/* "How It Works" / Video Showcase Section */}
      <section className="relative py-16 md:py-24 min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/assets/images/bg2.jpg')] text-white">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            See CreatiFlow in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Generative Fill Demo */}
            <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 hover:from-purple-600 hover:via-indigo-500 hover:to-blue-600   hover:shadow-xl transition-all duration-300 bg-opacity-80 rounded-lg overflow-hidden shadow-xl">
              <video className="w-full h-auto" autoPlay loop muted playsInline >
                <source src="assets/videos/bg5.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Generative Fill</h3>
                <p className="text-gray-300 text-sm">Add, remove, or expand content seamlessly.</p>
              </div>
            </div>

            {/* Object Remove Demo */}
            <div className="bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 hover:from-purple-600 hover:via-indigo-500 hover:to-blue-600   hover:shadow-xl transition-all duration-300 bg-opacity-80 rounded-lg overflow-hidden shadow-xl">
              <video className="w-full h-auto" autoPlay loop muted playsInline >
                <source src="/assets/videos/bg6.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
  )
}

export default Home