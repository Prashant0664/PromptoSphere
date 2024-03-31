"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PromptCard = ({ type, post, handleEdit, handleDelete, handleTagClick }) => {
  const [tags, settags] = useState(post?.tag.split(" "));

  const { data: session } = useSession();

  const Share = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.creator.username + ":" + post?.prompt,
        text: post?.prompt,
        url: window.location.href + "/prompt/" + post?._id,
      }).then(() => {
        //console.log("Thanks for sharing!");
      }).catch(console.error);
    } else {
      alert("Web share not supported");
    }
  }
  const pathName = usePathname();
  const router = useRouter();
  const [copies, setCopied] = useState("");
  const handleProfileClick = () => {
    if (post?.creator._id === session?.user.id) {
      return router.push("/profile");
    }
    router.push("/profile/" + `${post?.creator._id}` + "?name=" + post?.creator.username);
  }

  const handleCopy = () => {
    setCopied(post?.prompt);
    navigator.clipboard.writeText(post?.prompt);
    setTimeout(() => setCopied(false), 3000);
  };
  return (
    <>
      <span className=" py-1 block border rounded-xl bg-p-1 shadow-lg">
        <div className=" ">
          <div className="p-2 flex justify-evenly w-full items-center">
            {type != "profile" &&
              <>

                <img src={post?.creator.image}
                  onClick={() => { window.open(post?.creator.image) }}
                  alt="profile pic"
                  width={38}
                  height={38}
                  className="rounded-full cursor-pointer border border-black"
                />
                <div className="">
                  <div className="cursor-pointer text-white max-w-[170px] overflow-x-scroll " onClick={() => { handleProfileClick(); }}>
                    {post?.creator.username.toUpperCase()}
                  </div>
                </div>
              </>
            }

            <div className=" cursor-pointer  " onClick={() => Share()}>
              <svg viewBox="0 0 24 24" width="30" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z" fill="#e9eaec"></path> </g></svg>
            </div>
            <div className="">
              <Image src="/copy.svg" width={34} height={30} onClick={handleCopy} className="cursor-pointer " />
            </div>
            {type === "profile" &&
              <>

                <div className="cursor-pointer" onClick={() => { handleEdit() }}>
                  <svg viewBox="0 0 20 20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ababab"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fill-rule="evenodd" d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z"></path> </g></svg>
                </div>
                <div className=" cursor-pointer" onClick={()=>handleDelete(post)}>
                  <svg height="25" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#f5f5f5"></path><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#f5f5f5"></path></g></svg>
                </div>
              </>
            }
          </div>
          <div className="w-full">
            <div className=" bg-red-200 border rounded-xl p-1 px-2 bg-p-2 max-h-[220px] overflow-scroll rounded-b-none ">
              {post?.prompt}
            </div>
            <div className=" px-1 mb-1 mt-2 h-auto gap-3 ">
              {tags.map((tag) => {
                return (
                  <>

                    <span
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="rounded-lg cursor-pointer border border-black mt-2 p-1 px-2 bg-p-3 "
                    >
                      #{tag + " "}
                    </span> &nbsp;
                  </>
                );
              })}
            </div>

          </div>
        </div>
      </span>
    </>
  )
};

export default PromptCard;
