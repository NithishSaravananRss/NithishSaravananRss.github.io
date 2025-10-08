import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class for 3D effect
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1500;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.speedZ = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.z -= this.speedZ;
        if (this.z <= 0) {
          this.reset();
          this.z = 1500;
        }

        // 3D projection
        const scale = 1000 / this.z;
        this.projectedX = (this.x - canvas.width / 2) * scale + canvas.width / 2;
        this.projectedY = (this.y - canvas.height / 2) * scale + canvas.height / 2;
        this.projectedSize = this.size * scale;

        // Mouse interaction
        const dx = mouseRef.current.x - this.projectedX;
        const dy = mouseRef.current.y - this.projectedY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const angle = Math.atan2(dy, dx);
          const force = (150 - distance) / 150;
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }

        // Drift movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (this.z > 0 && this.projectedX > -50 && this.projectedX < canvas.width + 50 && 
            this.projectedY > -50 && this.projectedY < canvas.height + 50) {
          
          // Create gradient with blue-purple mix based on position
          const colorMix = (this.x / canvas.width);
          const r = Math.floor(59 + (147 - 59) * colorMix); // 59 (blue) to 147 (purple)
          const g = Math.floor(130 - (30 * colorMix)); // 130 to 100
          const b = Math.floor(246 - (5 * colorMix)); // 246 to 241
          
          const gradient = ctx.createRadialGradient(
            this.projectedX, this.projectedY, 0,
            this.projectedX, this.projectedY, this.projectedSize * 2
          );
          
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
          gradient.addColorStop(0.5, `rgba(${r + 20}, ${g + 20}, ${b}, ${this.opacity * 0.5})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.projectedX, this.projectedY, this.projectedSize * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Initialize particles only once
    if (particlesRef.current.length === 0) {
      const particleCount = 150;
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle());
      }
    }

    // Draw connecting lines
    const drawConnections = () => {
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].projectedX - particlesRef.current[j].projectedX;
          const dy = particlesRef.current[i].projectedY - particlesRef.current[j].projectedY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity = (120 - distance) / 120;
            // Create gradient connection color based on particle positions
            const avgX = (particlesRef.current[i].x + particlesRef.current[j].x) / 2;
            const colorMix = avgX / canvas.width;
            const r = Math.floor(59 + (147 - 59) * colorMix);
            const g = Math.floor(130 - (30 * colorMix));
            const b = Math.floor(246 - (5 * colorMix));
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].projectedX, particlesRef.current[i].projectedY);
            ctx.lineTo(particlesRef.current[j].projectedX, particlesRef.current[j].projectedY);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Create trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      drawConnections();

      // Update and draw particles
      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array to prevent resets

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ 
        background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
        zIndex: 0
      }}
    />
  );
};

export default AnimatedBackground;