import { useSession } from 'next-auth/react';

const Post = () => {
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    const email = session?.user?.email;

    await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content, email }),
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="title" name="title" placeholder="Title" />
        <input type="content" name="content" placeholder="Content" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Post;
