
import React from 'react';

export function Logo({ className = "w-10 h-10" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="50%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#5EEAD4" />
        </linearGradient>
      </defs>
      
      <path
        d="M70 20 L70 35 C70 38 68 40 65 40 L35 40 C32 40 30 42 30 45 L30 55 C30 58 32 60 35 60 L65 60 C68 60 70 62 70 65 L70 80"
        stroke="url(#logoGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      
      <path
        d="M75 25 L70 20 L65 25"
        stroke="url(#accentGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      <path
        d="M65 75 L70 80 L75 75"
        stroke="url(#accentGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      <circle cx="50" cy="25" r="4" fill="url(#accentGradient)" opacity="0.8" />
      <circle cx="50" cy="75" r="4" fill="url(#accentGradient)" opacity="0.8" />
    </svg>
  );
}