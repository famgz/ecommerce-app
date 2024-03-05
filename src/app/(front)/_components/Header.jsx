import HeaderLinks from '@/app/(front)/_components/HeaderLinks';
import { authOptions, isAdmin } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <header className='bg-zinc-800 text-zinc-400'>
      <div className='_container flex justify-between py-6 max-w-4xl'>
        <HeaderLinks user={user} isAdmin={await isAdmin()} />
      </div>
    </header>
  );
}
