import React, { useState } from 'react';

export default function AssetSelector({ token, setToken }) {
  const assets = [
    {
      id: 'HBAR',
      symbol: 'Ξ',
      name: 'HBAR',
      balance: '10 HBAR Available',
      iconBg: 'bg-[#627eea]',
      iconSize: 'text-xs',
    },
    {
      id: 'USDC',
      symbol: '$',
      name: 'USDC',
      balance: '20.00 USDC',
      iconBg: 'bg-[#2775ca]',
      iconSize: 'text-[10px]',
    },
  ];

  return (
    <div className="space-y-2">
      {assets.map((asset) => {
        const isActive = token === asset.id;

        return (
          <button
            key={asset.id}
            onClick={() => setToken(asset.id)}
            className={`w-full flex items-center justify-between p-3 rounded-md transition-all ${
              isActive
                ? 'bg-surface-container-high border border-primary/20 hover:bg-surface-container-highest'
                : 'bg-surface-container-lowest border border-transparent hover:bg-surface-container-high'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${asset.iconBg} ${asset.iconSize}`}
              >
                {asset.symbol}
              </div>
              <div className="text-left">
                <div className={`text-sm font-bold ${!isActive ? 'opacity-60' : ''}`}>
                  {asset.name}
                </div>
                <div className="text-[10px] text-on-surface-variant">
                  {asset.balance}
                </div>
              </div>
            </div>
            
            {/* Only render the checkmark if the asset is active */}
            {isActive && (
              <span
                className="material-symbols-outlined text-primary"
                data-icon="check_circle"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};