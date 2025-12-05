import { StrictMode, useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import './index.css'
import App from './App.tsx'
import { getTheme, type ColorMode } from './theme'
import { ColorModeContext } from './contexts/ColorModeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
)

function AppWithProviders() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [mode, setMode] = useState<ColorMode>(() => {
    const stored = localStorage.getItem('color-mode') as ColorMode | null
    return stored ?? (prefersDark ? 'dark' : 'light')
  })

  useEffect(() => {
    localStorage.setItem('color-mode', mode)
    document.documentElement.setAttribute('data-color-mode', mode)
  }, [mode])

  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
        setMode,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
