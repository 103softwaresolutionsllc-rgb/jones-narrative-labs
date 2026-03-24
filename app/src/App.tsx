import { useEffect, useRef, useState } from 'react'
import './App.css'
import { 
  BookOpen, 
  Play, 
  ArrowRight, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  ShoppingCart,
  Sparkles,
  Calendar,
  Clock,
  Star,
  Users,
  Menu,
  X,
  Settings,
  Sun,
  Moon,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { ResponsiveImage } from '@/components/ui/responsive-image'
import { OptimizedHeroImage } from '@/components/ui/optimized-hero-image'

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Books', href: '#books' },
    { name: 'Updates', href: '#updates' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
        scrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold tracking-tight hover:text-coral transition-colors flex items-center gap-2">
          <img src="/images/JNL_Logo.png" alt="Jones Narrative Labs" className="w-10 h-10" />
          <span>Jones Narrative Labs</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-coral transition-all duration-300 ease-out-expo group-hover:w-full group-hover:left-0" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button 
            className="bg-black text-white hover:bg-coral transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-coral"
            onClick={() => document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy Now
          </Button>
        </div>

        {/* Settings Button */}
        <button 
          className="p-2 rounded-lg hover:bg-coral/10 transition-colors"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-lg py-4 px-6 animate-fade-in-down">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button 
              className="bg-black text-white hover:bg-coral w-full mt-2"
              onClick={() => {
                setMobileMenuOpen(false)
                document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy Now
            </Button>
          </div>
        </div>
      )}

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Customize your viewing experience
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-muted-foreground">
                    {darkMode ? 'Dark theme is enabled' : 'Light theme is enabled'}
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleDarkMode}
                className="relative"
              >
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span>{darkMode ? 'Dark' : 'Light'}</span>
                </div>
              </Button>
            </div>

            {/* Additional Settings */}
            <div className="pt-4 border-t">
              <div className="text-sm text-muted-foreground mb-2">Theme Settings</div>
              <div className="text-xs text-muted-foreground">
                Your theme preference is saved automatically and will persist across visits.
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  )
}

