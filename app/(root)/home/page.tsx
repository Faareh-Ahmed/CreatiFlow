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
      <section className="home  bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-700 hover:from-purple-600 hover:via-indigo-500 hover:to-blue-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full">
        <h1 className="home-heading">
          Unleash Your Creative Vision with CreatiFlow
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

      <section className="sm:mt-12 ">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home