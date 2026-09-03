import React from 'react';

interface NutriScanLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const NutriScanLogo: React.FC<NutriScanLogoProps> = ({
  className = '',
  size = 32,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        aria-label="NutriScan Logo"
      >
        {/* Apple Leaf */}
        <path
          d="M51 29C52 23 57 17 63 17C64 22 61 28 56 30C54 31 52 30 51 29Z"
          fill="#22c55e"
        />
        {/* Apple Shutter Blades Forming Camera Aperture */}
        {/* Blade 1 (Top Left) */}
        <path
          d="M48 30C41 30 35 34 32 40C30 44 29 49 30 54L42 54C42 46 45 38 48 30Z"
          fill="#22c55e"
        />
        {/* Blade 2 (Top Right) */}
        <path
          d="M52 30C55 38 58 46 58 54L70 54C71 49 70 44 68 40C65 34 59 30 52 30Z"
          fill="#16a34a"
        />
        {/* Blade 3 (Right Outer) */}
        <path
          d="M70 56L58 56C56 63 50 68 43 71L46 82C57 82 67 76 70 66C71 63 71 59 70 56Z"
          fill="#22c55e"
        />
        {/* Blade 4 (Bottom Base & Left) */}
        <path
          d="M41 71C35 68 31 63 30 56L18 56C19 64 24 72 32 77C36 80 41 81 44 82L41 71Z"
          fill="#15803d"
        />
        {/* Aperture Center Accent */}
        <circle cx="50" cy="55" r="5" fill="#f8f9ff" />
      </svg>
      {showText && (
        <span className="font-bold tracking-tight text-xl text-primary font-headline-md">
          Nutri<span className="text-[#22c55e]">Scan</span>
        </span>
      )}
    </div>
  );
};
