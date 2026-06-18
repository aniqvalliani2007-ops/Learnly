import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { UploadProvider } from '../context/UploadContext'
import ProtectedRoute from '../components/shared/ProtectedRoute'

// Layout
import HomePage from '../pages/landing/HomePage'
import LoginPage from '../pages/auth/LoginPage'
import SignupPage from '../pages/auth/SignupPage'
import DashboardHome from '../pages/dashboard/DashboardHome'
import UpgradePage from '../pages/dashboard/UpgradePage'
import AdminDashboard from '../pages/admin/AdminDashboard'

const AppRoutes = () => {
  return (
    <AuthProvider>
      <UploadProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/upload"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/uploads"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/results/:uploadId"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard — guarded by its own hardcoded login */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* Upgrade page */}
          <Route
            path="/upgrade"
            element={
              <ProtectedRoute>
                <UpgradePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UploadProvider>
    </AuthProvider>
  )
}

export default AppRoutes
