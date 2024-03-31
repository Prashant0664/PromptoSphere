
"use client"
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
const Profile = ({ type,name, data, handleEdit, handleDelete, handledesc, fshow, setfshow }) => {
    // function to copy to clipboard
  const { data: session } = useSession();
    // console.log(data[0],"ddddddddd");
    // console.log(session,"ooooooooo");
    const handleTagClick = (text) => {
        // data[0]?.creator._id==session?.user.id
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard");
    };
    // console.log(data, "datatatatatatat")
    return (
        <section className='w-[98%] m-[1%]'>
            <div className="flex lg:w-[70%] m-auto items-center">
                <div className="w-[10%] sm:w-[20%]">
                    <img alt="profile"
                        src={data[0]?.creator?.image ? data[0]?.creator?.image : "https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"}
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
                <div className=" w-full">
                    <div className=" cursor-pointer text-2xl flex sm:text-3xl font-bold main-heading3 overflow-visible">
                        {data[0]?.creator?.username}
                        {fshow && <svg onClick={() => {
                            setfshow(false)
                        }} color="black" viewBox="0 0 20 20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ababab"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#ffffff" fill-rule="evenodd" d="M15.747 2.97a.864.864 0 011.177 1.265l-7.904 7.37-1.516.194.653-1.785 7.59-7.044zm2.639-1.366a2.864 2.864 0 00-4-.1L6.62 8.71a1 1 0 00-.26.39l-1.3 3.556a1 1 0 001.067 1.335l3.467-.445a1 1 0 00.555-.26l8.139-7.59a2.864 2.864 0 00.098-4.093zM3.1 3.007c0-.001 0-.003.002-.005A.013.013 0 013.106 3H8a1 1 0 100-2H3.108a2.009 2.009 0 00-2 2.19C1.256 4.814 1.5 7.848 1.5 10c0 2.153-.245 5.187-.391 6.81A2.009 2.009 0 003.108 19H17c1.103 0 2-.892 2-1.999V12a1 1 0 10-2 0v5H3.106l-.003-.002a.012.012 0 01-.002-.005v-.004c.146-1.62.399-4.735.399-6.989 0-2.254-.253-5.37-.4-6.99v-.003zM17 17c-.001 0 0 0 0 0zm0 0z"></path> </g></svg>
                        }

                    </div>
                    {!fshow && data[0]?.creator._id==session?.user.id  &&  <form onSubmit={(e) => {
                        e.preventDefault();
                        handledesc(e.target[0].value);
                    }}
                        className="w-full bg-red-50"
                    >
                        <textarea type="text" className="form_textarea_small3 w-full" defaultValue={data[0]?.creator?.desc} />
                        <button type="submit" className="form_button text-center w-full bg-green-300">Save</button>
                    </form>}
                    {fshow && <div className=" text-sm sm:text-lg overflow-visible ">
                    {data[0]?.creator?.desc ? data[0]?.creator?.desc : "Hey there! I am using Prompt-Creator developed by Prashant0664(Github)!!"}
                    </div>}
                    {data[0]?.creator._id!=session?.user.id && <>
                        {data[0]?.creator?.desc ? data[0]?.creator?.desc : "Hey there! I am using Prompt-Creator developed by Prashant0664(Github)!!"}
                    </>}
                </div>

            </div>

            <p className='desc text-left mt-6 text-xl font-bold '>
                Your Prompts:
            </p>

            <span className='mt-16 span grid grid-cols-1 sm:grid-cols-2 p-4 gap-3 lg:grid-cols-3 span'>

                {data.map((post) => (
                    <PromptCard
                        type={type}
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                        handleTagClick={handleTagClick}
                    />
                ))}
            </span>
        </section>
    );
};

export default Profile;
