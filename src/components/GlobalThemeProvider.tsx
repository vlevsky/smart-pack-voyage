import React, { useEffect } from 'react';

interface GlobalThemeProviderProps {
  children: React.ReactNode;
  theme: string;
  font: string;
}

const themeColors = {
  default: { primary: '222 47% 11%', secondary: '210 40% 96%' },
  ocean: { primary: '204 84% 46%', secondary: '204 94% 36%' },
  sunset: { primary: '24 95% 53%', secondary: '16 85% 53%' },
  forest: { primary: '142 76% 36%', secondary: '142 86% 26%' },
  purple: { primary: '271 81% 56%', secondary: '271 91% 65%' },
  rose: { primary: '343 84% 62%', secondary: '343 94% 72%' },
};

const fontFamilies = {
  inter: 'Inter, sans-serif',
  roboto: 'Roboto, sans-serif',
  poppins: 'Poppins, sans-serif',
  playfair: 'Playfair Display, serif',
};

export const GlobalThemeProvider: React.FC<GlobalThemeProviderProps> = ({
  children,
  theme,
  font,
}) => {
  useEffect(() => {
    const root = document.documentElement;
    const colors = themeColors[theme as keyof typeof themeColors];
    
    if (colors) {
      root.style.setProperty('--primary', colors.primary);
      root.style.setProperty('--primary-foreground', '210 40% 98%');
      
      // Apply theme to other elements
      const buttons = document.querySelectorAll('button[class*="bg-blue"], button[class*="from-blue"]');
      buttons.forEach(button => {
        if (button instanceof HTMLElement) {
          button.style.setProperty('--tw-bg-opacity', '1');
          button.style.backgroundColor = `hsl(${colors.primary})`;
        }
      });
      
      // Apply to gradients
      const gradients = document.querySelectorAll('[class*="from-blue"]:not(button)');
      gradients.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.background = `linear-gradient(135deg, hsl(${colors.primary}), hsl(${colors.secondary}))`;
        }
      });
    }
  }, [theme]);

  useEffect(() => {
    const fontFamily = fontFamilies[font as keyof typeof fontFamilies];
    if (fontFamily) {
      document.body.style.fontFamily = fontFamily;
      
      // Apply to all text elements
      const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button, input, textarea, label');
      textElements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.fontFamily = fontFamily;
        }
      });
    }
  }, [font]);

  return <>{children}</>;
};