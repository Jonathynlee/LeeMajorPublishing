import { createContext } from 'react'
import type { ColorMode } from '../theme'

export type ColorModeContextValue = {
  mode: ColorMode
  toggle: () => void
  setMode: (mode: ColorMode) => void
}

export const ColorModeContext = createContext<ColorModeContextValue>({
  mode: 'light',
  toggle: () => {},
  setMode: () => {},
})


