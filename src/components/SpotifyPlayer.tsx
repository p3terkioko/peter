"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SpotifyData = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
};

export default function SpotifyPlayer() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSpotify = async () => {
      try {
        const res = await fetch("/api/spotify");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Spotify fetch failed");
      }
    };
    
    fetchSpotify();
    const interval = setInterval(fetchSpotify, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  if (!data || !data.isPlaying) {
    return (
      <div className="flex items-center justify-end gap-3 font-mono text-xs md:text-sm text-parchment/30">
        OFFLINE &mdash; SPOTIFY
        <div className="w-1.5 h-1.5 rounded-full bg-parchment/20" />
      </div>
    );
  }

  return (
    <a 
      href={data.songUrl} 
      target="_blank" 
      rel="noreferrer"
      className="flex items-center gap-3 md:gap-4 font-mono text-xs md:text-sm text-parchment/60 hover:text-neonAccent transition-colors hover-target group border border-parchment/10 p-2 bg-charcoal/50 backdrop-blur-sm shadow-xl origin-bottom-right scale-[0.85] md:scale-100"
    >
      <div className="flex flex-col text-right mt-1">
        <span className="text-[9px] tracking-widest uppercase opacity-40 mb-1 leading-none mr-3 md:mr-0">
          Currently Listening To:
        </span>
        <div className="flex items-center justify-end gap-2">
          <span className="font-bold text-parchment group-hover:text-neonAccent truncate max-w-[120px] md:max-w-[180px]">
            {data.title}
          </span>
          <motion.div 
            animate={{ scale: [1, 1.3, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-neonAccent" 
          />
        </div>
        <span className="truncate max-w-[150px] opacity-70">
          {data.artist}
        </span>
      </div>
      {data.albumImageUrl && (
        <div className="relative w-10 h-10 rounded-full overflow-hidden animate-[spin_8s_linear_infinite] border border-parchment/20">
          <img 
            src={data.albumImageUrl} 
            alt="Album Art" 
            className="w-full h-full object-cover"
          />
          {/* Record hole */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-charcoal border border-parchment/30 z-10" />
        </div>
      )}
    </a>
  );
}
