import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <div className='text-blue-900 flex justify-between'>
      <h2 className='font-bold'>Hello, {user?.name}</h2>
      <div className='flex bg-gray-300 text-black rounded-lg overflow-hidden'>
        <div className='relative h-full w-10'>
          <Image
            src={user?.image}
            alt='avatar'
            fill={true}
            className='object-cover'
          />
        </div>
        <span className='py-1 px-2'>{user?.name}</span>
      </div>
    </div>
  );
}
