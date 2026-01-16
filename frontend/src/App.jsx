import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import AppLayout from './components/layout/AppLayout';
import LoadingScreen from './pages/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const TrendingMovies = lazy(() => import('./pages/TrendingMovies'));
const PopularMovies = lazy(() => import('./pages/PopularMovies'));
const TopRatedMovies = lazy(() => import('./pages/TopRatedMovies'));
const UpcomingMovies = lazy(() => import('./pages/UpcomingMovies'));
const MovieListing = lazy(() => import('./pages/MovieListing'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="trending" element={<TrendingMovies />} />
          <Route path="popular" element={<PopularMovies />} />
          <Route path="top-rated" element={<TopRatedMovies />} />
          <Route path="upcoming" element={<UpcomingMovies />} />
          <Route path="movies" element={<MovieListing />} />
          <Route path="movie/:id/:slug" element={<MovieDetail />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
