import { useState, useEffect, useRef } from 'react';
import { Reorder, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  OTT_PLATFORMS,
  DEFAULT_OTT_ORDER,
  getOTTPlatformUrl
} from '../../utils/constants';

const STORAGE_KEY = 'ott_platform_order';
const LONG_PRESS_MS = 500;

const OTTGrid = ({ title = 'Streaming Platforms' }) => {
  const [order, setOrder] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const pressTimer = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setOrder(JSON.parse(saved));
    else setOrder(DEFAULT_OTT_ORDER);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setEditMode(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, []);

  const saveOrder = (o) => {
    setOrder(o);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
    setEditMode(false);
  };

  const handlePressStart = () => {
    pressTimer.current = setTimeout(() => {
      setEditMode(true);
    }, LONG_PRESS_MS);
  };

  const handlePressEnd = () => {
    clearTimeout(pressTimer.current);
  };

  const handleClick = (id) => {
    if (editMode) return;
    const url = getOTTPlatformUrl(id, OTT_PLATFORMS[id]?.name);
    if (url) window.open(url, '_blank');
  };

  return (
    <section ref={containerRef} className="w-full">
      <h2 className="text-xl font-bold text-white mb-8">{title}</h2>

      <Reorder.Group
  axis="x"
  values={order}
  onReorder={saveOrder}
  className="
    flex gap-3
    overflow-x-auto
    pb-6 pt-4
    scrollbar-hide
    relative
  "
>

        {order.map((id) => {
          const p = OTT_PLATFORMS[id];
          if (!p) return null;

          return (
            <Reorder.Item
              key={id}
              value={id}
              drag={editMode}
              className="flex-shrink-0"
            >
           <motion.div
  onMouseDown={handlePressStart}
  onMouseUp={handlePressEnd}
  onMouseLeave={handlePressEnd}
  onTouchStart={handlePressStart}
  onTouchEnd={handlePressEnd}
  onClick={() => handleClick(id)}
  whileHover={
    !editMode
      ? {
          scale: 1.12,
          boxShadow: '0 0 0 2px rgba(255,255,255,0.35), 0 8px 24px rgba(0,0,0,0.6)'
        }
      : {}
  }
  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
  className={`
    relative
    flex-shrink-0
    w-[56px] h-[56px]
    flex items-center justify-center
    rounded-md
    cursor-pointer
    ${editMode ? 'ring-2 ring-blue-400' : ''}
  `}
>

                {/* OTT LOGO */}
               {p.logoUrl ? (
  <img
    src={p.logoUrl}
    alt={p.name}
    className="
      w-full h-full
      object-contain
      select-none
    "
    loading="lazy"
    draggable={false}
  />
) : (
  <span className="text-white text-xs font-medium">
    {p.name}
  </span>
)}


                {/* EDIT MODE ARROWS */}
                {editMode && (
                  <>
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-black/70 p-1 rounded-full">
                      <FiChevronLeft size={14} />
                    </div>
                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-black/70 p-1 rounded-full">
                      <FiChevronRight size={14} />
                    </div>
                  </>
                )}
              </motion.div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </section>
  );
};

OTTGrid.propTypes = {
  title: PropTypes.string
};

export default OTTGrid;
