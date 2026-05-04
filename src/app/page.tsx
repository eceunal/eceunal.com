'use client';

import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('@/components/PhaserGame'), { 
  ssr: false,
  loading: () => <p className="text-white font-mono">Loading Engine...</p> 
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <h1 className="text-gray-400 font-mono mb-6 text-xl">
        &gt; SYSTEM.EXECUTE("cv_dungeon.exe")
      </h1>
      
      {/* A nice border around your game canvas */}
      <div className="border-4 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,0,0.1)]">
        <PhaserGame />
      </div>
    </main>
  );
}