import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AppProviders } from '@/app/providers';
import ChildLayout from '@/components/layouts/ChildLayout';
import ParentLayout from '@/components/layouts/ParentLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import { routes } from '@/app/routes';

function App() {
  return (
    <AppProviders>
      <Routes>
        {/* Public Routes */}
        {routes.public.map((route) => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}

        {/* Onboarding Routes */}
        {routes.onboarding.map((route) => (
          <Route key={route.path} path={route.path} element={<route.element />} />
        ))}

        {/* Child Experience Routes */}
        {routes.child.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={
              <ProtectedRoute>
                <ChildLayout>
                  <route.element />
                </ChildLayout>
              </ProtectedRoute>
            } 
          />
        ))}

        {/* Parent Experience Routes */}
        {routes.parent.map((route) => (
          <Route 
            key={route.path} 
            path={route.path} 
            element={
              <ProtectedRoute>
                <ParentLayout>
                  <route.element />
                </ParentLayout>
              </ProtectedRoute>
            } 
          />
        ))}

        {/* Legacy Routes - Keep for backward compatibility */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <ParentLayout>
              {(() => {
                const Component = routes.parent.find(r => r.path === '/parent/dashboard')?.element;
                return Component ? <Component /> : null;
              })()}
            </ParentLayout>
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster />
    </AppProviders>
  );
}

export default App;
