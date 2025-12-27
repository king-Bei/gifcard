
import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [flakes, setFlakes] = useState<Array<{ id: number; left: number; duration: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 2 + Math.random() * 6,
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-60 animate-bounce"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            top: '-20px',
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;
