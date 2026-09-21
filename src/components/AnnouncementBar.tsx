import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!settings.announcementBarEnabled || dismissed) {
    return null;
  }

  return (
    <aside 
      aria-label="Promotional announcement"
      className="bg-stone-900 text-stone-100 text-xs font-medium py-2 px-4 transition-all duration-300 relative border-b border-stone-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden sm:flex items-center gap-2 text-stone-400">
          <Truck size={13} className="text-emerald-400" />
          <span>Fast 2-3 Day Delivery</span>
        </div>

        <div className="flex-1 text-center flex items-center justify-center gap-2 px-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="truncate tracking-wide">
            {settings.announcementBarText}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-stone-400">
            <ShieldCheck size={13} className="text-amber-400" />
            <span>30-Day Risk-Free Trial</span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-stone-400 hover:text-white p-0.5 rounded transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};
