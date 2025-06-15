import { Header } from '@/components/Header'
import { useAuth } from '@/contexts/AuthContext'
import { AuthDialog } from '@/components/AuthDialog'
import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'

// Import modern landing page components
import { ModernHeroSection } from '@/components/landing/ModernHeroSection'
import { ModernFeaturesSection } from '@/components/landing/ModernFeaturesSection'
import { ModernDemoSection } from '@/components/landing/ModernDemoSection'
import { ModernTestimonialsSection } from '@/components/landing/ModernTestimonialsSection'
import { ModernFooter } from '@/components/landing/ModernFooter'
import Pricing from '@/components/landing/Pricing'

const LandingPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation when component mounts or hash changes
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <Header />
      <ModernHeroSection onGetStarted={onGetStarted} />
      <ModernFeaturesSection />
      <ModernDemoSection />
      <ModernTestimonialsSection />
      <ModernFooter />
    </>
  );
};

const App = () => {
  const { user, isLoading } = useAuth()
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-400/30 border-t-cyan-400 mx-auto"></div>
            <div className="absolute inset-0 animate-pulse rounded-full h-16 w-16 border-4 border-purple-400/20 mx-auto"></div>
          </div>
          <p className="text-gray-300 text-lg">Loading Witepad...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated, redirect to the main app
  if (user) {
    // Redirect to main app URL
    window.location.href = 'http://localhost:8080/documents'
    return null
  }
  return (
    <div className="min-h-screen bg-black browser-consistent-container consistent-text">
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage onGetStarted={() => setAuthDialogOpen(true)} />} 
        />
        <Route 
          path="/pricing" 
          element={<Pricing />} 
        />
      </Routes>
      
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
      />
    </div>
  )
}

export default App
