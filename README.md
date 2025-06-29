# YT Analyzer - Full Stack YouTube Analytics Platform

A modern, full-stack YouTube analytics platform built with React, Node.js, and PostgreSQL. Features AI-powered insights, real-time analytics, and a beautiful UI.

## 🚀 Features

### Frontend
- **Modern React with TypeScript** - Type-safe development
- **Beautiful UI/UX** - Glass morphism design with animations
- **Real-time Analytics** - Live data visualization with charts
- **Authentication** - Secure login/signup with JWT
- **Responsive Design** - Works on all devices
- **State Management** - Zustand for global state
- **API Integration** - Full backend connectivity

### Backend
- **Node.js with Express** - Fast, scalable API
- **PostgreSQL Database** - Reliable data storage
- **Prisma ORM** - Type-safe database operations
- **JWT Authentication** - Secure user sessions
- **Role-based Access** - Admin and user roles
- **RESTful API** - Clean, documented endpoints

## 🛠 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS + shadcn/ui
- Framer Motion (Animations)
- Recharts (Data visualization)
- Zustand (State management)
- React Router (Navigation)
- React Query (Data fetching)

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (Authentication)
- bcrypt (Password hashing)
- CORS (Cross-origin requests)

### DevOps
- Docker & Docker Compose
- Environment-based configuration

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker (optional)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd YT_Analyzer-main
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your database credentials
   
   # Start PostgreSQL (if using Docker)
   docker-compose up -d postgres
   
   # Run database migrations
   npx prisma migrate dev
   
   # Start the backend
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start the frontend
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:8081
   - Backend API: http://localhost:5000

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/yt_analyzer"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/request-password-reset` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### User Management
- `GET /api/user/me` - Get current user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/all` - Get all users (admin only)
- `DELETE /api/user/:id` - Delete user (admin only)
- `PUT /api/user/:id/role` - Change user role (admin only)

### Analytics
- `GET /api/analytics` - Get analytics with pagination/filtering
- `GET /api/analytics/:id` - Get specific analytics entry
- `POST /api/analytics` - Create new analytics entry
- `PUT /api/analytics/:id` - Update analytics entry
- `DELETE /api/analytics/:id` - Delete analytics entry
- `GET /api/analytics/summary` - Get analytics summary

## 🎯 Usage

### Authentication Flow
1. Register a new account at `/signup`
2. Login with your credentials at `/login`
3. Access protected routes (Dashboard, Analytics, etc.)
4. Use the logout button in the navigation header

### Analytics Dashboard
- View real-time performance metrics
- Analyze content distribution (Shorts vs Long-form)
- Monitor engagement rates and trends
- Access AI-powered insights

### Data Management
- Create, edit, and delete analytics entries
- Filter and sort data by various criteria
- Export data for external analysis
- Generate custom reports

## 🔒 Security Features

- **JWT Authentication** - Secure token-based sessions
- **Password Hashing** - bcrypt for password security
- **CORS Protection** - Configured for production
- **Input Validation** - Server-side validation
- **Role-based Access** - Admin and user permissions
- **Environment Variables** - Secure configuration management

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Build frontend: `npm run build`
5. Start backend: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

**Built with ❤️ using modern web technologies**

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)

A powerful YouTube analytics platform that helps content creators understand their audience, track performance metrics, and make data-driven decisions.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [Contributing](#-contributing)

</div>

## ✨ Features

### 📊 Analytics Dashboard
- Real-time performance metrics
- Audience demographics visualization
- Engagement rate analysis
- Revenue tracking
- Custom date range filtering

### 📈 Advanced Analytics
- Video performance comparison
- Audience retention analysis
- Traffic source breakdown
- Subscriber growth tracking
- Content optimization suggestions

### 📑 Reports
- Custom report generation
- Export functionality (PDF, CSV)
- Scheduled reports
- Comparative analysis
- Trend identification

### ⚙️ User Features
- Dark/Light theme support
- Responsive design
- Interactive data visualizations
- Real-time notifications
- User preferences management

## 🛠 Tech Stack

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible Components
- **React Query** - Data Fetching
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Recharts** - Data Visualization

### Development Tools
- **ESLint** - Code Linting
- **Prettier** - Code Formatting
- **SWC** - Fast Compilation
- **Vitest** - Testing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/youtube-analyzer.git
cd youtube-analyzer
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and visit
```
http://localhost:8080
```

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── styles/        # Global styles and Tailwind config
└── types/         # TypeScript type definitions
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Query](https://tanstack.com/query/latest)

---

<div align="center">
Made by ""KALP SENGHANI""
</div>

# YouTube Analytics Platform - Production Deployment Guide

## Overview
This guide will help you deploy your YouTube Analytics platform to production using **Vercel** (for the frontend) and **Render** or **Railway** (for the backend). Both are free and easy to use for small projects.

---

## 1. Frontend Deployment (Vercel)

### Prerequisites
- [Vercel account](https://vercel.com/)
- [GitHub account](https://github.com/)

### Steps
1. **Push your frontend code to a GitHub repository.**
2. **Go to [Vercel](https://vercel.com/) and click 'New Project'.**
3. **Import your GitHub repo.**
4. **Set Environment Variables:**
   - `VITE_API_BASE_URL` = The URL of your deployed backend (e.g., `https://your-backend.onrender.com/api`)
