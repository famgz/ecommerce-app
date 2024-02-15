'use client';

import {
  faBagShopping,
  faBars,
  faBoxArchive,
  faChevronLeft,
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
import { useState } from 'react';

export default function Nav() {
  const [showNav, setShowNav] = useState(false);

  const inactiveLink = 'flex items-center gap-2 p-1 ';
  const activeLink =
    inactiveLink +
    `bg-white text-primary/90 rounded-full md:rounded-l-full md:rounded-r-none
    pl-3 mr-4 md:-mr-6 -ml-2 font-bold shadow-md z-0`;

  const pathname = usePathname();

  function handleToggleNav() {
    setShowNav((prev) => !prev);
  }

  return (
    <div>
      {/* External toggle button */}
      <button
        className='absolute md:hidden left-6 top-6 z-20'
        onClick={handleToggleNav}
      >
        <FontAwesomeIcon icon={faBars} className='size-5' />
      </button>

      <aside
        className={
          (showNav ? 'left-0 shadow-lg' : '-left-full') +
          ' p-4 fixed md:static h-full w-[220px] bg-gray-200 duration-1000 z-20'
        }
      >
        <div className='flex gap-2 mb-4 p-1 relative'>
          <FontAwesomeIcon icon={faShop} className='size-5' />
          <span className='font-bold'>EcommerceAdmin</span>

          {/* Internal toggle button */}
          <button
            className=' absolute md:hidden right-0 z-50'
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faChevronLeft} className='size-5' />
          </button>
        </div>

        <nav className='grid gap-2'>
          {/* Dashboard */}
          <Link
            href={'/dashboard'}
            className={
              pathname.startsWith('/dashboard') ? activeLink : inactiveLink
            }
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faHouse} className='size-5' />
            Dashboard
          </Link>

          {/* Products */}
          <Link
            href={'/products'}
            className={
              pathname.startsWith('/products') ? activeLink : inactiveLink
            }
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faBoxArchive} className='size-5' />
            Products
          </Link>

          {/* Categories */}
          <Link
            href={'/categories'}
            className={
              pathname.startsWith('/categories') ? activeLink : inactiveLink
            }
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faLayerGroup} className='size-5' />
            Categories
          </Link>

          {/* Orders */}
          <Link
            href={'/orders'}
            className={
              pathname.startsWith('/orders') ? activeLink : inactiveLink
            }
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faList} className='size-5' />
            Orders
          </Link>

          {/* Settings */}
          <Link
            href={'/settings'}
            className={
              pathname.startsWith('/settings') ? activeLink : inactiveLink
            }
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faGear} className='size-5' />
            Settings
          </Link>

          {/* Site page */}
          <Link
            href={'/'}
            className={inactiveLink}
            onClick={() => setShowNav(false)}
          >
            <FontAwesomeIcon icon={faBagShopping} className='size-5' />
            Webpage
          </Link>

          {/* Logout */}
          <button className={inactiveLink} onClick={() => signOut()}>
            <FontAwesomeIcon icon={faRightFromBracket} className='size-5' />
            Logout
          </button>
        </nav>
      </aside>
    </div>
  );
}
