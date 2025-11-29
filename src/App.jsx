import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CoursesPage from './pages/CoursesPage'
import CoursePage from './pages/CoursePage'
import LessonPage from './pages/LessonPage'
import InstructorDashboard from './pages/InstructorDashboard'
import CourseManagePage from './pages/CourseManagePage'
import { useAuthStore } from './store/authStore'

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Check authentication on app load
    checkAuth();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/courses" element={
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        } />
        <Route path="/course/:id" element={
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        } />
        <Route path="/lesson/:id" element={
          <ProtectedRoute>
            <LessonPage />
          </ProtectedRoute>
        } />
        <Route path="/instructor" element={
          <ProtectedRoute>
            <InstructorDashboard />
          </ProtectedRoute>
        } />
        <Route path="/instructor/course/:id" element={
          <ProtectedRoute>
            <CourseManagePage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
