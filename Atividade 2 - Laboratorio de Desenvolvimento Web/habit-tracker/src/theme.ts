// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6', // Violeta vibrante
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    secondary: {
      main: '#10b981', // Verde esmeralda (sucesso)
    },
    background: {
      default: '#0f172a', // Fundo escuro premium (Slate 900)
      paper: '#1e293b',   // Cor dos cards (Slate 800)
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: '#334155',
  },
  shape: {
    borderRadius: 16, // Bordas bem arredondadas, estilo Apple/Moderno
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    subtitle1: {
      letterSpacing: '0.02em',
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove o overlay padrão do Material UI no dark mode
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Remove o texto todo em maiúsculo
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        }
      }
    }
  },
});