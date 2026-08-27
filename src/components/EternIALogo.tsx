import React from 'react';

export interface EternIALogoProps {
  size?: number | string;
  variant?: 'badge' | 'horizontal' | 'icon' | 'wordmark';
  className?: string;
  showGlow?: boolean;
  animated?: boolean;
}

export const EternIALogo: React.FC<EternIALogoProps> = ({
  size = 48,
  variant = 'icon', // Consideramos que el logo PNG ya tiene el branding corporativo
  className = '',
  showGlow = true,
  animated = false
}) => {
  const numericSize = typeof size === 'number' ? size : parseInt(size as string, 10) || 48;
  const isResponsive = className.includes('w-') || className.includes('h-');

  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className} ${animated ? 'hover:scale-105 transition-transform duration-500' : ''}`}
      style={!isResponsive ? { height: `${numericSize}px` } : undefined}
    >
      <img
        src="/EternIA_logo.png"
        alt="EternIA Logo Corporativo"
        className={`object-contain ${isResponsive ? 'w-full h-full' : 'h-full w-auto'} ${showGlow ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]' : ''}`}
      />
    </div>
  );
};
