'use client';

import ClampedId from '@/app/(admin)/dashboard/_components/ClampedId';
import DeleteButton from '@/app/(admin)/dashboard/_components/DeleteButton';
import { formatToReal } from '@/app/_libs/utils';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  function calculateOrderTotals(order) {
    return order.line_items.reduce(
      (acc, o) => acc + (o.quantity * o.price_data.unit_amount) / 100,
      0
    );
  }

  function getOrders() {
    axios.get('/api/orders').then((res) => setOrders(res.data));
  }

  async function deleteOrder(order) {
    await axios.delete('/api/orders?_id=' + order._id).then((res) => {
      getOrders();
      console.log('deleted:', res.data);
    });
  }

  return (
    <div className='_container'>
      <h1>Orders</h1>

      {/* Categories list */}
      <div>
        <table className='table w-full mt-5'>
          <thead>
            <tr>
              <th>ID / Date</th>
              <th>Recipient</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 &&
              orders.map((order) => (
                <tr key={order._id} className='align-top text-sm'>
                  <td>
                    {/* id */}
                    <ClampedId _id={order._id} />

                    {/* date */}
                    <span className='inline-block font-medium mt-3'>
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </td>

                  {/* recipient */}
                  <td>
                    <div className='flex flex-col'>
                      <span>{order.user_data.name}</span>
                      <span>{order.user_data.email}</span>
                      <span>{order.user_data.city}</span>
                      <span>{order.user_data.postalCode}</span>
                      <span>{order.user_data.streetAddress}</span>
                      <span>{order.user_data.country}</span>
                    </div>
                  </td>

                  {/* quantity items */}
                  <td>
                    <div className='flex flex-col h-full justify-between gap-2'>
                      <ul className='text-sm'>
                        {order.line_items.map((p) => (
                          <li
                            key={p._id}
                            className='flex justify-between mb-1 gap-1'
                          >
                            <span className='truncate'>
                              {p.price_data.product_data.name}
                            </span>
                            <span className='bg-light rounded-md px-1 border whitespace-nowrap'>
                              x {p.quantity}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className='flex flex-col gap-2 mt-4'>
                        <div className='flex justify-between'>
                          {/* total */}

                          <span className='text-left whitespace-nowrap font-bold'>
                            TOTAL
                          </span>
                          <span className='text-left whitespace-nowrap font-bold'>
                            {formatToReal(calculateOrderTotals(order))}
                          </span>
                        </div>

                        {/* payment status */}
                        <span
                          className={`text-center text-white font-medium rounded-md ${
                            order.paid ? 'bg-green-400' : 'bg-red-300'
                          }`}
                        >
                          {order.paid ? 'paid' : 'not paid'}
                        </span>

                        {/* buttons */}
                        <div className='flex gap-1 mt-auto'>
                          {/* edit button */}
                          <button
                            onClick={() => editCategory(order)}
                            className='btn-primary !py-1 w-full'
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className='size-4'
                            />
                          </button>

                          {/* delete button */}
                          <DeleteButton
                            onDelete={() => deleteOrder(order)}
                            className='w-full'
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
