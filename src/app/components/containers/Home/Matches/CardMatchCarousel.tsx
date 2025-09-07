'use client';

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CardMatch, { CardMatchProps } from './CardMatch';

const CardMatchCarousel = ({ matches }: { matches: CardMatchProps[] }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Calculate items visible based on screen size
  const itemsVisible = isXs ? 1 : isSm ? 2 : 3;
  const totalItems = matches.length;

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || totalItems <= itemsVisible) return;
    
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex >= totalItems - itemsVisible ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(timer);
  }, [autoPlay, totalItems, itemsVisible]);

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex >= totalItems - itemsVisible ? 0 : prevIndex + 1
    );
    setAutoPlay(false);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? totalItems - itemsVisible : prevIndex - 1
    );
    setAutoPlay(false);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoPlay(false);
  };

  // Handle touch events for swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNext();
    } else if (touchEnd - touchStart > 50) {
      // Swipe right
      handlePrev();
    }
  };

  // Don't show carousel if there are no matches or not enough to scroll
  if (matches.length === 0) {
    return <Box sx={{ py: 4, textAlign: 'center' }}>No matches available</Box>;
  }

  if (matches.length <= itemsVisible) {
    return (
      <Box sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: 'repeat(1, 1fr)', 
              sm: 'repeat(2, 1fr)', 
              md: 'repeat(3, 1fr)' 
            },
            gap: 3,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {matches.map((match) => (
            <Box key={match.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMatch match={match} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        py: 4,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container */}
      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transform: `translateX(-${activeIndex * (100 / itemsVisible)}%)`,
          willChange: 'transform',
        }}
      >
        {matches.map((match, index) => (
          <Box
            key={match.id}
            sx={{
              flex: `0 0 ${100 / itemsVisible}%`,
              minWidth: 0, // Prevents flexbox overflow issues
              px: 1.5,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CardMatch match={match} />
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows - Only show if there are more items than visible */}
      {totalItems > itemsVisible && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: 3,
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'white',
              },
              display: { xs: 'none', sm: 'flex' },
            }}
            size="large"
          >
            <KeyboardArrowLeft />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: 3,
              zIndex: 2,
              '&:hover': {
                backgroundColor: 'white',
              },
              display: { xs: 'none', sm: 'flex' },
            }}
            size="large"
          >
            <KeyboardArrowRight />
          </IconButton>
        </>
      )}

      {/* Dots Indicator - Only show if there are more items than visible */}
      {totalItems > itemsVisible && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            gap: 1,
          }}
        >
          {Array.from({ length: totalItems - itemsVisible + 1 }).map((_, index) => (
            <Button
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                minWidth: 12,
                width: 12,
                height: 12,
                borderRadius: '50%',
                padding: 0,
                backgroundColor: activeIndex === index ? 'primary.main' : 'grey.400',
                '&:hover': {
                  backgroundColor: activeIndex === index ? 'primary.dark' : 'grey.500',
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Mobile swipe instructions */}
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          textAlign: 'center',
          mt: 2,
          color: 'text.secondary',
          fontSize: '0.875rem',
        }}
      >
        Swipe to navigate
      </Box>
    </Box>
  );
};

export default CardMatchCarousel;