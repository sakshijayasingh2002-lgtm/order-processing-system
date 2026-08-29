import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function OrderList({ refreshTrigger }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8081/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, []);
 useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, [fetchOrders, refreshTrigger]);

  const statusBadge = (status) => {
    const styles = {
      CONFIRMED: 'bg-green-100 text-green-700',
      FAILED: 'bg-red-100 text-red-700',
      PENDING: 'bg-amber-100 text-amber-700',
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.PENDING}`}>
        {status}
      </span>
    );
  };

  const confirmed = orders.filter((o) => o.status === 'CONFIRMED').length;
  const failed = orders.filter((o) => o.status === 'FAILED').length;
  const pending = orders.filter((o) => o.status === 'PENDING').length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Orders</h2>
        <div className="flex gap-3 text-xs">
          <span className="text-gray-500">Total: <span className="font-semibold text-gray-800">{orders.length}</span></span>
          <span className="text-green-600">Confirmed: <span className="font-semibold">{confirmed}</span></span>
          <span className="text-amber-600">Pending: <span className="font-semibold">{pending}</span></span>
          <span className="text-red-600">Failed: <span className="font-semibold">{failed}</span></span>
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-400 py-8 text-center">No orders yet — place one above.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="pb-2 font-medium">ID</th>
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium">Qty</th>
                <th className="pb-2 font-medium">Price</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice().reverse().map((order) => (
                <tr key={order.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-gray-500">#{order.id}</td>
                  <td className="py-3 font-medium text-gray-900">{order.productName}</td>
                  <td className="py-3 text-gray-600">{order.quantity}</td>
                  <td className="py-3 text-gray-600">₹{order.price}</td>
                  <td className="py-3">{statusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderList;