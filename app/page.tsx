"use client";

import { useConversation } from "@elevenlabs/react";
import { motion } from "framer-motion";
import { Mic, PhoneOff, Activity, AlertCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const [status, setStatus] = useState("Disconnected");
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [stressLevel, setStressLevel] = useState("STABLE");

  // Define the client-side tool (The Kill Switch)
  const clientTools = {
    endCall: async () => {
      console.log("TOOL TRIGGERED: endCall");
      setStressLevel("CRITICAL FAILURE");
      alert("CALL ENDED BY AGENT: Hostility limit reached.");
      await conversation.endSession();
    },
  };

  const conversation = useConversation({
    onConnect: () => setStatus("Connected"),
    onDisconnect: () => {
      setStatus("Disconnected");
      setIsAgentSpeaking(false);
    },
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
    clientTools: clientTools, 
  });

  // Visualizer Logic
  useEffect(() => {
    if (conversation.isSpeaking) {
      setIsAgentSpeaking(true);
      setStressLevel("HIGH STRESS DETECTED");
    } else {
      setIsAgentSpeaking(false);
      if (status === "Connected") setStressLevel("LISTENING...");
    }
  }, [conversation.isSpeaking, status]);

  const startScenario = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({
        agentId: process.env.NEXT_PUBLIC_AGENT_ID || "placeholder",
        connectionType: "webrtc",
      });
    } catch (err) {
      console.error("Failed to start:", err);
      alert("Microphone access is required.");
    }
  };

  const endScenario = async () => {
    await conversation.endSession();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 overflow-hidden relative">
      
      {/* Background Pulse Effect (When Agent Screams) */}
      {isAgentSpeaking && (
        <motion.div
          className="absolute inset-0 bg-red-900/30 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
      )}

      {/* Header */}
      <div className="z-10 text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-2">
           <AlertCircle className="text-red-500 w-6 h-6" />
           <h1 className="text-3xl font-bold tracking-[0.2em] text-red-500 uppercase">
             CrisisLink AI
           </h1>
        </div>
        <p className="text-gray-500 text-xs font-mono">
          POWERED BY GEMINI 2.5 FLASH • ELEVENLABS EXPRESSIVE
        </p>
      </div>

      {/* The Heartbeat Visualizer */}
      <div className="z-10 w-full max-w-3xl h-64 border-2 border-gray-800 rounded-xl bg-gray-950 relative overflow-hidden flex flex-col items-center justify-center shadow-2xl shadow-red-900/20">
        
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-12 gap-1 opacity-10 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-full w-px bg-green-500" />
          ))}
        </div>
        
        {/* Status Text */}
        <div className={`text-4xl font-mono font-bold mb-4 transition-colors duration-200 ${
            isAgentSpeaking ? "text-red-500" : "text-green-500"
        }`}>
           {stressLevel}
        </div>

        {/* The "Line" Animation */}
        <div className="flex items-center space-x-1 h-12">
           {[...Array(20)].map((_, i) => (
             <motion.div
               key={i}
               className={`w-2 rounded-full ${isAgentSpeaking ? "bg-red-500" : "bg-green-500/50"}`}
               animate={{ 
                 height: isAgentSpeaking ? [10, 48, 10] : [8, 12, 8],
               }}
               transition={{ 
                 repeat: Infinity, 
                 duration: isAgentSpeaking ? 0.2 : 1.5,
                 delay: i * 0.05 
               }}
             />
           ))}
        </div>
      </div>

      {/* Controls */}
      <div className="z-10 mt-12">
        {status === "Disconnected" ? (
          <button
            onClick={startScenario}
            className="group relative flex items-center space-x-4 bg-red-600 hover:bg-red-500 text-white px-10 py-5 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(220,38,38,0.4)]"
          >
            <Mic className="w-6 h-6 animate-pulse" />
            <span>START SIMULATION</span>
          </button>
        ) : (
          <button
            onClick={endScenario}
            className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 text-gray-300 px-8 py-4 rounded-full font-bold text-lg border border-gray-600"
          >
            <PhoneOff className="w-5 h-5" />
            <span>DISCONNECT</span>
          </button>
        )}
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-8 text-gray-600 font-mono text-xs text-center">
        SCENARIO: SUICIDE PREVENTION (LEVEL 1) <br/>
        AGENT ID: {process.env.NEXT_PUBLIC_AGENT_ID?.slice(0,8)}...
      </div>
    </div>
  );
}