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
    <div>
      <Nav />
      <div>logged in: {session?.user?.email}</div>
    </div>
  );
}
