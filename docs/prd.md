# Taskoholic Product Requirements Document (PRD)

## Goals and Background Context

### Goals
- Create a unified digital productivity journal that eliminates app-switching chaos
- Enable users to capture ideas and seamlessly convert them into actionable tasks
- Provide both quick momentum-building tasks (5-25 min sprints) and deep focus sessions
- Build lasting consistency through integrated habits and routines
- Deliver a tactile, book-like mobile-first experience with premium themes
- Implement intelligent task coaching to eliminate decision fatigue
- Establish a sustainable freemium business model with clear value tiers

### Background Context
In today's digital landscape, productivity enthusiasts juggle multiple disconnected apps—separate tools for tasks, habits, focus timers, and note-taking. This fragmentation creates friction, distraction, and a constant feeling of being busy but not truly productive. Users waste time switching between apps, lose context, and struggle with decision fatigue about what to work on next.

Taskoholic addresses this core problem by creating a serene, unified ecosystem that combines all productivity needs into a single, elegant journal-like experience. The app leverages the psychology of momentum through short-burst tasks, provides sanctuary for deep work, and automates habit formation—all while maintaining the tactile, calming experience of a physical journal.

### Change Log
| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2025-01-27 | 1.0 | Initial PRD creation from comprehensive app description | John (PM) |

## Requirements

