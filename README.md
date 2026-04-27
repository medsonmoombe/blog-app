# 📝 Modern Blog Application

A full-stack MERN blog platform with modern UI, authentication, role-based access control, and rich content management features.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4%2B-green)

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with JWT authentication
- Google OAuth integration
- Password reset via email
- Role-based access control (Admin/User)
- Secure HTTP-only cookies

### 📄 Post Management
- Create, read, update, and delete posts
- Rich text editor with ReactQuill
- Draft and publish status
- Image upload with Firebase Storage
- SEO meta tags (title, description, keywords)
- Post categories and tags
- Like/unlike posts
- View counter
- Related posts recommendations

### 💬 Comments System
- Add, edit, and delete comments
- Like comments
- Admin moderation capabilities
- Real-time comment count

### 🎨 Modern UI/UX
- Glass-morphism design
- Dark/Light mode toggle
- Smooth animations and transitions
- Responsive design for all devices
- Custom scrollbar
- Background effects and gradients

### 🔍 Search & Discovery
- Full-text search across posts
- Filter by category
- Sort by date
- Pagination support

### 📊 Dashboard
- User profile management
- Post analytics (views, likes, comments)
- Admin panel for user management
- Statistics overview

### 🔒 Security Features
- Helmet.js for security headers
- Rate limiting to prevent abuse
- CORS configuration
- Input validation and sanitization
- XSS protection

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router v6** - Navigation
- **Tailwind CSS** - Styling
- **Flowbite React** - UI components
- **React Quill** - Rich text editor
- **React Icons** - Icon library
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service

### Additional Tools
- **Firebase** - Image storage
- **Express Validator** - Input validation
- **Morgan** - HTTP request logger
- **Helmet** - Security middleware
- **Express Rate Limit** - Rate limiting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/blog-app.git
cd blog-app
```

### 2. Install dependencies

Install root dependencies:
```bash
npm install
```

Install client dependencies:
```bash
cd client
npm install
cd ..
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Secret Key (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production

# Email Configuration (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password

# Frontend URL (for email links)
CLIENT_URL=http://localhost:5173

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firebase Storage
3. Get your Firebase configuration
4. Create `client/src/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

export const app = initializeApp(firebaseConfig);
```

### 5. Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password
3. Use this password in your `.env` file as `EMAIL_PASSWORD`

### 6. Run the application

Development mode (runs both frontend and backend):
```bash
npm run dev
```

Or run separately:

Backend:
```bash
npm start
```

Frontend:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 📁 Project Structure

```
blog-app/
├── api/                      # Backend
│   ├── controllers/          # Route controllers
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── index.js             # Server entry point
├── client/                   # Frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── redux/           # Redux store
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── public/              # Static files
│   └── index.html           # HTML template
├── .env                      # Environment variables
├── .env.example             # Environment template
├── package.json             # Root dependencies
└── README.md                # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Posts
- `GET /api/post/getposts` - Get all posts (with filters)
- `POST /api/post/create` - Create new post (auth required)
- `PUT /api/post/updatepost/:postId/:userId` - Update post (auth required)
- `DELETE /api/post/deletepost/:postId/:userId` - Delete post (auth required)
- `PUT /api/post/like/:postId` - Like/unlike post (auth required)
- `PUT /api/post/view/:postId` - Increment view count
- `GET /api/post/related/:postId` - Get related posts

### Users
- `GET /api/user/:userId` - Get user by ID
- `GET /api/user/getusers` - Get all users (admin only)
- `PUT /api/user/update/:userId` - Update user (auth required)
- `DELETE /api/user/delete/:userId` - Delete user (auth required)
- `POST /api/user/signout` - Sign out user

### Comments
- `POST /api/comment/create` - Create comment (auth required)
- `GET /api/comment/getPostComments/:postId` - Get post comments
- `PUT /api/comment/likeComment/:commentId` - Like comment (auth required)
- `PUT /api/comment/editComment/:commentId` - Edit comment (auth required)
- `DELETE /api/comment/deleteComment/:commentId` - Delete comment (auth required)

## 🎨 Features in Detail

### Draft/Publish System
Posts can be saved as drafts and published later. Only published posts are visible to the public.

### Like System
Users can like posts and comments. The system prevents duplicate likes from the same user.

### View Counter
Automatically tracks post views to show popular content.

### Related Posts
Displays related posts based on category to increase engagement.

### SEO Optimization
Each post includes meta description and keywords for better search engine visibility.

### Email Notifications
- Password reset emails with secure tokens
- Comment notifications for post authors (optional)

## 🔒 Security Best Practices

- Passwords hashed with bcrypt
- JWT tokens with expiration
- HTTP-only cookies
- CORS configuration
- Rate limiting on API endpoints
- Input validation and sanitization
- Helmet.js security headers
- Environment variables for sensitive data

## 🚀 Deployment

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build the client: `cd client && npm run build`
2. Deploy the `client/dist` folder
3. Set environment variables
4. Configure redirects for SPA

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Whitelist IP addresses
3. Get connection string
4. Update `MONGO_URI` in `.env`

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT | `random_string_here` |
| `EMAIL_USER` | Email address for sending | `your@email.com` |
| `EMAIL_PASSWORD` | Email app password | `app_password` |
| `CLIENT_URL` | Frontend URL | `http://localhost:5173` |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `development` or `production` |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

## 🙏 Acknowledgments

- React and the React team
- MongoDB and Mongoose
- Tailwind CSS
- Flowbite React
- All open-source contributors

## 📧 Contact

For questions or support, please email: your.email@example.com

---

⭐ If you found this project helpful, please give it a star!
