export const darkPalette = {
  // Brand golds (same as light mode for consistency)
  primary: {
    main: '#D4AF37', // Gold stays brand primary
    dark: '#B8962E',
    light: '#F4D57C',
    contrastText: '#1A1405', // deep gold-brown for readability
  },

  secondary: {
    main: '#233D4D',  // anchor blue
    light: '#3C5A6A',
    dark: '#152630',
    contrastText: '#FFF9EC',
  },

  background: {
    default: '#1B2A33', // softened navy-charcoal, not pure dark
    paper: '#233D4D',   // branded dark surface
  },

  text: {
    primary: '#F4D57C', // light gold text
    secondary: '#C8B175', // softer aged gold
    disabled: 'rgba(212,175,55,0.45)',
  },

  divider: 'rgba(212,175,55,0.25)',
};

import { alpha, type Theme } from '@mui/material/styles'

export const darkComponents = {
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
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.contrastText,
        },
      }),
      containedSecondary: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.secondary,
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.contrastText,
        },
      }),
      outlinedSecondary: ({ theme }: { theme: Theme }) => ({
        borderColor: theme.palette.secondary.main,
        color: theme.palette.text.secondary,
        '&:hover': {
          borderColor: theme.palette.secondary.light,
          backgroundColor: alpha(theme.palette.secondary.main, 0.08),
          color: theme.palette.secondary.contrastText,
        },
      }),
      textPrimary: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
          color: theme.palette.primary.contrastText,
        },
      }),
      textSecondary: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.text.secondary,
        '&:hover': {
          backgroundColor: alpha(theme.palette.text.secondary, .1),
          color: theme.palette.secondary.contrastText,
        },
      }),
    },
    defaultProps: {
      disableElevation: true,
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "#233D4D", // matches dark background.paper
        color: "#F4D57C", // matches dark text.primary
        borderBottom: "1px solid rgba(212,175,55,0.25)", // matches dark divider
      },
    },
  },
};
