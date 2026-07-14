import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/className';
import { EASE_EXPO } from '@/lib/motion';
import AudioToggle from '@components/AudioToggle';
import Background from '@components/Background';
import CursorTrail from '@components/CursorTrail';
import MenuOverlay from '@components/MenuOverlay';
import Navbar from '@components/Navbar';
import SoundGate from '@components/SoundGate';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Resources from './pages/Resources';
import Work from './pages/Work';
import Writing from './pages/Writing';
import WritingPost from './pages/WritingPost';

function AppInner() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-screen">
      <Background />
      <CursorTrail />
      <SoundGate />
      <Navbar />
      <MenuOverlay />

      <main
        className={cn(
          'relative z-10 flex min-h-screen w-full flex-col justify-center',
          'pointer-events-none py-24 font-sans antialiased sm:py-28',
          '[&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_nav]:pointer-events-auto',
          '[&_canvas]:pointer-events-auto [&_div[class*="cursor-pointer"]]:pointer-events-auto',
        )}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto w-full p-4"
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            key={location.pathname}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
          >
            <Routes location={location}>
              <Route element={<Home />} path="/" />
              <Route element={<Writing />} path="/writing" />
              <Route element={<WritingPost />} path="/writing/:slug" />
              <Route element={<Work />} path="/work" />
              <Route element={<Resources />} path="/resources" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <AudioToggle />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
