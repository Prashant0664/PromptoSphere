"use client";
import Image from "next/image";
import Link from "next/link";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect } from "react";
import React from 'react'

const Nav = () => {

    const { data: session } = useSession();
    const [providers, setProviders] = React.useState(null);
    const [toggledrop, settoggledrop] = React.useState(false)
    useEffect(() => {
            const funct=async()=>{
                const res = await getProviders();
                setProviders(res);
            }
            funct();
    }, [])
    return (
        <nav className="">
            <div className="flex items-center justify-between px-4 w-full bg-[rgb(248,212,159)] h-16 nav ">
                <div className="">
                    <Link href="/" className="">
                        <Image
                            src="/logo.png"
                            alt="LOGO"
                            height="60"
                            width="60"
                        />
                    </Link>
                </div>
                {/* For Desktop */}

                <div className=" px-4 gap-x-4 sm:flex hidden">
                    {session?.user ? (<>

                        <Link href="/create-prompt" className="filled-btn">
                            CREATE
                        </Link>

                        <button type="button" onClick={() => { signOut();}} className="nfilled-btn">
                            SIGNOUT
                        </button>
                        <Link href="/profile">
                            <img
                                src={session?.user.image ? session?.user.image : "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
                                height="35"
                                width="35"
                                alt="profile"
                                className="rounded-full border border-black"
                            />
                        </Link>
                    </>
                    ) : (
                        <>
                        {providers && Object.values(providers).map((provider) => (
                            <button
                                key={provider.name}
                                type="button"
                                onClick={() => signIn(provider.id)}
                                className="nfilled-btn hover:bg-green-700"
                            >
                                Sign in with {provider.name}
                            </button>
                        ))}
                        </>
                    )}

                </div>
                {/* mobile */}

                <div className="sm:hidden flex relative">
                    {session?.user ? (
                    <div className="flex">
                        <img
                            src={session?.user.image ? session?.user.image : "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
                            height={35}
                            width={35}
                            alt="profile"
                            className="rounded-full hover:cursor-pointer border border-black"
                            onClick={() => settoggledrop(!toggledrop)}
                        />
                        {toggledrop && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown-menu"
                                    onClick={() => settoggledrop(false)}
                                >
                                    My Profile
                                </Link>
                                <Link href="/create-prompt"
                                    className="dropdown-menu"
                                    onClick={() => { }}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {signOut(); settoggledrop(false)}}
                                    className="nfilled-btn"
                                >
                                    SignOut
                                </button>
                            </div>
                        )}


                    </div>
                    ):(<>
                        <div className="flex">
                        <Image
                            src={session?.user.image ? session?.user.image : "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
                            height={35}
                            width={35}
                            alt="profile"
                            className="rounded-full hover:cursor-pointer"
                            onClick={() => settoggledrop(!toggledrop)}
                        />
                        {toggledrop && (
                            <div className="dropdown">
                            {providers && Object.values(providers).map((provider) => (
                            <button
                                key={provider.name}
                                type="button"
                                onClick={() => signIn(provider.id)}
                                className="nfilled-btn hover:bg-green-700"
                            >
                                Sign in with {provider.name}</button>
                    ))})
                            </div>
                        )}
                    </div>
                        
                    </>)}
                </div>
            </div>
        </nav>
    )
}

export default Nav