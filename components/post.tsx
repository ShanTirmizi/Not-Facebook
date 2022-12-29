import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { IPost } from '../pages/index';

export interface IImageData {
  access_mode: string;
  asset_id: string;
  bytesL: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
}

interface IPostProps extends IPost {}

const Post: FC<IPostProps> = ({ posts }) => {
  // Try turning image data and loading into the same state in the future
  const [imageData, setImageData] = useState<IImageData>();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };
  const handleDelete = async (id: number) => {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    refreshData();
  };

  // handle image upload
  const handleImageUpload = async (e: any) => {
    setIsImageUploading(true);
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
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const user = session?.user!;
    const image = imageData?.secure_url;
    try {
      await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, user, image }),
      });
      refreshData();
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    if (imageData) {
      setIsImageUploading(false);
    }
  }, [imageData]);
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
        {isImageUploading ? <p>Loading.....</p> : null}
        <button type="submit" disabled={isImageUploading}>
          Submit
        </button>
      </form>
      <div>
        <h1>List of all the posts</h1>

        {posts.map((post) => (
          // console.log(post.User.userName),
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <Image
              src={post.image}
              // fix the loader issue from console
              width={200}
              height={200}
              alt={post.title}
            />
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
