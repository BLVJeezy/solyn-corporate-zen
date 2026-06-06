import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number; vx: number; vy: number;
  radius: number; pulse: number; pulseSpeed: number;
  rank: number; targetRank: number; rising: boolean;
}

const HeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Node[] = [];
    const NODE_COUNT = 28;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const init = () => {
      resize();
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 2 + Math.random() * 3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        rank: Math.floor(Math.random() * 10) + 1,
        targetRank: 1,
        rising: Math.random() > 0.5,
      }));
    };

    let t = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      t += 0.005;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.pulse += n.pulseSpeed;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw rising trend lines (SEO growth signal)
      const numTrends = 4;
      for (let k = 0; k < numTrends; k++) {
        const baseX = (w / (numTrends + 1)) * (k + 1);
        const baseY = h * 0.6 + Math.sin(t + k * 1.5) * 20;
        const points: [number, number][] = [];
        const pts = 8;
        for (let p = 0; p < pts; p++) {
          const px = baseX - 60 + (p / (pts - 1)) * 120;
          const trend = -(p / (pts - 1)) * 40;
          const wave = Math.sin(t * 2 + p * 0.8 + k) * 6;
          points.push([px, baseY + trend + wave]);
        }
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let p = 1; p < points.length; p++) {
          ctx.lineTo(points[p][0], points[p][1]);
        }
        const grad = ctx.createLinearGradient(baseX - 60, 0, baseX + 60, 0);
        grad.addColorStop(0, "rgba(16,185,129,0)");
        grad.addColorStop(0.5, `rgba(16,185,129,${0.25 + Math.sin(t + k) * 0.08})`);
        grad.addColorStop(1, "rgba(16,185,129,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulsed = n.radius + Math.sin(n.pulse) * 1.2;
        // Outer glow ring
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulsed * 4);
        grd.addColorStop(0, "rgba(0,0,0,0.06)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulsed * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulsed, 0, Math.PI * 2);
        ctx.fillStyle = n.rising ? `rgba(16,185,129,${0.5 + Math.sin(n.pulse) * 0.3})` : `rgba(0,0,0,${0.15 + Math.sin(n.pulse) * 0.05})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); });
    ro.observe(canvas);

    return () => { cancelAnimationFrame(animId); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default HeroCanvas;
