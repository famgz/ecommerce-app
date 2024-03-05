import HeaderCartLink from '@/app/(front)/_components/HeaderCartLink';
import LoginWithGoogle from '@/app/(front)/_components/buttons/LoginWithGoogle';
import LogOutButton from '@/app/(front)/_components/buttons/LogoutButton';
import { authOptions, isAdmin } from '@/app/api/auth/[...nextauth]/route';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <header className='bg-zinc-800 text-white'>
      <div className='_container flex justify-between py-4 max-w-4xl'>
        <Link href='/' className='flex gap-2'>
          <FontAwesomeIcon icon={faBagShopping} className='size-5' />
          Ecommerce
        </Link>
        <nav className='hidden md:flex gap-3 text-zinc-400 font-medium'>
          <Link href='/'>Home</Link>
          <Link href='/products'>All products</Link>
          <Link href='/categories'>Categories</Link>
          <Link href='/account'>Account</Link>
          <HeaderCartLink />
          {user ? <LogOutButton /> : <LoginWithGoogle />}
          {user && (await isAdmin()) && (
            <Link href='/dashboard'>Dashboard</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
