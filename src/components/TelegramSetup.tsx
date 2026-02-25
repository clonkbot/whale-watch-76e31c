import { useState } from 'react';
import { motion } from 'framer-motion';

interface TelegramSetupProps {
  onClose: () => void;
  onConnect: () => void;
  isConnected: boolean;
}

export function TelegramSetup({ onClose, onConnect, isConnected }: TelegramSetupProps) {
  const [botToken, setBotToken] = useState('');
  const [chatId, setChatId] = useState('');
  const [testSent, setTestSent] = useState(false);

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!botToken.trim() || !chatId.trim()) return;
    onConnect();
  };

  const handleTestNotification = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
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
        className="w-full max-w-md bg-[#0d0d14] border border-cyan-900/50 rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 md:px-6 py-4 border-b border-cyan-900/50 bg-gradient-to-r from-[#0088cc]/20 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0088cc]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-cyan-50">TELEGRAM SETUP</h2>
                <p className="font-mono text-[10px] text-cyan-600">Configure notification alerts</p>
              </div>
            </div>
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

        {isConnected ? (
          /* Connected State */
          <div className="p-4 md:p-6">
            <div className="text-center py-6 md:py-8">
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="font-display text-xl font-bold text-green-400 mb-2">CONNECTED</h3>
              <p className="font-mono text-sm text-cyan-600">Telegram notifications are active</p>
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={handleTestNotification}
                className="w-full py-3 bg-[#0088cc]/20 border border-[#0088cc]/50 text-[#0088cc] font-mono text-sm rounded hover:bg-[#0088cc]/30 transition-all min-h-[48px]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {testSent ? '✓ Test notification sent!' : 'Send Test Notification'}
              </motion.button>

              <motion.button
                onClick={() => {
                  onClose();
                }}
                className="w-full py-3 bg-red-950/30 border border-red-900/50 text-red-400 font-mono text-sm rounded hover:bg-red-950/50 transition-all min-h-[48px]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Disconnect
              </motion.button>
            </div>
          </div>
        ) : (
          /* Setup Form */
          <form onSubmit={handleConnect} className="p-4 md:p-6 space-y-4 md:space-y-5">
            {/* Instructions */}
            <div className="bg-cyan-950/30 border border-cyan-900/50 rounded-lg p-3 md:p-4">
              <h4 className="font-mono text-xs text-cyan-400 mb-2">SETUP INSTRUCTIONS</h4>
              <ol className="font-mono text-[10px] md:text-xs text-cyan-600 space-y-1.5 list-decimal list-inside">
                <li>Create a bot via @BotFather on Telegram</li>
                <li>Copy the bot token provided</li>
                <li>Start a chat with your bot</li>
                <li>Get your Chat ID from @userinfobot</li>
              </ol>
            </div>

            {/* Bot Token */}
            <div>
              <label className="block font-mono text-[10px] md:text-xs text-cyan-600 mb-2 tracking-wider">
                BOT TOKEN
              </label>
              <input
                type="text"
                value={botToken}
                onChange={e => setBotToken(e.target.value)}
                placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-cyan-900/50 rounded font-mono text-xs md:text-sm text-cyan-50 placeholder-cyan-800 focus:outline-none focus:border-cyan-500 transition-colors min-h-[48px]"
                required
              />
            </div>

            {/* Chat ID */}
            <div>
              <label className="block font-mono text-[10px] md:text-xs text-cyan-600 mb-2 tracking-wider">
                CHAT ID
              </label>
              <input
                type="text"
                value={chatId}
                onChange={e => setChatId(e.target.value)}
                placeholder="123456789"
                inputMode="numeric"
                className="w-full px-4 py-3 bg-[#0a0a0f] border border-cyan-900/50 rounded font-mono text-sm text-cyan-50 placeholder-cyan-800 focus:outline-none focus:border-cyan-500 transition-colors min-h-[48px]"
                required
              />
            </div>

            {/* Alert Preferences */}
            <div className="space-y-2">
              <label className="block font-mono text-[10px] md:text-xs text-cyan-600 mb-2 tracking-wider">
                ALERT PREFERENCES
              </label>
              {[
                { label: 'Large Transfers (>$100k)', defaultChecked: true },
                { label: 'Token Swaps', defaultChecked: true },
                { label: 'NFT Activity', defaultChecked: false },
                { label: 'Staking/Unstaking', defaultChecked: true },
              ].map((pref, i) => (
                <label key={i} className="flex items-center gap-3 py-2 px-3 bg-cyan-950/20 rounded border border-cyan-900/30 cursor-pointer hover:bg-cyan-950/30 transition-colors min-h-[44px]">
                  <input
                    type="checkbox"
                    defaultChecked={pref.defaultChecked}
                    className="w-4 h-4 rounded border-cyan-900 bg-[#0a0a0f] text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
                  />
                  <span className="font-mono text-xs md:text-sm text-cyan-300">{pref.label}</span>
                </label>
              ))}
            </div>

            {/* Connect Button */}
            <motion.button
              type="submit"
              className="w-full py-3 md:py-4 bg-gradient-to-r from-[#0088cc] to-[#00a2e8] text-white font-mono font-bold text-sm rounded hover:from-[#0099dd] hover:to-[#00b3f9] transition-all min-h-[52px]"
              whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(0,136,204,0.4)' }}
              whileTap={{ scale: 0.99 }}
            >
              CONNECT TELEGRAM
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
