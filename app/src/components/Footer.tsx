import { Box, Container, IconButton, Stack, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function Footer() {
  const theme = useTheme()
  const bg = theme.palette.background.paper
  const divider = alpha(theme.palette.text.primary, theme.palette.mode === 'light' ? 0.08 : 0.16)
  const glow = alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.08 : 0.12)

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        mt: 4,
        pt: 4,
        pb: 6,
        background: `
          linear-gradient(180deg, ${alpha(bg, 0.96)}, ${bg}),
          radial-gradient(800px 180px at 50% 0%, ${glow}, transparent 70%)
        `,
        borderTop: `1px solid ${divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Typography variant="overline" color="primary" fontWeight={800} letterSpacing={2}>
              LEEMAJOR™ PUBLISHING
            </Typography>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} LEEMAJOR™ PUBLISHING. All rights reserved.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton
              aria-label="Twitter"
              component="a"
              href="#"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              aria-label="Instagram"
              component="a"
              href="#"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              aria-label="Facebook"
              component="a"
              href="#"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              aria-label="LinkedIn"
              component="a"
              href="#"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="YouTube"
              component="a"
              href="#"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{ '&:hover': { color: 'primary.main' } }}
            >
              <YouTubeIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
