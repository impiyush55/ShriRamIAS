
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PromoModal from './components/common/PromoModal';

import Home from './pages/Home';
import LiveCourses from './pages/LiveCourses';
import FreeResourcesPage from './pages/FreeResources';
import PreviousYearPapers from './pages/PreviousYearPapers';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetails from './pages/CourseDetails';

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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/index.html" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/live-courses.html" element={<MainLayout><LiveCourses /></MainLayout>} />
      <Route path="/previous-year-papers.html" element={<MainLayout><PreviousYearPapers /></MainLayout>} />

      {/* Pages with custom layout */}
      <Route path="/free-resources.html" element={<FreeResourcesPage />} />
      <Route path="/login.html" element={<Login />} />
      <Route path="/register.html" element={<Register />} />
      <Route path="/course-details/:courseId" element={<MainLayout><CourseDetails /></MainLayout>} />
    </Routes>
  );
}
