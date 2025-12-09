import { useRef, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaToken) {
      return
    }
    setOpen(true)
    setName('')
    setEmail('')
    setMessage('')
    recaptchaRef.current?.reset()
    setCaptchaToken(null)
  }

  return (
    <Box>
      <Typography variant="h3" fontWeight={800} gutterBottom>
        Contact Us
      </Typography>
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                fullWidth
                multiline
                minRows={4}
              />
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY as string}
                onChange={setCaptchaToken}
              />
              <Button type="submit" variant="contained" size="large" disabled={!captchaToken}>
                Send Message
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" variant="filled" onClose={() => setOpen(false)}>
          Thanks! We received your message.
        </Alert>
      </Snackbar>
    </Box>
  )
}


