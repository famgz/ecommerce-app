import AddToCartButton from '@/app/(front)/_components/buttons/AddToCartButton';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProduct({ product }) {
  return (
    <div className='bg-zinc-800 text-white py-12'>
      <div className='_container grid grid-cols-[.8fr_1.2fr] gap-2'>
        <div className='flex flex-col gap-5 justify-center'>
          <h1 className='text-5xl font-medium'>{product.title}</h1>
          <p className='text-sm text-gray-500 font-semibold'>
            {product.description}
          </p>
          <div className='flex gap-2'>
            <Link href='/' className='btn-trans '>
              Read more
            </Link>
            <AddToCartButton product={product} />
          </div>
        </div>
        <div className='relative min-h-[300px]'>
          <Image
            src={product.images[0]}
            alt='image'
            fill
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
}
