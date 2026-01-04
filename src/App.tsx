import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/className';
import AnimateEnter from '@components/AnimateEnter';
import Navbar from '@components/Navbar';
import Background from '@components/Background';
import Footer from '@components/Footer';
import Home from './pages/Home';
import Writing from './pages/Writing';
import WritingPost from './pages/WritingPost';
import Work from './pages/Work';
import Photography from './pages/Photography';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem={true}
    >
      <BrowserRouter>
        <div className="relative min-h-screen">
          {/* Noisy Background */}
          <Background />
          
          {/* Top Navigation Bar */}
          <Navbar />
          
          {/* Main content */}
          <div
            className={cn(
              'relative z-10 w-full min-h-screen pointer-events-none',
              'flex flex-col justify-center',
              'py-20 sm:py-24',
              'motion-reduce:transform-none motion-reduce:transition-none',
              'font-sans antialiased',
              '[&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_nav]:pointer-events-auto',
            )}
          >
            <AnimateEnter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/writing" element={<Writing />} />
                <Route path="/writing/:slug" element={<WritingPost />} />
                <Route path="/work" element={<Work />} />
                <Route path="/photography" element={<Photography />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </AnimateEnter>
          </div>
        </div>
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
