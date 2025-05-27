import type { DefaultTheme } from 'styled-components';

export type ThemeMode = 'light' | 'dark';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ThemeMode;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: {
        main: string;
        paper: string;
      };
      text: {
        primary: string;
        secondary: string;
        accent: string;
      };
      border: string;
      shadow: string;
      button: {
        primary: {
          bg: string;
          text: string;
          hover: string;
        };
        secondary: {
          bg: string;
          text: string;
          hover: string;
        };
      };
    };
    gradients: {
      background: string;
      overlay: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      fontFamily: string;
      sizes: {
        small: string;
        body: string;
        large: string;
        h4: string;
        h3: string;
        h2: string;
        h1: string;
      };
      weights: {
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
      };
    };
    transitions: {
      fast: string;
      medium: string;
      slow: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}

const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    primary: '#2A3B4C',
    secondary: '#4A5568',
    accent: '#00D87A',  // Accent green from wolf-external
    background: {
      main: '#FFFFFF',
      paper: '#F8FAFC',
    },
    text: {
      primary: '#2A3B4C',
      secondary: '#4A5568',
      accent: '#00D87A',
    },
    border: 'rgba(0, 0, 0, 0.1)',
    shadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    button: {
      primary: {
        bg: '#00D87A',
        text: '#121212',
        hover: '#00F085',
      },
      secondary: {
        bg: 'rgba(0, 0, 0, 0.05)',
        text: '#2A3B4C',
        hover: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  gradients: {
    background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
    overlay: 'radial-gradient(circle at top right, rgba(0, 216, 122, 0.1), transparent 70%)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sizes: {
      small: '0.875rem',
      body: '1rem',
      large: '1.125rem',
      h4: '1.25rem',
      h3: '1.5rem',
      h2: '2rem',
      h1: '2.5rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  transitions: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1200px',
  },
};

const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    primary: '#FFFFFF',
    secondary: '#E2E8F0',
    accent: '#00D87A',  // Accent green from wolf-external
    background: {
      main: '#1A1F2B',
      paper: '#242A38',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E2E8F0',
      accent: '#00D87A',
    },
    border: 'rgba(255, 255, 255, 0.1)',
    shadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    button: {
      primary: {
        bg: '#00D87A',
        text: '#121212',
        hover: '#00F085',
      },
      secondary: {
        bg: 'rgba(255, 255, 255, 0.1)',
        text: '#FFFFFF',
        hover: 'rgba(255, 255, 255, 0.15)',
      },
    },
  },
  gradients: {
    background: 'linear-gradient(180deg, #1A1F2B 0%, #151921 100%)',
    overlay: 'radial-gradient(circle at top right, rgba(0, 216, 122, 0.1), transparent 70%)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    sizes: {
      small: '0.875rem',
      body: '1rem',
      large: '1.125rem',
      h4: '1.25rem',
      h3: '1.5rem',
      h2: '2rem',
      h1: '2.5rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  transitions: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1200px',
  },
};

// Default theme is dark mode, just like wolf-external
export const theme = darkTheme;

// Export both themes for potential theme switching functionality
export const themes = {
  light: lightTheme,
  dark: darkTheme
};
