import { useMemo, useState, useCallback } from 'react'
import { Grid, Typography } from '@mui/material'
import { books as allBooks } from '../data/books'
import type { Book } from '../types/book'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'

export default function Products() {
  const books = useMemo(() => allBooks, [])
  const [selected, setSelected] = useState<Book | null>(null)

  const handleOpen = useCallback((book: Book) => setSelected(book), [])
  const handleClose = useCallback(() => setSelected(null), [])

  return (
    <>
      <Typography variant="h3" fontWeight={800} gutterBottom>
        Books
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid key={book.id} item xs={12} sm={6} md={4}>
            <BookCard book={book} onClick={handleOpen} />
          </Grid>
        ))}
      </Grid>
      <BookModal open={Boolean(selected)} book={selected} onClose={handleClose} />
    </>
  )
}


