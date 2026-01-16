import express from 'express';
import { movieController } from '../controllers/movieController.js';

const router = express.Router();

router.get('/trending', movieController.getTrending);
router.get('/popular', movieController.getPopular);
router.get('/top-rated', movieController.getTopRated);
router.get('/upcoming', movieController.getUpcoming);
router.get('/search', movieController.searchMovies);
router.get('/:id', movieController.getMovieDetail);

export default router;
