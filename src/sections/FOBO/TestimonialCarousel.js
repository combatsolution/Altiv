import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// --- avatar imports, adjust paths as needed ---
import avt1 from 'src/Fogoimages/Avater01.png';
import avt2 from 'src/Fogoimages/Avater02.png';
import avt3 from 'src/Fogoimages/Avater03.png';
import { display, margin } from '@mui/system';

const testimonials = [
  {
    name: 'Zach',
    content:
      "Zach felt stuck reviewing 50+ UX jobs. He used Altiv’s Clarity Compass, picked his top 5, and applied. 3 interviews later, he accepted his dream Product Designer role!",
    rating: 5,
    icon: avt1,
    company: "xxxxxxxxxx",
  },
  {
    name: 'Raj',
    content:
      "After weeks of saving jobs and applying to none, Raj used Altiv’s Decision Confidence Score. He shortlisted 4 companies and finally hit submit. Within a month, he landed a UX Researcher role at a top tech startup!",
    rating: 5,
    icon: avt2,
    company: "xxxxxxxxxx",
  },
  {
    name: 'Ethan',
    content:
      "Ethan delayed applying for months, waiting for the ‘perfect’ job. With Altiv’s Better Option Tracker, he focused on roles that matched his values. Two interviews later, he’s now a Lead UI Designer at a growing SaaS company.",
    rating: 5,
    icon: avt3,
    company: "xxxxxxxxxx",
  }
];

function StarRating({ count = 5 }) {
  return (
    <Typography variant="body2" sx={{ color: 'gold' }}>
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </Typography>
  );
}
StarRating.propTypes = {
  count: PropTypes.number,
};

function TestimonialCard({ testimonial, isHighlighted }) {
  return (

    <Card
      sx={{
        width: '437.67px',
        height: '510px',
        mt: '30px',
        backgroundColor: isHighlighted ? '#fff' : '#4F9CF9',
        color: isHighlighted ? '#000' : '#fff',
        boxShadow: isHighlighted ? 6 : 3,
        borderRadius: '10px',
      }}
    >
      <CardContent
        sx={{
          pt: '60px',
          pr: '40px',
          pb: '60px',
          pl: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          width: '437.67px',      // Set fixed width
          minHeight: '510px',     // Let content hug but not shrink below 510px
          alignItems: 'flex-start',
        }}
      >
        <Avatar
          src={testimonial.icon}
          sx={{ width: '70px', height: '70px' }}
        />

        <Typography
          variant="body2"
          sx={{
            textAlign: 'left',
            width: '100%',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '30px',
            letterSpacing: '-0.02em',
            color: 'text.primary',
          }}
        >
          “{testimonial.content}”
        </Typography>


        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%', // Key: ensures spacing between name and rating
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '30px',
              letterSpacing: '-0.02em', // assuming you meant -2%
              textAlign: 'left',
            }}
          >
            {testimonial.name}
            <br />
            {testimonial.company}
          </Typography>

          <Box>
            <StarRating count={testimonial.rating} />
          </Box>
        </Box>
      </CardContent>
    </Card>


  );
}
TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.string,
    rating: PropTypes.number,
    icon: PropTypes.string,
    company: PropTypes.number,
  }).isRequired,
  isHighlighted: PropTypes.bool,
};

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePrev = () =>
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const handleNext = () =>
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const itemsToShow = isMobile
    ? [testimonials[index]]
    : [
      testimonials[(index + testimonials.length - 1) % testimonials.length],
      testimonials[index],
      testimonials[(index + 1) % testimonials.length],
    ];

  return (
    <Box py={6} textAlign="center">
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '36px',
          lineHeight: 1,
          letterSpacing: '-2%',
          color: '#212529',
        }}
      >
        Where Are They Now?
      </Typography>
      <Typography
        component="h1"
        sx={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '72px',
          lineHeight: 1,
          letterSpacing: '-2%',
          color: '#212529',
        }}
      >
        Real People, Real Progress
      </Typography>

      <Box display="flex" justifyContent="center" gap={3} mt={4} flexWrap={isMobile ? 'wrap' : 'nowrap'}>
        {itemsToShow.map((t, idx) => (
          <TestimonialCard
            key={idx}
            testimonial={t}
            isHighlighted={!isMobile && idx === 1}
          />
        ))}
      </Box>

      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <IconButton onClick={handlePrev} sx={{ border: '1px solid #ccc' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={handleNext} sx={{ border: '1px solid #ccc' }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
