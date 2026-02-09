
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PromoModal from './components/common/PromoModal';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Context Providers
import { BookmarkProvider } from './context/BookmarkContext';
import { NotificationProvider } from './context/NotificationContext';
import { LanguageProvider } from './context/LanguageContext';

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
import BlogListing from './pages/BlogListing';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RoleManagement from './pages/admin/RoleManagement';
import CourseManagement from './pages/admin/CourseManagement';
import EnquiryManagement from './pages/admin/EnquiryManagement';
import WalletManagement from './pages/admin/WalletManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import ContentLibrary from './pages/admin/ContentLibrary';
import LiveClassManagement from './pages/admin/LiveClassManagement';
import LiveClassSchedule from './pages/admin/LiveClassSchedule';
import LiveAttendance from './pages/admin/LiveAttendance';
import LiveRecordings from './pages/admin/LiveRecordings';
import VideoLibrary from './pages/admin/VideoLibrary';
import StreamingHealth from './pages/admin/StreamingHealth';
import LiveReports from './pages/admin/LiveReports';
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
import BannerManagement from './pages/admin/BannerManagement';
import MentorManagement from './pages/admin/MentorManagement';
import CurrentAffairsManagement from './pages/admin/CurrentAffairsManagement';
import EvaluationSystem from './pages/admin/EvaluationSystem';
import CouponManagement from './pages/admin/CouponManagement';
import CMSPages from './pages/admin/CMSPages';
import HomepageContent from './pages/admin/HomepageContent';
import AdminTestSeries from './pages/admin/TestSeries';
import AnswerSheetReview from './pages/admin/AnswerSheetReview';
import PerformanceAnalytics from './pages/admin/PerformanceAnalytics';
import Transactions from './pages/admin/Transactions';
import RefundRequests from './pages/admin/RefundRequests';
import LeadsManagement from './pages/admin/LeadsManagement';
import LeadAssignment from './pages/admin/LeadAssignment';
import StudentFeedback from './pages/admin/StudentFeedback';
import EmailSMSManagement from './pages/admin/EmailSMSManagement';
import AuditLogs from './pages/admin/AuditLogs';
import WebsiteManagement from './pages/admin/WebsiteManagement';
import SEOSettings from './pages/admin/SEOSettings';
import BackupMaintenance from './pages/admin/BackupMaintenance';

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
    <LanguageProvider>
      <BookmarkProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </BookmarkProvider>
    </LanguageProvider>
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
        <Route path="/blogs" element={<MainLayout><BlogListing /></MainLayout>} />
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
          path="/admin/user-management"
          element={
            <ProtectedRoute allowedRoles="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/roles-permissions"
          element={
            <ProtectedRoute allowedRoles="admin">
              <RoleManagement />
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
          path="/admin/live-schedule"
          element={
            <ProtectedRoute allowedRoles="admin">
              <LiveClassSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/live-attendance"
          element={
            <ProtectedRoute allowedRoles="admin">
              <LiveAttendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/live-recordings"
          element={
            <ProtectedRoute allowedRoles="admin">
              <LiveRecordings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/video-library"
          element={
            <ProtectedRoute allowedRoles="admin">
              <VideoLibrary />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/streaming-health"
          element={
            <ProtectedRoute allowedRoles="admin">
              <StreamingHealth />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/live-reports"
          element={
            <ProtectedRoute allowedRoles="admin">
              <LiveReports />
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
          path="/admin/test-series"
          element={
            <ProtectedRoute allowedRoles="admin">
              <AdminTestSeries />
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
        <Route
          path="/admin/mentors"
          element={
            <ProtectedRoute allowedRoles="admin">
              <MentorManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/banners"
          element={
            <ProtectedRoute allowedRoles="admin">
              <BannerManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/cms-pages"
          element={
            <ProtectedRoute allowedRoles="admin">
              <CMSPages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/homepage-content"
          element={
            <ProtectedRoute allowedRoles="admin">
              <HomepageContent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/current-affairs"
          element={
            <ProtectedRoute allowedRoles="admin">
              <CurrentAffairsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/evaluation"
          element={
            <ProtectedRoute allowedRoles="admin">
              <EvaluationSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/coupons"
          element={
            <ProtectedRoute allowedRoles="admin">
              <CouponManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/answer-sheets"
          element={
            <ProtectedRoute allowedRoles="admin">
              <AnswerSheetReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/performance-analytics"
          element={
            <ProtectedRoute allowedRoles="admin">
              <PerformanceAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute allowedRoles="admin">
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/refund-requests"
          element={
            <ProtectedRoute allowedRoles="admin">
              <RefundRequests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/leads"
          element={
            <ProtectedRoute allowedRoles="admin">
              <LeadsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lead-assignment"
          element={
            <ProtectedRoute allowedRoles="admin">
              <LeadAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/feedback"
          element={
            <ProtectedRoute allowedRoles="admin">
              <StudentFeedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/email-sms"
          element={
            <ProtectedRoute allowedRoles="admin">
              <EmailSMSManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/audit-logs"
          element={
            <ProtectedRoute allowedRoles="admin">
              <AuditLogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/website-management"
          element={
            <ProtectedRoute allowedRoles="admin">
              <WebsiteManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/seo-settings"
          element={
            <ProtectedRoute allowedRoles="admin">
              <SEOSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/backup-maintenance"
          element={
            <ProtectedRoute allowedRoles="admin">
              <BackupMaintenance />
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
