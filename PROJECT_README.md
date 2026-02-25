# LMS - Role-Based Learning Management System (Demo)

## 📋 Project Overview

This is a **DEMO PROJECT** showcasing a role-based learning management system for UPSC preparation. It demonstrates a clean, production-ready architecture using **frontend-only technologies** with simulated backend functionality.

**⚠️ IMPORTANT:** This project uses:
- NO real backend
- NO real database
- NO real API calls
- All data is hardcoded/simulated using frontend code

## 🎯 Features

### User Roles
- **Admin** - Full system management capabilities
- **Faculty** - Course and content management
- **Student** - Learning and assessment access

### Core Modules
1. **Authentication System** (Simulated)
   - Common login page for all roles
   - Role-based redirection
   - localStorage-based session management
   - Protected routes with auth guards

2. **Admin Dashboard**
   - View system statistics
   - Manage courses, blogs, and tests
   - User management
   - Quick actions panel

3. **Faculty Dashboard**
   - View assigned courses
   - Manage course content
   - View student lists
   - Upload lectures (simulated)

4. **Student Dashboard**
   - View enrolled courses
   - Browse all courses
   - Take tests/quizzes
   - Read blogs and resources
   - Track progress

5. **Course Module**
   - Course listing with filters
   - Course details
   - Enrollment system (simulated)

6. **Blog Module**
   - Blog listing with categories
   - Featured blogs
   - Read time and view counts

7. **Test/Quiz Module**
   - Test listing
   - MCQ questions
   - Result tracking (simulated)

## 📁 Project Structure

```
src/
├── api/                    # Fake API layer (simulates backend)
│   ├── authApi.js         # Authentication operations
│   ├── courseApi.js       # Course CRUD operations
│   ├── blogApi.js         # Blog operations
│   └── testApi.js         # Test/quiz operations
│
├── data/                   # Hardcoded dummy data
│   ├── users.js           # User data (admin, faculty, student)
│   ├── courses.js         # Course catalog
│   ├── blogs.js           # Blog posts
│   └── tests.js           # Tests and questions
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.jsx  # Route protection component
│   ├── common/            # Shared components (Navbar, Footer, etc.)
│   └── home/              # Home page components
│
├── pages/
│   ├── admin/
│   │   └── AdminDashboard.jsx
│   ├── faculty/
│   │   └── FacultyDashboard.jsx
│   ├── student/
│   │   ├── StudentDashboard.jsx
│   │   ├── BrowseCourses.jsx
│   │   └── StudentBlogs.jsx
│   ├── CommonLogin.jsx    # Unified login page
│   └── [other pages...]
│
└── styles/                # CSS files
    ├── auth.css
    ├── dashboard.css
    ├── browse-courses.css
    └── blogs.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
cd LMS-main
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Credentials

Use these credentials to test different user roles:

### Admin
- **Email:** admin@lms.com
- **Password:** admin123
- **Redirects to:** `/admin/dashboard`

### Faculty
- **Email:** faculty@lms.com
- **Password:** faculty123
- **Redirects to:** `/faculty/dashboard`

### Student
- **Email:** student@lms.com
- **Password:** student123
- **Redirects to:** `/student/dashboard`

## 🛣️ Route Structure

### Public Routes
- `/` - Home page
- `/live-courses.html` - Live courses listing
- `/previous-year-papers.html` - Previous year papers
- `/free-resources.html` - Free resources
- `/course-details/:courseId` - Course details

### Authentication Routes
- `/common-login` - Common login page (recommended)
- `/login.html` - Original login page
- `/register.html` - Registration page

### Protected Routes

#### Admin Routes (Role: admin)
- `/admin/dashboard` - Admin dashboard
- `/admin/courses` - Manage courses
- `/admin/blogs` - Manage blogs
- `/admin/tests` - Manage tests
- `/admin/users` - Manage users

#### Faculty Routes (Role: faculty)
- `/faculty/dashboard` - Faculty dashboard
- `/faculty/courses` - My courses
- `/faculty/students` - My students
- `/faculty/content` - Add content

#### Student Routes (Role: student)
- `/student/dashboard` - Student dashboard
- `/student/courses` - My enrolled courses
- `/student/browse-courses` - Browse all courses
- `/student/tests` - Tests and quizzes
- `/student/blogs` - Blogs and resources

## 🔒 Authentication Flow

1. User visits `/common-login`
2. Enters email and password
3. System validates against dummy user data
4. On success:
   - Creates fake JWT token
   - Stores user data in localStorage
   - Redirects based on role:
     - Admin → `/admin/dashboard`
     - Faculty → `/faculty/dashboard`
     - Student → `/student/dashboard`
5. Protected routes check localStorage for authentication
6. Unauthorized access redirects to login

## 🎨 Design Features

- **Modern UI/UX** - Clean, professional interface
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Role-based Theming** - Different color schemes for each role
- **Interactive Elements** - Hover effects, animations, transitions
- **Loading States** - Simulated API delays with loading indicators
- **Empty States** - Helpful messages when no data available

## 🔧 How to Extend

### Adding New Dummy Data

1. Edit files in `src/data/` directory
2. Add new objects to existing arrays
3. Data will be automatically available through API functions

### Adding New API Functions

1. Create/edit files in `src/api/` directory
2. Follow existing pattern:
   ```javascript
   export const yourNewApi = async (params) => {
     await simulateDelay(500);
     try {
       // Your logic here
       return {
         success: true,
         message: 'Success message',
         data: yourData
       };
     } catch (error) {
       return {
         success: false,
         message: 'Error message',
         data: null
       };
     }
   };
   ```

### Adding New Pages

1. Create component in appropriate directory
2. Add route in `App.jsx`
3. Wrap with `<ProtectedRoute>` if authentication required
4. Create corresponding CSS file in `src/styles/`

### Replacing with Real Backend

The architecture is designed for easy backend integration:

1. **Replace API functions** in `src/api/` with real HTTP calls
2. **Remove dummy data** from `src/data/`
3. **Update authentication** to use real JWT tokens
4. **Add environment variables** for API endpoints
5. **Implement error handling** for network failures

Example:
```javascript
// Before (Fake API)
export const getAllCoursesApi = async () => {
  await simulateDelay(600);
  return {
    success: true,
    data: dummyCourses
  };
};

// After (Real API)
export const getAllCoursesApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`);
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

## 📚 Technologies Used

- **React 19** - UI library
- **React Router DOM 7** - Routing
- **Vite** - Build tool
- **Vanilla CSS** - Styling
- **Remix Icons** - Icon library
- **localStorage** - Session management (demo)

## 🎓 Learning Objectives

This project demonstrates:
- Clean code architecture
- Separation of concerns
- Role-based access control
- Component reusability
- State management
- Routing and navigation
- Responsive design
- User experience best practices

## 📝 Notes for Interviews

When presenting this project:

1. **Emphasize Architecture** - Explain the separation between data, API, and UI layers
2. **Highlight Scalability** - Show how easy it is to replace dummy APIs with real ones
3. **Discuss Security** - Explain role-based access control and route protection
4. **Demonstrate UX** - Show responsive design and interactive elements
5. **Explain Trade-offs** - Discuss why certain decisions were made for demo purposes

## 🤝 Contributing

This is a demo project for learning purposes. Feel free to:
- Fork and modify for your own learning
- Use as a template for similar projects
- Suggest improvements via issues

## 📄 License

This project is for educational and demonstration purposes only.

## 👨‍💻 Author

Created as a demonstration of modern frontend architecture and role-based system design.

---

**Remember:** This is a DEMO project. Never use localStorage for real authentication in production. Always use secure, backend-based authentication with proper security measures.
