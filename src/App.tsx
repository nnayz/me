import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Resources from './pages/Resources';
import Work from './pages/Work';
import Writing from './pages/Writing';
import WritingPost from './pages/WritingPost';
import { cn } from '@/lib/className';
import AnimateEnter from '@components/AnimateEnter';
import Background from '@components/Background';
import Footer from '@components/Footer';
import Navbar from '@components/Navbar';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from 'next-themes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
              'pointer-events-none relative z-10 min-h-screen w-full',
              'flex flex-col justify-center',
              'py-20 sm:py-24',
              'motion-reduce:transform-none motion-reduce:transition-none',
              'font-sans antialiased',
              '[&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_div[class*="cursor-pointer"]]:pointer-events-auto [&_div[onclick]]:pointer-events-auto [&_input]:pointer-events-auto [&_nav]:pointer-events-auto',
            )}
          >
            <AnimateEnter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/writing" element={<Writing />} />
                <Route path="/writing/:slug" element={<WritingPost />} />
                <Route path="/work" element={<Work />} />
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
