"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "../components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);
    const [fshow, setfshow] = useState(true);
    useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        //console.log(error);
      }
    }
  };
  const handledesc = async (posto) => {
    try {if(posto.length>250){
      alert("Description should be less than 250 characters")
      return;
    }
      const response = await fetch(`/api/users/${session?.user.id}/posts`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: posto
        }),
      });
      myPosts.desc=posto;
      //console.log(myPosts)
      setfshow(true)
      window.location.reload();
      //console.log(response);
    } catch (error) {
      //console.log(error)
      //console.log("error in desc edit");
      return;
    }
  };

  return (
    <Profile
      name='My'
      type="profile" 
    //   desc={data?.creator.desc?"data?.creator.desc":"Hii, I am using prompt creator developed by PRASHANT0664(GITHUB)"}
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handledesc={handledesc}
      fshow={fshow}
      setfshow={setfshow}
    />
  );
};

export default MyProfile;
