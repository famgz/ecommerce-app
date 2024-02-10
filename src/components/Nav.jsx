'use client';

import {
  faBoxArchive,
  faGear,
  faHouse,
  faLayerGroup,
  faList,
  faRightFromBracket,
  faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const inactiveLink = 'flex items-center gap-2 p-1';
  const activeLink =
    inactiveLink +
    ' bg-white text-blue-900 rounded-l-full pl-4 -mr-4 -ml-3 font-bold';

  const pathname = usePathname();

  return (
    <aside className='p-4'>
      <Link href='/' className='flex gap-2 mb-4 p-1'>
        <FontAwesomeIcon icon={faShop} className='h-5 w-5' />
        <span>EcommerceAdmin</span>
      </Link>

      <nav className='grid gap-2'>
        {/* Dashboard */}
        <Link
          href={'/'}
          className={pathname === '/' ? activeLink : inactiveLink}
        >
          <FontAwesomeIcon icon={faHouse} className='h-5 w-5' />
          Dashboard
        </Link>

        {/* Products */}
        <Link
          href={'/products'}
          className={
            pathname.startsWith('/products') ? activeLink : inactiveLink
          }
        >
          <FontAwesomeIcon icon={faBoxArchive} className='h-5 w-5' />
          Products
        </Link>

        {/* Categories */}
        <Link
          href={'/categories'}
          className={
            pathname.startsWith('/categories') ? activeLink : inactiveLink
          }
        >
          <FontAwesomeIcon icon={faLayerGroup} className='h-5 w-5' />
          Categories
        </Link>

        {/* Orders */}
        <Link
          href={'/orders'}
          className={pathname.startsWith('/orders') ? activeLink : inactiveLink}
        >
          <FontAwesomeIcon icon={faList} className='h-5 w-5' />
          Orders
        </Link>

        {/* Settings */}
        <Link
          href={'/settings'}
          className={
            pathname.startsWith('/settings') ? activeLink : inactiveLink
          }
        >
          <FontAwesomeIcon icon={faGear} className='h-5 w-5' />
          Settings
        </Link>

        {/* Settings */}
        <button className={inactiveLink} onClick={() => signOut()}>
          <FontAwesomeIcon icon={faRightFromBracket} className='h-5 w-5' />
          Logout
        </button>
      </nav>
    </aside>
  );
}
