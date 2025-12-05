import { memo } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import type { Book } from '../types/book'

type Props = {
  book: Book
  onClick: (book: Book) => void
}

function BookCardComponent({ book, onClick }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: '100%' }}>
      <CardActionArea onClick={() => onClick(book)} sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          height="600"
          image={book.smallImageUrl}
          alt={book.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            by {book.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default memo(BookCardComponent)


