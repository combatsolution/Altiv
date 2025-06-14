import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Avatar images
import avt1 from 'src/Fogoimages/Aisha.png';
import avt2 from 'src/Fogoimages/David.png';
import avt3 from 'src/Fogoimages/Jennifer.png';

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
        width: { xs: '90%', sm: 300, md: '425px' },
        height: { xs: 'auto', sm: 450 },
        bgcolor: isWhite ? '#fff' : '#4F9CF9',
        color: isWhite ? '#000' : '#fff',
        boxShadow: isWhite ? 6 : 3,
        borderRadius: 0,
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        transition: 'all 0.3s',
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 3, sm: 5 },
          gap: 3,
          alignItems: 'center',
        }}
      >
        <Avatar src={testimonial.icon} sx={{ width: 70, height: 70 }} />

        <Typography
          variant="body2"
          sx={{
            textAlign: 'left',
            fontSize: { xs: 16, sm: 18 },
            lineHeight: '28px',
            color: isWhite ? '#000' : '#fff',
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
            alignItems: 'flex-start',
            mt: 'auto',
            gap: { xs: 1, sm: 14 },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: 16, sm: 18 },
              lineHeight: '28px',
              textAlign: 'left',
              color: isWhite ? '#000' : '#fff',
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const intervalDuration = 5000;

  const handleDotClick = (idx) => {
    setAutoPlay(false);
    setCurrentIndex(idx);
    setTimeout(() => setAutoPlay(true), intervalDuration * 2);
  };

  useEffect(() => {
  let interval;
  if (autoPlay) {
    interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 2));
    }, intervalDuration);
  }
  return () => clearInterval(interval);
}, [autoPlay]);

  const displayedTestimonials = isMobile
    ? [{ ...testimonials[currentIndex], isWhite: true }]
    : [
        { ...testimonials[currentIndex], isWhite: true },
        {
          ...testimonials[(currentIndex + 1) % testimonials.length],
          isWhite: false,
        },
        {
          ...testimonials[(currentIndex + 2) % testimonials.length],
          isWhite: false,
        },
      ];

  return (
    <Box py={6} textAlign="center">
      <Typography
        component="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '24px', sm: '32px', md: '36px' },
          color: '#212529',
        }}
      >
        Where Are They Now?
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '40px', sm: '60px', md: '72px' },
            color: '#212529',
            lineHeight: '100%',
          }}
        >
          Real People, Real Progress
        </Typography>
        <Box
          component="img"
          src="/assets/images/impact.svg"
          alt="impact"
          sx={{
            position: 'absolute',
            width: { xs: 150, sm: 200, md: 250 },
            top: { xs: '70px', sm: '80px', lg: 65 },
            right: { xs: 70, sm: 60, md: 180 },
            zIndex: -1,
          }}
        />
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={3}
        mt={4}
        flexWrap={isMobile ? 'wrap' : 'nowrap'}
        position="relative"
      >
        {displayedTestimonials.map((t, idx) => (
          <TestimonialCard
            key={idx}
            testimonial={t}
            isWhite={t.isWhite}
          />
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
