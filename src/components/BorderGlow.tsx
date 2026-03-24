import React, { useRef, useEffect, useState, useCallback } from 'react';

interface BorderGlowProps {
  children: React.ReactNode;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  className?: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function BorderGlow({
  children,
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#060010',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  className = '',
}: BorderGlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gradientStyle, setGradientStyle] = useState<React.CSSProperties>({});
  const [colorIndex, setColorIndex] = useState(0);

  const getCurrentColor = useCallback(() => {
    if (!colors || colors.length === 0) return `rgb(${glowColor})`;
    const rgb = hexToRgb(colors[colorIndex % colors.length]);
    return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : `rgb(${glowColor})`;
  }, [colors, colorIndex, glowColor]);

  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % (colors?.length || 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [animated, colors]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      const distLeft = x;
      const distRight = w - x;
      const distTop = y;
      const distBottom = h - y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      if (minDist > edgeSensitivity + glowRadius) {
        setGradientStyle({});
        return;
      }

      let angle = 0;
      let alongEdge = 0;
      let edgeLen = 1;

      if (minDist === distTop) {
        angle = 180;
        alongEdge = x / w;
        edgeLen = w;
      } else if (minDist === distBottom) {
        angle = 0;
        alongEdge = x / w;
        edgeLen = w;
      } else if (minDist === distLeft) {
        angle = 90;
        alongEdge = y / h;
        edgeLen = h;
      } else {
        angle = 270;
        alongEdge = y / h;
        edgeLen = h;
      }

      const normalizedAlong = alongEdge * edgeLen;
      const spread = (coneSpread / 100) * edgeLen;

      const color = getCurrentColor();
      const alpha = Math.max(0, 1 - minDist / (glowRadius + edgeSensitivity)) * glowIntensity;

      const gradient = `conic-gradient(
        from ${angle}deg at ${
          minDist === distTop || minDist === distBottom
            ? `${(normalizedAlong / edgeLen) * 100}% ${minDist === distTop ? '0%' : '100%'}`
            : `${minDist === distLeft ? '0%' : '100%'} ${(normalizedAlong / edgeLen) * 100}%`
        },
        transparent ${90 - coneSpread / 2}deg,
        ${color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)} ${90}deg,
        transparent ${90 + coneSpread / 2}deg
      )`;

      setGradientStyle({
        background: gradient,
        opacity: alpha,
      });
    },
    [edgeSensitivity, glowRadius, coneSpread, glowIntensity, getCurrentColor]
  );

  const handleMouseLeave = useCallback(() => {
    setGradientStyle({});
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        background: backgroundColor,
        isolation: 'isolate',
      }}
    >
      {/* Border glow overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${borderRadius}px`,
          pointerEvents: 'none',
          zIndex: 1,
          transition: 'opacity 0.1s ease',
          ...gradientStyle,
        }}
      />
      {/* Actual border */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${borderRadius}px`,
          border: '1px solid rgba(255,255,255,0.08)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      <div style={{ position: 'relative', zIndex: 3 }}>{children}</div>
    </div>
  );
}

export default BorderGlow;
