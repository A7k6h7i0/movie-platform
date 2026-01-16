import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  tmdbId: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  title: {
    type: String,
    required: true
  },
  overview: String,
  genres: [String],
  releaseDate: Date,
  rating: Number,
  poster: String,
  backdrop: String,
  language: String,
  runtime: Number,
  providers: [{
    providerId: Number,
    providerName: String,
    logoPath: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

movieSchema.index({ title: 'text' });
movieSchema.index({ releaseDate: -1 });
movieSchema.index({ rating: -1 });

export default mongoose.model('Movie', movieSchema);
