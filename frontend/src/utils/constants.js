export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    xlarge: 'w780',
    original: 'original'
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original'
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original'
  }
};

// Complete OTT Platforms list with all Indian regional platforms
export const OTT_PLATFORMS = {
  // ==================== MAJOR PLATFORMS ====================
  // Disney+ Hotstar
  122: { 
    name: 'Disney+ Hotstar', 
    logo: '🌟', 
    color: '#1F80E0', 
    url: 'https://www.hotstar.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Disney%2B_Hotstar_logo.svg',
    category: 'major'
  },
  // Amazon Prime Video
  119: { 
    name: 'Amazon Prime Video', 
    logo: '📺', 
    color: '#00A8E1', 
    url: 'https://www.primevideo.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Prime_Video_Logo.svg',
    category: 'major'
  },
  // Netflix
  8: { 
    name: 'Netflix', 
    logo: '🎬', 
    color: '#E50914', 
    url: 'https://www.netflix.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
    category: 'major'
  },
  // JioCinema
  220: { 
    name: 'JioCinema', 
    logo: '🎥', 
    color: '#E91E63', 
    url: 'https://www.jiocinema.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/JioCinema_logo.svg',
    category: 'major'
  },
  // Sony LIV
  175: { 
    name: 'Sony LIV', 
    logo: '📺', 
    color: '#000000', 
    url: 'https://www.sonyliv.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/SonyLIV_logo.svg',
    category: 'major'
  },
  // Zee5
  237: { 
    name: 'Zee5', 
    logo: '📺', 
    color: '#8230C6', 
    url: 'https://www.zee5.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/ZEE5_logo.svg',
    category: 'major'
  },
  // MX Player
  515: { 
    name: 'MX Player', 
    logo: '▶️', 
    color: '#0D47A1', 
    url: 'https://www.mxplayer.in',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/MX_Player_logo.svg',
    category: 'major'
  },
  // Voot (now merged into JioCinema)
  232: { 
    name: 'Voot', 
    logo: '🎥', 
    color: '#FF5722', 
    url: 'https://www.jiocinema.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Voot_2016_logo.svg',
    category: 'major'
  },
  // ALTBalaji
  319: { 
    name: 'ALTBalaji', 
    logo: '🎭', 
    color: '#D32F2F', 
    url: 'https://www.altbalaji.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/ALTBalaji_logo.svg',
    category: 'major'
  },
  // Discovery+
  520: { 
    name: 'Discovery+', 
    logo: '🌍', 
    color: '#003366', 
    url: 'https://www.discoveryplus.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Discovery%2B_logo.svg',
    category: 'major'
  },
  // Apple TV+
  350: { 
    name: 'Apple TV+', 
    logo: '🍎', 
    color: '#000000', 
    url: 'https://tv.apple.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Apple_TV%2B_logo.svg',
    category: 'major'
  },
  // Lionsgate Play
  561: { 
    name: 'Lionsgate Play', 
    logo: '🦁', 
    color: '#FF6B00', 
    url: 'https://www.lionsgateplay.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Lionsgate_logo.svg',
    category: 'major'
  },
  // ShemarooMe
  533: { 
    name: 'ShemarooMe', 
    logo: '🎬', 
    color: '#FF0000', 
    url: 'https://www.shemaroome.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/ShemarooMe_logo.svg',
    category: 'major'
  },
  // Eros Now
  218: { 
    name: 'Eros Now', 
    logo: '💕', 
    color: '#E91E63', 
    url: 'https://erosnow.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Eros_Now_logo.svg',
    category: 'major'
  },

  // ==================== TELUGU OTT PLATFORMS ====================
  // Aha (Telugu & Tamil)
  532: { 
    name: 'Aha', 
    logo: '🎬', 
    color: '#FF6F00', 
    url: 'https://www.aha.video',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Aha_OTT_Logo.svg',
    category: 'telugu'
  },
  // ETV Win
  600: { 
    name: 'ETV Win', 
    logo: '📺', 
    color: '#FF5722', 
    url: 'https://www.etvwin.com',
    logoUrl: null,
    category: 'telugu'
  },
  // iBOMMA
  601: { 
    name: 'iBOMMA', 
    logo: '🎥', 
    color: '#4CAF50', 
    url: 'https://www.ibomma.com',
    logoUrl: null,
    category: 'telugu'
  },
  // Neestream
  602: { 
    name: 'Neestream', 
    logo: '🌊', 
    color: '#2196F3', 
    url: 'https://www.neestream.com',
    logoUrl: null,
    category: 'telugu'
  },
  // Aha Gold
  603: { 
    name: 'Aha Gold', 
    logo: '🏆', 
    color: '#FFD700', 
    url: 'https://www.aha.video',
    logoUrl: null,
    category: 'telugu'
  },
  // First Shows
  604: { 
    name: 'First Shows', 
    logo: '🎬', 
    color: '#9C27B0', 
    url: 'https://www.firstshows.com',
    logoUrl: null,
    category: 'telugu'
  },
  // Chitram TV OTT
  605: { 
    name: 'Chitram TV OTT', 
    logo: '📺', 
    color: '#E91E63', 
    url: 'https://www.chitramtv.com',
    logoUrl: null,
    category: 'telugu'
  },

  // ==================== TAMIL OTT PLATFORMS ====================
  // Sun NXT
  309: { 
    name: 'Sun NXT', 
    logo: '☀️', 
    color: '#FFC107', 
    url: 'https://www.sunnxt.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Sun_NXT_Logo.svg',
    category: 'tamil'
  },
  // Tentkotta
  610: { 
    name: 'Tentkotta', 
    logo: '🎪', 
    color: '#FF5722', 
    url: 'https://www.tentkotta.com',
    logoUrl: null,
    category: 'tamil'
  },
  // Simply South
  611: { 
    name: 'Simply South', 
    logo: '🌴', 
    color: '#4CAF50', 
    url: 'https://www.simplysouth.tv',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Simply_South_logo.svg',
    category: 'tamil'
  },
  // Raj Digital Plus
  612: { 
    name: 'Raj Digital Plus', 
    logo: '👑', 
    color: '#9C27B0', 
    url: 'https://www.rajdigitalplus.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9b/Raj_Digital_Plus_logo.png',
    category: 'tamil'
  },
  // Movie Saints
  613: { 
    name: 'Movie Saints', 
    logo: '🎬', 
    color: '#3F51B5', 
    url: 'https://www.moviesaints.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/MovieSaints_logo.svg',
    category: 'tamil'
  },

  // ==================== KANNADA OTT PLATFORMS ====================
  // VROTT
  620: { 
    name: 'VROTT', 
    logo: '🎥', 
    color: '#FF5722', 
    url: 'https://www.vrott.com',
    logoUrl: null,
    category: 'kannada'
  },
  // NammaFlix
  621: { 
    name: 'NammaFlix', 
    logo: '🎬', 
    color: '#E91E63', 
    url: 'https://www.nammaflix.com',
    logoUrl: null,
    category: 'kannada'
  },
  // Gubbare
  622: { 
    name: 'Gubbare', 
    logo: '🎈', 
    color: '#FF9800', 
    url: 'https://www.gubbare.com',
    logoUrl: null,
    category: 'kannada'
  },
  // Chauka
  623: { 
    name: 'Chauka', 
    logo: '🏏', 
    color: '#4CAF50', 
    url: 'https://www.chauka.com',
    logoUrl: null,
    category: 'kannada'
  },
  // Cini Kannada OTT
  624: { 
    name: 'Cini Kannada OTT', 
    logo: '🎥', 
    color: '#9C27B0', 
    url: 'https://www.cinikannada.com',
    logoUrl: null,
    category: 'kannada'
  },

  // ==================== MALAYALAM OTT PLATFORMS ====================
  // Manorama MAX
  630: { 
    name: 'Manorama MAX', 
    logo: '📺', 
    color: '#D32F2F', 
    url: 'https://www.manoramamax.com',
    logoUrl: null,
    category: 'malayalam'
  },
  // Saina Play
  631: { 
    name: 'Saina Play', 
    logo: '🎬', 
    color: '#FF5722', 
    url: 'https://www.sainaplay.com',
    logoUrl: null,
    category: 'malayalam'
  },
  // C Space (Kerala Govt OTT)
  632: { 
    name: 'C Space', 
    logo: '🏛️', 
    color: '#4CAF50', 
    url: 'https://www.cspace.kerala.gov.in',
    logoUrl: null,
    category: 'malayalam'
  },
  // Koode
  633: { 
    name: 'Koode', 
    logo: '🤝', 
    color: '#2196F3', 
    url: 'https://www.koode.com',
    logoUrl: null,
    category: 'malayalam'
  },
  // HighHope OTT
  634: { 
    name: 'HighHope OTT', 
    logo: '🌟', 
    color: '#9C27B0', 
    url: 'https://www.highhope.in',
    logoUrl: null,
    category: 'malayalam'
  },
  // Limelight OTT
  635: { 
    name: 'Limelight OTT', 
    logo: '💡', 
    color: '#FFC107', 
    url: 'https://www.limelightott.com',
    logoUrl: null,
    category: 'malayalam'
  },

  // ==================== BENGALI OTT PLATFORMS ====================
  // Hoichoi (Bengali)
  315: { 
    name: 'Hoichoi', 
    logo: '🎭', 
    color: '#FFD700', 
    url: 'https://www.hoichoi.tv',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Hoichoi_Logo.svg',
    category: 'bengali'
  },

  // ==================== PUNJABI/HARYANVI OTT PLATFORMS ====================
  // Chaupal (Punjabi/Haryanvi)
  534: {
    name: 'Chaupal',
    logo: '🎭',
    color: '#4CAF50',
    url: 'https://www.chaupal.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Chaupal_logo.svg',
    category: 'punjabi'
  },
  // Stage (Haryanvi/Rajasthani)
  536: {
    name: 'Stage',
    logo: '🎪',
    color: '#9C27B0',
    url: 'https://www.stageapp.co',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Stage_OTT_logo.svg',
    category: 'punjabi'
  },

  // ==================== MARATHI OTT PLATFORMS ====================
  // Planet Marathi
  535: {
    name: 'Planet Marathi',
    logo: '🌍',
    color: '#FF5722',
    url: 'https://www.planetmarathi.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Planet_Marathi_logo.svg',
    category: 'marathi'
  },

  // ==================== YOUTUBE ====================
  192: { 
    name: 'YouTube', 
    logo: '▶️', 
    color: '#FF0000', 
    url: 'https://www.youtube.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg',
    category: 'major'
  },
};

