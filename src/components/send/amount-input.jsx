import React, { useState } from 'react';

const AmountInput = ({ amount, setAmount, max, rate }) => {
// Determine if the user has exceeded the available quantity
  const isOverLimit = parseFloat(amount) > max; 

  const handlePercentage = (percent) => {
    const calculated = (max * (percent / 100)).toFixed(2);
    setAmount(parseFloat(calculated).toString()); 
  };

  return (
    <div className={`bg-surface-container rounded-xl p-6 flex flex-col transition-shadow ${isOverLimit ? 'ring-1 ring-error/50' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <label className="block text-xs font-medium tracking-[0.1rem] uppercase text-on-surface-variant">
          Amount
        </label>
        {/* Visual Alert Indicator */}
        {isOverLimit && (
          <span className="text-[10px] font-bold text-red-500 animate-pulse">
            EXCEEDS BALANCE
          </span>
        )}
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        <input
          className={`bg-transparent border-none p-0 text-4xl font-headline font-bold focus:ring-0 placeholder-on-surface-variant/30 transition-colors ${
            isOverLimit ? 'text-red-500' : 'text-on-surface'
          }`}
          placeholder="0.00"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} 
        />
        {/* <div className="text-xs text-on-surface-variant mt-1">
          ≈ ${amount ? (parseFloat(amount) * rate).toLocaleString() : '0.00'} USD 
        </div> */}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handlePercentage(25)} 
          className="text-[10px] font-bold bg-surface-container-lowest px-2 py-1 rounded hover:bg-primary/20 transition-all text-on-surface"
        >
          25%
        </button>
        <button
          onClick={() => handlePercentage(50)} 
          className="text-[10px] font-bold bg-surface-container-lowest px-2 py-1 rounded hover:bg-primary/20 transition-all text-on-surface"
        >
          50%
        </button>
        <button
          onClick={() => handlePercentage(100)} 
          className="text-[10px] font-bold bg-surface-container-lowest px-2 py-1 rounded hover:bg-primary/20 transition-all text-on-surface"
        >
          MAX
        </button>
      </div>
    </div>
  );
};

export default AmountInput;