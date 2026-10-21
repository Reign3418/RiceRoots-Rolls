import React, { useEffect, useRef } from 'react';
import { useKitchen } from '../../context/KitchenContext';

export default function BotanicalSteamCanvas() {
  const { isSteamFxActive } = useKitchen();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isSteamFxActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize);

    // Subtle rising aromatic steam wisps & warm Angkor gold pollen motes (NO neon)
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.2 + 0.8,
      vy: -(Math.random() * 0.35 + 0.12),
      vx: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.28 + 0.06,
      isGold: Math.random() > 0.45
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Warm burnished Angkor gold (#C89D54) or soft steamed jasmine cream (#F5F0E6)
        ctx.fillStyle = p.isGold
          ? `rgba(200, 157, 84, ${p.alpha})`
          : `rgba(245, 240, 230, ${p.alpha * 0.7})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isSteamFxActive]);

  if (!isSteamFxActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-75"
      aria-hidden="true"
    />
  );
}
