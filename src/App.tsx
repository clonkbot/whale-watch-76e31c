import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletCard } from './components/WalletCard';
import { AddWalletModal } from './components/AddWalletModal';
import { TelegramSetup } from './components/TelegramSetup';
import { ActivityFeed } from './components/ActivityFeed';
import { ScanLines } from './components/ScanLines';

export interface Wallet {
  id: string;
  address: string;
  label: string;
  network: 'ETH' | 'SOL' | 'BTC';
  balance: string;
  lastActivity: string;
  isActive: boolean;
  alertsEnabled: boolean;
}

export interface Activity {
  id: string;
  walletLabel: string;
  type: 'transfer' | 'swap' | 'mint' | 'stake';
  amount: string;
  timestamp: Date;
  hash: string;
}

const mockWallets: Wallet[] = [
  {
    id: '1',
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f7bF4a',
    label: 'Vitalik.eth',
    network: 'ETH',
    balance: '245,892 ETH',
    lastActivity: '2 min ago',
    isActive: true,
    alertsEnabled: true,
  },
  {
    id: '2',
    address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    label: 'SOL Whale #42',
    network: 'SOL',
    balance: '1.2M SOL',
    lastActivity: '15 min ago',
    isActive: true,
    alertsEnabled: false,
  },
  {
    id: '3',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    label: 'Satoshi Reserve',
    network: 'BTC',
    balance: '50,000 BTC',
    lastActivity: '3 hours ago',
    isActive: false,
    alertsEnabled: true,
  },
];

const mockActivities: Activity[] = [
  { id: '1', walletLabel: 'Vitalik.eth', type: 'transfer', amount: '500 ETH', timestamp: new Date(Date.now() - 120000), hash: '0x1234...abcd' },
  { id: '2', walletLabel: 'SOL Whale #42', type: 'swap', amount: '50,000 USDC', timestamp: new Date(Date.now() - 900000), hash: '5xYz...9999' },
  { id: '3', walletLabel: 'Vitalik.eth', type: 'stake', amount: '1,000 ETH', timestamp: new Date(Date.now() - 1800000), hash: '0x5678...efgh' },
  { id: '4', walletLabel: 'Satoshi Reserve', type: 'transfer', amount: '100 BTC', timestamp: new Date(Date.now() - 10800000), hash: 'bc1q...wxyz' },
];

