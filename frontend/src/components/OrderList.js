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
    const interval = setInterval(fetchOrders, 3000); // auto-refresh every 3 seconds
    return () => clearInterval(interval);
  }, [fetchOrders, refreshTrigger]);

  const statusColor = (status) => {
    if (status === 'CONFIRMED') return 'green';
    if (status === 'FAILED') return 'red';
    return 'orange'; // PENDING
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h2>Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>ID</th>
              <th style={{ textAlign: 'left' }}>Product</th>
              <th style={{ textAlign: 'left' }}>Qty</th>
              <th style={{ textAlign: 'left' }}>Price</th>
              <th style={{ textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice().reverse().map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td style={{ color: statusColor(order.status), fontWeight: 'bold' }}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderList;