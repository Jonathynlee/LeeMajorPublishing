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
import type { AlertColor } from '@mui/material'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [open, setOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success')
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaToken || loading) return

    setLoading(true)
    try {
      const res = await fetch('https://96uuzqddlb.execute-api.us-west-2.amazonaws.com/Prod/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          recaptchaToken:captchaToken,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Submission failed')
      }

      setSnackbarSeverity('success')
      setSnackbarMessage('Thanks! We received your message.')
      setOpen(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Something went wrong'
      setSnackbarSeverity('error')
      setSnackbarMessage(errMsg)
      setOpen(true)
    } finally {
      recaptchaRef.current?.reset()
      setCaptchaToken(null)
      setLoading(false)
    }
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
              <Button type="submit" variant="contained" size="large" disabled={!captchaToken || loading}>
                {loading ? 'Sending…' : 'Send Message'}
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
      <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
        <Alert severity={snackbarSeverity} variant="filled" onClose={() => setOpen(false)}>
          {snackbarMessage || (snackbarSeverity === 'success' ? 'Thanks! We received your message.' : 'Something went wrong')}
        </Alert>
      </Snackbar>
    </Box>
  )
}


