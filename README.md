Code Snippet Manager
A simple and efficient system for storing, organizing, and retrieving code snippets.

Features
Store code snippets with syntax highlighting
Organize snippets by language and tags
Quick search functionality
Copy snippets to clipboard
Share snippets via unique URLs
Access control and user management
Syntax highlighting for 100+ programming languages

Quick Start

# Installation
git clone https://github.com/username/code-snippet-manager
cd code-snippet-manager
npm install

# Set up environment variables
echo "DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000" > .env

# Database setup
npm run migrate
npm run seed

# Start development server
npm run dev

# Build for production
npm run build
npm start

API Reference

Snippets

GET    /api/snippets         - List all snippets
POST   /api/snippets         - Create new snippet
GET    /api/snippets/:id     - Get snippet by ID
PUT    /api/snippets/:id     - Update snippet
DELETE /api/snippets/:id     - Delete snippet

Auth

POST   /api/auth/register   - Register new user
POST   /api/auth/login      - Login user
POST   /api/auth/logout     - Logout user


Models

Snippet

{
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  description?: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
}


User

{
  id: string;
  username: string;
  email: string;
  created_at: Date;
}


Configuration

{
  port: 3000,
  database: {
    url: process.env.DATABASE_URL,
    pool: { min: 2, max: 10 }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
  }
}


Stack
Frontend: React.js, TypeScript, TailwindCSS
Backend: Node.js, Express.js
Database: PostgreSQL
Auth: JWT
Code Highlighting: Prism.js



Development Commands

npm run dev          # Start development server
npm test            # Run tests
npm run lint        # Run linting
npm run build       # Build for production
npm start           # Start production server


Contributing

Fork the repository
Create feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open Pull Request

License
MIT License. See LICENSE file.

Support
Email: info@oheneba.co.za
Facebook: Oheneba Kumi-Prempeh

Acknowledgments
Prism.js
React.js
All contributors

