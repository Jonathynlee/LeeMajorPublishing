export const lightPalette = {
    primary: {
        main: '#D4AF37',   // main gold
        light: '#F4D57C',  // lighter, for hovers / subtle UI
        dark: '#B8962E',   // deeper, for active states
        contrastText: '#4A3B12', // warm dark brown instead of black
      },
      secondary: {
        main: '#5A3E6B',   // muted plum that pairs well with gold
        light: '#7B5A8A',
        dark: '#3F294C',
        contrastText: '#4A3B12',
      },
  
      // Supporting colors (all slightly muted so gold stays the star)
      success: {
        main: '#3B7C6B',   // muted teal/green
      },
      warning: {
        main: '#F2B05C',   // warm honey orange
      },
      error: {
        main: '#C74B4B',   // soft brick red
      },
      info: {
        main: '#506A8B',   // desaturated slate blue
      },
  
      // Warm “parchment” backgrounds instead of stark white
      background: {
        default: '#FFF9EC', // very light warm cream
        paper: '#FFFDF7',   // slightly lighter for cards/surfaces
      },
  
      // Text uses warm browns so nothing feels harsh
      text: {
        primary: '#4A3B12',   // deep warm brown
        secondary: '#7A6530', // softer golden-brown
      },
  
      divider: '#E4C97A', // subtle gold divider
}

import { alpha, type Theme } from '@mui/material/styles'

export const lightComponents ={
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
      containedPrimary: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
        },
      }),
      outlinedPrimary: ({ theme }: { theme: Theme }) => ({
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
          borderColor: theme.palette.primary.light,
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
        },
      }),
      containedSecondary: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.contrastText,
        },
      }),
      outlinedSecondary: ({ theme }: { theme: Theme }) => ({
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
        '&:hover': {
          borderColor: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
          color: theme.palette.secondary.contrastText,
        },
      }),
      textPrimary: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.contrastText,
        },
      }),
      textSecondary: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.secondary.main, 0.08),
          color: theme.palette.secondary.contrastText,
        },
      }),
    },
    defaultProps: { disableElevation: true },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFDF7', // matches light background.paper
        borderBottom: '1px solid #E4C97A', // matches light divider
        color: '#4A3B12', // matches light text.primary
      },
    },
  }
}

