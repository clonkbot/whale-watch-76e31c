import { motion } from 'framer-motion';
import type { Wallet } from '../App';

interface WalletCardProps {
  wallet: Wallet;
  onToggleAlerts: () => void;
  onRemove: () => void;
}

const networkColors = {
  ETH: { bg: 'rgba(98,126,234,0.15)', border: 'rgba(98,126,234,0.4)', text: '#627EEA' },
  SOL: { bg: 'rgba(153,69,255,0.15)', border: 'rgba(153,69,255,0.4)', text: '#9945FF' },
  BTC: { bg: 'rgba(247,147,26,0.15)', border: 'rgba(247,147,26,0.4)', text: '#F7931A' },
};

export function WalletCard({ wallet, onToggleAlerts, onRemove }: WalletCardProps) {
  const colors = networkColors[wallet.network];

  return (
    <motion.div
      className="relative bg-[#0d0d14] border border-cyan-900/40 rounded-lg overflow-hidden group"
      whileHover={{ borderColor: 'rgba(34,211,238,0.5)' }}
    >
      {/* Active indicator line */}
      {wallet.isActive && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-cyan-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="p-3 md:p-4 pl-4 md:pl-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h3 className="font-display text-base md:text-lg font-bold text-cyan-50 truncate max-w-[200px] sm:max-w-none">
                {wallet.label}
              </h3>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0"
                style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
              >
                {wallet.network}
              </span>
              {wallet.isActive && (
                <motion.span
                  className="flex items-center gap-1 text-[10px] font-mono text-green-400 shrink-0"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  ACTIVE
                </motion.span>
              )}
            </div>

            <p className="font-mono text-[10px] md:text-xs text-cyan-600 mb-3 truncate">
              {wallet.address}
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <div>
                <p className="font-mono text-[9px] md:text-[10px] text-cyan-700 mb-0.5">BALANCE</p>
                <p className="font-mono text-xs md:text-sm text-cyan-300">{wallet.balance}</p>
              </div>
              <div>
                <p className="font-mono text-[9px] md:text-[10px] text-cyan-700 mb-0.5">LAST ACTIVITY</p>
                <p className="font-mono text-xs md:text-sm text-cyan-300">{wallet.lastActivity}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Alert Toggle */}
            <motion.button
              onClick={onToggleAlerts}
              className={`flex items-center gap-1.5 px-3 py-2 rounded font-mono text-[10px] md:text-xs transition-all min-h-[44px] min-w-[44px] justify-center ${
                wallet.alertsEnabled
                  ? 'bg-orange-950/50 border border-orange-500/50 text-orange-400'
                  : 'bg-cyan-950/30 border border-cyan-900/50 text-cyan-600 hover:text-cyan-400'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="hidden sm:inline">{wallet.alertsEnabled ? 'ALERTS ON' : 'ALERTS OFF'}</span>
            </motion.button>

            {/* Remove Button */}
            <motion.button
              onClick={onRemove}
              className="p-2 rounded bg-red-950/30 border border-red-900/30 text-red-600 hover:text-red-400 hover:border-red-500/50 transition-all opacity-50 group-hover:opacity-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.06), transparent 40%)',
        }}
      />
    </motion.div>
  );
}
