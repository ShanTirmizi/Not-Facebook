// import { prisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
// import prisma from '../lib/prisma';

// export async function getServerSideProps() {
//   const post = await prisma.post.findMany();

//   return {
//     props: { post },
//   };
// }
// export async function getStaticProps() {
//   const profile = await prisma.post.findMany();
//   return {
//     props: { profile },
//   };
// }

const Post = () => {
  // console.log(profile);
  const [imageData, setImageData] = useState(null);
  const { data: session } = useSession();

  // handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'NotFacebook');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dqfridlyd/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const fileData = await res.json();
    setImageData(fileData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const email = session?.user?.email;
    const image = imageData?.secure_url;

    await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, email, image }),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="title" name="title" placeholder="Title" />
        <input type="content" name="content" placeholder="Content" />
        <input
          type="file"
          name="image"
          placeholder="Image"
          onChange={handleImageUpload}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Post;
