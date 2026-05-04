'use client';

import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { MainScene } from '@/game/scenes/MainScene';

export default function PhaserGame() {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !gameRef.current) {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 1024,
        height: 640,
        parent: 'game-container', 
        backgroundColor: '#111111',
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
            gravity: { x: 0, y: 0 }
          }
        },
        scene: [MainScene]
      };

      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="game-container" />;
}