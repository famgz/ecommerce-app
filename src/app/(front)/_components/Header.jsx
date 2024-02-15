import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions, isAdmin } from '@/app/api/auth/[...nextauth]/route';
import LoginWithGoogle from '@/app/(front)/_components/buttons/LoginWithGoogle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <header className=' bg-zinc-800 text-white'>
      <div className='container flex justify-between py-4 max-w-4xl'>
        <Link href='/' className='flex gap-2'>
          <FontAwesomeIcon icon={faBagShopping} className='size-5' />
          Ecommerce
        </Link>
        <nav className='flex gap-3'>
          <Link href='/'>Home</Link>
          <Link href='/products'>All products</Link>
          <Link href='/categories'>Categories</Link>
          <Link href='/account'>Account</Link>
          <Link href='/cart'>Cart (0)</Link>
          {!user && (await isAdmin()) ? (
            <div>
              <LoginWithGoogle />
            </div>
          ) : (
            <div>
              <Link href='/dashboard'>Dashboard</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
