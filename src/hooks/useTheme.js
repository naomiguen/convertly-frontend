import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Inject Tailwind CDN if not exists
    if (typeof document !== 'undefined' && !document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      script.onload = () => {
        window.tailwind.config = {
          darkMode: 'class',
          theme: {
            extend: {
              colors: {
                dark: { bg: '#0f172a', card: '#1e293b', text: '#f1f5f9' }
              }
            }
          }
        };
      };
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
}