import { create } from 'zustand';

// interface WalletState {
//   accountId: string | null;
//   connectionState: HashConnectConnectionState | 'Disconnected';
//   setAccountId: (id: string | null) => void;
//   setConnectionState: (state: HashConnectConnectionState | 'Disconnected') => void;
// }

export const useWalletStore = create((set) => ({
  accountId: null,
  connectionState: 'Disconnected',
  setAccountId: (id) => set({ accountId: id }),
  setConnectionState: (state) => set({ connectionState: state }),
}));