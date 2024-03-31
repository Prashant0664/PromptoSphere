"use client"
import { set } from 'mongoose'
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation";

import { useSession } from "next-auth/react";
import React from 'react'
import { useEffect, useState } from 'react'
const page = ({ params }) => {
    const [copies, setCopied] = useState(false)
    const { data: session } = useSession();
    const [post, setPost] = useState({ prompt: '', tag: '' })
    const [show, setshow] = useState(true)
    const [data, setdata] = useState([])
  const router = useRouter();
  const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(false), 3000);
    }
    const onTagClick = (tag) => {
        navigator.clipboard.writeText(tag);
    }
    const handleProfileClick = () => {
        //console.log("clicked");
        router.push("/profile/" + `${data?.creator?._id}` + "?name=" + data?.creator.username);
      }
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${params?.id}`);
            //console.log(response)
            if (response.status === 500) {
                //console.log('error')
                setshow(false);
                return;
            }
            else {
                const data = await response.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag,
                });
                setdata(data);
                //console.log(data, "kkk");;
            }
        }
        getPromptDetails();
    }, [])
    if (!show) {
        return (
            <>
                {/* 404 not found */}
                <div className='text-center text-4xl font-bold mt-20'>
                    404 NOT FOUND
                </div>
            </>
        )
    }
    // return (<></>)
    return (
        <>

            <section className='w-[98%] m-[1%]'>
                <div className="flex lg:w-[70%] m-auto items-center">
                    <div className="w-[10%] sm:w-[20%]">
                        <img alt="profile"
                            src={data?.creator?.image ? data?.creator?.image : "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
                            width={100}
                            height={100}
                            className="rounded-full min-w-[50px] min-h-[50px] sm:w-[100px] sm:h-[100px]  border border-black"
                        />
                    </div>
                    <div className="sm:hidden">
                        &nbsp;
                        &nbsp;
                        &nbsp;
                    </div>
                    <div className="">
                        <div onClick={handleProfileClick} className=" text-2xl sm:text-3xl font-bold main-heading3 overflow-visible">
                            {data?.creator?.username}

                        </div>
                        <div className=" text-sm sm:text-2xl overflow-visible ">
                            {data?.creator?.desc ? data?.creator?.desc : "Hey there! I am using Prompt-Creator developed by Prashant0664(Github)!!"}
                        </div>
                    </div>

                </div>
                <div className='flex justify-between'>

                    <p className='desc text-left mt-6 text-xl font-bold '>
                        Prompt:
                    </p>
                    {/* // copy button */}
                    <button onClick={handleCopy} className=" text-white font-bold px-2 rounded-lg">
                        <Image src="/copy.svg" width={30} height={30} alt="copy" />
                    </button>

                </div>
                <div className='text-left text-lg mt-2 border  border-black p-4 bg-slate-100 rounded-xl'>
                    {post.prompt}
                </div>
                <p className='desc text-left mt-6 text-xl font-bold '>
                    Tag:
                </p>
                <div className='text-left text-lg mt-2'>
                    {post.tag.split(" ").map((tag) => {
                        return (
                            <>

                                <span
                                    key={tag}
                                    onClick={() => onTagClick(tag)}
                                    className="rounded-lg cursor-pointer border border-black mt-2 p-1 px-2 bg-p-5 "
                                >
                                    #{tag + " "}
                                </span> &nbsp;
                            </>
                        );
                    })}
                </div>

            </section>
        </>
    )
}

export default page