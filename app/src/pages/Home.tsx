import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'

export default function Home() {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const secondary = theme.palette.secondary.main
  const bg = theme.palette.background.default
  const primarySoft = alpha(primary, theme.palette.mode === 'light' ? 0.18 : 0.22)
  const secondarySoft = alpha(secondary, theme.palette.mode === 'light' ? 0.12 : 0.18)
  const bgOverlay = alpha(bg, 0.6)

  return (
    <Box
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        background: `
          radial-gradient(1200px 500px at 10% -10%, ${primarySoft} 20%, transparent 60%),
          radial-gradient(1200px 600px at 110% 10%, ${secondarySoft} 10%, transparent 60%),
          linear-gradient(180deg, ${bgOverlay}, ${bg})
        `,
        p: { xs: 3, sm: 4, md: 8 },
        m: 0,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={{ xs: 2, sm: 3 }} alignItems="flex-start">
          <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={2}>
            Welcome to
          </Typography>
          <Typography
            variant="h2"
            fontWeight={800}
            lineHeight={1.1}
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}
          >
            LeeMajor Publishing
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}>
          Journey Beyond the Edge of the Known.
Across floating islands, ancient forests humming with hidden energy, and cities built on secrets older than memory, LeeMajor Publishing champions stories that take readers far beyond ordinary life.
Discover adventures that reshape what it means to dream.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1, width: '100%' }}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/products"
              fullWidth
            >
              Explore Books
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="secondary"
              component={RouterLink}
              to="/about"
              fullWidth
            >
              About Us
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}


