import { useEffect, useRef } from 'react';

const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for matrix-like effect
    const particles: Array<{
      x: number;
      y: number;
      speed: number;
      opacity: number;
      size: number;
    }> = [];

    // Grid lines
    const gridLines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        size: Math.random() * 3 + 1,
      });
    }

    // Initialize grid lines
    for (let i = 0; i < 20; i++) {
      gridLines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        opacity: Math.random() * 0.1 + 0.05,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      gridLines.forEach((line) => {
        ctx.strokeStyle = `rgba(59, 130, 246, ${line.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });

      // Draw and update particles
      particles.forEach((particle) => {
        // Draw particle
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Update particle position
        particle.y += particle.speed;
        if (particle.y > canvas.height + 50) {
          particle.y = -50;
          particle.x = Math.random() * canvas.width;
        }

        // Slight horizontal drift
        particle.x += Math.sin(particle.y * 0.01) * 0.5;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, hsl(220, 27%, 6%) 0%, hsl(217, 32%, 17%) 30%, hsl(220, 27%, 6%) 70%, hsl(217, 32%, 17%) 100%)',
      }}
    />
  );
};

export default TechBackground;