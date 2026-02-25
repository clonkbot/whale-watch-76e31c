import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Wallet } from '../App';

interface AddWalletModalProps {
  onClose: () => void;
  onAdd: (wallet: Omit<Wallet, 'id' | 'balance' | 'lastActivity' | 'isActive'>) => void;
}

export function AddWalletModal({ onClose, onAdd }: AddWalletModalProps) {
  const [address, setAddress] = useState('');
  const [label, setLabel] = useState('');
  const [network, setNetwork] = useState<'ETH' | 'SOL' | 'BTC'>('ETH');
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim() || !label.trim()) return;

    onAdd({
      address: address.trim(),
      label: label.trim(),
      network,
      alertsEnabled,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md bg-[#0d0d14] border border-cyan-900/50 rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-cyan-900/50 bg-cyan-950/20">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg md:text-xl font-bold text-cyan-50">
              <span className="text-cyan-400">&gt;</span> ADD NEW WALLET
            </h2>
            <motion.button
              onClick={onClose}
              className="p-2 rounded hover:bg-cyan-950/50 text-cyan-600 hover:text-cyan-400 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-5">
          {/* Network Selection */}
          <div>
            <label className="block font-mono text-[10px] md:text-xs text-cyan-600 mb-2 tracking-wider">
              NETWORK
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['ETH', 'SOL', 'BTC'] as const).map((net) => (
                <motion.button
                  key={net}
                  type="button"
                  onClick={() => setNetwork(net)}
                  className={`py-3 rounded font-mono text-sm font-bold transition-all min-h-[48px] ${
                    network === net
                      ? net === 'ETH'
                        ? 'bg-[#627EEA]/20 border-2 border-[#627EEA] text-[#627EEA]'
                        : net === 'SOL'
                        ? 'bg-[#9945FF]/20 border-2 border-[#9945FF] text-[#9945FF]'
                        : 'bg-[#F7931A]/20 border-2 border-[#F7931A] text-[#F7931A]'
                      : 'bg-cyan-950/30 border border-cyan-900/50 text-cyan-600 hover:text-cyan-400'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {net}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Wallet Address */}
          <div>
            <label className="block font-mono text-[10px] md:text-xs text-cyan-600 mb-2 tracking-wider">
              WALLET ADDRESS
            </label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="0x... or bc1... or base58..."
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-cyan-900/50 rounded font-mono text-sm text-cyan-50 placeholder-cyan-800 focus:outline-none focus:border-cyan-500 transition-colors min-h-[48px]"
              required
            />
          </div>

          {/* Label */}
          <div>
            <label className="block font-mono text-[10px] md:text-xs text-cyan-600 mb-2 tracking-wider">
              LABEL
            </label>
            <input
              type="text"
              value={label}
              onChange={e => setLabel(e.target.value)}
              placeholder="e.g., Whale Alpha, DeFi Giant..."
              className="w-full px-4 py-3 bg-[#0a0a0f] border border-cyan-900/50 rounded font-mono text-sm text-cyan-50 placeholder-cyan-800 focus:outline-none focus:border-cyan-500 transition-colors min-h-[48px]"
              required
            />
          </div>

          {/* Enable Alerts Toggle */}
          <div className="flex items-center justify-between py-3 px-4 bg-cyan-950/20 rounded border border-cyan-900/30">
            <div>
              <p className="font-mono text-sm text-cyan-50">Enable Telegram Alerts</p>
              <p className="font-mono text-[10px] text-cyan-700">Get notified on transactions</p>
            </div>
            <motion.button
              type="button"
              onClick={() => setAlertsEnabled(!alertsEnabled)}
              className={`relative w-12 h-7 rounded-full transition-colors min-h-[44px] min-w-[48px] flex items-center ${
                alertsEnabled ? 'bg-cyan-600' : 'bg-cyan-950'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute w-5 h-5 bg-white rounded-full shadow-lg"
                animate={{ x: alertsEnabled ? 26 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 text-[#0a0a0f] font-mono font-bold text-sm rounded hover:from-cyan-500 hover:to-cyan-400 transition-all min-h-[52px]"
            whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(34,211,238,0.4)' }}
            whileTap={{ scale: 0.99 }}
          >
            START TRACKING
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
