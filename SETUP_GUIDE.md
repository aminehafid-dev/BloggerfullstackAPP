# BlogApp - Full Backend Setup Complete ✅

Your BlogApp now has full authentication, database integration, and admin panel!

## 🚀 Quick Start

### 1. Setup Database (MongoDB)

**Option A: Use MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create free account
- Create a cluster and get connection string
- Update `.env.local`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-marketplace
```

**Option B: Use Local MongoDB**
- Download MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service
- Use default connection:
```
MONGODB_URI=mongodb://localhost:27017/blog-marketplace
```

### 2. Seed Test Data

Visit this URL to create test users:
```
http://localhost:3000/api/auth/seed
```

This creates:
- **Admin User**: admin@blogapp.com / admin123
- **Regular User**: user@blogapp.com / user123

## 🔐 Authentication Features

✅ **Signup** - Create new accounts with JWT tokens  
✅ **Login** - Secure login with email/password  
✅ **Token Storage** - Auto-saves JWT in localStorage  
✅ **Protected Routes** - Dashboard & Admin pages require login

## 👨‍💼 Admin Panel Features

Access at: `http://localhost:3000/admin`

**Admin can:**
- 👥 View all users with roles
- 🗑️ Delete user accounts
- 📝 Manage all blogs (view & delete)
- 📱 Manage all apps (view & delete)
- 📊 See statistics

## 📍 New Routes

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/dashboard` | User's personal dashboard |
| Admin Panel | `/admin` | Admin management interface |
| Seed Data | `/api/auth/seed` | Create test users |

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user (returns JWT token)
- `POST /api/auth/login` - Login user (returns JWT token)
- `POST /api/auth/seed` - Create test users

### Admin APIs
- `GET /api/admin/users` - List all users (admin only)
- `DELETE /api/admin/users/[userId]` - Delete user (admin only)

### Blogs & Apps
- `GET /api/blogs` - Get all blogs
- `GET /api/apps` - Get all apps
- Requires token in `Authorization: Bearer <token>` header

## 🧪 Testing the App

### Test Workflow:

1. **Create Test Users**
   ```
   POST http://localhost:3000/api/auth/seed
   ```

2. **Login as Admin**
   - Go to http://localhost:3000/login
   - Email: `admin@blogapp.com`
   - Password: `admin123`
   - Click "Admin Panel" after login

3. **Create Blog Post**
   - Go to http://localhost:3000/write
   - Fill in title, content, category
   - Click "Publish Blog"

4. **Upload App**
   - Go to http://localhost:3000/marketplace
   - Click "Upload App"
   - Fill in app details

## 📦 Database Schema

### Users Collection
```javascript
{
  name: string,
  email: string (unique),
  password: string (hashed),
  role: "user" | "admin",
  bio?: string,
  avatar?: string,
  createdAt: Date
}
```

### Blogs Collection
```javascript
{
  title: string,
  content: string,
  excerpt: string,
  author: ObjectId (ref User),
  category: string,
  tags: [string],
  views: number,
  likes: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Apps Collection
```javascript
{
  name: string,
  description: string,
  category: string,
  developer: ObjectId (ref User),
  downloadUrl: string,
  version: string,
  rating: number,
  downloads: number,
  size: string,
  createdAt: Date
}
```

## 🛠️ Environment Variables

Required in `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/blog-marketplace
JWT_SECRET=your-super-secret-key-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔒 Security Features

✅ Password hashing with bcryptjs  
✅ JWT token authentication  
✅ Protected admin routes  
✅ Role-based access control  
✅ Token expiration (7 days)  

## 🎯 User Roles

### Regular User
- Create & edit own blogs
- Upload & manage own apps
- View all public content
- Access personal dashboard

### Admin User
- All user permissions
- Manage all users
- Delete any blog or app
- Access admin panel
- View statistics

## 🚀 Production Checklist

Before deploying:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Setup MongoDB Atlas for production
- [ ] Enable HTTPS
- [ ] Add environment variables to deployment platform
- [ ] Setup email verification
- [ ] Add rate limiting to APIs
- [ ] Setup backup strategy
- [ ] Enable security headers

## 📞 Support

For issues or questions:
1. Check API response in Network tab (F12)
2. Check browser console for errors
3. Check server logs in terminal
4. Verify MongoDB connection

---

**You're all set! Happy blogging! 🎉**
