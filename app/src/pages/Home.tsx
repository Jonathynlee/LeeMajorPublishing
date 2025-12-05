import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import { books } from '../data/books'

export default function Home() {
  const theme = useTheme()
  const primary = theme.palette.primary.main
  const secondary = theme.palette.secondary.main
  const bg = theme.palette.background.default
  const primarySoft = alpha(primary, theme.palette.mode === 'light' ? 0.18 : 0.22)
  const secondarySoft = alpha(secondary, theme.palette.mode === 'light' ? 0.12 : 0.18)
  const bgOverlay = alpha(bg, 0.6)
  const latest = books[books.length - 1]

  return (
    <Stack spacing={{ xs: 4, md: 8 }}>
      {/* Hero */}
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

      {/* Latest Book Row */}
      <Box component="section" sx={{ width: '100%', py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 3, md: 6 }}
            alignItems="center"
            sx={{ position: 'relative' }}
          >
            <Box sx={{ flex: 1, position: 'relative', zIndex: 2 }}>
              <Box sx={{ maxWidth: 560, mx: { xs: 'auto', md: 0 }, position: 'relative' }}>
                {/* Perspective wrapper to create desk-like angle */}
                <Box
                  sx={{
                    position: 'relative',
                    perspective: { xs: 'none', md: '1200px' },
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Book block with page-thickness and shadow */}
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: 2,
                      transform: { xs: 'none', md: 'rotateY(-18deg) rotateX(6deg) translateX(16px)' },
                      transformOrigin: 'left center',
                      boxShadow: {
                        xs: 6,
                        md: '0 28px 60px rgba(0,0,0,0.40), 0 12px 24px rgba(0,0,0,0.25)',
                      },
                      '&::before': {
                        // Soft "desk" shadow
                        content: '""',
                        position: 'absolute',
                        left: 24,
                        right: 24,
                        bottom: -18,
                        height: 36,
                        background:
                          'radial-gradient(60% 80% at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)',
                        filter: 'blur(4px)',
                        transform: { xs: 'none', md: 'rotate(-1.5deg)' },
                        zIndex: -1,
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={latest.imageUrl}
                      alt={latest.title}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        borderRadius: 2,
                        transform: { xs: 'none', md: 'translateZ(2px)' },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <Stack spacing={2}>
                <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={2}>
                  Latest Book
                </Typography>
                <Typography variant="h4" fontWeight={800} sx={{ lineHeight: 1.15 }}>
                  {latest.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  by {latest.author}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {latest.description}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    href={latest.amazonUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    Buy on Amazon
                  </Button>
                  <Button variant="outlined" color="secondary" component={RouterLink} to="/products">
                    See all books
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Stack>
  )
}


