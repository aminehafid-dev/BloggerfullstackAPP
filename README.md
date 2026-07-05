# BlogApp - Full Stack Blogger & App Marketplace

A modern full-stack web application combining a blogger platform and app marketplace, built with Next.js, MongoDB, and Tailwind CSS.

## Features

### Blogger Platform
- 📝 Create, edit, and delete blog posts
- 🏷️ Categorize blogs with tags
- 👀 Track blog views and engagement
- 💬 Comment system
- 📊 Author analytics

### App Marketplace
- 📱 Upload and manage applications
- 🌟 Rating and review system
- 📥 Download tracking
- 🔍 Advanced search and filtering
- 📈 App analytics

### User System
- 🔐 Secure authentication with JWT
- 👤 User profiles with bio
- 📧 Email verification
- 🔑 Password hashing with bcryptjs

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT + bcryptjs
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- Git

## Installation

1. **Clone/Navigate to project**
   ```bash
   cd blog-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure MongoDB**
   Update `.env.local` with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/blog-marketplace
   JWT_SECRET=your-secret-key
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000

## Project Structure

```
blog-marketplace/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Auth routes (login/signup)
│   │   ├── api/             # API routes
│   │   │   ├── auth/        # Authentication endpoints
│   │   │   ├── blogs/       # Blog CRUD endpoints
│   │   │   └── apps/        # App CRUD endpoints
│   │   ├── blogs/           # Blogs listing page
│   │   ├── marketplace/     # Apps marketplace page
│   │   ├── write/           # Blog creation page
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable React components
│   ├── lib/
│   │   ├── mongodb.ts       # MongoDB connection
│   │   └── models/          # Mongoose schemas
│   └── globals.css          # Global styles
├── public/                  # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[id]` - Get blog by ID
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog

### Apps
- `GET /api/apps` - Get all apps
- `POST /api/apps` - Upload new app
- `GET /api/apps/[id]` - Get app by ID
- `PUT /api/apps/[id]` - Update app
- `DELETE /api/apps/[id]` - Delete app

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
```

## Environment Variables

Create `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/blog-marketplace
JWT_SECRET=your-secure-secret-key
```

## Future Enhancements

- [ ] Comments system
- [ ] Social sharing
- [ ] User followers/following
- [ ] Notifications
- [ ] Admin dashboard
- [ ] Advanced analytics
- [ ] Rich text editor
- [ ] Image upload
- [ ] Email verification
- [ ] Two-factor authentication

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please create an issue in the repository.

---

**Happy Blogging and App Sharing! 🚀**
