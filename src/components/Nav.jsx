import {
  faBoxArchive,
  faGear,
  faHouse,
  faList,
  faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Nav(params) {

  const inactiveLink = 'flex items-center gap-2 p-1'
  const activeLink = inactiveLink + ' bg-white text-blue-900 rounded-l-lg -mr-4'

  return (
    <aside className='p-4'>
      <Link href='/' className='flex gap-2 mb-4'>
        <FontAwesomeIcon icon={faShop} className='h-5 w-5' />
        <span>EcommerceAdmin</span>
      </Link>
      <nav className='grid gap-2'>
        <Link href={'/'} className={activeLink}>
          <FontAwesomeIcon icon={faHouse} className='h-5 w-5' />
          Dashboard
        </Link>

        <Link href={'/products'} className={inactiveLink}>
          <FontAwesomeIcon icon={faBoxArchive} className='h-5 w-5' />
          Products
        </Link>

        <Link href={'/orders'} className={inactiveLink}>
          <FontAwesomeIcon icon={faList} className='h-5 w-5' />
          Orders
        </Link>

        <Link href={'/settings'} className={inactiveLink}>
          <FontAwesomeIcon icon={faGear} className='h-5 w-5' />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
