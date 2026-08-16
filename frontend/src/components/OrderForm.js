import React, { useState } from 'react';
import axios from 'axios';

function OrderForm({ onOrderPlaced }) {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/orders', {
        productName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      });
      setMessage(`Order placed! ID: ${response.data.id}, Status: ${response.data.status}`);
      setProductName('');
      setQuantity(1);
      setPrice('');
      if (onOrderPlaced) onOrderPlaced();
    } catch (error) {
      setMessage('Error placing order. Check console.');
      console.error(error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>Place an Order</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Product Name: </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Quantity: </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Price: </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OrderForm;