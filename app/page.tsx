"use client";

import React, { useState } from "react";

// ─── UI Primitives ─────────────────────────────────────────────────────────

const Badge = ({ children, className = "", ...props }: any) => (
  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-mono font-medium transition-colors border ${className}`} {...props}>
    {children}
  </span>
);

const Card = ({ children, className = "", ...props }: any) => (
  <div className={`rounded-xl border border-white/[0.08] bg-[#0d0f14]/85 text-card-foreground shadow-xl ${className}`} {...props}>
    {children}
  </div>
);

// ─── Code block wrapper ────────────────────────────────────────────────────

function CodeBlock({
  label,
  labelIcon,
  editable,
  value,
  onChange,
  badge,
  children,
}: {
  label: string;
  labelIcon?: React.ReactNode;
  editable?: boolean;
  value?: string;
  onChange?: (v: string) => void;
  badge?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative rounded-md overflow-hidden border border-white/[0.06]">
      <div className="flex items-center justify-between px-2.5 py-1 bg-white/[0.02] border-b border-white/[0.06]">
        <span className="text-[8px] font-mono text-white/25 flex items-center gap-1.5">
          {labelIcon}
          {label}
        </span>
        {badge}
      </div>
      {editable ? (
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full text-[11px] font-mono text-emerald-300/70 bg-[#070707] p-3 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 resize-y min-h-[100px]"
          rows={4}
        />
      ) : (
        <div className="bg-[#070707] p-3 max-h-[300px] overflow-y-auto scrollbar-none">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── SVG Icons ─────────────────────────────────────────────────────────────

function IconBrain({ className = "" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.07-3 2.5 2.5 0 0 1 .09-3.53 2.5 2.5 0 0 1 0-4 2.5 2.5 0 0 1 3.44-3.5Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.07-3 2.5 2.5 0 0 0-.09-3.53 2.5 2.5 0 0 0 0-4 2.5 2.5 0 0 0-3.44-3.5Z"/>
    </svg>
  );
}

function IconPlay({ className = "" }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

// ─── Main Page Component ───────────────────────────────────────────────────

export default function Home() {
  const [prompt, setPrompt] = useState("Why do AI agents get stuck in loops?");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.result || data.error || "No response received.");
    } catch (err) {
      setResponse("Network error: Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-8 font-sans relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-2xl w-full space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 select-none">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)] mb-2">
            <IconBrain className="text-cyan-400 w-5 h-5" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight font-display">
            Next.js AI Agent + TracePilot
          </h1>
          <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
            Deploy this template and debug your AI with Time-Travel. Execute the agent and inspect the trace below.
          </p>
        </div>

        {/* Form / Input Area */}
        <form onSubmit={handleSubmit}>
          <Card className="transition-all duration-300 hover:border-cyan-500/20 hover:shadow-[0_0_25px_rgba(6,182,212,0.04)]">
            <div className="px-5 py-3 border-b border-white/[0.06] bg-cyan-500/[0.03] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[10px] font-mono px-2 py-0.5 rounded-md">
                  Input
                </Badge>
                <span className="text-[10px] text-white/30 font-mono">agent_prompt.json</span>
              </div>
              <div className="flex items-center gap-2">
                {prompt && (
                  <span className="text-[9px] font-mono text-cyan-400/70 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                    Ready
                  </span>
                )}
              </div>
            </div>
            <div className="p-4">
              <CodeBlock
                label="tool_input.json"
                labelIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                }
                editable
                value={prompt}
                onChange={setPrompt}
                badge={<span className="text-[8px] font-mono text-cyan-400/70 flex items-center gap-1"><span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />Editable</span>}
              />
            </div>
            <div className="px-4 pb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-950/30 disabled:opacity-50 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:shadow-none flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running Agent...
                  </>
                ) : (
                  <>
                    <IconPlay />
                    Run Agent
                  </>
                )}
              </button>
            </div>
          </Card>
        </form>

        {/* Response Area */}
        {response && (
          <Card className="border-violet-500/20 shadow-[0_0_25px_rgba(139,92,246,0.04)] transition-all duration-300">
            <div className="px-5 py-3 border-b border-white/[0.06] bg-violet-500/[0.03] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20 text-[10px] font-mono px-2 py-0.5 rounded-md">
                  Output
                </Badge>
                <span className="text-[10px] text-white/30 font-mono">returned_payload</span>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Success
              </Badge>
            </div>
            <div className="p-4">
              <CodeBlock
                label="agent_response.txt"
                labelIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/></svg>
                }
                badge={<span className="text-[8px] font-mono text-white/15">Read-Only</span>}
              >
                <div className="text-[11px] font-mono text-neutral-300 leading-relaxed whitespace-pre-wrap break-words">
                  {response}
                </div>
              </CodeBlock>
            </div>
            
            <div className="px-5 pb-4 pt-2 border-t border-white/[0.04]">
              <div className="text-[10px] text-neutral-500 flex items-center gap-2 select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                </span>
                View this execution on TracePilot Dashboard
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
