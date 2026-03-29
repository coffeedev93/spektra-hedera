import { create } from 'zustand';

// interface WalletState {
//   accountId: string | null;
//   connectionState: HashConnectConnectionState | 'Disconnected';
//   setAccountId: (id: string | null) => void;
//   setConnectionState: (state: HashConnectConnectionState | 'Disconnected') => void;
// }

export const useWalletStore = create((set) => ({
  accountId: null,
  accountData: null,
  userMetaKeys: null,
  isConnected: false,
  connectionState: 'Disconnected',
  setAccountId: (id) => set({ accountId: id }),
  setAccountData: (data) => set({ accountData: data }),
  setUserMetaKeys: (obj) => set({ userMetaKeys: obj }),
  setIsConnected: (bool) => set({ isConnected: bool }),
  setConnectionState: (state) => set({ connectionState: state }),
}));