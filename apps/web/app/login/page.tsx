'use client';
import { google } from 'googleapis';
import { signIn, signOut, useSession } from 'next-auth/react';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
  }
}

export default function Login() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === 'loading') {
    return <p>Hang on there...</p>;
  }

  if (status === 'authenticated') {
    const classroom = google.classroom({
      version: 'v1',
      auth: session.accessToken,
    });

    classroom.courses.list().then((res) => {
      console.log("Sasha's course", res.data);
    });

    return (
      <>
        <p>{JSON.stringify(session)}</p>
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
