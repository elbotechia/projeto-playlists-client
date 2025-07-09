# 🎵 Projeto Playlists Client

A modern, responsive React web application for managing and exploring music playlists with a beautiful glassmorphism design.

## ✨ Features

- **Modern Glassmorphism UI** - Beautiful, translucent design with backdrop blur effects
- **Responsive Design** - Optimized for all screen sizes (mobile, tablet, desktop)
- **Music Track Management** - Browse, search, and manage music tracks
- **User Authentication** - Secure login and registration system
- **Track Filtering & Sorting** - Search tracks by name/artist and sort alphabetically
- **Responsive Grid Layout** - Adaptive grid: 1 col (mobile), 2 (sm), 3 (md), 4 (lg)
- **Audio Controls** - Play/pause functionality for tracks
- **User Management** - Admin features for managing users
- **Manager Dashboard** - Administrative interface for content management

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.10
- **Routing**: React Router DOM 7.6.2
- **HTTP Client**: Axios 1.10.0
- **Icons**: React Icons 5.5.0
- **Styled Components**: Styled Components 6.1.19
- **Notifications**: SweetAlert2 11.22.0
- **Linting**: ESLint 9.25.0

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd projeto-playlists-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── buttons/        # Button components (Play/Pause, Logout)
│   ├── filters/        # Filtering components (Search, Sort)
│   ├── footer/         # Footer components
│   ├── forms/          # Form components (Users, Manager)
│   ├── headers/        # Header components (Auth/Non-Auth)
│   └── navbars/        # Navigation components
├── pages/              # Page components
│   ├── HomePage.jsx    # Landing page
│   ├── TracksPage.jsx  # Main tracks listing
│   ├── TrackPage.jsx   # Individual track details
│   ├── UsersPage.jsx   # User management
│   ├── ManagerPage.jsx # Manager dashboard
│   └── ErrorPage.jsx   # 404 error page
├── router/             # Routing configuration
│   ├── AppRouter1.jsx  # Non-authenticated routes
│   ├── AppRouter2.jsx  # Authenticated routes
│   └── coordinator.js  # Route coordination logic
├── hooks/              # Custom React hooks
│   ├── useFetch.jsx    # Data fetching hook
│   ├── useForm.jsx     # Form handling hook
│   ├── usePost.jsx     # POST request hook
│   ├── useSignIn.jsx   # Sign in hook
│   └── useSignUp.jsx   # Sign up hook
├── common/             # Shared utilities
│   ├── context/        # React context providers
│   └── CONSTANTS/      # Application constants
├── utils/              # Utility functions
└── assets/             # Static assets (images, icons)
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple gradients (#8B5CF6 to #A855F7)
- **Secondary**: Blue accents (#3B82F6 to #1D4ED8)
- **Neutral**: Gray scale (#F8FAFC to #1E293B)
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)

### Key Design Features
- **Glassmorphism**: Translucent backgrounds with backdrop blur
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Consistent Spacing**: Tailwind's spacing system
- **Smooth Animations**: Hover effects and transitions
- **High Contrast**: Accessible color combinations

## 🔧 Configuration

### Environment Variables
The application connects to the backend API:
- **API Base URL**: `https://projeto-playlists-node-2k25.onrender.com/api`

### Tailwind Configuration
Custom configuration in `tailwind.config.js` includes:
- Extended color palette
- Custom design tokens
- Responsive breakpoints
- Glassmorphism utilities

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px (1 column grid)
- **Small**: 640px - 768px (2 column grid)
- **Medium**: 768px - 1024px (3 column grid)
- **Large**: > 1024px (4 column grid)

## 🎵 Features Overview

### Track Management
- **Browse Tracks**: View all available music tracks in a responsive grid
- **Search Functionality**: Filter tracks by name or artist
- **Sort Options**: Alphabetical sorting (A-Z, Z-A)
- **Play Controls**: Audio playback with play/pause buttons
- **Track Details**: Individual track pages with detailed information

### User System
- **Authentication**: Secure login and registration
- **User Profiles**: Manage user information
- **Role-based Access**: Different interfaces for users and managers
- **Session Management**: Persistent login state

### Admin Features
- **User Management**: View and manage all users
- **Content Management**: Add, edit, and remove tracks
- **Dashboard**: Administrative overview and controls

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

The build outputs to the `dist/` directory, ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Backend API

This frontend application connects to the backend API:
- **Repository**: [projeto-playlists-node-2k25](https://github.com/username/projeto-playlists-node-2k25)
- **API Documentation**: Available at the backend repository

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

Made with ❤️ by <a href="https://github.com/botechia-erika" target="_blank">@botechia-erika</a>