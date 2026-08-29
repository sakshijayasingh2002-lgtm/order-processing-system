import React, { useState } from 'react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOrderPlaced = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Order Processing System</h1>
          <p className="text-sm text-gray-500 mt-1">Event-driven order pipeline powered by Kafka</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <OrderForm onOrderPlaced={handleOrderPlaced} />
        <OrderList refreshTrigger={refreshTrigger} />
      </main>
    </div>
  );
}

export default App;