import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Post from '../components/post';
import { prisma } from '../lib/prisma';
import styles from '../styles/Home.module.css';

interface IUser {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    bio: string;
    userName: string;
  }[];
}

export interface IPost {
  posts: {
    id: number;
    title: string;
    content: string;
    image: string;
    User: {
      email: string;
      id: number;
      userName: string;
    };
  }[];
}
// import session form next auth
interface IHome extends IUser, IPost {}

const Home: FC<IHome> = (props) => {
  const { user, posts } = props;
  const { data: session, status } = useSession();
  // console.log(session);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (e: any) => {
    // Fix the type check of e
    e.preventDefault();
    const bio = e.currentTarget.bio.value;

    const email = e.currentTarget.user.value;

    const userName = e.currentTarget.userName.value;

    await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bio, email, userName }),
    });
    refreshData();
  };

  const handleFollow = async (e: any, bio: any) => {
    e.preventDefault();
    const email = session?.user?.email;
    const followingUser = bio.id;
    await fetch('/api/follow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, followingUser }),
    });
  };
  const bioFrom = (
    <>
      <form onSubmit={handleSubmit}>
        {/* add username */}
        <input
          type="text"
          name="userName"
          placeholder="Please enter your username"
        />
        <input type="bio" name="bio" placeholder="Please enter your bio" />
        <input
          type="email"
          name="user"
          // Remove this exclamtion mark in the future
          value={session?.user?.email!}
          disabled
        />
        <button type="submit">Submit</button>
      </form>
      <Link href="/api/auth/signout">
        <h1>Sign out</h1>
      </Link>
    </>
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {user.map((bio: any) => {
          return (
            <form onSubmit={(e: any) => handleFollow(e, bio)} key={bio.id}>
              <h1>{bio.bio}</h1>
              <h1>{bio.email}</h1>
              <h1>{bio.userName}</h1>
              {/* Show the follow button for all users but the one that is currently logged in  */}
              {session?.user?.email !== bio.email && (
                // if the user is already follwing the user, show the unfollow button
                <button
                  type="submit"
                  // onClick={(e: any) => handleFollow(e, bio)}
                >
                  Follow
                </button>
              )}
            </form>
          );
        })}
        {status === 'authenticated' ? (
          bioFrom
        ) : (
          <div>
            <Link href="/api/auth/signin">
              <h1>Please sign in</h1>
            </Link>
          </div>
        )}
        <h1>Post</h1>
        <Post posts={posts} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const user = await prisma.user.findMany();
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      image: true,
      User: {
        select: {
          email: true,
          id: true,
        },
      },
    },
  });

  return {
    props: { user, posts },
  };
}
