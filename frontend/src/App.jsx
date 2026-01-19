import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import AppLayout from './components/layout/AppLayout';
import LoadingScreen from './pages/LoadingScreen';

// ✅ AUTH
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';

// ✅ LEGAL PAGES
import TermsAndConditions from './pages/legal/TermsAndConditions';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import Disclaimer from './pages/legal/Disclaimer';
import DMCA from './pages/legal/DMCA';

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
      <Routes>

        {/* 🔓 PUBLIC AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🌐 APP LAYOUT */}
        <Route path="/" element={<AppLayout />}>

          {/* 🔐 PROTECTED APP ROUTES */}
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="browse-language" element={<BrowseByLanguage />} />



          <Route
            path="trending"
            element={
              <ProtectedRoute>
                <TrendingMovies />
              </ProtectedRoute>
            }
          />

          <Route
            path="popular"
            element={
              <ProtectedRoute>
                <PopularMovies />
              </ProtectedRoute>
            }
          />

          <Route
            path="top-rated"
            element={
              <ProtectedRoute>
                <TopRatedMovies />
              </ProtectedRoute>
            }
          />

          <Route
            path="upcoming"
            element={
              <ProtectedRoute>
                <UpcomingMovies />
              </ProtectedRoute>
            }
          />

          <Route
            path="movies"
            element={
              <ProtectedRoute>
                <MovieListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="movie/:id/:slug"
            element={
              <ProtectedRoute>
                <MovieDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />

          {/* 📄 PUBLIC LEGAL ROUTES */}
          <Route path="terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="disclaimer" element={<Disclaimer />} />
          <Route path="dmca" element={<DMCA />} />

          {/* ❌ NOT FOUND */}
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
