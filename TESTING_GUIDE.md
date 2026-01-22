# 🚀 Quick Start Guide - Testing the Application

## Step 1: Start the Development Server

The development server should already be running. If not, run:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Step 2: Test Authentication Flow

### Option A: Use Common Login Page (Recommended)
1. Navigate to `http://localhost:5173/common-login`
2. You'll see a clean login page with demo credentials displayed

### Option B: Update Existing Login Page
The existing `/login.html` page can be updated to use the new authentication system.

## Step 3: Test Each User Role

### Testing as Admin
1. Go to `/common-login`
2. Enter credentials:
   - Email: `admin@shriramias.com`
   - Password: `admin123`
3. Click "Sign In"
4. You should be redirected to `/admin/dashboard`
5. Explore:
   - View statistics (courses, blogs, tests, students)
   - Navigate through sidebar (Manage Courses, Blogs, Tests, Users)
   - Try quick actions
   - Click "Back to Home" to return to landing page
   - Click "Logout" to sign out

### Testing as Faculty
1. Go to `/common-login`
2. Enter credentials:
   - Email: `faculty@shriramias.com`
   - Password: `faculty123`
3. Click "Sign In"
4. You should be redirected to `/faculty/dashboard`
5. Explore:
   - View your assigned courses
   - Check teaching statistics
   - Navigate through sidebar (My Courses, Students, Add Content)
   - Try quick actions (Upload Lecture, View Students, etc.)

### Testing as Student
1. Go to `/common-login`
2. Enter credentials:
   - Email: `student@shriramias.com`
   - Password: `student123`
3. Click "Sign In"
4. You should be redirected to `/student/dashboard`
5. Explore:
   - View enrolled courses
   - Check test results
   - Click "Browse More" to see all courses
   - Navigate to "Browse Courses" from sidebar
   - Navigate to "Blogs & Resources" from sidebar
   - Try enrolling in a course (simulated)

## Step 4: Test Protected Routes

### Test Route Protection
1. While logged out, try to access:
   - `http://localhost:5173/admin/dashboard` → Should redirect to login
   - `http://localhost:5173/faculty/dashboard` → Should redirect to login
   - `http://localhost:5173/student/dashboard` → Should redirect to login

2. While logged in as Student, try to access:
   - `http://localhost:5173/admin/dashboard` → Should redirect to student dashboard
   - `http://localhost:5173/faculty/dashboard` → Should redirect to student dashboard

3. While logged in as Faculty, try to access:
   - `http://localhost:5173/admin/dashboard` → Should redirect to faculty dashboard
   - `http://localhost:5173/student/dashboard` → Should redirect to faculty dashboard

## Step 5: Test Student Features

### Browse Courses
1. Login as student
2. Click "Browse Courses" from sidebar or dashboard
3. Test category filters (All, Foundation, Prelims, Mains, etc.)
4. Click "Enroll Now" on any course
5. You should see a success message (simulated enrollment)

### Read Blogs
1. Login as student
2. Click "Blogs & Resources" from sidebar or dashboard
3. Test category filters (All, Strategy, Current Affairs, etc.)
4. Click "Read More" on any blog
5. Note: Blog detail page can be implemented similarly

## Step 6: Test Responsive Design

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
4. Check that:
   - Sidebar collapses on mobile
   - Cards stack properly
   - Buttons remain accessible
   - Text is readable

## Step 7: Verify Data Flow

### Check localStorage
1. Open browser DevTools (F12)
2. Go to "Application" tab → "Local Storage"
3. After login, you should see:
   - `authToken`: Fake JWT token
   - `currentUser`: User object with role, name, email, etc.
4. After logout, these should be cleared

### Test API Simulation
1. Open browser DevTools (F12)
2. Go to "Console" tab
3. You should see simulated API delays (loading states)
4. No actual network requests should be made

## Common Issues & Solutions

### Issue: Port already in use
**Solution:** Vite will automatically try another port. Check the terminal output for the actual URL.

### Issue: Page not found (404)
**Solution:** Make sure you're using the correct routes:
- `/common-login` (not `/login`)
- `/admin/dashboard` (not `/admin`)
- `/student/dashboard` (not `/student`)

### Issue: Infinite redirect loop
**Solution:** Clear localStorage and try again:
```javascript
// In browser console
localStorage.clear();
```

### Issue: Components not rendering
**Solution:** Check browser console for errors. Make sure all imports are correct.

## Next Steps

### For Development
1. Implement additional pages (course details, blog details, test taking)
2. Add more interactive features
3. Enhance UI/UX with animations
4. Add form validation
5. Implement search functionality

### For Production
1. Replace fake APIs with real backend calls
2. Implement proper JWT authentication
3. Add error boundaries
4. Implement proper state management (Redux/Context)
5. Add unit and integration tests
6. Optimize performance
7. Add SEO meta tags
8. Implement analytics

## Demo Presentation Tips

When demonstrating this project:

1. **Start with Architecture Overview**
   - Show the folder structure
   - Explain data → API → UI flow
   - Highlight separation of concerns

2. **Demonstrate Authentication**
   - Show login with different roles
   - Explain role-based redirection
   - Show protected route behavior

3. **Show Each Dashboard**
   - Admin: Full control and statistics
   - Faculty: Teaching tools and student management
   - Student: Learning resources and progress tracking

4. **Highlight Code Quality**
   - Clean, commented code
   - Reusable components
   - Consistent naming conventions
   - Easy to extend and maintain

5. **Discuss Scalability**
   - How to replace dummy APIs
   - How to add new features
   - How to integrate with real backend

## Useful Browser Extensions for Testing

- **React Developer Tools** - Inspect component hierarchy
- **Redux DevTools** - If you add Redux later
- **JSON Viewer** - View localStorage data nicely
- **Responsive Viewer** - Test multiple screen sizes at once

---

**Happy Testing! 🎉**

If you encounter any issues, check the browser console for error messages and refer to the PROJECT_README.md for detailed documentation.
