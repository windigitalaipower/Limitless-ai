"use client";
import { useState } from 'react';

export default function LimitlessAI() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('premium');

  const handleRefine = async () => {
    if (!inputText) return;
    setLoading(true);
    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, mode: mode }),
      });
      const data = await response.json();
      setOutputText(data.result || "Optimization complete.");
    } catch (error) {
      console.error("Error:", error);
      setOutputText("Error processing your request. Please check API settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-amber-500/30">
      {/* Top Premium Gradient Border */}
      <div className="h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-700 w-full" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 flex flex-col min-h-[95vh]">
        
        {/* Branding Header */}
        <header className="text-center mb-12 flex flex-col items-center">
          <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700/50 shadow-2xl">
            <span className="text-2xl font-light text-amber-400 tracking-tighter">∞</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight uppercase bg-gradient-to-b from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            LIMITLESS AI
          </h1>
          <p className="mt-2 text-xs md:text-sm font-medium tracking-widest text-amber-500/80 uppercase">
            The Elite Humanizer Engine &bull; Windigital System
          </p>
        </header>

        {/* Core Utility Grid */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Input Panel */}
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 backdrop-blur-xl shadow-xl flex flex-col h-[380px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Standard AI Output</span>
              {/* Mode Selector */}
              <select 
                value={mode} 
                onChange={(e) => setMode(e.target.value)}
                className="bg-black text-xs text-amber-400 font-semibold border border-neutral-800 rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500 transition-all cursor-pointer shadow-inner"
              >
                <option value="premium">💎 Premium Corporate</option>
                <option value="creative">🎨 Creative Narrative</option>
                <option value="ultra">⚡ Ultra Impact</option>
              </select>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your robotic, machine-like AI text here..."
              className="w-full flex-1 bg-black/40 border border-neutral-800/50 rounded-xl p-4 text-sm text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-neutral-700 resize-none font-medium leading-relaxed transition-all shadow-inner"
            />
            <button
              onClick={handleRefine}
              disabled={loading || !inputText}
              className="mt-4 w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black text-xs font-black uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-600/10 active:scale-[0.99] disabled:opacity-30 disabled:pointer-events-none"
            >
              {loading ? "Optimizing Matrix..." : "Humanize Copy ↗"}
            </button>
          </div>

          {/* Output Panel */}
          <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl p-5 backdrop-blur-xl shadow-xl flex flex-col h-[380px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500/90">Refined Elite Copy</span>
              {outputText && (
                <button 
                  onClick={() => navigator.clipboard.writeText(outputText)}
                  className="text-[10px] bg-neutral-800/80 border border-neutral-700/30 text-neutral-300 font-bold uppercase tracking-wider px-2.5 py-1 rounded-md hover:bg-neutral-700 transition-all active:scale-95"
                >
                  Copy Text
                </button>
              )}
            </div>
            <div className="w-full flex-1 bg-black/20 border border-neutral-800/30 rounded-xl p-4 text-sm text-neutral-200 overflow-y-auto font-medium leading-relaxed whitespace-pre-wrap shadow-inner selection:bg-amber-500/40">
              {outputText ? (
                outputText
              ) : (
                <span className="text-neutral-600 italic">Optimized high-converting copy will appear here instantly...</span>
              )}
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-[10px] font-bold tracking-widest text-neutral-600 uppercase border-t border-neutral-900 pt-6">
          &copy; 2026 Limitless Chaser Systems. All Rights Reserved.
        </footer>

      </div>
    </div>
  );
}
