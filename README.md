# 🟢 Taskoholic: The Digital Productivity Journal

> Your single source for focused action and mindful clarity.

## 🌟 Vision & Mission

In a world of digital noise, clarity is a superpower. Taskoholic is the antidote to app-switching chaos, providing a serene, unified, and book-like digital journal that empowers individuals to:

- **Take Decisive Action Now**: Eliminate procrastination with immediate, short-burst tasks
- **Build Unbreakable Consistency**: Cultivate powerful daily habits and routines effortlessly
- **Achieve Deep, Meaningful Work**: Enter a sanctuary for distraction-free focus
- **Maintain Total Clarity**: Always know what to do next, from micro-tasks to macro-goals

## 🏗️ Architecture

Built with modern fullstack technologies:

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Backend**: tRPC + Prisma + PostgreSQL
- **Authentication**: NextAuth.js + Supabase
- **Styling**: Tailwind CSS + Radix UI
- **State Management**: Zustand
- **Database**: PostgreSQL with Supabase
- **Deployment**: Vercel
- **Monorepo**: Turborepo

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.0 or higher
- npm 9.6.7 or higher
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskoholic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your values
   ```

4. **Setup database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
taskoholic/
├── apps/
│   ├── web/                    # Frontend Next.js app
│   └── api/                    # Backend API
├── packages/
│   ├── shared/                 # Shared types and utilities
│   ├── ui/                     # Shared UI components
│   └── config/                 # Shared configuration
├── prisma/                     # Database schema
├── docs/                       # Documentation
│   ├── prd.md                  # Product Requirements Document
│   └── architecture.md         # Technical Architecture
└── scripts/                    # Build and deployment scripts
```

## 🎯 Core Features

### 1. The Momentum Builder (Short-Burst Tasks)
- Create tasks with immediate timer activation (5, 15, 25 minutes)
- Build momentum through small, achievable wins
- Track completion with satisfying animations

### 2. The Deep Focus Sanctuary
- Full-screen focus mode with ambient soundscapes
- Distraction-free environment for important work
- Comprehensive session tracking and analytics

### 3. The Consistency Engine (Habits & Routines)
- Daily habit tracking with streak visualization
- Custom routine builder for powerful daily rituals
- Progress bars and streak flame indicators

### 4. The Horizon View (Weekly Planning)
- 7-day calendar with drag-and-drop task scheduling
- Weekly dashboard with priority indicators
- Goal setting and progress tracking

### 5. The Idea Sanctuary (Notes & Journal)
- Beautiful Markdown editor with bi-directional linking
- Convert notes to tasks with one click
- Tag-based organization and search

### 6. The Task Coach
- Intelligent recommendations based on energy and time
- Eliminate decision fatigue with smart suggestions
- Learn from your patterns over time

## 💰 Subscription Tiers

### Starter (Free)
- Unlimited short-burst tasks
- Up to 5 active habits
- Up to 10 weekly tasks
- 1 customizable routine
- Basic notes (no advanced linking)
- Default theme

### Pro ($6/mo or $60/yr)
- Everything in Starter, plus:
- Unlimited habits, routines, and weekly tasks
- Full access to all premium themes & soundscapes
- Advanced historical reporting & focus heatmaps
- Cloud sync across multiple devices

### Artisan ($12/mo or $110/yr)
- Everything in Pro, plus:
- Full access to the Task Coach guidance system
- Advanced notes: bi-directional linking & convert to action
- Calendar integration (Google Calendar, Outlook)
- Export data to PDF and CSV

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start all services
npm run dev:web          # Start frontend only
npm run dev:api          # Start backend only

# Testing
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:e2e         # Run end-to-end tests

# Database
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:seed          # Seed database with sample data
npm run db:studio        # Open Prisma Studio

# Building
npm run build            # Build all applications
npm run lint             # Lint all packages
npm run type-check       # Type check all packages
```

### Database Management

The project uses Prisma as the database ORM. Key commands:

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and apply migrations (production)
npx prisma migrate dev --name your-migration-name

# Reset database (development only)
npx prisma migrate reset
```

## 🎨 Themes

Taskoholic features four carefully crafted themes:

- **Moleskine**: Cream paper, serif fonts, classic notebook feel
- **Arcade**: Dark mode, retro pixelated fonts, neon accents
- **Parchment**: Old-world academic feel with elegant script fonts
- **Minimalist**: Stark monochrome, modern sans-serif for pure function

## 📱 Mobile-First Design

Taskoholic is designed mobile-first with:
- Responsive design that works on all screen sizes
- Touch-optimized interactions
- Progressive Web App (PWA) capabilities
- Offline functionality for core features
- Smooth animations and transitions

## 🔒 Security & Privacy

- Secure authentication with NextAuth.js
- HTTPS everywhere in production
- Data encryption at rest and in transit
- GDPR compliant data handling
- No tracking or analytics without consent

## 📊 Analytics & Insights

- Focus time tracking with heatmaps
- Habit streak calendars
- Productivity trend analysis
- Goal achievement rates
- Custom reporting and exports

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@taskoholic.com
- 📖 Documentation: [docs.taskoholic.com](https://docs.taskoholic.com)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/taskoholic/taskoholic/issues)

---

**Taskoholic** - Where clarity meets productivity. 🎯
