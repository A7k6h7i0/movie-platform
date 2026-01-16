export const formatRating = (rating) => {
  if (!rating) return '0.0';
  return Number(rating).toFixed(1);
};

export const getRatingColor = (rating) => {
  if (rating >= 8) return 'text-green-500';
  if (rating >= 6) return 'text-yellow-500';
  if (rating >= 4) return 'text-orange-500';
  return 'text-red-500';
};

export const getRatingBgColor = (rating) => {
  if (rating >= 8) return 'bg-green-500/20';
  if (rating >= 6) return 'bg-yellow-500/20';
  if (rating >= 4) return 'bg-orange-500/20';
  return 'bg-red-500/20';
};

export const getPercentageRating = (rating) => {
  return Math.round(rating * 10);
};

export const getRatingStars = (rating) => {
  const stars = Math.round(rating / 2);
  return '⭐'.repeat(stars);
};
