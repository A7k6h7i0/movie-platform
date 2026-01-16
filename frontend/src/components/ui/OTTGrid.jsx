import { useState, useEffect, useCallback } from 'react';
import { motion, Reorder } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import { OTT_PLATFORMS, DEFAULT_OTT_ORDER, getOTTPlatformUrl } from '../../utils/constants';

const OTT_ORDER_STORAGE_KEY = 'ott_platform_order';

const OTTGrid = ({ title = 'Streaming Platforms', showEditButton = true }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [platformOrder, setPlatformOrder] = useState([]);
  const [originalOrder, setOriginalOrder] = useState([]);

  // Load saved order from localStorage or use default
  useEffect(() => {
    const savedOrder = localStorage.getItem(OTT_ORDER_STORAGE_KEY);
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder).map(Number);
        // Validate that all IDs exist in OTT_PLATFORMS
        const validOrder = parsed.filter(id => OTT_PLATFORMS[id]);
        // Add any new platforms that weren't in saved order
        const allIds = Object.keys(OTT_PLATFORMS).map(Number);
        const missingIds = allIds.filter(id => !validOrder.includes(id));
        setPlatformOrder([...validOrder, ...missingIds]);
      } catch {
        setPlatformOrder(DEFAULT_OTT_ORDER);
      }
    } else {
      // Use all platforms if no saved order
      const allIds = Object.keys(OTT_PLATFORMS).map(Number);
      setPlatformOrder(allIds);
    }
  }, []);

  // Save order to localStorage
  const saveOrder = useCallback((order) => {
    localStorage.setItem(OTT_ORDER_STORAGE_KEY, JSON.stringify(order));
  }, []);

  // Handle entering edit mode
  const handleEditClick = () => {
    setOriginalOrder([...platformOrder]);
    setIsEditMode(true);
  };

  // Handle saving changes
  const handleSaveClick = () => {
    saveOrder(platformOrder);
    setIsEditMode(false);
  };

  // Handle canceling changes
  const handleCancelClick = () => {
    setPlatformOrder(originalOrder);
    setIsEditMode(false);
  };

  // Handle reorder
  const handleReorder = (newOrder) => {
  setPlatformOrder(newOrder.map(Number));
};


  // Handle platform click
  const handlePlatformClick = (platformId) => {
    if (isEditMode) return; // Don't navigate in edit mode
    
    const platform = OTT_PLATFORMS[platformId];
    const url = getOTTPlatformUrl(platformId, platform?.name);
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const IMAGE_PROXY = 'https://images.weserv.nl/?url=';

  return (
    <div className="w-full">
      {/* Header with title and edit button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {showEditButton && (
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveClick}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                >
                  <FiCheck size={16} />
                  <span>Save</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancelClick}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
                >
                  <FiX size={16} />
                  <span>Cancel</span>
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditClick}
                className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
              >
                <FiEdit2 size={16} />
                <span>Edit</span>
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Edit mode instruction */}
      {isEditMode && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 text-sm mb-4"
        >
          Drag and drop to reorder your favorite platforms
        </motion.p>
      )}

      {/* OTT Grid */}
      {isEditMode ? (
        <Reorder.Group
          axis="x"
          values={platformOrder.map(Number)}
          onReorder={handleReorder}
          className="flex gap-3 overflow-x-auto pb-2"
        >
          {platformOrder.map((platformId) => {
            const platform = OTT_PLATFORMS[platformId];
            if (!platform) return null;

            const logoUrl = platform.logoUrl
              ? `${IMAGE_PROXY}${encodeURIComponent(platform.logoUrl)}`
              : null;

            return (
              <Reorder.Item
                key={platformId}
                value={platformId}
                className="cursor-grab active:cursor-grabbing flex-shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: platform.color }}
                >
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={platform.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center ${logoUrl ? 'hidden' : 'flex'}`}
                    style={{ backgroundColor: platform.color }}
                  >
                    <span className="text-3xl">{platform.logo}</span>
                    <span className="text-white text-[10px] font-medium mt-1 px-1 text-center line-clamp-1">
                      {platform.name.split(' ')[0]}
                    </span>
                  </div>
                  {/* Drag indicator */}
                  <div className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">⋮⋮</span>
                  </div>
                </motion.div>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {platformOrder.map((platformId) => {
            const platform = OTT_PLATFORMS[platformId];
            if (!platform) return null;

            const logoUrl = platform.logoUrl
              ? `${IMAGE_PROXY}${encodeURIComponent(platform.logoUrl)}`
              : null;

            return (
              <motion.div
                key={platformId}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlatformClick(platformId)}
                className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow flex-shrink-0"
                style={{ backgroundColor: platform.color }}
                title={`Watch on ${platform.name}`}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={platform.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center ${logoUrl ? 'hidden' : 'flex'}`}
                  style={{ backgroundColor: platform.color }}
                >
                  <span className="text-3xl sm:text-4xl">{platform.logo}</span>
                  <span className="text-white text-[10px] sm:text-xs font-semibold mt-1 px-1 text-center line-clamp-1 drop-shadow-md">
                    {platform.name.length > 10 ? platform.name.split(' ')[0] : platform.name}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <span className="text-white text-xs font-medium bg-black/60 px-2 py-1 rounded">
                    Open
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

OTTGrid.propTypes = {
  title: PropTypes.string,
  showEditButton: PropTypes.bool,
};

export default OTTGrid;
