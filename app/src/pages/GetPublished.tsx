import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function GetPublished() {
  const bannerImage = "https://leemajor-publishing-assets.s3.us-west-2.amazonaws.com/leemajor_banner.png"
  return (
    <Box>
      {/* Banner */}
      <Box
        sx={{
          position: 'relative',
          borderRadius: 3,
          overflow: 'hidden',
          minHeight: { xs: 220, sm: 280, md: 320 },
          mb: 4,
          display: 'grid',
          alignItems: 'center',
          px: { xs: 2, sm: 4 },
          background:
            'linear-gradient(135deg, rgba(25,118,210,0.15) 0%, rgba(156,39,176,0.15) 100%)',
        }}
      >
        <Box
          component="img"
          src={bannerImage}
          alt="LeeMajor Publishing"
          sx={{
            position: 'absolute',
            
            opacity: 0.15,
            pointerEvents: 'none',
            userSelect: 'none',
            objectFit: 'contain',
          }}
        />
        <Stack spacing={2} sx={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
            Get Published
          </Typography>
          <Typography variant="h3" fontWeight={800}>
            Begin your publishing adventure today
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We’re an author‑first publisher. From editing and formatting to pricing and distribution,
            we handle the heavy lifting so you can focus on writing.
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              color="primary"
              size="large"
            >
              Contact us
            </Button>
            <Button component={RouterLink} to="/products" color="secondary" size="large">
              Explore our books
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Sections */}
      <Stack spacing={3.5}>
        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              1. Why publish through us?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We are an author‑first publisher. Our team takes care of editing, interior and cover
              formatting, publishing logistics, pricing, and everything else that goes into getting
              a book released. You bring the manuscript, we’ll shepherd it to a professional
              publication.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              2. Transparent terms
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body1" color="text.secondary">
                We pour our heart and soul into getting you published and your book into the world.
                We don’t charge up front. Instead, we take a small royalty from profit only.
                We currently publish through Amazon and IngramSpark, and that list is growing.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Advertising can be expensive. We prioritize free channels, social media, newsletters,
                and community outreach. If we decide together to enhance sales with paid campaigns,
                we’ll align on terms that make sense. Practically, that means we may adjust royalties
                slightly to offset ad costs, always transparently and by mutual agreement.
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              3. Let’s get you published!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Use our contact form to reach out about publishing. Please allow a day or two for a
              response. From there, we’ll work with you to gather everything needed to launch.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              All we really need is the manuscript. We can help with art creation, cover design,
              and any other assets required to publish your book.
            </Typography>
            
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              4. Who owns the book?
            </Typography>
            <Typography variant="body1" color="text.secondary">
              You do! We’ll put in the work to get you published and help build your presence.
              We’ll enter into a contract that grants us exclusive publishing rights for a fixed
              term - typically 1, 3, or 5 years. During that time, we have the right to publish your
              book across various channels, but it remains your book.
            </Typography>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" fontWeight={800} gutterBottom>
              5. How to get started
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Reach out at <strong>LeemajorPublishing@gmail.com</strong> or use our contact form.
            </Typography>
            <Button component={RouterLink} to="/contact" variant="contained" size="large">
              Begin your adventure today
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}


