'use client';
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from "next/navigation"
import { navLinks } from '@/constants'

const MobileNav = () => {

    const pathname = usePathname()  

    return (
        <header className='header'>
            <Link href="/" className="flex items-center gap-2 md:py-2">
                <Image
                    src="/assets/images/CreatiFlow2.png"
                    alt="logo"
                    width={180}
                    height={28}
                />
            </Link>

            <nav className='flex gap-2'>
                <SignedIn>
                    <UserButton />

                    <Sheet>
                        <SheetTrigger>
                            <Image
                                src="/assets/icons/menu.svg"
                                alt="menu"
                                width={32}
                                height={32}
                                className="cursor-pointer"
                            />
                        </SheetTrigger>

                        <SheetContent className="sheet-content sm:w-64 flex flex-col">
                            <SheetHeader>
                                <SheetTitle>
                                    <Image
                                        src="/assets/images/logo-text.svg"
                                        alt="logo"
                                        width={152}
                                        height={23}
                                    />
                                </SheetTitle>
                            </SheetHeader>
                            <>

                                <div className="flex-1 overflow-y-auto mt-4 max-h-[calc(100vh-100px)]">

                                    <ul className="header-nav_elements">
                                        {navLinks.map((link) => {
                                            const isActive = link.route === pathname

                                            return (
                                                <li
                                                    className={`${isActive} p-4 flex whitespace-nowrap text-dark-700`}
                                                    key={link.route}
                                                >
                                                    <Link
                                                        className={`sidebar-link cursor-pointer ${isActive ? 'text-blue-700' : ''}`}
                                                        href={link.route}
                                                    >
                                                        <Image
                                                            src={link.icon}
                                                            alt="logo"
                                                            width={24}
                                                            height={24}
                                                        />
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </>
                        </SheetContent>
                    </Sheet>
                </SignedIn>

                <SignedOut>
                    <Button asChild className="button bg-blue-800 bg-cover">
                        <Link href="/sign-in">Login</Link>
                    </Button>
                </SignedOut>



            </nav >

        </header >
    )
}

export default MobileNav