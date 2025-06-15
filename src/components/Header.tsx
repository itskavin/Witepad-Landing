import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AuthDialog } from './AuthDialog';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ClickSpark } from '@/components/landing/ClickSpark';
import { UserAvatar } from './UserAvatar';
import { Menu, X } from 'lucide-react';

export const Header = ({
  flat = false
}: {
  flat?: boolean;
}) => {  const { user } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);
  
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Demo', href: '#demo' }
  ];  const handleNavigation = (href: string) => {
    setIsNavigating(true);
    setMobileMenuOpen(false); // Close mobile menu when navigating
    
    if (href.startsWith('#')) {
      // If we're not on the home page, navigate to home first, then scroll
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        // We're on home page, just scroll to the section
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Regular navigation
      navigate(href);
    }
    
    setTimeout(() => setIsNavigating(false), 300);
  };

  return <>      {/* Modern floating glass navbar */}
      <nav className="fixed left-1/2 top-4 z-[99] -translate-x-1/2 w-[98vw] max-w-5xl px-4 py-1.5 flex items-center justify-between transition-all gap-2">
        {/* Logo/brand */}
        <div className="flex items-center gap-2 cursor-pointer group bg-gray-900/50 rounded-full p-2 backdrop-blur-sm border border-gray-700/50" onClick={() => handleNavigation('/')}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-6 transition-transform overflow-hidden">
            <img alt="Witepad Logo" className="w-full h-full object-contain" src="/witepad-logo.png" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-orange-400 via-white to-orange-400 bg-clip-text text-transparent tracking-tight select-none">
            Witepad
          </span>
        </div><div className="hidden md:flex flex-1 items-center justify-center">
          <ul className="flex gap-2 bg-gray-900/50 rounded-full p-1 backdrop-blur-sm border border-gray-700/50">
            {navItems.map(item => {
              const isAnchor = item.href.startsWith('#');
              let isActive = false;
              
              if (isAnchor) {
                // For anchor links, active when on home page and hash matches
                isActive = location.pathname === '/' && location.hash === item.href;
              } else {
                // For regular links, active when pathname matches
                isActive = location.pathname === item.href;
              }
              
              return <li key={item.label}>
                  {isAnchor ? 
                    <button 
                      onClick={() => handleNavigation(item.href)}
                      disabled={isNavigating}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      } ${isNavigating ? 'opacity-50' : ''}`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse" />
                      )}
                    </button>
                    : 
                    <Link 
                      to={item.href} 
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden flex items-center ${
                        isActive 
                          ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse" />
                      )}
                    </Link>
                  }
                </li>;
            })}
          </ul>
        </div>        {/* Mobile menu button */}
        <div className="md:hidden bg-gray-900/50 rounded-full backdrop-blur-sm border border-gray-700/50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="flex items-center gap-2 bg-gray-900/50 rounded-full p-1 backdrop-blur-sm border border-gray-700/50">
          {user ? (
            <UserAvatar />
          ) : (
            <ClickSpark>
              <Button size="sm" className="bg-gradient-to-r from-cyan-400 to-purple-400 text-black px-4 py-1 rounded-full shadow-lg hover:scale-105 transition-all text-sm font-bold" onClick={() => setAuthDialogOpen(true)}>
                Get Started
              </Button>
            </ClickSpark>
          )}
        </div>
      </nav>      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div ref={mobileMenuRef} className="fixed top-20 left-1/2 -translate-x-1/2 w-[98vw] max-w-5xl z-[98] md:hidden">
          <div className="bg-black/95 backdrop-blur-2xl rounded-2xl border border-gray-700/50 p-4 shadow-2xl">
            <ul className="space-y-2">
              {navItems.map(item => {
                const isAnchor = item.href.startsWith('#');
                let isActive = false;
                
                if (isAnchor) {
                  isActive = location.pathname === '/' && location.hash === item.href;
                } else {
                  isActive = location.pathname === item.href;
                }
                
                return (
                  <li key={item.label}>
                    {isAnchor ? 
                      <button
                        onClick={() => handleNavigation(item.href)}
                        disabled={isNavigating}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        } ${isNavigating ? 'opacity-50' : ''}`}
                      >
                        {item.label}
                      </button>
                      : 
                      <Link
                        to={item.href}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    }
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      <div className="h-16" /> {/* Spacer for floating nav */}
    </>;
};
