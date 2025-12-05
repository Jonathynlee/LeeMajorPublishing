import { memo } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
  Card,
  CardMedia,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { Book } from '../types/book'

type Props = {
  open: boolean
  book: Book | null
  onClose: () => void
}

function BookModalComponent({ open, book, onClose }: Props) {
  const navigate = useNavigate()
  const theme = useTheme()
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'))
  if (!book) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth fullScreen={isSmDown}>
      <DialogTitle>
        <Typography variant="h5" fontWeight={700}>{book.title}</Typography>
        <Typography variant="body2" color="text.secondary">by {book.author}</Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={3} alignItems="stretch">
          <Grid size={{xs: 12, md: 5}}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
              <CardMedia
                component="img"
                image={book.imageUrl}
                alt={book.title}
                sx={{ height: { xs: 220, sm: 320 }, objectFit: 'cover' }}
              />
            </Card>
          </Grid>
          <Grid size={{xs: 12, md: 7}}>
            <Stack spacing={2} height="100%">
              <Typography variant="body1" color="text.primary">
                {book.description}
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => window.open(book.amazonUrl, '_blank')}
                  fullWidth={isSmDown}
                >
                  See on Amazon
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    onClose()
                    navigate(`/lore/${book.id}`)
                  }}
                  fullWidth={isSmDown}
                >
                  Lore
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default memo(BookModalComponent)


