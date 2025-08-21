
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Carousel, { useCarousel } from 'src/components/carousel';

import mainImage from 'src/images/testimonial-main.png';
import person1 from 'src/images/person1.png';
import person2 from 'src/images/person2.png';
import person3 from 'src/images/person3.png';

const testimonials = [
  {
    image: mainImage,
    quote: 'How AI and Data science is going to lead the world market.',
    content:
      'It is a long established fact that data is going to be the decisive factor for all organizations and AI is going to help get the accurate data at right time.',
    name: 'James Olson',
    title: 'Product Designer',
  },
  {
    image: person1,
    quote: 'AI is transforming the creative process across industries.',
    content:
      "Creative roles now blend artistic vision with technical fluency. AI is not replacing designers, it's augmenting their abilities.",
    name: 'Lena Ray',
    title: 'UX Strategist',
  },
  {
    image: person2,
    quote: 'Data is no longer an asset—it’s the fuel.',
    content:
      'Modern businesses are driven by data-backed decision-making, and AI helps harness that at scale and speed.',
    name: 'Carlos Green',
    title: 'AI Engineer',
  },
  {
    image: person3,
    quote: 'Upskilling is no longer optional in the AI era.',
    content:
      'The speed at which tech evolves means continual learning is crucial for staying ahead of the curve.',
    name: 'Ava Brooks',
    title: 'Tech Educator',
  },
];

function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // desktop carousel refs
  const rightCarousel = useCarousel({
    autoplay: false,
    slidesToShow: 3,
  });

  const thumbCarousel = useCarousel({
    autoplay: false,
    slidesToShow: 1,
    arrows: false,
    dots: false,
    infinite: true,
  });

  const goToIndex = (ref, i) => {
    const inst = ref?.current;
    if (inst && typeof inst.slickGoTo === 'function') {
      inst.slickGoTo(i);
    }
  };

  const handleNext = () => {
    setIndex((prev) => {
      const newIndex = (prev + 1) % testimonials.length;
      goToIndex(thumbCarousel.carouselRef, newIndex);
      goToIndex(rightCarousel.carouselRef, newIndex);
      return newIndex;
    });
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 6, md: 10 }, bgcolor: '#fff' }}>
      {/* Title */}
      <Box textAlign="center" mb={3}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: 28, md: 54 },
            textAlign: { xs: 'left', md: 'center' },
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            lineHeight: '124%',
          }}
        >
          Career Navigation: Expert Takes
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 16, md: 34 },
            color: 'text.secondary',
            fontFamily: 'Roboto, sans-serif',
            lineHeight: '160%',
            textAlign: { xs: 'left', md: 'center' },
          }}
        >
          Curated insights from industry leaders in the AI era.
        </Typography>
      </Box>

      {/* Mobile Carousel View */}
      {isMobile ? (
        <Carousel
          dots={false}
          arrows={false}
          autoplay
          autoplaySpeed={2000}
          slidesToShow={1}  
          
        >
          {testimonials.map((item, i) => (
            <Box sx={{px:1}}
              key={i}>
              <Box
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: '#fff',
                mx:0,
                minHeight: 420,
                 
              }}
            >
              {/* Image */}
              <Box
                component="img"
                  src={`https://picsum.photos/seed/${item.name}/400/200`}
                alt={item.name}

                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'contain',
                  borderRadius: 2,
                  mb: 2,
                }}
              />

              {/* Quote */}
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: 'Roboto, sans-serif',
                  mb: 1,
                }}
              >
                {item.quote}
              </Typography>

              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  width: '100px',
                  height: '100px',
                  mx: 8,



                }}
              >
                <Box
                  component="img"
                  // src={item.image || `https://picsum.photos/seed/${item.name}/400/200`}
                  src={`https://picsum.photos/seed/${item.name}/400/200`}
                  alt={item.name}
                  sx={{
                    width: "60px",
                    height: "60px",

                    borderRadius: 15,
                    m: 3,
                  }}
                />
                <Grid sx={{ display: 'flex', flexDirection: 'column' }} >
                  {/* Name + Title */}
                  <Typography
                    sx={{ width: '150px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      width: '150px',
                      fontSize: 14,
                      color: 'text.secondary',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {new Date(
                      Date.now() - Math.floor(Math.random() * 10000000000) // random past date
                    ).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Typography>
                </Grid>
              </Grid>

              {/* Content */}
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  fontFamily: 'Roboto, sans-serif',
                  color: '#000000',
                  mb: 2,
                }}
              >
                {item.content}
              </Typography>
            </Box>
            </Box>
          ))
          }
        </Carousel >
      ) : (
        /* Desktop Grid Layout */
        <Grid 
          container
          spacing={0}
          sx={{
            maxWidth: '1200px',
            margin: '0 auto',
            boxShadow: 3,
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          {/* Left image */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box
              component="img"
              src={t.image}
              alt="Main"
              sx={{
                width: 'auto',
                maxWidth: 250,
                height: { xs: 200, md: 400 },
                objectFit: 'contain',
              }}
            />
          </Grid>

          {/* Main content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              <Typography
                sx={{
                  fontSize: { xs: 18, md: 20 },
                  fontWeight: 600,
                  fontFamily: 'Roboto, sans-serif',
                  mb: 2,
                }}
              >
                {t.quote}
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 400,
                  fontFamily: 'Roboto, sans-serif',
                  mb: 4,
                }}
              >
                {t.content}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {t.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: 14,
                  color: 'black',
                  fontFamily: 'Roboto, sans-serif',
                }}
              >
                {t.title}
              </Typography>

              <Box mt={2}>
                <Link
                  underline="hover"
                  sx={{
                    fontSize: 14,
                    fontFamily: 'Roboto, sans-serif',
                    color: 'black',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  Read more{' '}
                  <Box component="span" ml={1}>
                    →
                  </Box>
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Right thumbnails */}
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Carousel ref={rightCarousel.carouselRef} {...rightCarousel.carouselSettings}>
              {testimonials.map((item, i) => (
                <Box
                  key={i}
                  component="img"
                  src={item.image}
                  alt={`Person ${i + 1}`}
                  onClick={() => {
                    setIndex(i);
                    goToIndex(thumbCarousel.carouselRef, i);
                    goToIndex(rightCarousel.carouselRef, i);
                  }}
                  sx={{ width: 'auto', height: 393, cursor: 'pointer' }}
                />
              ))}
            </Carousel>
          </Grid>
        </Grid>
      )}

      {/* Pagination (desktop only) */}
      {
        !isMobile && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mt={4}
            maxWidth="600px"
            mx="auto"
            px={2}
            fontFamily="Roboto, sans-serif"
          >
            <Typography variant="body2" color="text.secondary">
              {index + 1}/{testimonials.length} Articles
            </Typography>
            <Button
              onClick={handleNext}
              variant="text"
              sx={{ textTransform: 'none', ml: '-10px' }}
            >
              Next →
            </Button>
          </Stack>
        )
      }
    </Box >
  );
}

export default TestimonialSection;
