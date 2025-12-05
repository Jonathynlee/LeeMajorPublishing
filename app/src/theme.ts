import { createTheme } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'
import { lightComponents, lightPalette } from './theme/lightPalette'
import { darkComponents, darkPalette } from './theme/darkPalette'

export function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
				...(mode === 'light' ? lightPalette : darkPalette),
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: [
        'Inter',
        'Helvetica Neue',
        'Segoe UI',
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      ...(mode === 'light' ? lightComponents : darkComponents),
    },
  })
}

export type ColorMode = 'light' | 'dark'



