import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'
import LoginPage from './components/LoginPage.tsx'
import SetPassword from './components/SetPassword.tsx'
import Dashboard from './components/Dashboard.tsx'
import Home from './components/Home.tsx'
import Register from './components/Register.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'
import { RoleGuard } from './components/RoleGuard.tsx'
import { useAuthStore } from './store/authStore.ts'
import { ROUTES } from './utils/constants.ts'

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthInitializer>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          <Route path={ROUTES.HOME} element={<App />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SET_PASSWORD} element={<SetPassword />} />
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.HOME_PAGE}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <RoleGuard allowedRoles={['admin']}>
                <Register />
              </RoleGuard>
            }
          />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  </StrictMode>,
)