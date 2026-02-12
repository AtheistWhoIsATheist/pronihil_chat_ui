import React, { useRef, useEffect, useState } from 'react';
import { Message, MoveType, EpistemicStatus } from '../types';
import ReactMarkdown from 'react-markdown';

interface TerminalProps {
  messages: Message[];
  isProcessing: boolean;
  onSendMessage: (text: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ messages, isProcessing, onSendMessage }) => {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-black/60 border border-purple-900/50 rounded-lg overflow-hidden font-mono text-sm shadow-[0_0_15px_rgba(123,31,162,0.1)]">
      {/* Header */}
      <div className="bg-[#0f0f1a] p-2 border-b border-purple-900/30 flex justify-between items-center">
        <span className="text-cyan-400 font-bold tracking-widest text-xs">ZENITH // TERMINAL_UPLINK</span>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
      </div>

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-bar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[90%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              
              {/* Metadata Header */}
              <div className="flex items-center space-x-2 mb-1 opacity-70 text-xs">
                <span className={`${msg.role === 'user' ? 'text-green-400' : 'text-purple-400'} font-bold`}>
                  {msg.role === 'user' ? 'USER@NODE_01' : 'PROFESSOR_NIHIL'}
                </span>
                <span className="text-gray-600">[{new Date(msg.timestamp).toLocaleTimeString()}]</span>
              </div>

              {/* Message Body */}
              <div className={`p-3 rounded-sm border-l-2 ${msg.role === 'user' ? 'border-green-500/50 bg-green-900/10' : 'border-purple-500/50 bg-purple-900/10'}`}>
                <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-headings:text-cyan-400 prose-headings:font-light prose-strong:text-purple-300">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>

              {/* Structured Analysis (Moves) */}
              {msg.structuredData && (
                <div className="mt-2 text-xs space-y-1 ml-4 border-l border-cyan-500/20 pl-2">
                  {msg.structuredData.moves.map((move, idx) => (
                    <div key={idx} className="flex gap-2">
                      <span className="text-cyan-600 font-bold w-24 shrink-0">[{move.type}]</span>
                      <span className="text-gray-400 italic flex-1">{move.text}</span>
                      <span className="text-purple-500 text-[10px] uppercase border border-purple-900 px-1 rounded">{move.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
            <div className="flex items-center space-x-2 text-purple-400 animate-pulse p-4">
                <span className="text-xs">DENSIFYING...</span>
                <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
            </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-2 bg-[#0f0f1a] border-t border-purple-900/30 flex">
        <span className="text-green-500 mr-2 font-bold">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-cyan-50 font-mono placeholder-purple-900/50"
          placeholder="Initiate Inquiry..."
          autoFocus
        />
        <button 
            type="submit" 
            disabled={isProcessing}
            className="px-4 py-1 bg-purple-900/20 text-purple-400 hover:bg-purple-800/40 text-xs border border-purple-800/50 uppercase transition-colors"
        >
            Transmit
        </button>
      </form>
    </div>
  );
};

export default Terminal;
