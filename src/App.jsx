
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PromoModal from './components/common/PromoModal';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Context Providers
import { BookmarkProvider } from './context/BookmarkContext';
import { NotificationProvider } from './context/NotificationContext';

// Public Pages
import Home from './pages/Home';
import LiveCourses from './pages/LiveCourses';
import FreeResourcesPage from './pages/FreeResources';
import PreviousYearPapers from './pages/PreviousYearPapers';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetails from './pages/CourseDetails';

// Authentication
import CommonLogin from './pages/CommonLogin';

// Public Blog
import PublicBlogDetail from './pages/PublicBlogDetail';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import CourseManagement from './pages/admin/CourseManagement';
import EnquiryManagement from './pages/admin/EnquiryManagement';
import WalletManagement from './pages/admin/WalletManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import ContentLibrary from './pages/admin/ContentLibrary';
import LiveClassManagement from './pages/admin/LiveClassManagement';
import TestManagement from './pages/admin/TestManagement';
import QuizManagement from './pages/admin/QuizManagement';
import DailyMCQManagement from './pages/admin/DailyMCQManagement';
import FinanceCompliance from './pages/admin/FinanceCompliance';
import AnalyticsDashboard from './pages/admin/AnalyticsDashboard';
import BlogManagement from './pages/admin/BlogManagement';
import CreateBlog from './pages/admin/CreateBlog';
import NotificationManagement from './pages/admin/NotificationManagement';
import AdminSettings from './pages/admin/AdminSettings';
import SupportHelpdesk from './pages/admin/SupportHelpdesk';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyBlogManagement from './pages/faculty/FacultyBlogManagement';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import BrowseCourses from './pages/student/BrowseCourses';
import StudentBlogs from './pages/student/StudentBlogs';
import MyBookmarks from './pages/student/MyBookmarks';
import PaymentPage from './pages/student/PaymentPage';
import MyCourses from './pages/student/MyCourses';
import TestSeries from './pages/student/TestSeries';
import StudentBlogDetail from './pages/student/StudentBlogDetail';
import WalletPage from './pages/student/WalletPage';

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <PromoModal />
    </>
  );
}

// Wrap app with context providers
function AppWithProviders({ children }) {
  return (
    <BookmarkProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </BookmarkProvider>
  );
}

export default function App() {
  return (
    <AppWithProviders>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/index.html" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/live-courses.html" element={<MainLayout><LiveCourses /></MainLayout>} />
        <Route path="/previous-year-papers.html" element={<MainLayout><PreviousYearPapers /></MainLayout>} />
        <Route path="/free-resources.html" element={<FreeResourcesPage />} />
        <Route path="/course-details/:courseId" element={<MainLayout><CourseDetails /></MainLayout>} />

        {/* Public Blog Detail - No Login Required */}
        <Route path="/blogs/:blogId" element={<MainLayout><PublicBlogDetail /></MainLayout>} />

        {/* Authentication Routes */}
        <Route path="/login.html" element={<Login />} />
        <Route path="/common-login" element={<CommonLogin />} />
        <Route path="/register.html" element={<Register />} />

        {/* Admin Routes - Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles="admin">
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/enquiries"
          element={
            <ProtectedRoute allowedRoles="admin">
              <EnquiryManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/wallets"
          element={
            <ProtectedRoute allowedRoles="admin">
              <WalletManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute allowedRoles="admin">
              <CategoryManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/content"
          element={
            <ProtectedRoute allowedRoles="admin">
              <ContentLibrary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute allowedRoles="admin">
              <BlogManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs/create"
          element={
            <ProtectedRoute allowedRoles="admin">
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <ProtectedRoute allowedRoles="admin">
              <NotificationManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/support"
          element={
            <ProtectedRoute allowedRoles="admin">
              <SupportHelpdesk />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/live-classes"
          element={
            <ProtectedRoute allowedRoles="admin">
              <LiveClassManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/tests"
          element={
            <ProtectedRoute allowedRoles="admin">
              <TestManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <ProtectedRoute allowedRoles="admin">
              <QuizManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/daily-mcqs"
          element={
            <ProtectedRoute allowedRoles="admin">
              <DailyMCQManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/finance-compliance"
          element={
            <ProtectedRoute allowedRoles="admin">
              <FinanceCompliance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles="admin">
              <AnalyticsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles="admin">
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* Faculty Routes - Protected */}
        <Route
          path="/faculty/dashboard"
          element={
            <ProtectedRoute allowedRoles="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/courses"
          element={
            <ProtectedRoute allowedRoles="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/students"
          element={
            <ProtectedRoute allowedRoles="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/content"
          element={
            <ProtectedRoute allowedRoles="faculty">
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty/blogs"
          element={
            <ProtectedRoute allowedRoles="faculty">
              <FacultyBlogManagement />
            </ProtectedRoute>
          }
        />

        {/* Student Routes - Protected */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute allowedRoles="student">
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/browse-courses"
          element={
            <ProtectedRoute allowedRoles="student">
              <BrowseCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/payment"
          element={
            <ProtectedRoute allowedRoles="student">
              <PaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/tests"
          element={
            <ProtectedRoute allowedRoles="student">
              <TestSeries />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/blogs"
          element={
            <ProtectedRoute allowedRoles="student">
              <StudentBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/blogs/:blogId"
          element={
            <ProtectedRoute allowedRoles="student">
              <StudentBlogDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/bookmarks"
          element={
            <ProtectedRoute allowedRoles="student">
              <MyBookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <ProtectedRoute allowedRoles="student">
              <WalletPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppWithProviders>
  );
}
