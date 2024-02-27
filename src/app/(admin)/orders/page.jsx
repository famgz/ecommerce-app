'use client';

import ClampedId from '@/app/(admin)/_components/ClampedId';
import { formatToReal } from '@/app/_libs/utils';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then((res) => setOrders(res.data));
  }, []);

  function calculateOrderTotals(order) {
    return order.line_items.reduce(
      (acc, o) => acc + (o.quantity * o.price_data.unit_amount) / 100,
      0
    );
  }

  async function deleteOrder(order) {
    await axios
      .delete('/api/order?_id=' + order._id)
      .then((res) => console.log('deleted:', res.data))
      .finally(() => getCategories());
  }

  return (
    <div className='_container'>
      <h1>Orders</h1>

      {/* Categories list */}
      <div>
        <table className='table w-full mt-5'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Recipient</th>
              <th>Date</th>
              <th>Products</th>
              <th>Total</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 &&
              orders.map((order) => (
                <tr key={order._id} className=''>
                  {/* id */}
                  <td>
                    <ClampedId _id={order._id} />
                  </td>

                  {/* recipient */}
                  <td className='flex flex-col'>
                    <span>{order.user_data.name}</span>
                    <span>{order.user_data.email}</span>
                    <span>{order.user_data.city}</span>
                    <span>{order.user_data.postalCode}</span>
                    <span>{order.user_data.streetAddress}</span>
                    <span>{order.user_data.country}</span>
                  </td>

                  {/* date */}
                  <td>{new Date(order.createdAt).toLocaleString()}</td>

                  {/* quantity items */}
                  <td className='text-center'>
                    <ul>
                      {order.line_items.map((p) => (
                        <li key={p._id}>
                          {p.price_data.product_data.name} x {p.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* total */}
                  <td>{formatToReal(calculateOrderTotals(order))}</td>

                  {/* payment status */}
                  <td>{order.paid ? 'paid' : 'not paid'}</td>

                  {/* Buttons */}
                  <td className='flex justify-end flex-wrap gap-1 !px-0 max-w-[120px]'>
                    {/* edit button */}
                    <button
                      onClick={() => editCategory(order)}
                      className='btn-primary'
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className='size-3'
                      />
                    </button>

                    {/* delete button */}
                    <button
                      className='btn-white'
                      onClick={() => deleteOrder(order)}
                    >
                      <FontAwesomeIcon icon={faTrash} className='size-3' />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