### Functional
1. **FR1:** Users can create short-burst tasks (5, 15, 25 minutes) with immediate timer activation
2. **FR2:** Users can start full-screen focus sessions with ambient soundscape options (Silence, Rainfall, Cafe, White Noise)
3. **FR3:** Users can create and track daily habits with streak visualization and progress bars
4. **FR4:** Users can build custom routines from habits and tasks with step-by-step activation
5. **FR5:** Users can drag and drop tasks onto a 7-day weekly calendar view
6. **FR6:** Users can write notes in Markdown format with bi-directional linking using [[Note Title]] syntax
7. **FR7:** Users can convert highlighted text from notes directly to tasks via "+ Create Task" action
8. **FR8:** Users can access Task Coach recommendations based on energy level and time availability
9. **FR9:** Users can choose from multiple themes (Moleskine, Arcade, Parchment, Minimalist) with Pro subscription
10. **FR10:** Users can view focus time analytics with streak calendars, bar charts, and focus heatmaps
11. **FR11:** Users can set weekly goals and track progress automatically
12. **FR12:** Users can export data to PDF and CSV formats (Artisan tier)
13. **FR13:** Users can sync data across multiple devices with cloud storage (Pro tier)
14. **FR14:** Users can integrate with Google Calendar and Outlook (Artisan tier)
15. **FR15:** Users can organize notes with tags (#work, #ideas) and notebooks

### Non Functional
1. **NFR1:** App must load and respond within 2 seconds on mobile devices
2. **NFR2:** Timer accuracy must be within ±1 second for focus sessions
3. **NFR3:** Data persistence must maintain 99.9% reliability for user progress
4. **NFR4:** App must work offline for core functionality (tasks, timers, notes)
5. **NFR5:** Mobile-first responsive design must work on screens 320px-768px width
6. **NFR6:** Page-turn navigation must provide smooth 60fps animations
7. **NFR7:** Sound playback must have volume controls and mute functionality
8. **NFR8:** App must support accessibility standards for screen readers
9. **NFR9:** Data sync must handle conflicts gracefully with last-write-wins strategy
10. **NFR10:** Free tier must support up to 5 habits, 10 weekly tasks, 1 routine without performance degradation

## User Interface Design Goals

### Overall UX Vision
Create a serene, journal-like experience that feels like a premium physical notebook. The interface should eliminate digital noise and provide a calming, focused environment for productivity. Every interaction should feel intentional and tactile, with subtle animations and sound effects that reinforce the book-like metaphor.

### Key Interaction Paradigms
- **Page-turn navigation** between main sections (Today, Weekly, Habits, Journal)
- **Single-line task input** always accessible for immediate action capture
- **Full-screen focus mode** that hides all UI distractions
- **Drag-and-drop** for weekly planning and task organization
- **Text selection to action** for seamless note-to-task conversion
- **Swipe gestures** for navigation and quick actions

### Core Screens and Views
- **Today Dashboard** - Single task input, today's tasks, quick timer buttons
- **Weekly Planner** - 7-day grid with drag-drop functionality
- **Habits Tracker** - Visual habit cards with streak indicators
- **Focus Sanctuary** - Full-screen timer with ambient sound options
- **Journal/Notes** - Markdown editor with bi-directional linking
- **Settings & Themes** - Subscription management and theme selection
- **Analytics Dashboard** - Focus time visualization and progress tracking

### Accessibility: WCAG AA
- Screen reader compatibility for all text content
- High contrast mode support
- Keyboard navigation for all interactive elements
- Alternative text for all visual elements
- Focus indicators for navigation

### Branding
- **Moleskine Theme:** Cream paper, serif fonts, classic notebook feel
- **Arcade Theme:** Dark mode, retro pixelated fonts, neon accents
- **Parchment Theme:** Old-world academic feel with elegant script fonts
- **Minimalist Theme:** Stark monochrome, modern sans-serif for pure function
- Subtle paper grain textures and soft drop shadows throughout

### Target Device and Platforms: Web Responsive, Mobile-First
Primary target: Mobile web browsers (320px-768px)
Secondary: Tablet and desktop responsive scaling
Progressive Web App (PWA) capabilities for app-like experience

## Technical Assumptions

### Repository Structure: Monorepo
Single repository containing frontend, backend, and shared components for simplified development and deployment.

### Service Architecture: Serverless Monolith
- **Frontend:** React/Next.js PWA with mobile-first responsive design
- **Backend:** Node.js serverless functions (Vercel/Netlify Functions)
- **Database:** PostgreSQL with Prisma ORM for relational data
- **Authentication:** NextAuth.js for user management
- **File Storage:** Cloudinary for theme assets and exports
- **Real-time:** WebSockets for live timer synchronization

### Testing Requirements: Unit + Integration + E2E
- **Unit Tests:** Jest + React Testing Library for components
- **Integration Tests:** API endpoint testing with Supertest
- **E2E Tests:** Playwright for critical user journeys
- **Manual Testing:** Focus on timer accuracy and animation smoothness

### Additional Technical Assumptions
- **Progressive Web App (PWA)** capabilities for offline functionality
- **Web Audio API** for ambient soundscapes and timer sounds
- **Local Storage** for offline task and note persistence
- **Service Workers** for background sync when online
- **Chart.js** for analytics visualizations
- **Markdown Parser** (marked.js) for note formatting
- **Drag-and-Drop API** for weekly planning interface
- **Web Notifications API** for timer completion alerts

## Epic List

**Epic 1: Foundation & Core Infrastructure**
Establish project setup, authentication, basic UI framework, and core data models for tasks, habits, and notes.

**Epic 2: Momentum Builder (Short-Burst Tasks)**
Implement the core task creation, timer functionality, and completion tracking system.

**Epic 3: Deep Focus Sanctuary**
Build the full-screen focus mode with ambient sounds and session tracking.

**Epic 4: Consistency Engine (Habits & Routines)**
Create habit tracking, streak visualization, and routine management systems.

**Epic 5: Horizon View (Weekly Planning)**
Implement the 7-day calendar view with drag-and-drop task scheduling.

**Epic 6: Idea Sanctuary (Notes & Journal)**
Build the Markdown editor with bi-directional linking and note-to-task conversion.

**Epic 7: Task Coach & Analytics**
Implement intelligent task recommendations and comprehensive analytics dashboard.

**Epic 8: Premium Features & Monetization**
Add themes, cloud sync, export functionality, and subscription management.

## Epic 1 Foundation & Core Infrastructure

### Epic Goal
Establish the foundational project infrastructure including authentication, database setup, core UI framework, and essential data models. This epic delivers a working webapp with user registration, basic navigation, and the core data structures needed for all subsequent features.

### Story 1.1 User Authentication & Registration

As a new user,
I want to create an account and sign in securely,
so that I can access my personal productivity data across devices.

#### Acceptance Criteria
1. Users can register with email and password with validation
2. Users can sign in with existing credentials
3. Password reset functionality works via email
4. User sessions persist across browser refreshes
5. Authentication state is properly managed throughout the app
6. Basic user profile information is stored and retrievable

### Story 1.2 Core Data Models & Database Setup

As a developer,
I want the database schema and data models established,
so that all future features can store and retrieve user data reliably.

#### Acceptance Criteria
1. PostgreSQL database is configured with Prisma ORM
2. User, Task, Habit, Note, and FocusSession models are defined
3. Proper relationships between models are established
4. Database migrations run successfully
5. Seed data can be inserted for development
6. CRUD operations work for all core models

### Story 1.3 Basic UI Framework & Navigation

As a user,
I want to navigate between different sections of the app,
so that I can access all features through an intuitive interface.

#### Acceptance Criteria
1. Mobile-first responsive design framework is implemented
2. Page-turn navigation works between Today, Weekly, Habits, Journal sections
3. Smooth animations and transitions are present
4. Basic theme system supports light/dark modes
5. Navigation persists across page refreshes
6. Mobile gestures (swipe) work for navigation

### Story 1.4 Project Infrastructure & Deployment

As a developer,
I want the project properly configured for development and deployment,
so that the team can work efficiently and deploy reliably.

#### Acceptance Criteria
1. Monorepo structure is established with proper tooling
2. Development environment runs locally with hot reload
3. Linting, formatting, and pre-commit hooks are configured
4. Basic CI/CD pipeline is set up
5. Environment variables are properly managed
6. Project can be deployed to staging and production environments

## Epic 2 Momentum Builder (Short-Burst Tasks)

### Epic Goal
Implement the core productivity engine that enables users to capture tasks and execute them in focused time blocks. This epic delivers the fundamental "Momentum Builder" functionality that forms the heart of Taskoholic's productivity system.

### Story 2.1 Task Creation & Management

As a user,
I want to quickly create and manage my daily tasks,
so that I can capture my thoughts and organize my work efficiently.

#### Acceptance Criteria
1. Single-line task input field is always accessible on Today screen
2. Tasks can be created by pressing Enter or clicking add button
3. Tasks display with status indicators (Inbox, In Progress, Complete)
4. Tasks can be edited inline by tapping on them
5. Tasks can be deleted with confirmation
6. Task list persists between sessions
7. Tasks are automatically timestamped when created

### Story 2.2 Short-Burst Timer Implementation

As a user,
I want to start focused work sessions on my tasks,
so that I can build momentum through small, achievable time blocks.

#### Acceptance Criteria
1. Each task displays three timer buttons: [▶️ 5m], [▶️ 15m], [▶️ 25m]
2. Clicking a timer button starts a countdown timer
3. Timer displays remaining time in MM:SS format
4. Timer can be paused and resumed
5. Timer can be stopped early with confirmation
6. When timer completes, notification sound plays
7. Timer completion triggers task completion options

### Story 2.3 Task Completion & Progress Tracking

As a user,
I want to complete my tasks and track my progress,
so that I can see my productivity and maintain motivation.

#### Acceptance Criteria
1. When timer completes, three options appear: ✅ Complete, 🔄 Go Again, 🌱 Make Bigger
2. Completing a task marks it as done with visual feedback
3. Completed tasks show completion timestamp
4. "Go Again" starts another timer for the same task
5. "Make Bigger" moves task to Weekly Planner for deeper work
6. Daily completion statistics are tracked and displayed
7. Completed task history is maintained for analytics

## Epic 3 Deep Focus Sanctuary

### Epic Goal
Create a distraction-free environment for deep work sessions, complete with ambient soundscapes and comprehensive session tracking. This epic delivers the "Deep Focus Sanctuary" that transforms any task into a protected focus environment.

### Story 3.1 Full-Screen Focus Mode

As a user,
I want to enter a distraction-free focus environment,
so that I can concentrate deeply on important work without interruptions.

#### Acceptance Criteria
1. Any task can be opened in "Focus Sanctuary" mode
2. Focus mode transitions with smooth fade-out animation
3. Only task name and timer are visible in focus mode
4. All other UI elements are completely hidden
5. Focus mode can be exited by tapping outside timer area
6. Focus mode prevents accidental navigation away from session
7. Browser tab title updates to show focus status

### Story 3.2 Ambient Soundscape Integration

As a user,
I want to choose ambient sounds during focus sessions,
so that I can create the optimal environment for deep work.

#### Acceptance Criteria
1. Soundscape menu appears when entering focus mode
2. Four options available: Silence, Rainfall, Cafe, White Noise
3. Selected soundscape plays continuously during focus session
4. Volume controls are accessible during focus session
5. Sound can be muted/unmuted without exiting focus mode
6. Soundscape selection is remembered for future sessions
7. Audio quality is optimized for mobile devices

### Story 3.3 Focus Session Tracking & Analytics

As a user,
I want my focus time tracked and visualized,
so that I can understand my productivity patterns and improve.

#### Acceptance Criteria
1. All focus sessions are automatically tracked with duration
2. Session data includes start time, duration, and linked task
3. Daily focus time totals are calculated and displayed
4. Weekly focus time charts show patterns and trends
5. Focus streak calendar shows productive days
6. Focus heatmap visualizes most productive times
7. Session history is searchable and filterable

## Epic 4 Consistency Engine (Habits & Routines)

### Epic Goal
Implement habit tracking and routine management systems that help users build lasting consistency in their daily productivity practices. This epic delivers the "Consistency Engine" that automates good habit formation.

### Story 4.1 Habit Creation & Tracking

As a user,
I want to create and track daily habits,
so that I can build consistent positive behaviors over time.

#### Acceptance Criteria
1. Users can create habits with name, frequency, and optional timer duration
2. Habits display as cards with checkboxes and progress bars
3. Checking off a habit increments streak counter with flame icon
4. Habit streaks are calculated and displayed prominently
5. Habits can be edited or deleted with confirmation
6. Habit completion is timestamped for analytics
7. Free tier limits users to 5 active habits

### Story 4.2 Habit Streak Visualization

As a user,
I want to see my habit progress visually,
so that I can stay motivated and maintain my streaks.

#### Acceptance Criteria
1. Each habit card shows current streak with flame icon
2. Progress bar fills as habits are completed daily
3. Streak calendar shows completion history for each habit
4. Longest streak and current streak are displayed
5. Streak recovery system handles missed days gracefully
6. Visual feedback celebrates milestone achievements
7. Habit statistics are accessible from dedicated analytics view

### Story 4.3 Routine Builder & Management

As a user,
I want to create custom routines from my habits and tasks,
so that I can establish powerful daily rituals efficiently.

#### Acceptance Criteria
1. Users can create routines with custom names and step sequences
2. Routines can include both habits and tasks in any order
3. Routine steps can be reordered via drag-and-drop
4. Activating a routine presents step-by-step guided flow
5. Routine completion tracks overall progress
6. Pre-made routine templates are available for common patterns
7. Free tier limits users to 1 custom routine

## Epic 5 Horizon View (Weekly Planning)

### Epic Goal
Implement the weekly planning interface that allows users to zoom out from daily tasks and organize their week with intention. This epic delivers the "Horizon View" for strategic productivity planning.

### Story 5.1 Weekly Calendar Interface

As a user,
I want to see my week in a calendar format,
so that I can plan and organize my tasks across multiple days.

#### Acceptance Criteria
1. 7-day grid view shows current week with clear day labels
2. Tasks can be dragged and dropped onto specific days
3. "This Week" column holds tasks without specific day assignments
4. Calendar navigation allows viewing previous/next weeks
5. Today's date is highlighted in the calendar
6. Calendar view is responsive and works on mobile devices
7. Drag-and-drop provides visual feedback during interaction

### Story 5.2 Weekly Dashboard & Overview

As a user,
I want an at-a-glance view of my weekly priorities,
so that I can quickly understand what needs attention.

#### Acceptance Criteria
1. Dashboard shows 🔥 Up Next (today/tomorrow tasks)
2. Dashboard displays ⚠️ Overdue tasks prominently
3. Dashboard tracks 🎉 Completed tasks with running tally
4. Weekly goal progress bars show completion status
5. Dashboard updates in real-time as tasks are completed
6. Dashboard is accessible from main navigation
7. Dashboard data refreshes when returning from other views

### Story 5.3 Weekly Goals & Progress Tracking

As a user,
I want to set and track weekly productivity goals,
so that I can maintain focus on important objectives.

#### Acceptance Criteria
1. Users can set weekly goals (e.g., "Focus for 10 hours")
2. Goal progress automatically updates based on completed sessions
3. Progress bars visualize goal completion percentage
4. Goal completion celebrations provide positive reinforcement
5. Goals can be edited or deleted during the week
6. Goal history is maintained for trend analysis
7. Weekly goal templates are available for common objectives

## Epic 6 Idea Sanctuary (Notes & Journal)

### Epic Goal
Create a beautiful, functional note-taking system that serves as the user's second brain, with seamless integration to task creation. This epic delivers the "Idea Sanctuary" for thought capture and knowledge management.

### Story 6.1 Markdown Editor & Note Creation

As a user,
I want to write notes in a beautiful, distraction-free editor,
so that I can capture my thoughts and ideas effectively.

#### Acceptance Criteria
1. Rich text editor supports Markdown syntax (headers, lists, bold, italic)
2. Editor provides live preview of Markdown formatting
3. Notes auto-save as user types to prevent data loss
4. Notes can be created with titles and organized into notebooks
5. Editor is optimized for mobile touch input
6. Notes support checkboxes ([ ]) for embedded task lists
7. Editor maintains focus and scroll position during typing

### Story 6.2 Bi-directional Note Linking

As a user,
I want to create connections between my notes,
so that I can build a personal knowledge base and discover related ideas.

#### Acceptance Criteria
1. Notes can link to other notes using [[Note Title]] syntax
2. Linked notes appear as clickable links in the editor
3. Backlinks show which notes reference the current note
4. Link suggestions appear as user types [[
5. Broken links are highlighted for easy identification
6. Note graph visualization shows connection patterns
7. Link navigation preserves reading context

### Story 6.3 Note-to-Task Conversion

As a user,
I want to convert ideas from my notes into actionable tasks,
so that I can bridge the gap between thinking and doing.

#### Acceptance Criteria
1. Text selection in notes triggers "+ Create Task" popup
2. Selected text becomes the task name automatically
3. Created task appears in Today's task list immediately
4. Task maintains link back to originating note
5. Conversion process is seamless and requires minimal taps
6. Multiple tasks can be created from the same note
7. Task creation preserves note context and formatting

## Epic 7 Task Coach & Analytics

### Epic Goal
Implement intelligent task recommendations and comprehensive analytics to help users make better decisions about their productivity. This epic delivers the "Task Coach" system and detailed productivity insights.

### Story 7.1 Intelligent Task Coaching

As a user,
I want intelligent recommendations for what to work on,
so that I can eliminate decision fatigue and stay productive.

#### Acceptance Criteria
1. Task Coach button is always accessible from main interface
2. Coach presents three energy/time options: Low (5-20 min), Ready (1-2 hours), Deep Win (half/full day)
3. Coach filters tasks based on estimated time and energy level
4. Recommendation algorithm considers urgency, priority, and task age
5. Coach provides single best recommendation with rationale
6. Coach learns from user completion patterns over time
7. Coach recommendations respect user's current context and preferences

### Story 7.2 Comprehensive Analytics Dashboard

As a user,
I want detailed insights into my productivity patterns,
so that I can understand my habits and optimize my workflow.

#### Acceptance Criteria
1. Analytics dashboard shows focus time trends and patterns
2. Habit streak calendars visualize consistency over time
3. Task completion rates and timing patterns are displayed
4. Weekly and monthly productivity summaries are available
5. Focus heatmaps show most productive days and times
6. Goal achievement rates and progress tracking
7. Export functionality for analytics data (Pro tier)

### Story 7.3 Productivity Insights & Recommendations

As a user,
I want personalized insights about my productivity,
so that I can identify areas for improvement and optimization.

#### Acceptance Criteria
1. System analyzes user patterns and provides weekly insights
2. Recommendations suggest optimal focus times based on history
3. Habit formation tips appear based on streak patterns
4. Goal-setting suggestions based on completion rates
5. Productivity trend notifications keep users engaged
6. Insights are actionable and specific to user behavior
7. Insight frequency is adjustable to avoid overwhelming users

## Epic 8 Premium Features & Monetization

### Epic Goal
Implement the premium subscription system and advanced features that provide value to power users while establishing a sustainable business model. This epic delivers the complete monetization strategy and premium functionality.

### Story 8.1 Subscription Management & Tiers

As a user,
I want to understand and manage my subscription,
so that I can access the features that provide the most value for my needs.

#### Acceptance Criteria
1. Three tiers clearly defined: Starter (Free), Pro ($6/mo), Artisan ($12/mo)
2. Feature comparison table shows tier differences clearly
3. Subscription upgrade/downgrade flows work seamlessly
4. Payment processing integrates with Stripe securely
5. Subscription status is clearly displayed in user settings
6. Billing history and receipts are accessible
7. Cancellation process is straightforward with retention offers

### Story 8.2 Premium Themes & Customization

As a user,
I want to personalize my app experience with premium themes,
so that I can create a workspace that reflects my preferences and style.

#### Acceptance Criteria
1. Four premium themes available: Moleskine, Arcade, Parchment, Minimalist
2. Theme switching applies instantly across all app sections
3. Theme preview allows users to test before purchasing
4. Custom theme elements include fonts, colors, and textures
5. Theme settings persist across devices with Pro subscription
6. Default theme works perfectly for free tier users
7. Theme performance doesn't impact app loading times

### Story 8.3 Advanced Integrations & Export

As a user,
I want to integrate my productivity data with external tools,
so that I can maintain my existing workflow while using Taskoholic.

#### Acceptance Criteria
1. Google Calendar integration syncs tasks and focus sessions
2. Outlook integration provides similar functionality
3. Calendar events can be imported as tasks automatically
4. Data export to PDF includes formatted reports and analytics
5. CSV export provides raw data for external analysis
6. Integration setup is guided and user-friendly
7. Data privacy and security are maintained in all integrations

## Checklist Results Report

**PM Checklist Execution:**
✅ Goals and background clearly defined with user value focus
✅ Functional requirements cover all core features with clear acceptance criteria
✅ Non-functional requirements address performance, reliability, and accessibility
✅ UI/UX goals establish clear design direction and user experience vision
✅ Technical assumptions provide solid foundation for architecture decisions
✅ Epic structure follows logical development sequence with value delivery
✅ Stories are sized appropriately for AI agent execution
✅ Acceptance criteria are testable and unambiguous
✅ Cross-cutting concerns are distributed throughout epics appropriately

**Overall PRD Quality:** Excellent - Ready for architecture and UX design phases

## Next Steps

### UX Expert Prompt
"Please create a comprehensive front-end specification for Taskoholic based on this PRD. Focus on the mobile-first design system, component architecture, and user interaction patterns. Pay special attention to the journal-like aesthetic and page-turn navigation requirements."

### Architect Prompt
"Please create a full-stack architecture document for Taskoholic based on this PRD. Focus on the serverless monolith approach, database design, and API architecture. Ensure the solution supports offline functionality, real-time updates, and scalable user management."

## Architecture Document Complete

The comprehensive fullstack architecture document has been created at `docs/architecture.md` with complete technical specifications, database schemas, API definitions, and deployment strategies.
