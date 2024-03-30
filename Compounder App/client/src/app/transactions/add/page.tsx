"use client"
import { useState } from 'react';
import { Transaction } from '@/models/transaction.interface';
import { addToFirebase } from '@/db';

const AddTransaction = () => {
  const [formData, setFormData] = useState<Transaction>({
    createdAt: new Date(),
    action: 'buy',
    symbol: '',
    unit: 0,
    price: 0,
    investedRM: 0,
    investedUSD: 0,
    rate: 1,
    transactionDate: new Date(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transactionId = await addToFirebase<Transaction>('transactions', formData);
    console.log(transactionId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>
        Action:
        <select
          name="action"
          value={formData.action}
          onChange={handleChange}
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </label>

      <label>
        Symbol:
        <input
          type="text"
          name="symbol"
          value={formData.symbol}
          onChange={handleChange}
        />
      </label>
      <label>
        Symbol:
        <input
          type="text"
          name="symbol"
          value={formData.symbol}
          onChange={handleChange}
        />
      </label>
      <label>
        Unit:
        <input
          type="number"
          name="unit"
          value={formData.symbol}
          onChange={handleChange}
        />
      </label>
      <label>
        Rate:
        <input
          type="number"
          name="rate"
          value={formData.symbol}
          onChange={handleChange}
        />
      </label>
    </form>
  )
}

export default AddTransaction