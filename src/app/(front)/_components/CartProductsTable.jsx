import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

export default function CartProductsTable({ products, cartContext, total }) {
  const { addProduct, removeProduct, removeAllOfProductId } = cartContext;

  const quantityButtonStyle =
    'inline-flex items-center justify-center text-center bg-gray-400 rounded-full size-5 text-white font-bold';

  function increaseProductQuantity(_id) {
    addProduct(_id);
  }

  function decreaseProductQuantity(_id, quantity) {
    if (quantity <= 1) {
      return;
    }
    removeProduct(_id);
  }

  return (
    // <div>
    <table className='table w-full border-spacing-y-3'>
      <thead>
        <tr className='text-gray-700'>
          <th className='text-left !pl-0'>PRODUCT</th>
          <th className=''>PRICE</th>
          <th>QUANTITY</th>
          <th>TOTAL</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='text-center'>
        {products.map((p, i) => (
          <tr key={i}>
            {/* TITLE AND IMAGE */}
            <td className='!pl-0'>
              <span className='block font-bold text-left'>{p.title}</span>
              <div className='relative size-[84px] md:size-[128px] mr-auto rounded-md border'>
                <Image
                  src={p.images[0]}
                  alt={p.description}
                  fill
                  className='object-contain p-4'
                />
              </div>
            </td>

            {/* PRICE */}
            <td>
              <span className='font-medium text-lg'>R${p.price}</span>
            </td>

            {/* QUANTITY */}
            <td>
              <div className='flex items-center justify-center'>
                {/* quantity - */}
                <button
                  className={quantityButtonStyle}
                  onClick={() => decreaseProductQuantity(p._id, p.quantity)}
                >
                  -
                </button>
                {/* quantity value */}
                <span className='py-1 px-3 mx-2 border rounded-md font-bold text-gray-600 text-lg'>
                  {p.quantity}
                </span>
                {/* quantity + */}
                <button
                  className={quantityButtonStyle}
                  onClick={() => increaseProductQuantity(p._id)}
                >
                  +
                </button>
              </div>
            </td>

            {/* TOTAL PRICE */}
            <td>
              <span className='font-bold text-xl '>
                R${p.price * p.quantity}
              </span>
            </td>

            {/* DELETE BUTTON */}
            <td className='!pr-0'>
              <button
                className='w-full p-2 text-right'
                onClick={() => removeAllOfProductId(p._id)}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className='size-4 text-gray-500'
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      {/* TOTALS */}
      <tfoot>
        <tr>
          <th className='text-left text-xl'>TOTAL</th>
          <td colSpan={3} className='font-bold text-xl text-right'>
            R${total}
          </td>
          <td className='!pr-0'>
            <button
              className='w-full p-2 text-right'
              onClick={() => removeAllOfProductId(p._id)}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className='size-4 text-gray-500'
              />
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
    // </div>
  );
}
// }
