import { useEffect, useRef } from 'react';
import aiBg from '@/assets/ai-corporate-bg.jpg';

/**
 * Professional AI / future-tech animated background.
 * - Hi-res corporate AI image as base
 * - Subtle gradient overlay for readability
 * - Animated neural-network node graph on canvas
 */
const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    const nodes: Node[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.8,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.35;
            ctx.strokeStyle = `rgba(96, 200, 255, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = 'rgba(140, 220, 255, 0.9)';
        ctx.shadowColor = 'rgba(96, 200, 255, 0.9)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Hero AI background image */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url(${aiBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Dark gradient for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, hsl(220 60% 4% / 0.85) 0%, hsl(220 60% 5% / 0.65) 40%, hsl(220 60% 4% / 0.92) 100%)',
        }}
      />
      {/* Soft accent glows */}
      <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[35rem] h-[35rem] rounded-full bg-accent/10 blur-3xl" />

      {/* Animated neural network */}
      <canvas ref={canvasRef} className="absolute inset-0 mix-blend-screen opacity-80" />
    </div>
  );
};

export default TechBackground;
