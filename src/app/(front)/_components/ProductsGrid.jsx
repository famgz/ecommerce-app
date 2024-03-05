import ProductBox from '@/app/(front)/_components/ProductBox';

export default function ProductsGrid({ products }) {
  return (
    <div
      className='
        grid grid-cols-[repeat(1,_1fr)] 
        xs:grid-cols-[repeat(2,_1fr)] 
        md:grid-cols-[repeat(4,_1fr)] gap-8 pt-5'
    >
      {products?.length > 0 &&
        products.map((p) => <ProductBox key={p._id} product={p} />)}
    </div>
  );
}
