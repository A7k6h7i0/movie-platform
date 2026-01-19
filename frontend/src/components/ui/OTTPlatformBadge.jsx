import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { getOTTPlatformUrl, OTT_PLATFORMS } from '../../utils/constants';

const OTTPlatformBadge = ({ provider, movie = null, clickable = true, size = 'default' }) => {
  const IMAGE_PROXY = 'https://images.weserv.nl/?url=';
  
  // Get provider name - handle different property names
  const providerName = provider.provider_name || provider.name || '';
  
  // Get logo URL - try TMDB first, then our predefined logoUrl
  const getLogoUrl = () => {
    if (provider.logo_path) {
      return `${IMAGE_PROXY}${encodeURIComponent(`https://image.tmdb.org/t/p/original${provider.logo_path}`)}`;
    }
    // Check if we have a predefined logo URL
    const platformInfo = OTT_PLATFORMS[provider.provider_id];
    if (platformInfo?.logoUrl) {
      return `${IMAGE_PROXY}${encodeURIComponent(platformInfo.logoUrl)}`;
    }
    return null;
  };

  const logoUrl = getLogoUrl();
  
  // Get platform info for color and emoji
  const platformInfo = OTT_PLATFORMS[provider.provider_id];
  const platformColor = platformInfo?.color || '#4A5568';
  const platformEmoji = platformInfo?.logo || '📺';
  
  // Get platform URL with movie title for search
  const platformUrl = clickable && movie?.title 
    ? getOTTPlatformUrl(provider.provider_id, providerName, movie.title)
    : provider.url || getOTTPlatformUrl(provider.provider_id, providerName);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Debug log to check what URL is being generated
    console.log('OTT Platform Click:', {
      providerId: provider.provider_id,
      providerName: providerName,
      movieTitle: movie?.title,
      generatedUrl: platformUrl
    });
    
    if (clickable && platformUrl) {
      window.open(platformUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Size variants
  const sizeClasses = {
    small: {
      container: 'p-2',
      logo: 'w-8 h-8',
      text: 'text-xs',
      subtext: 'text-[10px]'
    },
    default: {
      container: 'p-3',
      logo: 'w-12 h-12',
      text: 'text-sm',
      subtext: 'text-xs'
    },
    large: {
      container: 'p-4',
      logo: 'w-16 h-16',
      text: 'text-base',
      subtext: 'text-sm'
    }
  };

  const currentSize = sizeClasses[size] || sizeClasses.default;

  const BadgeContent = (
    <>
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={providerName}
          className={`${currentSize.logo} rounded-lg object-cover`}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      {/* Fallback emoji badge */}
      <div 
        className={`${currentSize.logo} rounded-lg items-center justify-center text-2xl ${logoUrl ? 'hidden' : 'flex'}`}
        style={{ backgroundColor: platformColor }}
      >
        {platformEmoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-white font-semibold ${currentSize.text} truncate`}>
          {providerName}
        </p>
        <p className={`text-gray-400 ${currentSize.subtext} capitalize`}>
          {provider.type || 'Stream'}
        </p>
      </div>
      {clickable && platformUrl && (
        <div className="flex items-center gap-1">
          <span className="text-primary-accent text-xs font-medium hidden sm:inline">
            Watch Now
          </span>
          <svg
            className="w-4 h-4 text-primary-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      )}
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className={`bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl ${currentSize.container} flex items-center gap-3 transition-all border border-white/10 hover:border-primary-accent/50 ${
        clickable && platformUrl ? 'cursor-pointer' : ''
      }`}
      role={clickable && platformUrl ? 'button' : undefined}
      tabIndex={clickable && platformUrl ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && clickable && platformUrl) {
          handleClick(e);
        }
      }}
      title={platformUrl ? `Watch "${movie?.title || ''}" on ${providerName}` : providerName}
    >
      {BadgeContent}
    </motion.div>
  );
};

OTTPlatformBadge.propTypes = {
  provider: PropTypes.object.isRequired,
  movie: PropTypes.object,
  clickable: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large'])
};

export default OTTPlatformBadge;
