# 🌟 DailyPulse - Personal Wellness & Habit Tracker

A modern, responsive habit tracking application built with React, TypeScript, and Tailwind CSS. Track your daily habits, log your mood, visualize your progress, and build lasting streaks.

![DailyPulse Banner](https://img.shields.io/badge/DailyPulse-Live-brightgreen) ![React](https://img.shields.io/badge/React-19.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

# 📥 Backend Repository 
### DailyPulse Backend API - https://github.com/mrpawarGit/DailyPulse-Backend

## 🚀🌐 Live Demo → [**Visit DailyPulse**](https://daily-pulse-app.vercel.app/)

<img width="1914" height="958" alt="image" src="https://github.com/user-attachments/assets/84f4a406-49a7-42ce-91b6-901970abe306" />

## ✨ Features

### Core Features
- 🎯 **Habit Management**: Create, edit, delete, and track both boolean and countable habits
- 📊 **Analytics Dashboard**: Visualise weekly trends, category breakdowns, and mood patterns
- 😊 **Mood Tracking**: Log daily moods with emoji-based interface
- 🔥 **Streak Counter**: Maintain and visualize your consistency streaks
- 💪 **Progress Tracking**: Real-time progress rings and completion percentages
- 💡 **Motivational Quotes**: Daily inspiration to keep you going

### UI/UX Features
- 🌓 **Dark/Light Mode**: Seamless theme switching with persistent preferences
- 📱 **Fully Responsive**: Works beautifully on mobile, tablet, and desktop
- 🎨 **Custom Color Themes**: 8 color options for habit categorization
- ⚡ **Fast Performance**: Optimized with React 19 and Vite
- 🔒 **Authentication Flow**: Complete landing, login, and signup pages
- 🍔 **Mobile Navigation**: Hamburger menu for seamless mobile experience

### Data Features
- 💾 **Local Storage**: Automatic data persistence
- 📈 **Recharts Integration**: Beautiful, interactive charts and graphs
- 📅 **Date Management**: Smart date handling with date-fns
- 🔄 **Real-time Updates**: Instant UI updates on data changes

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.0 | UI Library |
| **TypeScript** | 5.8.2 | Type Safety |
| **Vite** | 6.2.0 | Build Tool & Dev Server |
| **React Router DOM** | 6.28.0 | Client-side Routing |
| **Tailwind CSS** | Latest | Utility-first CSS |
| **Recharts** | 3.3.0 | Data Visualization |
| **date-fns** | 4.1.0 | Date Utilities |
| **Lucide React** | 0.548.0 | Icon Library |

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

Check your versions:
```
node --version
npm --version
git --version
```

## 🚀 Installation

### 1. Clone the Repository

```
git clone https://github.com/mrpawarGit/DailyPulse-Frontend.git
cd dailypulse-react-app
```

### 2. Install Dependencies

```
npm install
```

This will install all required packages listed in `package.json`.

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Optional: Analytics
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Port Configuration

The app runs on **port 5000** by default. To change it, edit `vite.config.ts`:

```
export default defineConfig({
  server: {
    port: 5000, // your desired port
    host: '0.0.0.0',
  },
  // ... rest of config
});
```

## 🏃‍♂️ Running the Application

### Development Mode

Start the development server with hot-reload:

```
npm run dev
```

The app will be available at: **http://localhost:5000**

### Production Build

Build the app for production:

```
npm run build
```

Preview the production build:

```
npm run preview
```

## 📁 Project Structure

```
dailypulse-frontend/
├── components/
│   ├── analytics/
│   │   └── Analytics.tsx           # Analytics dashboard with charts
│   ├── auth/
│   │   ├── LoginPage.tsx          # Login page
│   │   └── SignupPage.tsx         # Signup page
│   ├── common/
│   │   ├── LoadingSpinner.tsx     # Loading indicator
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   └── ThemeToggle.tsx        # Theme toggle button
│   ├── dashboard/
│   │   ├── Dashboard.tsx          # Main dashboard
│   │   ├── MoodSelector.tsx       # Mood selection component
│   │   ├── MotivationalQuote.tsx  # Quote display
│   │   ├── ProgressRing.tsx       # Circular progress indicator
│   │   └── StreakCounter.tsx      # Streak display
│   ├── habits/
│   │   ├── HabitCard.tsx          # Individual habit card
│   │   └── HabitForm.tsx          # Habit creation/edit modal
│   ├── landing/
│   │   └── LandingPage.tsx        # Marketing landing page
│   └── MainApp.tsx                # Main authenticated app wrapper
├── context/
│   └── ThemeContext.tsx           # Dark/Light mode context
├── hooks/
│   └── useMindTrack.ts            # Main application logic hook
├── services/
│   ├── api.ts                     # API service layer
│   └── mockApi.ts                 # Mock API for development
├── types.ts                       # TypeScript type definitions
├── App.tsx                        # App root with routing
├── index.tsx                      # Application entry point
├── public/
│   ├── logo.svg                   # Application logo
│   └── vercel.json                # Vercel configuration
├── .env                           # Environment variables
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 5000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 🔌 Backend Integration

This frontend works with the DailyPulse backend API. 

**Backend Repository**: [DailyPulse-Backend](https://github.com/mrpawarGit/DailyPulse-Backend)

### Authentication Flow

The app uses JWT tokens for authentication:

1. User logs in → receives JWT token
2. Token stored in localStorage
3. Token sent in `Authorization: Bearer <token>` header for protected routes
4. Token expires after 7 days (configurable in backend)

### API Endpoints Used

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/logs` - Log habit progress
- `POST /api/moods` - Log daily mood

## 🧩 Components Overview

### Core Components

**Dashboard Components:**
- `Dashboard.tsx` - Main view with habit cards, streak, and mood selector
- `HabitCard.tsx` - Interactive card for each habit with progress tracking
- `ProgressRing.tsx` - SVG-based circular progress indicator
- `StreakCounter.tsx` - Fire emoji with streak count

**Analytics Components:**
- `Analytics.tsx` - Complete analytics view with multiple charts
- Uses Recharts for LineChart, BarChart visualizations

**Authentication:**
- `LandingPage.tsx` - Marketing page with features
- `LoginPage.tsx` - Login form with validation
- `SignupPage.tsx` - Registration form with validation

**Common:**
- `Sidebar.tsx` - Responsive navigation sidebar with user profile
- `ThemeToggle.tsx` - Floating theme toggle button
- `LoadingSpinner.tsx` - Loading state indicator

### Custom Hooks

**`useDailyPulse`** - Main application logic:
- Manages habits, logs, streaks
- Calculates completion percentages
- Handles mood tracking
- Provides analytics data
- Syncs with localStorage

## 🎨 Styling

### Tailwind CSS

The app uses Tailwind CSS with custom configuration:

**Key Classes:**
- Dark mode: `dark:bg-gray-900`, `dark:text-white`
- Responsive: `md:grid-cols-2`, `lg:grid-cols-3`
- Custom colors: Blue theme (`bg-blue-600`)

### Theme System

Light/Dark mode implemented via:
- Context API (`ThemeContext.tsx`)
- LocalStorage persistence
- System preference detection
- Smooth transitions
- Floating toggle button on all pages

### Color Palette

Habits can use 8 colors:
- Blue, Green, Red, Yellow
- Purple, Indigo, Pink, Gray

## 🚢 Deployment

### Deployed on Vercel

The application is deployed and live at: **[https://daily-pulse-app.vercel.app/](https://daily-pulse-app.vercel.app/)**

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mrpawarGit/DailyPulse-Frontend)

**Steps to deploy:**

1. **Fork this repository**
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your forked repository
3. **Configure Environment Variables**:
   ```
   VITE_API_URL=your_backend_api_url
   ```
4. **Deploy!**

### Vercel Configuration

The `vercel.json` file is included for proper routing:

```
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures React Router works correctly with page refreshes.

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Add comments for complex logic
- Write meaningful commit messages

## 🐛 Known Issues

None at the moment! If you find any bugs, please [open an issue](https://github.com/mrpawarGit/DailyPulse-Frontend/issues).

## 👥 Authors

**Mayur Pawar** - [@mrpawarGit](https://github.com/mrpawarGit)

**Akash Pandit** - [@Akashpandit01](https://github.com/Akashpandit01)

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for beautiful charts
- [Lucide](https://lucide.dev/) for icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast build tool
- [Vercel](https://vercel.com/) for hosting
- React and TypeScript communities for amazing tools

## 🗺️ Roadmap

- [x] Core habit tracking
- [x] Mood logging
- [x] Analytics dashboard
- [x] Dark/Light theme
- [x] Mobile responsive design
- [x] Deployment to Vercel
- [x] Backend API integration
- [ ] Social features (friends, leaderboard)
- [ ] Push notifications
- [ ] AI-powered habit suggestions
- [ ] Export data to CSV/PDF
- [ ] Integration with wearables

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/mrpawarGit/DailyPulse-Frontend?style=social)
![GitHub forks](https://img.shields.io/github/forks/mrpawarGit/DailyPulse-Frontend?style=social)
![GitHub issues](https://img.shields.io/github/issues/mrpawarGit/DailyPulse-Frontend)

---

**Built using React + TypeScript + Vite**
