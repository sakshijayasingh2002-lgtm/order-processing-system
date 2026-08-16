import React, { useState } from 'react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOrderPlaced = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Order Processing System</h1>
      <OrderForm onOrderPlaced={handleOrderPlaced} />
      <OrderList refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default App;