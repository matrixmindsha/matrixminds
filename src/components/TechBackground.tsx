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

    // Initialize particles (floating tech elements)
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        size: Math.random() * 4 + 1,
      });
    }

    // Initialize futuristic grid lines
    for (let i = 0; i < 35; i++) {
      gridLines.push({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw futuristic grid lines with gradients
      gridLines.forEach((line, index) => {
        const gradient = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
        gradient.addColorStop(0, `rgba(59, 130, 246, ${line.opacity})`);
        gradient.addColorStop(0.5, `rgba(34, 197, 94, ${line.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(168, 85, 247, ${line.opacity * 0.6})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = Math.sin(Date.now() * 0.001 + index) * 0.5 + 1;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });

      // Draw and update floating tech particles
      particles.forEach((particle, index) => {
        // Create dynamic color cycling
        const hue = (Date.now() * 0.05 + index * 10) % 360;
        const color = `hsla(${hue}, 70%, 60%, ${particle.opacity})`;
        
        // Draw particle with dynamic glow
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Enhanced glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 15 + Math.sin(Date.now() * 0.002 + index) * 5;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Floating animation
        particle.y += particle.speed;
        particle.x += Math.sin(particle.y * 0.01 + Date.now() * 0.001) * 0.8;
        
        // Reset particle when off screen
        if (particle.y > canvas.height + 50 || particle.x < -50 || particle.x > canvas.width + 50) {
          particle.y = -50;
          particle.x = Math.random() * canvas.width;
        }
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
        background: 'radial-gradient(ellipse at center, hsl(240, 100%, 3%) 0%, hsl(217, 32%, 8%) 25%, hsl(240, 100%, 2%) 50%, hsl(217, 32%, 6%) 75%, hsl(240, 100%, 1%) 100%)',
      }}
    />
  );
};

export default TechBackground;