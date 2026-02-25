import { motion } from 'framer-motion';
import type { Activity } from '../App';

interface ActivityFeedProps {
  activities: Activity[];
}

const typeConfig = {
  transfer: { icon: '↗', color: '#22d3ee', label: 'TRANSFER' },
  swap: { icon: '⇄', color: '#a855f7', label: 'SWAP' },
  mint: { icon: '✦', color: '#4ade80', label: 'MINT' },
  stake: { icon: '⬡', color: '#f97316', label: 'STAKE' },
};

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-[#0d0d14] border border-cyan-900/40 rounded-lg overflow-hidden">
      {/* Terminal Header */}
      <div className="px-3 md:px-4 py-2 border-b border-cyan-900/40 bg-cyan-950/20 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
        </div>
        <span className="font-mono text-[10px] text-cyan-700">activity_monitor.exe</span>
      </div>

      {/* Activity List */}
      <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-transparent">
        {activities.map((activity, i) => {
          const config = typeConfig[activity.type];
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="px-3 md:px-4 py-3 border-b border-cyan-900/20 hover:bg-cyan-950/20 transition-colors group"
            >
              <div className="flex items-start gap-2 md:gap-3">
                {/* Type Icon */}
                <div
                  className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-base md:text-lg shrink-0"
                  style={{ backgroundColor: `${config.color}20`, color: config.color }}
                >
                  {config.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs md:text-sm text-cyan-100 truncate max-w-[120px] md:max-w-none">
                      {activity.walletLabel}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shrink-0"
                      style={{ backgroundColor: `${config.color}20`, color: config.color }}
                    >
                      {config.label}
                    </span>
                  </div>

                  <p className="font-mono text-xs text-cyan-300 mt-0.5">{activity.amount}</p>

                  <div className="flex items-center gap-2 md:gap-3 mt-1.5">
                    <span className="font-mono text-[9px] md:text-[10px] text-cyan-700">
                      {formatTimestamp(activity.timestamp)}
                    </span>
                    <span className="font-mono text-[9px] md:text-[10px] text-cyan-800 truncate max-w-[80px] md:max-w-[100px] group-hover:text-cyan-600 transition-colors">
                      {activity.hash}
                    </span>
                  </div>
                </div>

                {/* New indicator for recent activities */}
                {i === 0 && (
                  <motion.div
                    className="px-1.5 py-0.5 bg-cyan-500/20 border border-cyan-500/50 rounded text-[9px] font-mono text-cyan-400 shrink-0"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    NEW
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}

        {activities.length === 0 && (
          <div className="px-4 py-8 text-center">
            <p className="font-mono text-sm text-cyan-700">No activity detected</p>
            <p className="font-mono text-xs text-cyan-800 mt-1">Monitoring for transactions...</p>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-3 md:px-4 py-2 border-t border-cyan-900/40 bg-cyan-950/10">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-mono text-[10px] text-cyan-700">
            Scanning blockchain... <span className="text-cyan-500">{activities.length}</span> events logged
          </span>
        </div>
      </div>
    </div>
  );
}