// Default OTT order for display (can be customized by user)
export const DEFAULT_OTT_ORDER = [
  192,
  119,
  8,
  122,
  350,
  175,
  220,
  237,
  515,
  319,
  532,
  309,
  315,
  218,
  520,
  561,
  533,
  534,
  535,
  536,
];


// Comprehensive OTT Platform URL mapping for dynamic providers
export const getOTTPlatformUrl = (providerId, providerName) => {
  // Check if we have a predefined URL by ID
  if (OTT_PLATFORMS[providerId]?.url) {
    return OTT_PLATFORMS[providerId].url;
  }
  
  // Extended URL mappings based on provider name (case-insensitive)
  const urlMappings = {
    // Major Platforms
    'disney+ hotstar': 'https://www.hotstar.com',
    'disney plus hotstar': 'https://www.hotstar.com',
    'hotstar': 'https://www.hotstar.com',
    'amazon prime video': 'https://www.primevideo.com',
    'prime video': 'https://www.primevideo.com',
    'amazon video': 'https://www.primevideo.com',
    'amazon prime': 'https://www.primevideo.com',
    'netflix': 'https://www.netflix.com',
    'netflix basic with ads': 'https://www.netflix.com',
    'jiocinema': 'https://www.jiocinema.com',
    'jio cinema': 'https://www.jiocinema.com',
    'sonyliv': 'https://www.sonyliv.com',
    'sony liv': 'https://www.sonyliv.com',
    'zee5': 'https://www.zee5.com',
    'mx player': 'https://www.mxplayer.in',
    'mxplayer': 'https://www.mxplayer.in',
    'voot': 'https://www.jiocinema.com',
    'altbalaji': 'https://www.altbalaji.com',
    'alt balaji': 'https://www.altbalaji.com',
    'discovery+': 'https://www.discoveryplus.com',
    'discovery plus': 'https://www.discoveryplus.com',
    'apple tv+': 'https://tv.apple.com',
    'apple tv plus': 'https://tv.apple.com',
    'apple tv': 'https://tv.apple.com',
    'appletv+': 'https://tv.apple.com',
    'appletv': 'https://tv.apple.com',
    'lionsgate play': 'https://www.lionsgateplay.com',
    'lionsgateplay': 'https://www.lionsgateplay.com',
    'shemaroome': 'https://www.shemaroome.com',
    'shemaroo me': 'https://www.shemaroome.com',
    'eros now': 'https://erosnow.com',
    'erosnow': 'https://erosnow.com',
    'youtube': 'https://www.youtube.com',
    'youtube premium': 'https://www.youtube.com/premium',
    
    // Telugu Platforms
    'aha': 'https://www.aha.video',
    'aha gold': 'https://www.aha.video',
    'etv win': 'https://www.etvwin.com',
    'ibomma': 'https://www.ibomma.com',
    'neestream': 'https://www.neestream.com',
    'first shows': 'https://www.firstshows.com',
    'chitram tv ott': 'https://www.chitramtv.com',
    
    // Tamil Platforms
    'sun nxt': 'https://www.sunnxt.com',
    'sunnxt': 'https://www.sunnxt.com',
    'tentkotta': 'https://www.tentkotta.com',
    'simply south': 'https://www.simplysouth.tv',
    'raj digital plus': 'https://www.rajdigitalplus.com',
    'movie saints': 'https://www.moviesaints.com',
    
    // Kannada Platforms
    'vrott': 'https://www.vrott.com',
    'nammaflix': 'https://www.nammaflix.com',
    'gubbare': 'https://www.gubbare.com',
    'chauka': 'https://www.chauka.com',
    'cini kannada ott': 'https://www.cinikannada.com',
    
    // Malayalam Platforms
    'manorama max': 'https://www.manoramamax.com',
    'saina play': 'https://www.sainaplay.com',
    'c space': 'https://www.cspace.kerala.gov.in',
    'koode': 'https://www.koode.com',
    'highhope ott': 'https://www.highhope.in',
    'limelight ott': 'https://www.limelightott.com',
    
    // Bengali Platforms
    'hoichoi': 'https://www.hoichoi.tv',
    
    // Punjabi/Haryanvi Platforms
    'chaupal': 'https://www.chaupal.com',
    'stage': 'https://www.stageapp.co',
    
    // Marathi Platforms
    'planet marathi': 'https://www.planetmarathi.com',
    'planetmarathi': 'https://www.planetmarathi.com',
    
    // International Platforms
    'disney+': 'https://www.disneyplus.com',
    'disney plus': 'https://www.disneyplus.com',
    'disneyplus': 'https://www.disneyplus.com',
    'hbo max': 'https://www.max.com',
    'max': 'https://www.max.com',
    'hbo': 'https://www.max.com',
    'paramount+': 'https://www.paramountplus.com',
    'paramount plus': 'https://www.paramountplus.com',
    'paramountplus': 'https://www.paramountplus.com',
    'mubi': 'https://mubi.com',
    'google play movies': 'https://play.google.com/store/movies',
    'google play': 'https://play.google.com/store/movies',
    'hulu': 'https://www.hulu.com',
    'peacock': 'https://www.peacocktv.com',
    'peacock premium': 'https://www.peacocktv.com',
    'crunchyroll': 'https://www.crunchyroll.com',
    'funimation': 'https://www.funimation.com',
    'tubi': 'https://tubitv.com',
    'pluto tv': 'https://pluto.tv',
    'vudu': 'https://www.vudu.com',
    'fandango at home': 'https://www.vudu.com',
    'microsoft store': 'https://www.microsoft.com/store/movies-and-tv',
    'itunes': 'https://www.apple.com/itunes/',
    'apple itunes': 'https://www.apple.com/itunes/',
    'showtime': 'https://www.showtime.com',
    'starz': 'https://www.starz.com',
    'epix': 'https://www.mgmplus.com',
    'mgm+': 'https://www.mgmplus.com',
    'britbox': 'https://www.britbox.com',
    'acorn tv': 'https://acorn.tv',
    'curiosity stream': 'https://curiositystream.com'
  };
  
  const normalizedName = providerName?.toLowerCase().trim();
  
  // Direct match
  if (urlMappings[normalizedName]) {
    return urlMappings[normalizedName];
  }
  
  // Partial match - check if provider name contains any known platform
  for (const [key, url] of Object.entries(urlMappings)) {
    if (normalizedName?.includes(key) || key.includes(normalizedName || '')) {
      return url;
    }
  }
  
  return null;
};

