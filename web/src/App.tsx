import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import ChildrenPage from '@/pages/ChildrenPage';
import ChildProfilePage from '@/pages/ChildProfilePage';
import SpeechSessionPage from '@/pages/SpeechSessionPage';
import ExercisesPage from '@/pages/ExercisesPage';
import ProgressPage from '@/pages/ProgressPage';
import RewardsPage from '@/pages/RewardsPage';
import LumiChatPage from '@/pages/LumiChatPage';
import ShopPage from '@/pages/ShopPage';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/children"
          element={
            <ProtectedRoute>
              <Layout>
                <ChildrenPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/children/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <ChildProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/speech/session/:childId"
          element={
            <ProtectedRoute>
              <Layout>
                <SpeechSessionPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <Layout>
                <ExercisesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress/:childId"
          element={
            <ProtectedRoute>
              <Layout>
                <ProgressPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/rewards/:childId"
          element={
            <ProtectedRoute>
              <Layout>
                <RewardsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lumi/:childId"
          element={
            <ProtectedRoute>
              <Layout>
                <LumiChatPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
