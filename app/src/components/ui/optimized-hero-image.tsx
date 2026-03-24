import React, { useState, useEffect } from 'react'

interface OptimizedHeroImageProps {
  className?: string
  priority?: boolean
  isVisible?: boolean
}

export const OptimizedHeroImage: React.FC<OptimizedHeroImageProps> = ({
  className = '',
  priority = true,
  isVisible = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Use mobile-optimized image for smaller screens
  const imageSrc = isMobile ? '/images/hero-portrait-mobile.webp' : '/images/hero-portrait.png'
  
  // Different sizes for mobile vs desktop
  const sizes = isMobile 
    ? '100vw' 
    : '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'

  return (
    <div className={`relative ${className}`}>
      <picture>
        {/* WebP sources for modern browsers */}
        <source
          type="image/webp"
          srcSet={
            isMobile 
              ? '/images/hero-portrait-mobile.webp'
              : `/images/hero-portrait-400w.webp 400w,
                 /images/hero-portrait-800w.webp 800w,
                 /images/hero-portrait-1200w.webp 1200w,
                 /images/hero-portrait-1600w.webp 1600w,
                 /images/hero-portrait-1920w.webp 1920w`
          }
          sizes={sizes}
        />
        
        {/* Fallback for older browsers */}
        <img
          src={imageSrc}
          alt="Author Portrait"
          className={`w-full h-full object-cover transition-all duration-1000 ease-out-expo ${
            isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
        />
      </picture>
      
      {/* Enhanced gradient overlay for better text visibility on mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent md:from-black/70 md:via-black/50 md:to-transparent" />
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 ${className}`}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default OptimizedHeroImage
