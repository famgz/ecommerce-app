import ProductBox from '@/app/(front)/_components/ProductBox';

export default function ProductsGrid({ newProducts }) {
  return (
    <div className='grid grid-cols-[repeat(2,_1fr)] md:grid-cols-[repeat(4,_1fr)] gap-8 pt-5'>
      {newProducts?.length > 0 &&
        newProducts.map((p) => <ProductBox key={p._id} product={p} />)}
    </div>
  );
}
