import AddToCartButton from '@/app/(front)/_components/buttons/AddToCartButton';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProduct({ product }) {
  return (
    <div className='bg-zinc-800 text-white py-12'>
      <div className='_container gap-2'>
        <h1 className='!text-5xl !font-normal text-center sm:text-left'>
          {product.title}
        </h1>
        <div className='flex flex-col-reverse sm:grid sm:grid-cols-[.8fr_1.2fr] mt-3'>
          <div className='flex flex-col gap-5 justify-center'>
            <p className='text-sm text-gray-500 font-semibold'>
              {product.description}
            </p>
            <div className='flex flex-col sm:flex-row gap-2'>
              <Link
                href={'/products/' + product._id}
                className='btn-trans whitespace-nowrap'
              >
                Read more
              </Link>
              <AddToCartButton
                product={product}
                className='whitespace-nowrap'
              />
            </div>
          </div>
          <div className='relative size-full min-w-[200px] min-h-[200px] sm:min-h-[300px]'>
            <Image
              src={product.images[0]}
              alt='image'
              fill
              className='object-contain'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
