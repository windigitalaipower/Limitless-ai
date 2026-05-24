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
      setOutputText("Error processing your request. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-amber-500 selection:text-black" style={{ backgroundColor: '#000000' }}>
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-zinc-800/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center font-black text-black text-xl shadow-lg shadow-amber-500/20">
              L
            </div>
            <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              LIMITLESS <span className="text-amber-500 font-light">AI</span>
            </span>
          </div>
          <div>
            <span className="text-xs bg-zinc-800 px-3 py-1.5 rounded-full text-zinc-400 border border-zinc-700/50">V2.0 Premium Enterprise</span>
          </div>
        </div>
      </header>

      {/* Main Studio */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Transform Boring AI Text Into <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              High-Converting Premium Content
            </span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            Bypass AI detectors, maximize engagement, and make your text feel truly human with advanced neural optimization.
          </p>
        </div>

        {/* Configuration Bar */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 mb-8 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex gap-2">
            {['premium', 'creative', 'ultra'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-300 ${
                  mode === m 
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10' 
                    : 'text-zinc-400 hover:bg-zinc-800/60'
                }`}
              >
                {m} Mode
              </button>
            ))}
          </div>
          <div className="text-xs text-zinc-500 px-2">Powered by Google Gemini Architecture</div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Area */}
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 flex flex-col h-[450px] relative backdrop-blur-md">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Input AI Raw Data</div>
            <textarea
              className="w-full flex-1 bg-transparent resize-none outline-none text-zinc-300 text-sm leading-relaxed placeholder:text-zinc-600"
              placeholder="Paste your ChatGPT, Gemini, or Claude generated content here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ border: 'none', background: 'transparent' }}
            />
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800/50">
              <span className="text-xs text-zinc-500">{inputText.length} characters</span>
              <button
                onClick={handleRefine}
                disabled={loading || !inputText}
                className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-600 text-black font-bold text-xs px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
              >
                {loading ? 'Optimizing Engine...' : 'Execute Hyper-Refine'}
              </button>
            </div>
          </div>

          {/* Output Area */}
          <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl p-6 flex flex-col h-[450px] relative backdrop-blur-md">
            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-3">
              Humanized Output
            </div>
            <div className="w-full flex-1 overflow-y-auto text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">
              {outputText ? outputText : <span className="text-zinc-600 italic">Optimized premium content will appear here...</span>}
            </div>
          </div>
        </div>

        {/* Automated Payment Gateway Card */}
        <div className="mt-12 max-w-md mx-auto bg-gradient-to-br from-zinc-900 to-black border border-amber-500/30 rounded-2xl p-6 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-widest">
            Best Value
          </div>
          <h3 className="text-xl font-bold text-white mb-2">LIMITLESS PRO ACCESS</h3>
          <p className="text-zinc-400 text-xs mb-6">
            Unlock unlimited high-volume humanization and full access to Ultra Marketing Mode.
          </p>
          <div className="mb-6">
            <span className="text-4xl font-black text-amber-400">$9</span>
            <span className="text-zinc-500 text-sm"> / monthly</span>
          </div>
          <a 
            href="#" 
            className="inline-block w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-black text-xs font-black tracking-wider uppercase py-4 rounded-xl shadow-lg transition-all"
          >
            Upgrade Automatically Now
          </a>
        </div>
      </main>
    </div>
  );
}
