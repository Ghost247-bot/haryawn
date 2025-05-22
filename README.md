# Haryawn Website Clone

A professional legal firm website clone built with modern web technologies, focusing on user experience and accessibility.

## Project Overview

This project aims to create a professional legal firm website clone that maintains the aesthetics of Haryawn while incorporating unique branding elements. The website will be fully responsive, accessible, and optimized for search engines.

## Key Features

### 1. Homepage
- Hero section with dynamic content
- Featured practice areas
- Latest insights
- Global presence map
- Client testimonials
- Quick links to key services

### 2. About Page
- Firm history timeline
- Core values and mission statement
- Leadership team profiles
- Diversity and inclusion initiatives
- Global presence overview

### 3. Practice Areas
- Comprehensive list of legal services
- Detailed service descriptions
- Related case studies
- Industry expertise
- Team members by practice area

### 4. Insights
- Latest insights
- Client resources

### 5. Events
- Upcoming events calendar
- Past events archive
- Webinar recordings
- Conference information
- Event registration system

### 6. Careers
- Job listings
- Culture and values
- Professional development
- Benefits and compensation
- Application portal

### 7. Client Resources
- Document library
- Client portal
- Knowledge center
- Forms and templates
- Client alerts subscription

### 8. Contact Page
- Global office locations
- Interactive map
- Contact forms
- Office directory
- Social media links

## Technical Specifications

### Frontend
- React.js for component-based architecture
- Next.js for server-side rendering and routing
- Tailwind CSS for styling
- Framer Motion for animations
- React Query for data fetching
- TypeScript for type safety

### Backend
- Node.js with Express
- MongoDB for database
- Redis for caching
- AWS S3 for file storage
- Elasticsearch for search functionality

### Performance & SEO
- Server-side rendering
- Image optimization
- Lazy loading
- Meta tags optimization
- Sitemap generation
- Robots.txt configuration

### Accessibility
- WCAG 2.1 compliance
- ARIA labels
- Keyboard navigation
- Screen reader compatibility
- Color contrast compliance

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Next.js pages
├── styles/            # Global styles and Tailwind config
├── lib/               # Utility functions and helpers
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── api/               # API routes and services
├── assets/            # Images, fonts, and other static files
└── config/            # Configuration files
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Development Guidelines

- Follow the established coding standards
- Write unit tests for components
- Ensure responsive design for all new features
- Maintain accessibility standards
- Document new features and components

## Deployment

The application will be deployed using:
- Vercel for frontend hosting
- AWS for backend services
- CDN for static assets
- CI/CD pipeline with GitHub Actions

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass
5. Get code review approval

## License

This project is licensed under the MIT License - see the LICENSE file for details.