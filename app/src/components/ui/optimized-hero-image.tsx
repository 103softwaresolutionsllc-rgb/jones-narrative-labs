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

  // Use the new hero portrait image
  const imageSrc = '/images/hero-portrait.jpg'
  
  // Different sizes for mobile vs desktop
  const sizes = isMobile 
    ? '100vw' 
    : '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'

  return (
    <div className={`relative ${className}`}>
      {/* Fallback image */}
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