5. **Click 'Deploy'.**
6. **After deployment, update your backend CORS settings to allow your Vercel frontend domain.**

---

## 2. Backend Deployment (Render or Railway)

### Prerequisites
- [Render account](https://render.com/) or [Railway account](https://railway.app/)
- [GitHub account](https://github.com/)
- (Optional) PostgreSQL database (Render/Railway can provision one for you)

### Steps
1. **Push your backend code to a GitHub repository.**
2. **Go to [Render](https://render.com/) or [Railway](https://railway.app/) and create a new Web Service.**
3. **Connect your GitHub repo.**
4. **Set Environment Variables:**
   - `DATABASE_URL` = Your PostgreSQL connection string
   - `JWT_SECRET` = A strong secret for JWT tokens
   - `YOUTUBE_CLIENT_ID` = Your Google API client ID
   - `YOUTUBE_CLIENT_SECRET` = Your Google API client secret
   - `YOUTUBE_REDIRECT_URI` = Your backend's OAuth callback URL (e.g., `https://your-backend.onrender.com/api/youtube/callback`)
   - `CORS_ORIGIN` = Your Vercel frontend URL (e.g., `https://your-frontend.vercel.app`)
5. **Set the build/start commands:**
   - Build: `npm run build`
   - Start: `npm start`
6. **Deploy!**

---

## 3. Environment Variables Reference

| Variable                | Where         | Example Value                                 |
|------------------------ |-------------- |-----------------------------------------------|
| VITE_API_BASE_URL       | Frontend      | https://your-backend.onrender.com/api         |
| DATABASE_URL            | Backend       | (from Render/Railway Postgres)                |
| JWT_SECRET              | Backend       | supersecretkey                               |
| YOUTUBE_CLIENT_ID       | Backend       | (from Google Cloud Console)                   |
| YOUTUBE_CLIENT_SECRET   | Backend       | (from Google Cloud Console)                   |
| YOUTUBE_REDIRECT_URI    | Backend       | https://your-backend.onrender.com/api/youtube/callback |
| CORS_ORIGIN             | Backend       | https://your-frontend.vercel.app              |

---

## 4. Final Steps
- Test your deployed frontend and backend.
- Make sure you can sign up, connect a YouTube channel, and see real analytics.
- Share your Vercel frontend link with creators for feedback!

---

## 5. Troubleshooting
- **CORS errors?** Make sure `CORS_ORIGIN` in your backend matches your Vercel frontend URL.
- **OAuth errors?** Double-check your Google Cloud Console credentials and redirect URIs.
- **Database errors?** Make sure your `DATABASE_URL` is correct and the database is migrated (`npx prisma migrate deploy`).

---

## 6. Need Help?
- Open an issue on your GitHub repo or contact your developer.

---

**Enjoy your production-ready YouTube Analytics platform!** 