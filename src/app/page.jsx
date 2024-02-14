import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className='text-blue-900'>
      <h2 className='font-bold text-center grow'>Hello, {user?.name}</h2>
      <div className='absolute top-4 right-4 flex items-center bg-gray-300 text-black rounded-lg overflow-hidden'>
        <div className='relative h-10 w-10'>
          <Image src={user?.image} alt='avatar' fill className='object-cover' />
        </div>
        <span className='py-1 px-2'>{user?.name}</span>
      </div>
    </div>
  );
}
