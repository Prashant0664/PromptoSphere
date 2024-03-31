"use client";
import Link from "next/link";
import { useState } from "react";
import { OpenAI } from "openai";


const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  // const openai = new OpenAI();
  const [len, setlen] = useState(250);
  const [fshow, setfshow] = useState(false);
  const gen = async () => {
    // const openai = new OpenAI({ apiKey: apiKeys, dangerouslyAllowBrowser: true })

    //console.log(99);
    // const completion = await openai.completions.create({
    //   model: "gpt-3.5-turbo-instruct",
    //   prompt: "Say this is a test.",
    //   max_tokens: 1,
    //   temperature: 0,
    // });
    //console.log(completion, "ai prompt");
    return;
  }
  const [prompt, setPrompt] = useState("");
  return (
    <section className='w-full ml-0 max-w-full flex-start flex-col'>
      <h1 className='mt-5 text-5xl font-extrabold text-black sm:text-6xl text-center'>
        <span className='main-heading2 text-center'>{type} Post</span>
      </h1>
      <p className='main-u-heading2 text-center max-w-md mx-[auto]'>
        {type} and share amazing prompts with the world, and let your
        creativity and imagination grow with the help of AI Powered Prompts.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism mx-[auto] '
      >
        <label className="w-full">
          <div className=" flex items-center justify-between  w-full">

            <span className='font-satoshi font-semibold text-base text-gray-700'>
              AI Prompt
            </span>

            {
              fshow === true ? (<>
                <button onClick={() => { setfshow(!fshow); gen(); }} type="button" className=" nfilled-btn-ai">
                  Generate
                </button>
              </>
              ) : (
                <>

                  <button onClick={() => { setfshow(!fshow); }} type="button" className="hidden sm:block nfilled-btn-ai">
                    Generate Using Ai
                  </button>

                  <button onClick={() => { setfshow(!fshow); }} type="button" className="sm:hidden nfilled-btn-ai">
                    Ai
                  </button>
                </>
              )}
          </div>
          <br />
          {fshow &&
            <>
              <textarea value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Write your prompt here...'
                className='form_textarea_small3'
              />
              <br />
            </>
          }
          <textarea
            value={post.prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='Write your post here'
            required
            className='form_textarea'
          />
        </label>

        <label>
          <span className='flex w-full  justify-between font-satoshi font-semibold text-base text-gray-700'>
            <span className='font-normal'>
              <b>
                Tags of Prompt{" "}
              </b>
              (Space seperated values)
            </span>
            <button type="button" className="hidden sm:block nfilled-btn-ai">
              Generate Using Ai
            </button>

            <button type="button" className="sm:hidden nfilled-btn-ai">
              Ai
            </button>
          </span>
          <input
            value={post.tag}
            onChange={(e) => {
              e.target.value = e.target.value.trimStart();
              e.target.value = e.target.value.replace(/\s+/g, ' ');
              if (post?.tag.length <= 250) {
                setPost({ ...post, tag: e.target.value });
                setlen(250 - e.target.value.length)
              }
              else {
                setPost({ ...post, tag: post.tag.substring(0, 250) });
              }
            }
            }
            type='text'
            placeholder={"#Tags (" + len + " characters left)"}
            required
            className='form_textarea_small'
          />
          <p>{post?.tag.length}/250</p>
          <br />
          <div className="">
            {post.tag && post.tag.split(" ").map((tag) => (
              <>
                <span className="bg-slate-200 p-1 rounded-xl border border-black ">
                  {tag}
                </span>
                &nbsp;
              </>
            ))}
          </div>
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-red-600 rounded-3xl  border border-black py-1 px-2 text-lg'>
            Cancel
          </Link>
          {" "}

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm main-heading2b rounded-full text-white hover:bg-green-400 '
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
