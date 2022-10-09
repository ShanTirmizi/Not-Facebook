import { signIn, signOut, useSession } from 'next-auth/react';

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <h1>Welcome, {session?.user?.name}</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <h1>You need to sign in</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default Login;
