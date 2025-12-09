import { useEffect, useMemo } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Stack, Typography, CircularProgress, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { books } from '../data/books'
import type { Book } from '../types/book'

const FlashyLoader = styled('div')(({ theme }) => ({
  position: 'relative',
  width: 96,
  height: 96,
  borderRadius: '50%',
  background:
    'conic-gradient(from 0deg, rgba(25,118,210,0.25), rgba(156,39,176,0.25), rgba(25,118,210,0.25))',
  animation: 'spin 1.2s linear infinite',
  filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.25))',
  display: 'grid',
  placeItems: 'center',
  '&::after': {
    content: '""',
    width: 76,
    height: 76,
    borderRadius: '50%',
    background: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 2px ${theme.palette.divider}`,
  },
  '@keyframes spin': {
    to: { transform: 'rotate(360deg)' },
  },
}))

export default function RedirectSale() {
  const { site, bookId } = useParams<{ site: string; bookId: string }>()

  const book: Book | undefined = useMemo(
    () => books.find((b) => b.id === bookId),
    [bookId]
  )

  const targetUrl = useMemo(() => {
    if (!book || !site) return undefined
    const siteMap: Record<string, (bk: Book) => string | undefined> = {
      amazon: (bk) => bk.amazonUrl,
      // future sites can be added here, e.g. 'barnesandnoble': (bk) => bk.bnUrl
    }
    return siteMap[site?.toLowerCase()]?.(book)
  }, [book, site])

  useEffect(() => {
    if (!targetUrl) return
    const t = setTimeout(() => {
      window.location.assign(targetUrl)
    }, 1000)
    return () => clearTimeout(t)
  }, [targetUrl])

  const headingText =
    site ? `You are being redirected to ${site}` : 'Preparing redirect...'

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Typography variant="h3" fontWeight={800}>
          {headingText}
        </Typography>
        <FlashyLoader />
        {book && targetUrl ? (
          <Typography variant="body1" color="text.secondary">
            Redirecting for <strong>{book.title}</strong> in a moment...
          </Typography>
        ) : (
          <Stack spacing={2} alignItems="center">
            <Typography variant="body1" color="error">
              Sorry, we couldn&apos;t find that destination.
            </Typography>
            <Button component={RouterLink} to="/" variant="contained" color="primary">
              Go back home
            </Button>
          </Stack>
        )}
        {/* Hidden progress indicator for accessibility */}
        <Box sx={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}>
          <CircularProgress />
        </Box>
      </Stack>
    </Box>
  )
}

