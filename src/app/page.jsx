import Nav from '@/components/Nav';
import LoginWithGoogle from '@/components/buttons/LoginWithGoogle';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className='flex items-center'>
        <div className='text-center w-full'>
          <LoginWithGoogle />
        </div>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen'>
      <Nav />
      <div className='bg-white text-black flex-grow m-2 ml-0 rounded-lg p-4'>logged in: {session?.user?.email}</div>
    </div>
  );
}
