'use client'
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'

const Sidebar = () => {
    const pathname = usePathname()

    return (
        <aside className='sidebar '>
            <div className='flex size-full flex-col gap-4'>
                <Link href='/' className='sidebar-logo'>
                    <Image src="/assets/images/CreatiFlow2.png" alt="logo" width={200} height={50} className='object-contain' />
                </Link>

                <nav className='sidebar-nav '>
                    <SignedIn>
                        <ul className='sidebar-nav_elements '>
                            {navLinks.map((link) => {
                                const isActive = link.route === pathname
                                return (
                                    <li key={link.route} className={`sidebar-nav_element group  ${isActive ? 'bg-blue-700 text-white' : 'text-gray-700'}`}>
                                        <Link className=' sidebar-link' href={link.route}>
                                            <Image
                                                src={link.icon}
                                                alt="logo"
                                                width={24}
                                                height={24}
                                                className={`${isActive && 'brightness-200'}`}
                                            />
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}

                            <li className=" cursor-pointer p-4">
                                <UserButton showName />
                            </li>
                        </ul>
                    </SignedIn>

                    <SignedOut>
                        <Button asChild className='button bg-blue-800 bg-cover '>
                            <Link href='/sign-in'>Login</Link>
                        </Button>
                    </SignedOut>

                </nav>
            </div>

        </aside>
    )
}

export default Sidebar