/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Banana, Zap, Shield, Sparkles, Cpu, Globe, MousePointer2, Activity, Database, Terminal } from 'lucide-react';

interface Transaction {
  id: string;
  address: string;
  amount: number;
  timestamp: number;
}

export default function App() {
  const [bananas, setBananas] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleBananaClick = (e: React.MouseEvent) => {
    const amount = 1;
    setBananas(prev => prev + amount);
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 100);

    const clickId = Date.now();
    const newClick = { id: clickId, x: e.clientX, y: e.clientY };
    setClicks(prev => [...prev, newClick]);
    
    // Add to ledger
    const newTx: Transaction = {
      id: Math.random().toString(36).substring(7),
      address: `xrb_${Math.random().toString(36).substring(2, 8)}...${Math.random().toString(36).substring(2, 5)}`,
      amount,
      timestamp: Date.now()
    };
    setTransactions(prev => [newTx, ...prev].slice(0, 5));

    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== clickId));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-[#FFE135] selection:text-black flex flex-col">
      {/* Structural Border */}
      <div className="fixed inset-0 border-8 border-[#1A1A1A] pointer-events-none z-50" />

      {/* Header Navigation */}
      <header className="h-20 flex items-center justify-between px-12 border-b border-white/10 relative z-40 bg-[#050505]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFE135] to-[#D4AF37] flex items-center justify-center text-black font-bold text-xs">NB</div>
          <span className="text-[10px] tracking-[0.4em] font-semibold uppercase opacity-80">Nano Banana</span>
        </div>
        <nav className="hidden md:flex gap-10">
          <a href="#" className="text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Protocol</a>
          <a href="#" className="text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Nodes</a>
          <a href="#" className="text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">Docs</a>
          <button 
            onClick={() => setBananas(prev => prev + 1000)}
            className="text-[11px] uppercase tracking-widest text-[#FFE135] hover:brightness-125 transition-all"
          >
            Join Network
          </button>
        </nav>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative z-10">
        {/* Left Branding Section */}
        <section className="w-full lg:w-[60%] p-8 md:p-16 flex flex-col justify-between border-r border-white/10 overflow-y-auto lg:overflow-visible">
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-3 py-1 border border-[#FFE135]/40 text-[#FFE135] text-[10px] uppercase tracking-[0.2em] rounded-full"
            >
              Version 4.2.0-STABLE — FREE
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[80px] md:text-[120px] lg:text-[140px] leading-[0.8] font-light tracking-tighter"
            >
              NANO<br/><span className="italic font-serif text-[#FFE135]">BANANA</span>
            </motion.h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mt-12 lg:mt-0"
          >
            <p className="text-xl text-white/60 leading-relaxed font-light mb-8">
              A zero-fee, instant-latency distributed fruit ledger designed for high-througput human interaction. Fully open-source and egalitarian by design.
            </p>
            <div className="flex gap-12 border-t border-white/5 pt-8">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">License</span>
                <span className="text-sm font-medium tracking-tight">MIT / Public Domain</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Cost Per Tx</span>
                <span className="text-sm font-medium text-[#FFE135] tracking-tight">$0.00 USD</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Protocol</span>
                <span className="text-sm font-medium tracking-tight">ORV / Direct DAG</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Right Dashboard Section */}
        <section className="w-full lg:w-[40%] bg-[#0A0A0A] p-8 md:p-16 flex flex-col justify-between overflow-y-auto lg:overflow-visible">
          <div className="space-y-12">
            {/* Clicker Area */}
            <div className="relative group flex justify-center mb-12">
              <div className="absolute inset-0 bg-[#FFE135]/5 blur-[80px] rounded-full group-hover:bg-[#FFE135]/10 transition-colors duration-500" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBananaClick}
                className="relative cursor-pointer z-10"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Banana 
                    size={220} 
                    className={`text-[#FFE135] filter drop-shadow-[0_0_20px_rgba(255,225,53,0.2)] transition-colors duration-100 ${isClicking ? 'brightness-125' : ''}`}
                    strokeWidth={1}
                  />
                </motion.div>
                
                {/* Click Particles */}
                <AnimatePresence>
                  {clicks.map(click => (
                    <motion.div
                      key={click.id}
                      initial={{ opacity: 1, scale: 0.5, y: 0 }}
                      animate={{ opacity: 0, scale: 2, y: -100 }}
                      exit={{ opacity: 0 }}
                      className="fixed pointer-events-none text-[#FFE135] font-serif italic text-2xl z-50"
                      style={{ left: click.x, top: click.y }}
                    >
                      +1 BAN
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Network Statistics */}
            <div className="border-b border-white/5 pb-10">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8 flex items-center gap-2">
                <Activity size={12} className="text-[#FFE135]" />
                Network Statistics
              </h2>
              <div className="grid grid-cols-2 gap-y-10">
                <div>
                  <div className="text-4xl font-light tracking-tight">{bananas.toLocaleString()}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Total Supply</div>
                </div>
                <div>
                  <div className="text-4xl font-light tracking-tight">0.14s</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Conf. Time</div>
                </div>
                <div>
                  <div className="text-4xl font-light tracking-tight">4,812</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Active Nodes</div>
                </div>
                <div>
                  <div className="text-4xl font-light tracking-tight text-[#FFE135]">FREE</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30 mt-1">Tx Fee</div>
                </div>
              </div>
            </div>

            {/* Live Ledger Stream */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFE135] animate-pulse"></span>
                Live Transaction Ledger
              </h3>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="text-[11px] font-mono opacity-20 italic">Awaiting netwrork activity...</div>
                ) : (
                  <AnimatePresence initial={false}>
                    {transactions.map((tx) => (
                      <motion.div 
                        key={tx.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-between items-center text-[11px] font-mono border-b border-white/5 pb-2"
                      >
                        <span className="opacity-40">{tx.address}</span>
                        <span className="text-[#FFE135] font-bold">+{tx.amount}.0 BAN</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button 
              onClick={() => handleBananaClick({ clientX: window.innerWidth/2, clientY: window.innerHeight/2 } as any)}
              className="w-full py-6 border border-white/10 rounded-full text-[11px] uppercase tracking-[0.4em] font-bold transition-all hover:bg-[#F5F5F5] hover:text-black hover:border-transparent group flex items-center justify-center gap-3"
            >
              <Terminal size={14} className="group-hover:text-black transition-colors" />
              Broadcast Block
            </button>
          </div>
        </section>
      </main>

      {/* Footer Bar */}
      <footer className="h-14 border-t border-white/10 flex items-center justify-between px-12 relative z-40 bg-[#050505]">
        <div className="flex items-center gap-6 text-[9px] uppercase tracking-widest text-white/30">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            System Status: <span className="text-white opacity-60">Optimal</span>
          </div>
          <div className="hidden sm:block">Uptime: 99.9999%</div>
        </div>
        <div className="text-[9px] uppercase tracking-widest text-white/30">
          © 2026 Nano Banana Foundation — Public Goods
        </div>
      </footer>
    </div>
  );
}

