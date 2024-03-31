"use client";
import React, { Suspense, useEffect } from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '../components/Form';

const CreatePrompt = () => {
    useEffect(() => {
        
    }, [])
    const router=useRouter();
    const {data:session, status}=useSession();
    const [post, setPost] = useState({ prompt: "", tag: "" });
    const [submitting, setSubmitting] = useState(false);
    const CreatePrompt=async(e)=>{
        e.preventDefault();
        setSubmitting(true);
        
        try {
            if(!session){
                router.push("/auth/signin");
                return;
            }
            const res=await fetch("/api/prompt/new",{
                method:"POST",
                body:JSON.stringify({
                    userId:session?.user.id,
                    prompt:post.prompt,
                    tag:post.tag,
                }),
            });
            //console.log(res);
            if(res.ok){
                router.push("/");
            }
            else{

            }
        } catch (error) {
            //console.log(error,"error in prompt create");
        }
        finally{
            setSubmitting(false);
        }
    }
  return (
    <>
    <Suspense>

        <Form type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={CreatePrompt} />
    </Suspense>
    </>
  )
}

export default CreatePrompt