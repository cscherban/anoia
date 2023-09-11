'use client';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Login() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === 'loading') {
    return <p>Hang on there...</p>;
  }

  if (status === 'authenticated') {
    return (
      <>
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <main>
      Welcome to the GCK
      <p>Not signed in.</p>
      <button onClick={() => signIn('google')}>Sign in</button>
    </main>
  );
}
