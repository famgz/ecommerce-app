import AddToCartButton from '@/app/(front)/_components/buttons/AddToCartButton';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductBox({ product }) {
  const { _id, title, description, price, images } = product;
  const url = '/product/' + _id;

  return (
    <div className='min-w-0'>
      <Link
        href={url}
        title={description}
        className='block gap-2 bg-white p-5 rounded-md shadow-md'
      >
        <div className='relative w-full h-[150px]'>
          <Image src={images?.[0]} alt='' fill className='object-contain' />
        </div>
      </Link>
      <h2 className='font-bold truncate' title={title}>
        {title}
      </h2>
      <div className='flex justify-between items-center'>
        <span className='text-2xl font-extrabold'>R$ {price}</span>
        <AddToCartButton product={product} test={false} showText={false} />
      </div>
    </div>
  );
}