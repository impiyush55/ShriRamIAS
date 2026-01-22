# 🎯 Quick Reference Card

## 🔗 Important URLs

### Development Server
```
http://localhost:5173
```
*(Port may vary if 5173 is in use - check terminal output)*

### Key Pages to Visit

#### Authentication
- **Common Login:** `/common-login` ⭐ (Recommended)
- Original Login: `/login.html`
- Register: `/register.html`

#### Admin Dashboard
- Main Dashboard: `/admin/dashboard`
- Manage Courses: `/admin/courses`
- Manage Blogs: `/admin/blogs`
- Manage Tests: `/admin/tests`
- Manage Users: `/admin/users`

#### Faculty Dashboard
- Main Dashboard: `/faculty/dashboard`
- My Courses: `/faculty/courses`
- My Students: `/faculty/students`
- Add Content: `/faculty/content`

#### Student Dashboard
- Main Dashboard: `/student/dashboard`
- My Courses: `/student/courses`
- Browse Courses: `/student/browse-courses` ⭐
- Tests & Quizzes: `/student/tests`
- Blogs & Resources: `/student/blogs` ⭐

---

## 🔐 Demo Credentials

### 👨‍💼 Admin Account
```
Email:    admin@shriramias.com
Password: admin123
Role:     admin
Redirect: /admin/dashboard
```

**What you can do:**
- View system statistics
- Access all management pages
- See recent activity
- Use quick actions panel

---

### 👨‍🏫 Faculty Account #1
```
Email:    faculty@shriramias.com
Password: faculty123
Name:     Dr. Rajesh Kumar
Role:     faculty
Redirect: /faculty/dashboard
```

**What you can do:**
- View assigned courses (3 courses)
- See teaching statistics
- Access student lists
- Upload content (simulated)

---

### 👨‍🏫 Faculty Account #2
```
Email:    faculty2@shriramias.com
Password: faculty123
Name:     Prof. Priya Sharma
Role:     faculty
Redirect: /faculty/dashboard
```

**What you can do:**
- View assigned courses (2 courses)
- See teaching statistics
- Access student lists
- Upload content (simulated)

---

### 👨‍🎓 Student Account #1
```
Email:    student@shriramias.com
Password: student123
Name:     Amit Verma
Role:     student
Redirect: /student/dashboard
```

**What you can do:**
- View enrolled courses (3 courses)
- Browse all available courses
- Read blogs and articles
- View test results (2 attempts)
- Enroll in new courses (simulated)

---

### 👨‍🎓 Student Account #2
```
Email:    student2@shriramias.com
Password: student123
Name:     Sneha Patel
Role:     student
Redirect: /student/dashboard
```

**What you can do:**
- View enrolled courses (2 courses)
- Browse all available courses
- Read blogs and articles
- Enroll in new courses (simulated)

---

## 📋 Quick Test Checklist

### ✅ Authentication Testing
- [ ] Login with admin credentials
- [ ] Login with faculty credentials
- [ ] Login with student credentials
- [ ] Test logout functionality
- [ ] Try accessing protected routes without login
- [ ] Try accessing wrong role's dashboard

### ✅ Admin Testing
- [ ] View dashboard statistics
- [ ] Navigate through sidebar
- [ ] Check quick actions
- [ ] View recent activity
- [ ] Return to home page
- [ ] Logout

### ✅ Faculty Testing
- [ ] View teaching statistics
- [ ] See assigned courses
- [ ] Check course details
- [ ] Navigate through sidebar
- [ ] Try quick actions
- [ ] Logout

### ✅ Student Testing
- [ ] View enrolled courses
- [ ] Check test results
- [ ] Browse all courses
- [ ] Filter courses by category
- [ ] Enroll in a course
- [ ] Read blogs
- [ ] Filter blogs by category
- [ ] Logout

### ✅ UI/UX Testing
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1920px)
- [ ] Check hover effects
- [ ] Verify loading states
- [ ] Check empty states

---

## 🎨 Color Reference

### Role Colors
- **Admin:** Purple (#667eea, #764ba2)
- **Faculty:** Green (#059669, #047857)
- **Student:** Red (#dc2626, #991b1b)

### UI Colors
- **Primary:** #667eea
- **Success:** #059669
- **Warning:** #f59e0b
- **Info:** #0ea5e9
- **Background:** #f7fafc
- **Text Dark:** #1a202c
- **Text Light:** #718096

---

## 📊 Dummy Data Summary

### Users
- 1 Admin
- 2 Faculty members
- 2 Students

### Courses
- 5 courses across different categories
- Foundation, Prelims, Mains, Optional, Current Affairs

### Blogs
- 6 blog posts
- Categories: Strategy, Current Affairs, Mains Preparation, Resources, Interview

### Tests
- 3 tests with different difficulty levels
- 5 sample MCQ questions included

---

## 🚀 Quick Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Linter
```bash
npm run lint
```

---

## 🐛 Common Issues & Quick Fixes

### Issue: Can't login
**Fix:** Make sure you're using `/common-login` and exact credentials

### Issue: Redirect loop
**Fix:** Clear localStorage
```javascript
localStorage.clear()
```

### Issue: Page not found
**Fix:** Check the exact route path in the URL

### Issue: Components not showing
**Fix:** Check browser console for errors

### Issue: Port already in use
**Fix:** Vite will use another port automatically - check terminal

---

## 📱 Browser DevTools Shortcuts

- **Open DevTools:** `F12` or `Ctrl+Shift+I`
- **Toggle Device Mode:** `Ctrl+Shift+M`
- **Console:** `Ctrl+Shift+J`
- **Network Tab:** `Ctrl+Shift+E`

### Useful Console Commands
```javascript
// View current user
JSON.parse(localStorage.getItem('currentUser'))

// View auth token
localStorage.getItem('authToken')

// Clear session
localStorage.clear()

// Check authentication status
!!localStorage.getItem('authToken')
```

---

## 📚 Documentation Files

1. **PROJECT_README.md** - Complete project documentation
2. **TESTING_GUIDE.md** - Step-by-step testing guide
3. **IMPLEMENTATION_SUMMARY.md** - What was built
4. **QUICK_REFERENCE.md** - This file

---

## 💡 Demo Presentation Flow

1. **Introduction** (2 min)
   - Explain it's a demo project
   - Mention no real backend
   - Highlight architecture

2. **Show Landing Page** (1 min)
   - Existing UI (unchanged)
   - Navigation to login

3. **Demo Admin Role** (3 min)
   - Login as admin
   - Show dashboard
   - Explain statistics
   - Show navigation

4. **Demo Faculty Role** (3 min)
   - Login as faculty
   - Show assigned courses
   - Explain teaching features

5. **Demo Student Role** (5 min)
   - Login as student
   - Show enrolled courses
   - Browse courses
   - Read blogs
   - Explain enrollment

6. **Show Code Architecture** (3 min)
   - Data layer
   - API layer
   - Protected routes
   - Easy backend integration

7. **Q&A** (3 min)

**Total: ~20 minutes**

---

## ✨ Key Selling Points

1. **Clean Architecture** - Easy to understand and extend
2. **Production-Ready** - Follows best practices
3. **Role-Based** - Three distinct user experiences
4. **Well-Documented** - Multiple comprehensive guides
5. **Backend-Ready** - Easy to integrate real APIs
6. **Modern UI** - Professional and responsive
7. **Beginner-Friendly** - Well-commented code

---

**Print this page for quick reference during demos! 📄**