// Get OTT platform info by name (for dynamic providers from TMDB)
export const getOTTPlatformByName = (providerName) => {
  const normalizedName = providerName?.toLowerCase().trim();
  
  // Find matching platform
  for (const [id, platform] of Object.entries(OTT_PLATFORMS)) {
    if (platform.name.toLowerCase() === normalizedName) {
      return { id: parseInt(id), ...platform };
    }
  }
  
  // Partial match
  for (const [id, platform] of Object.entries(OTT_PLATFORMS)) {
    if (platform.name.toLowerCase().includes(normalizedName) || 
        normalizedName?.includes(platform.name.toLowerCase())) {
      return { id: parseInt(id), ...platform };
    }
  }
  
  return null;
};

// Get platforms by category
export const getOTTPlatformsByCategory = (category) => {
  return Object.entries(OTT_PLATFORMS)
    .filter(([_, platform]) => platform.category === category)
    .map(([id, platform]) => ({ id: parseInt(id), ...platform }));
};

// Get all platform categories
export const OTT_CATEGORIES = {
  major: 'Major Platforms',
  telugu: 'Telugu',
  tamil: 'Tamil',
  kannada: 'Kannada',
  malayalam: 'Malayalam',
  bengali: 'Bengali',
  punjabi: 'Punjabi/Haryanvi',
  marathi: 'Marathi'
};

export const MOVIE_CATEGORIES = {
  trending: 'Trending Movies',
  popular: 'Popular Movies',
  topRated: 'Top Rated Movies',
  upcoming: 'Upcoming Movies'
};

export const ROUTES = {
  home: '/',
  trending: '/trending',
  popular: '/popular',
  topRated: '/top-rated',
  upcoming: '/upcoming',
  movies: '/movies',
  search: '/search',
  movieDetail: (id, title) => `/movie/${id}/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
};
