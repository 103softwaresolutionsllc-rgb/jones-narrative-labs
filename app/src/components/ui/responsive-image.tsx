import React, { useState, useEffect } from 'react'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  // Generate WebP and fallback sources
  const generateSrcSet = (baseSrc: string) => {
    const widths = [400, 800, 1200, 1600, 1920]
    const webpSources = widths.map(width => 
      `${baseSrc.replace(/\.[^/.]+$/, '')}-${width}w.webp ${width}w`
    ).join(', ')
    
    const fallbackSources = widths.map(width => 
      `${baseSrc.replace(/\.[^/.]+$/, '')}-${width}w.jpg ${width}w`
    ).join(', ')
    
    return { webpSources, fallbackSources }
  }

  const { webpSources } = generateSrcSet(src)

  useEffect(() => {
    if (priority) {
      // Preload critical images
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
      
      return () => {
        document.head.removeChild(link)
      }
    }
  }, [src, priority])

  return (
    <div className={`relative ${className}`}>
      <picture>
        {/* WebP sources for modern browsers */}
        <source
          type="image/webp"
          srcSet={webpSources}
          sizes={sizes}
        />
        
        {/* Fallback for older browsers */}
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          style={{ objectFit: 'cover' }}
        />
      </picture>
      
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse ${className}`}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default ResponsiveImage
