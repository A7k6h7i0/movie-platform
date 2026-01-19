import { tmdbService } from '../services/tmdbService.js';

export const movieController = {
  async getTrending(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const data = await tmdbService.getTrending(parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getPopular(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const data = await tmdbService.getPopular(parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getTopRated(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const data = await tmdbService.getTopRated(parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getUpcoming(req, res, next) {
    try {
      const { page = 1 } = req.query;
      const data = await tmdbService.getUpcoming(parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async getMovieDetail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await tmdbService.getMovieDetail(id);
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async searchMovies(req, res, next) {
    try {
      const { query, page = 1 } = req.query;

      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const data = await tmdbService.searchMovies(query, parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  },

  async browseMovies(req, res, next) {
    try {
      const { with_original_language, with_genres, year, page = 1 } = req.query;

      // If no filters, return popular movies as default
      if (!with_original_language && !with_genres && !year) {
        const data = await tmdbService.getPopular(parseInt(page));
        return res.json({
          success: true,
          data
        });
      }

      const params = {};
      if (with_original_language) params.with_original_language = with_original_language;
      if (with_genres) params.with_genres = with_genres;
      if (year) params.year = year;

      const data = await tmdbService.discoverMovies(params, parseInt(page));
      res.json({
        success: true,
        data
      });
    } catch (error) {
      next(error);
    }
  }
};