function App() {
  const [wallets, setWallets] = useState<Wallet[]>(mockWallets);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTelegramSetup, setShowTelegramSetup] = useState(false);
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time activity
  useEffect(() => {
    const interval = setInterval(() => {
      const randomWallet = wallets[Math.floor(Math.random() * wallets.length)];
      const types: Activity['type'][] = ['transfer', 'swap', 'mint', 'stake'];
      const amounts = ['100 ETH', '5,000 SOL', '0.5 BTC', '250,000 USDC'];

      const newActivity: Activity = {
        id: Date.now().toString(),
        walletLabel: randomWallet.label,
        type: types[Math.floor(Math.random() * types.length)],
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        timestamp: new Date(),
        hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, [wallets]);

  const addWallet = (wallet: Omit<Wallet, 'id' | 'balance' | 'lastActivity' | 'isActive'>) => {
    const newWallet: Wallet = {
      ...wallet,
      id: Date.now().toString(),
      balance: '---',
      lastActivity: 'Syncing...',
      isActive: true,
    };
    setWallets(prev => [...prev, newWallet]);
    setShowAddModal(false);
  };

  const toggleAlerts = (id: string) => {
    setWallets(prev => prev.map(w =>
      w.id === id ? { ...w, alertsEnabled: !w.alertsEnabled } : w
    ));
  };

  const removeWallet = (id: string) => {
    setWallets(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-cyan-50 relative overflow-x-hidden">
      <ScanLines />

      {/* Ambient glow effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-cyan-900/50 bg-[#0a0a0f]/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center relative"
                animate={{ boxShadow: ['0 0 20px rgba(34,211,238,0.5)', '0 0 40px rgba(34,211,238,0.8)', '0 0 20px rgba(34,211,238,0.5)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-6 h-6 md:w-7 md:h-7 text-[#0a0a0f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-cyan-400"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              <div>
                <h1 className="font-display text-xl md:text-2xl font-bold tracking-wider text-cyan-50">
                  WHALE<span className="text-cyan-400">WATCH</span>
                </h1>
                <p className="text-[10px] md:text-xs font-mono text-cyan-600 tracking-widest">REAL-TIME SURVEILLANCE SYSTEM</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <div className="font-mono text-xs md:text-sm text-cyan-500 bg-cyan-950/50 px-2 md:px-3 py-1.5 rounded border border-cyan-900/50">
                <span className="hidden sm:inline">UTC: </span>{currentTime.toUTCString().slice(17, 25)}
              </div>
              <motion.button
                onClick={() => setShowTelegramSetup(true)}
                className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded font-mono text-xs md:text-sm transition-all ${
                  telegramConnected
                    ? 'bg-green-950/50 border border-green-500/50 text-green-400'
                    : 'bg-orange-950/50 border border-orange-500/50 text-orange-400 hover:bg-orange-900/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z"/>
                </svg>
                <span className="hidden sm:inline">{telegramConnected ? 'Connected' : 'Connect Telegram'}</span>
                <span className="sm:hidden">{telegramConnected ? 'OK' : 'TG'}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {[
            { label: 'TRACKED', value: wallets.length.toString(), color: 'cyan' },
            { label: 'ACTIVE', value: wallets.filter(w => w.isActive).length.toString(), color: 'green' },
            { label: 'ALERTS ON', value: wallets.filter(w => w.alertsEnabled).length.toString(), color: 'orange' },
            { label: 'EVENTS/24H', value: '147', color: 'purple' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-${stat.color}-950/30 border border-${stat.color}-900/50 rounded-lg p-3 md:p-4`}
              style={{
                backgroundColor: stat.color === 'cyan' ? 'rgba(8,145,178,0.1)' :
                                stat.color === 'green' ? 'rgba(22,163,74,0.1)' :
                                stat.color === 'orange' ? 'rgba(234,88,12,0.1)' :
                                'rgba(147,51,234,0.1)',
                borderColor: stat.color === 'cyan' ? 'rgba(8,145,178,0.3)' :
                            stat.color === 'green' ? 'rgba(22,163,74,0.3)' :
                            stat.color === 'orange' ? 'rgba(234,88,12,0.3)' :
                            'rgba(147,51,234,0.3)'
              }}
            >
              <p className="font-mono text-[10px] md:text-xs text-cyan-600 tracking-wider">{stat.label}</p>
              <p className="font-display text-2xl md:text-3xl font-bold" style={{
                color: stat.color === 'cyan' ? '#22d3ee' :
                       stat.color === 'green' ? '#4ade80' :
                       stat.color === 'orange' ? '#fb923c' :
                       '#c084fc'
              }}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Wallets Section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
              <h2 className="font-display text-lg md:text-xl font-bold tracking-wider flex items-center gap-2">
                <span className="text-cyan-400">&gt;</span> MONITORED WALLETS
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </h2>
              <motion.button
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-[#0a0a0f] font-mono text-sm font-bold rounded transition-all min-h-[44px]"
                whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(34,211,238,0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">+</span> ADD WALLET
              </motion.button>
            </div>

            <div className="space-y-3 md:space-y-4">
              <AnimatePresence mode="popLayout">
                {wallets.map((wallet, i) => (
                  <motion.div
                    key={wallet.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <WalletCard
                      wallet={wallet}
                      onToggleAlerts={() => toggleAlerts(wallet.id)}
                      onRemove={() => removeWallet(wallet.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {wallets.length === 0 && (
                <div className="text-center py-12 md:py-16 border border-dashed border-cyan-900/50 rounded-lg">
                  <p className="font-mono text-cyan-600">No wallets tracked yet</p>
                  <p className="font-mono text-xs text-cyan-800 mt-1">Add your first whale wallet to begin surveillance</p>
                </div>
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-lg md:text-xl font-bold tracking-wider flex items-center gap-2 mb-4">
              <span className="text-orange-400">&gt;</span> LIVE FEED
              <motion.div
                className="px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded text-[10px] font-mono text-red-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                LIVE
              </motion.div>
            </h2>
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 md:mt-16 py-4 md:py-6 border-t border-cyan-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="font-mono text-[10px] md:text-xs text-cyan-800/60">
            Requested by <span className="text-cyan-700/80">@Nishant293</span> · Built by <span className="text-cyan-700/80">@clonkbot</span>
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <AddWalletModal
            onClose={() => setShowAddModal(false)}
            onAdd={addWallet}
          />
        )}
        {showTelegramSetup && (
          <TelegramSetup
            onClose={() => setShowTelegramSetup(false)}
            onConnect={() => {
              setTelegramConnected(true);
              setShowTelegramSetup(false);
            }}
            isConnected={telegramConnected}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