// Hero Section
function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden dark:bg-gray-900 transition-colors duration-300">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedHeroImage
          priority={true}
          isVisible={isVisible}
          className="w-full h-full"
        />
      </div>

      {/* Decorative Pattern */}
      <div className="absolute top-20 right-20 w-64 h-64 opacity-20 animate-spin-slow pointer-events-none">
        <img src="/images/decorative-pattern.png" alt="" className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 transition-all duration-500 ease-elastic ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
            <span className="text-white text-sm font-medium">See Upcoming Releases</span>
          </div>

          {/* Headline */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Discover Your Next{' '}
            <span className="text-coral">Great Story</span>{' '}
            Today
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-lg md:text-xl text-white/80 max-w-xl mb-10 transition-all duration-700 ease-smooth ${
              isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Award-winning storytellers at Jones Narrative Labs crafting contemporary fiction that captivates, inspires, and transforms. 
            Explore a world of stories waiting to be told.
          </p>

          {/* CTAs */}
          <div 
            className={`flex flex-wrap gap-4 transition-all duration-500 ease-elastic ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button 
              size="lg"
              className="bg-coral text-white hover:bg-coral-dark transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:shadow-coral-lg animate-bounce-subtle"
              onClick={() => document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Explore Books
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 hover:border-coral hover:text-coral transition-all duration-300 group"
              onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Trailer
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// About Section
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { value: 'Chattanooga to LA', label: 'Life Journey', icon: Calendar },
    { value: '1', label: 'Published Memoir', icon: BookOpen },
    { value: 'Los Angeles, CA', label: 'Based In', icon: Users },
    { value: 'Tech Ed', label: 'Teaching Focus', icon: Star },
  ]

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300"
    >
      {/* Decorative Pattern */}
      <div className="absolute top-10 right-10 w-48 h-48 opacity-10 animate-spin-slow pointer-events-none">
        <img src="/images/decorative-pattern.png" alt="" className="w-full h-full" />
      </div>

      <div className="w-full px-6 lg:px-12">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            About <span className="text-coral">Jones Narrative Labs</span>
          </h2>
          <div 
            className={`w-20 h-1 bg-coral mx-auto rounded-full transition-all duration-700 ease-out-expo ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          {/* Images Grid */}
          <div 
            className={`relative transition-all duration-1000 ease-out-expo ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="grid grid-cols-1 gap-4 relative">
              {/* First Photo */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lift-lg group">
                <img 
                  src="/images/author-about.png" 
                  alt="Author" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Second Photo */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lift-lg group">
                <img 
                  src="/images/author-about-2.jpeg" 
                  alt="Author" 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-coral text-white rounded-2xl p-6 shadow-coral-lg animate-float">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div 
            className={`transition-all duration-1000 ease-out-expo ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {/* About Jones Narrative Labs */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-coral mb-4">About Jones Narrative Labs</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Jones Narrative Labs is the creative space of I. E. Jones III—where storytelling, philosophy, and imagination converge. 
                  More than a collection of books, it is a growing body of work dedicated to exploring the deeper layers of human experience through narrative.
                </p>
                <p>
                  Each project within the Lab is designed to do more than entertain. From introspective works like If My Life Were A Song 
                  to expansive philosophical thrillers like the Sinecera series and Interregnum, the goal is to challenge perception, question reality, 
                  and explore the forces that shape identity, power, and truth.
                </p>
                <p>
                  At its core, Jones Narrative Labs is about building worlds that feel both unfamiliar and deeply personal—stories that resonate 
                  long after the final page. This is not just writing. It is an ongoing exploration of ideas, told through narrative form.
                </p>
              </div>
            </div>

            {/* About the Author */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-coral mb-4">About the Author</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>Isaac E. Jones III is a writer whose life journey—from a childhood in Chattanooga to the streets of Los Angeles—forms the foundation of his work. Shaped by resilience, faith, and personal transformation, his storytelling carries an authentic voice that reflects both struggle and purpose.</p>
                <p>Now based in Los Angeles by way of Memphis, Tennessee, Isaac works as a Full Stack Developer and AI Engineer for 103 Software Solutions LLC. His background in technology and problem-solving influences the way he approaches storytelling—building narratives that are layered, intentional, and thought-provoking.</p>
                <p>Drawing from a life filled with trials and triumphs, Isaac creates stories that explore identity, growth, and the deeper forces that shape human experience. Whether through personal reflection or philosophical fiction, his work is rooted in one mission: to inspire, challenge perception, and offer meaning to readers navigating their own journeys.</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`p-6 rounded-xl bg-secondary/50 hover:bg-coral/10 transition-all duration-300 ease-out-expo group hover:-translate-y-1 hover:shadow-lift ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 text-coral mb-3 transition-transform group-hover:scale-110" />
                  <div className="text-3xl font-bold mb-1 group-hover:text-coral transition-colors">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Books Section
function BooksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedBook, setSelectedBook] = useState<typeof books[0] | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const books = [
    {
      id: 1,
      title: 'If My Life Were A Song: A Memoir',
      author: 'by I.E. Jones III',
      cover: '/images/book-1.png',
      description: 'A deeply personal memoir that explores the journey of life through the lens of music, revealing the melodies and harmonies that shape our existence.',
      price: 'From $7.99',
      rating: 4.9,
      year: '2024',
      status: 'available',
      commercial: 'https://www.tiktok.com/t/ZP8baP2Am/',
      formats: {
        ebook: { price: '$7.99', label: 'E-book' },
        paperback: { price: '$13.99', label: 'Paperback' },
        hardcover: { price: '$21.99', label: 'Hardcover' }
      },
      purchaseLinks: {
        amazon: 'https://www.amazon.com/',
        barnes: 'https://www.barnesandnoble.com/',
        friesen: 'https://www.friesenpress.com/',
        booksamillion: 'https://www.booksamillion.com/'
      }
    },
    {
      id: 2,
      title: 'SINCERA: The Birth of the Daemon',
      author: 'A Philosophical Thriller (Book One of the Sine Cera Cycle)',
      cover: '/images/book-2.png',
      description: 'The first installment of a gripping philosophical thriller series that explores the boundaries between good, evil, and the nature of consciousness itself.',
      price: '$22.99',
      rating: 4.8,
      year: '2028',
      status: 'upcoming',
      commercial: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      purchaseLinks: {
        amazon: 'https://www.amazon.com/',
        barnes: 'https://www.barnesandnoble.com/',
        friesen: 'https://www.friesenpress.com/',
        booksamillion: 'https://www.booksamillion.com/'
      }
    },
    {
      id: 3,
      title: 'SINCERA: The Oracle\'s True Prophecy',
      author: 'A Philosophical Thriller (Book Two of the Sine Cera Cycle)',
      cover: '/images/book-3.png',
      description: 'The compelling sequel that delves deeper into the mysterious world of Sine Cera, where ancient prophecies and modern philosophy collide.',
      price: '$21.99',
      rating: 4.7,
      year: '2028',
      status: 'upcoming',
      commercial: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      purchaseLinks: {
        amazon: 'https://www.amazon.com/',
        barnes: 'https://www.barnesandnoble.com/',
        friesen: 'https://www.friesenpress.com/',
        booksamillion: 'https://www.booksamillion.com/'
      }
    },
    {
      id: 4,
      title: 'Interregnum: The Appearing of Him To Whom The Power Belongs',
      author: 'by I.E. Jones III',
      cover: '/images/book-4.png',
      description: 'An epic tale of power, prophecy, and transformation that explores the emergence of true leadership in times of chaos and uncertainty.',
      price: '$23.99',
      rating: 4.9,
      year: '2028',
      status: 'upcoming',
      commercial: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      purchaseLinks: {
        amazon: 'https://www.amazon.com/',
        barnes: 'https://www.barnesandnoble.com/',
        friesen: 'https://www.friesenpress.com/',
        booksamillion: 'https://www.booksamillion.com/'
      }
    }
  ]

  return (
    <section 
      id="books" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-secondary/30 dark:bg-gray-800/30 overflow-hidden transition-colors duration-300"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            My <span className="text-coral">Publications</span>
          </h2>
          <p 
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ease-smooth ${
              isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Explore our collection of bestselling novels, each crafted with passion and purpose
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto justify-items-center">
          {books.map((book, index) => (
            <div
              key={book.id}
              className={`group perspective-1000 transition-all duration-700 ease-out-expo ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="relative preserve-3d transition-all duration-500 ease-out-expo group-hover:translate-y-[-10px]">
                {/* Book Cover */}
                <div 
                  className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lift cursor-pointer"
                  onClick={() => setSelectedBook(book)}
                >
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <Button 
                        size="sm" 
                        className="w-full bg-coral hover:bg-coral-dark text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedBook(book)
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Commercial
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Book Info */}
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-coral transition-colors line-clamp-2">{book.title}</h3>
                  {book.author && (
                    <p className="text-sm text-muted-foreground mb-2 italic">{book.author}</p>
                  )}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{book.rating}</span>
                    <span>•</span>
                    <span>{book.year}</span>
                  </div>
                  {book.status === 'upcoming' && (
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-coral/10 text-coral text-xs font-medium rounded-full mb-2">
                      <span className="w-2 h-2 bg-coral rounded-full animate-pulse" />
                      Upcoming Release
                    </div>
                  )}
                  {book.formats ? (
                    <div className="space-y-1">
                      <p className="text-coral font-semibold text-sm">{book.price}</p>
                      <div className="flex flex-col gap-1">
                        {Object.values(book.formats).map((format, index) => (
                          <span key={index} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded text-center">
                            {format.label} {format.price}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-coral font-semibold">{book.price}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div 
          className={`text-center mt-12 transition-all duration-500 ease-elastic ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <Button asChild size="lg" variant="outline" className="border-2 border-black hover:bg-black hover:text-white transition-all duration-300 group">
            <a href="/assets/all-books.html">
              View All Books
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>

      {/* Book Detail Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedBook.title}</DialogTitle>
                <DialogDescription>{selectedBook.description}</DialogDescription>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                {/* Book Cover */}
                <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lift">
                  <img 
                    src={selectedBook.cover} 
                    alt={selectedBook.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  {/* Video Commercials */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Play className="w-5 h-5 text-coral" />
                      Watch the Commercials
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {/* First Commercial */}
                      <div className="aspect-video rounded-lg overflow-hidden bg-black">
                        <a 
                          href="https://www.tiktok.com/t/ZP8baP2Am/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center text-white hover:text-coral transition-colors group"
                        >
                          <div className="flex flex-col items-center">
                            <Play className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Commercial 1 - TikTok</span>
                            <span className="text-xs text-white/70">Click to open in new tab</span>
                          </div>
                        </a>
                      </div>
                      {/* Second Commercial */}
                      <div className="aspect-video rounded-lg overflow-hidden bg-black">
                        <a 
                          href="https://www.tiktok.com/t/ZP8baDgvL/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full h-full flex items-center justify-center text-white hover:text-coral transition-colors group"
                        >
                          <div className="flex flex-col items-center">
                            <Play className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Commercial 2 - TikTok</span>
                            <span className="text-xs text-white/70">Click to open in new tab</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Links */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-coral" />
                      Purchase Options
                    </h4>
                    <div className="space-y-2">
                      <a 
                        href={selectedBook.purchaseLinks.amazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-coral/10 transition-colors group"
                      >
                        <span>Amazon</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-coral transition-colors" />
                      </a>
                      <a 
                        href={selectedBook.purchaseLinks.barnes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-coral/10 transition-colors group"
                      >
                        <span>Barnes & Noble</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-coral transition-colors" />
                      </a>
                      <a 
                        href={selectedBook.purchaseLinks.friesen}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-coral/10 transition-colors group"
                      >
                        <span>FriesenPress</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-coral transition-colors" />
                      </a>
                      <a 
                        href={selectedBook.purchaseLinks.booksamillion}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-coral/10 transition-colors group"
                      >
                        <span>Books-A-Million</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-coral transition-colors" />
                      </a>
                    </div>
                  </div>

                  {/* Book Stats */}
                  <div className="flex items-center gap-6 p-4 rounded-lg bg-secondary">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coral">{selectedBook.rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedBook.year}</div>
                      <div className="text-xs text-muted-foreground">Published</div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-coral">{selectedBook.price}</div>
                      <div className="text-xs text-muted-foreground">Price</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

// Video Section
function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="video" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Watch the <span className="text-coral">Trailers</span>
          </h2>
          <p 
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ease-smooth ${
              isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Get a glimpse into "If My Life Were A Song: A Memoir" with our exclusive TikTok commercials
          </p>
        </div>

        {/* Video Container */}
        <div 
          className={`max-w-5xl mx-auto transition-all duration-1000 ease-out-expo ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Commercial */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lift-lg group">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                style={{ 
                  backgroundImage: 'url(/images/commercial-1-thumbnail.png)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundColor: '#000'
                }}
              >
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href="https://www.tiktok.com/t/ZP8baP2Am/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-white hover:text-coral transition-colors"
                  >
                    <div className="w-16 h-16 bg-coral/80 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-lg font-medium">Commercial 1</span>
                    <span className="text-sm text-white/80">TikTok - Click to play</span>
                  </a>
                </div>
              </div>
            </div>
            {/* Second Commercial */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lift-lg group">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                style={{ 
                  backgroundImage: 'url(/images/commercial-2-thumbnail.png)',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundColor: '#000'
                }}
              >
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href="https://www.tiktok.com/t/ZP8baDgvL/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-white hover:text-coral transition-colors"
                  >
                    <div className="w-16 h-16 bg-coral/80 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-lg font-medium">Commercial 2</span>
                    <span className="text-sm text-white/80">TikTok - Click to play</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Updates/Blog Section
function UpdatesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const articles = [
    {
      id: 1,
      title: 'The Art of Character Development',
      category: 'Writing Tips',
      image: '/images/blog-1.jpg',
      url: '/assets/article-1.html',
      date: 'Dec 15, 2024',
      excerpt: 'Learn the secrets behind creating memorable characters that readers will love.',
    },
    {
      id: 2,
      title: 'My Journey to Becoming an Author',
      category: 'Personal Story',
      image: '/images/blog-2.jpg',
      url: '/assets/article-2.html',
      date: 'Dec 10, 2024',
      excerpt: 'The highs, lows, and everything in between on my path to publication.',
    },
    {
      id: 3,
      title: 'Top 10 Books That Inspired Me',
      category: 'Recommendations',
      image: '/images/blog-3.jpg',
      url: '/assets/article-3.html',
      date: 'Dec 5, 2024',
      excerpt: 'A curated list of must-read books that shaped my writing style.',
    },
    {
      id: 4,
      title: 'How to Overcome Writer\'s Block',
      category: 'Writing Tips',
      image: '/images/blog-4.jpg',
      url: '/assets/article-4.html',
      date: 'Nov 28, 2024',
      excerpt: 'Practical strategies to break through creative barriers.',
    },
    {
      id: 5,
      title: 'Behind the Scenes: My Writing Routine',
      category: 'Process',
      image: '/images/blog-5.jpg',
      url: '/assets/article-5.html',
      date: 'Nov 20, 2024',
      excerpt: 'A day in the life of a full-time author and creative.',
    },
    {
      id: 6,
      title: 'The Future of Publishing',
      category: 'Industry Insights',
      image: '/images/blog-6.jpg',
      url: '/assets/article-6.html',
      date: 'Nov 15, 2024',
      excerpt: 'Exploring trends and predictions for the book industry.',
    },
  ]

  return (
    <section 
      id="updates" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-secondary/30 overflow-hidden"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Latest <span className="text-coral">Updates</span>
          </h2>
          <p 
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ease-smooth ${
              isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Insights, stories, and behind-the-scenes looks at the writing process
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <article
              key={article.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lift hover:shadow-lift-lg transition-all duration-500 ease-out-expo hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
              onClick={() => {
                window.location.href = article.url
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-coral text-white text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <h3 className="font-semibold text-xl mb-2 group-hover:text-coral transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <a 
                  href={article.url}
                  className="inline-flex items-center text-sm font-medium text-coral hover:underline"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div 
          className={`text-center mt-12 transition-all duration-500 ease-elastic ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          <Button asChild size="lg" variant="outline" className="border-2 border-black hover:bg-black hover:text-white transition-all duration-300 group">
            <a href="/assets/all-articles.html">
              Read All Articles
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

// Future Projects Section
function FutureProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const projects = [
    {
      title: 'SINCERA: The Birth of the Daemon',
      status: 'Coming 2028',
      progress: 85,
      description: 'A Philosophical Thriller (Book One of the Sine Cera Cycle) - The first installment of a gripping philosophical thriller series that explores the boundaries between good, evil, and the nature of consciousness itself.',
    },
    {
      title: 'SINCERA: The Oracle\'s True Prophecy',
      status: 'Coming 2028',
      progress: 60,
      description: 'A Philosophical Thriller (Book Two of the Sine Cera Cycle) - The compelling sequel that delves deeper into the mysterious world of Sine Cera, where ancient prophecies and modern philosophy collide.',
    },
    {
      title: 'Interregnum: The Appearing of Him To Whom The Power Belongs',
      status: 'Coming 2028',
      progress: 35,
      description: 'An epic tale of power, prophecy, and transformation that explores the emergence of true leadership in times of chaos and uncertainty.',
    },
  ]

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      {/* Decorative Pattern */}
      <div className="absolute bottom-10 left-10 w-48 h-48 opacity-10 animate-spin-slow pointer-events-none">
        <img src="/images/decorative-pattern.png" alt="" className="w-full h-full" />
      </div>

      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Future <span className="text-coral">Projects</span>
          </h2>
          <p 
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ease-smooth ${
              isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            A sneak peek at what's coming next
          </p>
        </div>

        {/* Projects */}
        <div className="max-w-4xl mx-auto space-y-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`p-8 rounded-2xl bg-secondary/50 hover:bg-coral/5 transition-all duration-500 ease-out-expo group ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: `${300 + index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-coral transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-coral">
                    <Clock className="w-4 h-4" />
                    <span>{project.status}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-coral">{project.progress}%</div>
              </div>
              
              <p className="text-muted-foreground mb-4">{project.description}</p>
              
              {/* Progress Bar */}
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-coral rounded-full transition-all duration-1000 ease-out-expo"
                  style={{ 
                    width: isVisible ? `${project.progress}%` : '0%',
                    transitionDelay: `${500 + index * 150}ms`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer/Contact Section
function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://x.com/ijones392262' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/ijones392262' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ijones392262' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'TikTok', icon: Youtube, href: 'https://tiktok.com/@ijones392262' },
  ]

  return (
    <footer 
      id="contact" 
      ref={sectionRef}
      className="relative bg-black dark:bg-gray-950 text-white overflow-hidden transition-colors duration-300"
    >
      {/* Diagonal Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      <div className="relative z-10 w-full px-6 lg:px-12 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 transition-all duration-700 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Stay <span className="text-coral">Connected</span>
          </h2>
          
          <p 
            className={`text-lg text-white/70 max-w-2xl mx-auto mb-10 transition-all duration-700 ease-smooth ${
              isVisible ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            Stay connected to what we are doing at JNL for exclusive content, early access to new releases,
            and behind-the-scenes updates.
          </p>

          {/* Newsletter Form */}
          <form 
            onSubmit={handleSubscribe}
            className={`flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-16 transition-all duration-500 ease-elastic ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-coral focus:ring-coral"
                required
              />
            </div>
            <Button 
              type="submit"
              size="lg"
              className="bg-coral hover:bg-coral-dark text-white px-8 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-coral-lg"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </Button>
          </form>

          {/* Social Links */}
          <div 
            className={`flex justify-center gap-6 mb-16 transition-all duration-500 ease-elastic ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-coral transition-all duration-300 ease-elastic hover:scale-110 hover:rotate-6 group"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-8" />

          {/* Bottom */}
          <div 
            className={`flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50 transition-all duration-500 ease-out-expo ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <p>© 2024 Jones Narrative Labs. All rights reserved.</p>
            <p className="text-xs text-white/30 mt-1">Created by 103 Software Solutions LLC</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-coral transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-coral transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <BooksSection />
        <VideoSection />
        <UpdatesSection />
        <FutureProjectsSection />
      </main>
      <FooterSection />
    </div>
  )
}

export default App
