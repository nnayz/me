import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/className';
import AnimateEnter from '@components/AnimateEnter';
import RollingMenu from '@components/RollingMenu';
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
        <div
          className={cn(
            'h-full min-h-screen relative w-full',
            'my-4 bg-white dark:bg-black sm:my-24',
            'motion-reduce:transform-none motion-reduce:transition-none',
            'font-sans antialiased',
            'font-[family-name:Inter]',
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

