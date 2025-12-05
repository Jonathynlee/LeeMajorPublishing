import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, Container, LinearProgress } from '@mui/material'
import Header from './components/Header'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const Contact = lazy(() => import('./pages/Contact'))
const BookLore = lazy(() => import('./pages/BookLore'))

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Container maxWidth="lg" sx={{ flex: 1, m: 0, padding:"30px 0px!important"}}>
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/lore/:bookId" element={<BookLore />} />
          </Routes>
        </Suspense>
      </Container>
    </Box>
  )
}

export default App
