import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/className';
import AnimateEnter from '@components/AnimateEnter';
import RollingMenu from '@components/RollingMenu';
import Background from '@components/Background';
import Footer from '@components/Footer';
import Home from './pages/Home';
import Writing from './pages/Writing';
import WritingPost from './pages/WritingPost';
import Work from './pages/Work';
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
          {/* Three.js Background */}
          <Background />
          
          {/* Main content */}
          <div
            className={cn(
              'relative z-10 w-full min-h-screen pointer-events-none',
              'pt-4 pb-4 sm:pt-24 sm:pb-24',
              'motion-reduce:transform-none motion-reduce:transition-none',
              'font-sans antialiased',
              'font-[family-name:Inter]',
              '[&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_nav]:pointer-events-auto',
            )}
          >
            <nav className="fixed bottom-12 left-8 z-50 sm:bottom-4 sm:left-4 md:left-6" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0px)' }}>
              <RollingMenu />
            </nav>
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

