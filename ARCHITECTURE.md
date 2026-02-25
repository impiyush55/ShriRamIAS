# 🏗️ Project Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (React Components + CSS)                     │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ROUTING LAYER                              │
│                   (React Router + Guards)                       │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐ │
│  │   Public     │    Admin     │   Faculty    │   Student    │ │
│  │   Routes     │   Routes     │   Routes     │   Routes     │ │
│  │              │ (Protected)  │ (Protected)  │ (Protected)  │ │
│  └──────────────┴──────────────┴──────────────┴──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION LAYER                         │
│                  (ProtectedRoute Component)                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • Check localStorage for authToken                      │  │
│  │  • Verify user role                                      │  │
│  │  • Redirect if unauthorized                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API LAYER (FAKE)                         │
│                   (Simulated Backend Calls)                     │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────────┐  │
│  │  Auth    │  Course  │   Blog   │   Test   │   Other      │  │
│  │   API    │   API    │   API    │   API    │   APIs       │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────────┘  │
│                                                                 │
│  Features:                                                      │
│  • Simulated delays (500-1000ms)                               │
│  • Consistent response format                                  │
│  • Error handling                                              │
│  • localStorage integration                                    │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                               │
│                    (Hardcoded Dummy Data)                       │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────────┐  │
│  │  Users   │ Courses  │  Blogs   │  Tests   │  Questions   │  │
│  │  (5)     │   (5)    │   (6)    │   (3)    │     (5)      │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BROWSER STORAGE                              │
│                      (localStorage)                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  • authToken: "fake_jwt_token_..."                       │  │
│  │  • currentUser: { id, email, name, role, ... }           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## User Flow Diagram

### Login Flow
```
┌──────────┐
│  Start   │
└────┬─────┘
     │
     ▼
┌─────────────────┐
│ Visit /common-  │
│    login        │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Enter Email &   │
│   Password      │
└────┬────────────┘
     │
     ▼
┌─────────────────┐      ┌──────────────┐
│  Click Login    │─────▶│  authApi.    │
│                 │      │  loginApi()  │
└─────────────────┘      └──────┬───────┘
                                │
                                ▼
                         ┌──────────────┐
                         │ Validate     │
                         │ Credentials  │
                         └──────┬───────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
            ┌──────────────┐        ┌──────────────┐
            │   Success    │        │    Error     │
            └──────┬───────┘        └──────┬───────┘
                   │                       │
                   ▼                       ▼
         ┌──────────────────┐      ┌──────────────┐
         │ Store in         │      │ Show Error   │
         │ localStorage:    │      │   Message    │
         │ • authToken      │      └──────────────┘
         │ • currentUser    │
         └──────┬───────────┘
                │
                ▼
         ┌──────────────────┐
         │ Check User Role  │
         └──────┬───────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
┌────────┐  ┌────────┐  ┌────────┐
│ Admin  │  │Faculty │  │Student │
│  Role  │  │  Role  │  │  Role  │
└───┬────┘  └───┬────┘  └───┬────┘
    │           │           │
    ▼           ▼           ▼
┌────────┐  ┌────────┐  ┌────────┐
│/admin/ │  │/faculty│  │/student│
│dashboard  │/dashboard  │/dashboard
└────────┘  └────────┘  └────────┘
```

---

## Protected Route Flow

```
┌──────────────────┐
│ User tries to    │
│ access protected │
│     route        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ ProtectedRoute   │
│   Component      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Check if user is │
│  authenticated   │
│ (authToken in    │
│  localStorage)   │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│  Yes   │ │   No   │
└───┬────┘ └───┬────┘
    │          │
    │          ▼
    │    ┌──────────────┐
    │    │ Redirect to  │
    │    │ /login.html  │
    │    └──────────────┘
    │
    ▼
┌──────────────────┐
│ Check user role  │
│ matches required │
│      role        │
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│  Yes   │ │   No   │
└───┬────┘ └───┬────┘
    │          │
    │          ▼
    │    ┌──────────────┐
    │    │ Redirect to  │
    │    │ user's own   │
    │    │  dashboard   │
    │    └──────────────┘
    │
    ▼
┌──────────────────┐
│  Render the      │
│  protected page  │
└──────────────────┘
```

---

## Data Flow Diagram

### Example: Student Browsing Courses

```
┌──────────────────┐
│ Student visits   │
│ /student/browse- │
│     courses      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ BrowseCourses    │
│   Component      │
│   Mounts         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ useEffect runs   │
│ loadCourses()    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Call API:        │
│ getAllCoursesApi()│
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Simulate delay   │
│   (600ms)        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Return dummy     │
│ courses from     │
│ courses.js       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Update state:    │
│ setCourses(data) │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Component        │
│ re-renders with  │
│ course data      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Display courses  │
│ in grid layout   │
└──────────────────┘
```

---

## Folder Structure Tree

