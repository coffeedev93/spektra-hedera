'use client';

import { getRegistryEntry } from '@/lib/service';
import React, { useState, useEffect } from 'react';

const UserInputComponent = ({ 
  username, 
  setUsername,
  metaAddress,
  setMetaAddress,
  isReadonly 
}) => {
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    // Don't trigger search if the input is empty or just whitespace
    if (!username.trim()) {
      setIsWaiting(false);
      return;
    }
    setIsWaiting(true);

    const delayDebounceFn = setTimeout(async () => {
      const {data} = await getRegistryEntry(username);
      // the change in metaAddress triggers generateStealthAddress() in the index page
      setMetaAddress(data);
      setIsWaiting(false);
    }, 1000);

    // Cleanup: If the user types again, kill the previous 3s timer
    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  return (
    <div className="relative group">
      <input
        className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 focus:ring-primary rounded-md py-4 pl-4 pr-12 text-on-surface font-body text-lg transition-all"
        placeholder="Enter @user or 0x..." 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)} 
        readOnly={isReadonly}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
        {isWaiting && (
          <div
            className="flex items-center gap-2 bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full border border-secondary-container/30">
            <span
              className="w-2 h-2 rounded-full bg-secondary animate-bounce shadow-[0_0_8px_#fff3ab]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Verifiying</span>
          </div>
        )}
        {!isWaiting && !metaAddress && (
          <div
            className="flex items-center gap-2 bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full border border-secondary-container/30">
            <span
              className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#690005]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Not Found</span>
          </div>
        )}
        {!isWaiting && metaAddress && (
          <div
            className="flex items-center gap-2 bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full border border-secondary-container/30">
            <span
              className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#fff3ab]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Resolved</span>
          </div>
        )}
      </div>
    </div>
  )
};

export default UserInputComponent;