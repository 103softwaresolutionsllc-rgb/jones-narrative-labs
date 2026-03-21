# Jones Narrative Labs

A modern, responsive author website showcasing the works of I.E. Jones III. Built with React, TypeScript, and Tailwind CSS.

## 📚 Features

- **Responsive Design**: Optimized for all devices
- **Dark Mode**: Toggle between light and dark themes
- **Book Showcase**: Display available and upcoming publications
- **Purchase Integration**: Direct links to major book retailers
- **Video Promotions**: Embedded TikTok commercials
- **Author Bio**: Comprehensive about section
- **Future Projects**: Timeline for upcoming releases
- **Newsletter Signup**: Email subscription functionality
- **Social Media Integration**: Links to all social platforms

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: Custom CSS animations + Tailwind transitions

## 📖 Available Books

### If My Life Were A Song: A Memoir (2024)
- **E-book**: $7.99
- **Paperback**: $13.99
- **Hardcover**: $21.99

### Upcoming Releases (2028)
- SINCERA: The Birth of the Daemon
- SINCERA: The Oracle's True Prophecy  
- Interregnum: The Appearing of Him To Whom The Power Belongs

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jones-narrative-labs.git
cd jones-narrative-labs

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
jones-narrative-labs/
├── public/
│   └── images/          # Book covers, author photos, promotional materials
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── App.css          # Custom styles and animations
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
└── README.md           # This file
```

## 🎨 Customization

### Adding New Books
Update the `books` array in `src/App.tsx`:

```typescript
{
  id: 5,
  title: 'New Book Title',
  author: 'by I.E. Jones III',
  cover: '/images/book-cover.jpg',
  description: 'Book description...',
  price: '$24.99',
  rating: 4.8,
  year: '2024',
  status: 'available',
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
}
```

### Updating Social Links
Modify the `socialLinks` array in the FooterSection component.

### Theme Customization
Update colors in `tailwind.config.js` under the `colors` section.

## 🌐 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Update base path in `vite.config.ts` if needed

### Vercel/Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on push to main branch

## 📧 Contact

- **Author**: I.E. Jones III
- **Website**: Jones Narrative Labs
- **Development**: 103 Software Solutions LLC

## 📄 License

This project is proprietary. 2024 Jones Narrative Labs. All rights reserved.

---

**Built with ❤️ by 103 Software Solutions LLC**