```
LMS-main/
│
├── public/                    # Static assets
│   └── vite.svg
│
├── src/
│   │
│   ├── api/                   # Fake API Layer
│   │   ├── authApi.js        # Authentication operations
│   │   ├── courseApi.js      # Course CRUD
│   │   ├── blogApi.js        # Blog operations
│   │   └── testApi.js        # Test operations
│   │
│   ├── data/                  # Dummy Data
│   │   ├── users.js          # 5 users (1 admin, 2 faculty, 2 students)
│   │   ├── courses.js        # 5 courses
│   │   ├── blogs.js          # 6 blog posts
│   │   └── tests.js          # 3 tests + 5 questions
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedRoute.jsx    # Route guard
│   │   │
│   │   ├── common/           # Shared components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PromoModal.jsx
│   │   │
│   │   └── home/             # Home page components
│   │       ├── HeroSection.jsx
│   │       ├── BlogSection.jsx
│   │       └── ...
│   │
│   ├── pages/
│   │   │
│   │   ├── admin/            # Admin pages
│   │   │   └── AdminDashboard.jsx
│   │   │
│   │   ├── faculty/          # Faculty pages
│   │   │   └── FacultyDashboard.jsx
│   │   │
│   │   ├── student/          # Student pages
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── BrowseCourses.jsx
│   │   │   └── StudentBlogs.jsx
│   │   │
│   │   ├── CommonLogin.jsx   # Unified login
│   │   ├── Home.jsx
│   │   ├── Login.jsx         # Original login
│   │   ├── Register.jsx
│   │   └── ...
│   │
│   ├── styles/               # CSS files
│   │   ├── auth.css
│   │   ├── dashboard.css
│   │   ├── browse-courses.css
│   │   ├── blogs.css
│   │   └── ...
│   │
│   ├── App.jsx               # Main app with routing
│   └── main.jsx              # Entry point
│
├── Documentation/
│   ├── PROJECT_README.md           # Complete documentation
│   ├── TESTING_GUIDE.md            # Testing instructions
│   ├── IMPLEMENTATION_SUMMARY.md   # What was built
│   ├── QUICK_REFERENCE.md          # Quick reference card
│   └── ARCHITECTURE.md             # This file
│
├── package.json
├── vite.config.js
└── index.html
```

---

## Component Hierarchy

```
App
│
├── Routes
│   │
│   ├── Public Routes
│   │   ├── MainLayout
│   │   │   ├── Navbar
│   │   │   ├── Home
│   │   │   │   ├── HeroSection
│   │   │   │   ├── BlogSection
│   │   │   │   └── ...
│   │   │   ├── Footer
│   │   │   └── PromoModal
│   │   │
│   │   ├── Login
│   │   ├── CommonLogin
│   │   └── Register
│   │
│   ├── Protected Routes (Admin)
│   │   └── ProtectedRoute (role: admin)
│   │       └── AdminDashboard
│   │           ├── Sidebar
│   │           ├── Header
│   │           ├── StatsCards
│   │           ├── QuickActions
│   │           └── RecentActivity
│   │
│   ├── Protected Routes (Faculty)
│   │   └── ProtectedRoute (role: faculty)
│   │       └── FacultyDashboard
│   │           ├── Sidebar
│   │           ├── Header
│   │           ├── StatsCards
│   │           ├── CoursesGrid
│   │           └── QuickActions
│   │
│   └── Protected Routes (Student)
│       └── ProtectedRoute (role: student)
│           ├── StudentDashboard
│           │   ├── Sidebar
│           │   ├── Header
│           │   ├── StatsCards
│           │   ├── EnrolledCourses
│           │   ├── TestResults
│           │   └── QuickActions
│           │
│           ├── BrowseCourses
│           │   ├── PageHeader
│           │   ├── CategoryFilter
│           │   └── CoursesGrid
│           │
│           └── StudentBlogs
│               ├── PageHeader
│               ├── CategoryFilter
│               └── BlogsGrid
```

---

## State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Component State                          │
│                      (useState)                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  • User data                                                │
│  • Courses list                                             │
│  • Blogs list                                               │
│  • Tests list                                               │
│  • Loading states                                           │
│  • Error states                                             │
│  • Filter states                                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   Side Effects                              │
│                    (useEffect)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  • Load data on mount                                       │
│  • Filter data on category change                          │
│  • Update UI on state change                               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                 Persistent Storage                          │
│                   (localStorage)                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  • authToken                                                │
│  • currentUser                                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## API Response Format

All API functions return a consistent format:

```javascript
{
  success: boolean,      // true or false
  message: string,       // Human-readable message
  data: any             // Actual data (object, array, or null)
}
```

### Example Responses

**Success:**
```javascript
{
  success: true,
  message: "Courses fetched successfully",
  data: [
    { id: 1, title: "Course 1", ... },
    { id: 2, title: "Course 2", ... }
  ]
}
```

**Error:**
```javascript
{
  success: false,
  message: "User not found. Please check your email.",
  data: null
}
```

---

## Security Model (Demo)

```
┌─────────────────────────────────────────────────────────────┐
│                    Authentication                           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. User submits credentials                                │
│  2. Validate against dummy data                             │
│  3. Generate fake JWT token                                 │
│  4. Store token + user in localStorage                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Authorization                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Check if authToken exists                               │
│  2. Verify user role matches required role                  │
│  3. Allow or deny access                                    │
│  4. Redirect if unauthorized                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Session Management                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  • Session persists across page refreshes                   │
│  • Logout clears localStorage                               │
│  • No automatic expiration (demo only)                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**⚠️ Important:** This is for DEMO purposes only. In production:
- Use real JWT tokens from backend
- Implement token expiration
- Use httpOnly cookies
- Add CSRF protection
- Implement refresh tokens
- Add rate limiting

---

## Future Backend Integration

### Current (Demo):
```javascript
// Fake API
export const getAllCoursesApi = async () => {
  await simulateDelay(600);
  return {
    success: true,
    data: dummyCourses
  };
};
```

### Future (Real Backend):
```javascript
// Real API
export const getAllCoursesApi = async () => {
  try {
    const response = await fetch(`${API_URL}/api/courses`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) throw new Error('Failed to fetch');
    
    const data = await response.json();
    return {
      success: true,
      data: data.courses
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: []
    };
  }
};
```

---

**This architecture ensures:**
- ✅ Clean separation of concerns
- ✅ Easy to understand and maintain
- ✅ Simple to extend with new features
- ✅ Ready for backend integration
- ✅ Scalable and production-ready structure
