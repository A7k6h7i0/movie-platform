import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AppLayout from './components/layout/AppLayout';
import LoadingScreen from './pages/LoadingScreen';

// ✅ AUTH
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';

// ✅ LEGAL PAGES (Not lazy - need to be fast)
import TermsAndConditions from './pages/legal/TermsAndConditions';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Disclaimer from './pages/legal/Disclaimer';
import DMCA from './pages/legal/DMCA';
import ScrollToTop from "./components/layout/ScrollToTop";
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';


// ✅ LAZY PAGES
const Home = lazy(() => import('./pages/Home'));
const TrendingMovies = lazy(() => import('./pages/TrendingMovies'));
const PopularMovies = lazy(() => import('./pages/PopularMovies'));
const TopRatedMovies = lazy(() => import('./pages/TopRatedMovies'));
const UpcomingMovies = lazy(() => import('./pages/UpcomingMovies'));
const MovieListing = lazy(() => import('./pages/MovieListing'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BrowseByLanguage = lazy(() => import("./pages/BrowseByLanguage"));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ScrollToTop />
      <Routes>
        {/* 🔓 PUBLIC AUTH ROUTES - Outside AppLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 📄 PUBLIC LEGAL ROUTES - Outside AppLayout */}
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/dmca" element={<DMCA />} />

        {/* 🔐 PROTECTED APP LAYOUT - All routes inside require authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* All child routes are automatically protected */}
          <Route index element={<Home />} />
          <Route path="trending" element={<TrendingMovies />} />
          <Route path="popular" element={<PopularMovies />} />
          <Route path="top-rated" element={<TopRatedMovies />} />
          <Route path="upcoming" element={<UpcomingMovies />} />
          <Route path="movies" element={<MovieListing />} />
          <Route path="movie/:id/:slug" element={<MovieDetail />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="browse-language" element={<BrowseByLanguage />} />
          
          
          {/* ❌ NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
