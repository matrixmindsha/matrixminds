import { useEffect, useRef } from 'react';
import futuristicBg from '@/assets/futuristic-tech-bg.jpg';

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
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Futuristic tech background image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${futuristicBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Overlay gradients to blend with the image */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(34, 197, 94, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, 
              rgba(217, 91, 60, 0.1) 0%,
              rgba(197, 71, 47, 0.2) 25%,
              rgba(59, 130, 246, 0.2) 50%,
              rgba(168, 85, 247, 0.1) 75%,
              rgba(34, 197, 94, 0.1) 100%
            )
          `
        }}
      />
      
      {/* Animated tech circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-primary/20 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-accent/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 border border-blue-500/25 rounded-full animate-[spin_25s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 border border-purple-400/20 rounded-full animate-[spin_30s_linear_infinite]" />
      </div>
      
      {/* Floating tech elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-primary rounded-full animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 mix-blend-screen"
      />
    </div>
  );
};

export default TechBackground;