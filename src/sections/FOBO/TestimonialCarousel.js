import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Card, CardContent, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { m } from 'framer-motion';
import avt1 from 'src/Fogoimages/Aisha.webp';
import avt2 from 'src/Fogoimages/David.webp';
import avt3 from 'src/Fogoimages/Jennifer.webp';
import { Grid } from 'lucide-react';

const MotionTypography = m(Typography);

const testimonials = [
  {
    name: 'Aisha K.',
    content:
      'Great for seeing beyond technical skills. Helped me understand how to position myself as an AI translator between tech and business teams. Game-changing for my career growth.',
    rating: 5,
    icon: avt1,
    designation: 'Lead Data Scientist',
  },
  {
    name: 'David R.',
    content:
      "I was skeptical about AI tools, but this gave me concrete insights about my career's AI readiness. It's like having a career insurance policy in uncertain times.",
    rating: 5,
    icon: avt2,
    designation: 'Marketing Director',
  },
  {
    name: 'Jennifer L.',
    content:
      "The FOBO Score was eye-opening. Instead of getting caught up in AI anxiety, I finally have a clear picture of where I stand. Now I'm using AI to enhance my creative process rather than competing with it. Game changer.",
    rating: 5,
    icon: avt3,
    designation: 'Product Designer',
  },
];

function StarRating({ count }) {
  return (
    <Typography variant="body2" sx={{ color: 'gold' }}>
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </Typography>
  );
}
StarRating.propTypes = {
  count: PropTypes.number.isRequired,
};

function TestimonialCard({ testimonial, isWhite }) {
  return (
    <Card
      sx={{
        width: { xs: '340px', sm: 300, md: 360, lg: 400 },
        minWidth: { xs: '90%', sm: 290 },
        height: { xs: 'auto', sm: 390 },
        bgcolor: isWhite ? '#fff' : '#4F9CF9',
        color: isWhite ? '#000' : '#fff',
        boxShadow: isWhite ? 6 : 3,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        mx: { xs: 2 },
        transition: 'all 0.3s',
        flexShrink: 0,
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 3, sm: 4 },
          gap: 3,
          alignItems: 'center',
        }}
      >
        <Avatar src={testimonial.icon} sx={{ width: 90, height: 90 }} />
        <Typography
          variant="body2"
          sx={{
            textAlign: 'left',
            fontSize: { xs: 14, sm: 16 },
            lineHeight: { xs: '22px', sm: '26px' },
            color: isWhite ? '#000' : '#fff',
            width: '100%',
          }}
        >
          “{testimonial.content}”
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            mt: 'auto',
            width: { xs: '350px', md: '350px' },
            gap: { xs: 1, sm: 14 },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 16, sm: 18 },
              lineHeight: '28px',
              color: isWhite ? '#000' : '#fff',
              // width:{xs:'100px', md:'250px'}
            }}
          >
            {testimonial.name}
            <br />
            {testimonial.designation}
          </Typography>
          <StarRating count={testimonial.rating} />
        </Box>
      </CardContent>
    </Card>
  );
}
TestimonialCard.propTypes = {
  testimonial: PropTypes.object.isRequired,
  isWhite: PropTypes.bool,
};

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const intervalDuration = 3000;

  const handleScroll = () => {
    if (!scrollRef.current || !isMobile) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.firstChild?.offsetWidth || 1;
    const newIndex = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(newIndex);
  };

  const handleDotClick = (idx) => {
    setAutoPlay(false);
    setCurrentIndex(idx);
    if (isMobile && scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 0;
      scrollRef.current.scrollTo({ left: idx * cardWidth, behavior: 'smooth' });
    }
    setTimeout(() => setAutoPlay(true), intervalDuration * 2);
  };

  useEffect(() => {
    if (isMobile) return undefined;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, intervalDuration);
    return () => clearInterval(interval);
  }, [autoPlay, isMobile]);

  const displayedTestimonials = isMobile
    ? testimonials.map((t, i) => ({ ...t, isWhite: i === currentIndex }))
    : [
        { ...testimonials[currentIndex], isWhite: true },
        { ...testimonials[(currentIndex + 1) % testimonials.length], isWhite: false },
        { ...testimonials[(currentIndex + 2) % testimonials.length], isWhite: false },
      ];

  return (
    <Box py={6} textAlign="center">
      <MotionTypography
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        component="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '24px', sm: '32px', md: '36px' },
          color: '#212529',
        }}
      >
        Where Are They Now?
      </MotionTypography>
      <Box sx={{ position: 'relative', textAlign: 'center', mt: 2 }}>
        <MotionTypography
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: 4 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '32px', sm: '48px', md: '64px' },
            color: '#212529',
            lineHeight: 1.2,
            maxWidth: { xs: '264px', sm: '100%' },
            mx: 'auto',
          }}
        >
          Real People, Real Progress
        </MotionTypography>

        <Box
          component={m.img}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          src="/assets/images/impact.svg"
          alt="impact"
          sx={{
            position: 'absolute',
            width: { xs: 150, sm: 200, md: 250 },
            right: { xs: 10, sm: 60, md: 210 },
            top: { xs: 0, sm: 10, md: 50 },
            zIndex: -1,
          }}
        />
      </Box>

      <Box
        ref={scrollRef}
        onScroll={handleScroll}
        sx={{
          display: 'flex',
          justifyContent: { xs: 'flex-start', sm: 'center' },
          alignItems: 'stretch',
          gap: 3,
          mt: 6,
          overflowX: isMobile ? 'auto' : 'visible',
          scrollSnapType: isMobile ? 'x mandatory' : 'none',
          WebkitOverflowScrolling: 'touch',
          px: { xs: 2, sm: 0 },
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}
      >
        {displayedTestimonials.map((t, idx) => (
          <Box
            key={idx}
            sx={{
              scrollSnapAlign: isMobile ? 'start' : 'none',
              flexShrink: 0,
            }}
          >
            <TestimonialCard testimonial={t} isWhite={t.isWhite} />
          </Box>
        ))}
      </Box>

      <Box mt={4} display="flex" justifyContent="center" gap={1}>
        {testimonials.map((_, idx) => (
          <Box
            key={idx}
            onClick={() => handleDotClick(idx)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: idx === currentIndex ? '#1E3A8A' : '#4F9CF9',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
