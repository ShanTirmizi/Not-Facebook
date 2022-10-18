import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Post from '../components/post';
import prisma from '../lib/prisma';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const profile = await prisma.profile.findMany();
  // get the user from the userId
  // get users from based on the userId

  return {
    props: { profile },
  };
}

// import session form next auth
const Home = ({ profile }) => {
  const { data: session, status } = useSession();
  // console.log(profile, users);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a new bio from the form data
    const bio = {
      bio: e.currentTarget.bio.value,
    };
    const email = {
      email: e.target.user.value,
    };

    // Send the bio to the API

    await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // send the bio and the email as a JSON string
      body: JSON.stringify({ bio, email }),
    });
    // Redirect to the bio page

    // const formData = new FormData(e.currentTarget);

    // const bio = formData.get('bio');

    // const data = await fetch('/api/post', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ bio }),
    // });
  };
  const bioFrom = (
    <>
      <form onSubmit={handleSubmit}>
        <input type="bio" name="bio" placeholder="Please enter your bio" />
        <input type="email" name="user" value={session?.user?.email} disabled />
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
        {profile.map((bio) => {
          //  get the user object from bio

          return (
            <div key={bio.id}>
              <h1>{bio.bio}</h1>
              <h1>{bio.email}</h1>
              <h1>{bio.userName}</h1>
            </div>
          );
        })}
        {/* Create a form that submits to prisma  */}
        {status === 'authenticated' ? (
          // <form onSubmit={handleSubmit}>
          //   <input type="bio" name="bio" placeholder="Please enter your bio" />
          //   <input
          //     type="email"
          //     name="user"
          //     value={session?.user?.email}
          //     disabled
          //   />
          //   <button type="submit">Submit</button>
          // </form>
          bioFrom
        ) : (
          <div>
            <Link href="/api/auth/signin">
              <h1>Please sign in</h1>
            </Link>
          </div>
        )}
        <h1>Post</h1>
        <Post />
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

// export async function getStaticProps() {
//   const res = await fetch('http://localhost:3000/api/post');
//   const data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// }

// Get the profile data from the API from prisma
