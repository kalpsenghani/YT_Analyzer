import { useEffect, useState } from "react";

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

export const AnimatedBackground = ({ children }: AnimatedBackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Animated Background Layers */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black" />

        {/* Primary flowing gradient */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-screen"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 107, 107, 0.15), transparent 40%)`,
          }}
        />

        {/* Secondary flowing gradient */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen"
          style={{
            background: `radial-gradient(800px circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(100, 181, 246, 0.1), transparent 40%)`,
          }}
        />

        {/* Animated wave layers */}
        <div className="absolute inset-0">
          <div className="wave-animation wave-1" />
          <div className="wave-animation wave-2" />
          <div className="wave-animation wave-3" />
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay bg-noise" />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        .wave-animation {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .wave-1 {
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 107, 107, 0.03) 50%,
            transparent 70%
          );
          animation: wave1 20s ease-in-out infinite;
          transform-origin: center;
        }

        .wave-2 {
          background: linear-gradient(
            -45deg,
            transparent 30%,
            rgba(100, 181, 246, 0.02) 50%,
            transparent 70%
          );
          animation: wave2 25s ease-in-out infinite reverse;
        }

        .wave-3 {
          background: radial-gradient(
            ellipse at center,
            rgba(255, 138, 128, 0.02) 0%,
            transparent 50%
          );
          animation: wave3 30s ease-in-out infinite;
        }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes wave1 {
          0%,
          100% {
            transform: rotate(0deg) scale(1) translateY(0px);
          }
          25% {
            transform: rotate(1deg) scale(1.02) translateY(-10px);
          }
          50% {
            transform: rotate(0deg) scale(1.05) translateY(-5px);
          }
          75% {
            transform: rotate(-1deg) scale(1.02) translateY(-15px);
          }
        }

        @keyframes wave2 {
          0%,
          100% {
            transform: rotate(0deg) scale(1) translateX(0px);
          }
          33% {
            transform: rotate(-1deg) scale(1.03) translateX(10px);
          }
          66% {
            transform: rotate(1deg) scale(1.01) translateX(-5px);
          }
        }

        @keyframes wave3 {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};
