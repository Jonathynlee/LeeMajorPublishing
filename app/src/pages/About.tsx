import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

export default function About() {
  return (
    <Box>
      <Typography variant="h3" fontWeight={800} gutterBottom>
        About Us
      </Typography>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={700}>
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              At LeeMajor Publishing, our mission is to publish fantasy fiction that brings wild
              worlds to life—stories that spark wonder, honor craft, and invite readers to step
              through the door to elsewhere. We champion authors who dream audaciously and write
              with heart.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              From intimate tales of magic and memory to epic adventures across sky and sea, we
              seek books that feel like finding a hidden map: a promise of treasure, danger, and
              the courage to keep turning pages.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}


