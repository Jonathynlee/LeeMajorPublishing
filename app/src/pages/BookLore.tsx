import { useMemo } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { books } from '../data/books'

export default function BookLore() {
  const { bookId } = useParams<{ bookId: string }>()
  const book = useMemo(() => books.find((b) => b.id === bookId), [bookId])

  if (!book) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>Book not found</Typography>
        <Button component={RouterLink} to="/products" variant="outlined">Back to Books</Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Typography variant="overline" color="primary" fontWeight={700}>Lore</Typography>
        <Typography variant="h3" fontWeight={800}>{book.title}</Typography>
      </Stack>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="body1" color="text.primary" sx={{ whiteSpace: 'pre-wrap' }}>
            {book.lore}
          </Typography>
        </CardContent>
      </Card>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button component={RouterLink} to="/products" variant="outlined">Back to Books</Button>
        <Button variant="contained" onClick={() => window.open(book.amazonUrl, '_blank')}>
          See on Amazon
        </Button>
      </Stack>
    </Box>
  )
}


