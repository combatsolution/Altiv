import React, { useState, useEffect } from 'react';
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
import axiosInstance from 'src/utils/axios'; // ✅ Import axios instance
import { trackEvent } from 'src/utils/google-analytics';

function TestimonialSection() {
  const [blogs, setBlogs] = useState([]);
  const [index, setIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const visibleBlogs = blogs.slice(0, 3);

  const fallbackImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600',  // tech circuit board
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600',  // coding / laptop screen
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600',  // developer working
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&w=800&h=600',  // same-theme alternate
  ];

  const getRandomImage = () =>
    fallbackImages[Math.floor(Math.random() * fallbackImages.length)];

  // ✅ Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/blogs');
        if (res.data?.blogs) {
          setBlogs(res.data.blogs);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  const t = blogs[index] || {};

  // desktop carousel refs
  const rightCarousel = useCarousel({
    autoplay: false,
    slidesToShow: 2,
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
      const newIndex = (prev + 1) % visibleBlogs.length;
      goToIndex(thumbCarousel.carouselRef, newIndex);
      goToIndex(rightCarousel.carouselRef, newIndex);
      trackEvent({
        category: 'Testimonial Carousel',
        action: 'Next Button Click',
        label: `Next Button Click`,
        value: 10,
      });

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
            fontSize: { xs: "44px", md: 54 },
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
        <Carousel dots={false} arrows={false} autoplay autoplaySpeed={2000} slidesToShow={1}>
          {visibleBlogs.map((item, i) => (
            <Box sx={{ px: 1 }} key={i}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  bgcolor: '#fff',
                  mx: 0,
                  minHeight: 420,
                }}
              >
                {/* Cover Image */}
                <Box
                  component="img"
                  // src={item.coverUrl}
                  src={getRandomImage() || item.coverUrl}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />

                {/* Title */}
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 600,
                    fontFamily: 'Roboto, sans-serif',
                    mb: 1,
                  }}
                >
                  {item.title}
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
                    src={getRandomImage() || t.coverUrl}
                    alt={t.name}
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: 15,
                      ml:2,
                    
                    }}
                  />
                  <Grid sx={{ display: 'flex', flexDirection: 'column' }} >
                    {/* Name + Title */}
                    <Typography
                      sx={{ fontSize:'14px', width: '200px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
                    >
                      {item.tags}
                    </Typography>

                    {/* Date */}
                    <Typography
                      sx={{
                        width: '150px',
                        fontSize: 14,
                        color: 'text.secondary',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </Typography>
                  </Grid>
                </Grid>


                {/* Description */}
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: 'Roboto, sans-serif',
                    color: '#000000',
                    mb: 2,
                  }}
                >
                  {item.description}
                </Typography>

                <Box mt={2}>
                  <Link
                    href={`/post/${t.slug}`}
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
            </Box>
          ))}
        </Carousel>
      ) : (
        /* Desktop Grid Layout */
        blogs.length > 0 && (
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
                // src={t.coverUrl}
                src={getRandomImage() || t.coverUrl}
                alt="Main"
                sx={{
                  width: 'auto',
                  maxWidth: 250,
                  height: { xs: 200, md: 400 },
                  objectFit: 'cover',
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
                  {t.title}
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
                  {t.description}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    color: 'black',
                    fontFamily: 'Roboto, sans-serif',
                  }}
                >
                  {new Date(t.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Typography>

                <Box mt={2}>
                  <Link
                    href={`/post/${t.slug}`}
                    underline="hover"
                    sx={{
                      fontSize: 14,
                      fontFamily: 'Roboto, sans-serif',
                      color: 'black',
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}

                    onClick={() =>
                      trackEvent({
                        category: 'Blog Interaction',
                        action: 'Read More Click',
                        label: 'ReadMore button Clicked',
                        value: 9,
                      })
                    }
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
                {visibleBlogs.map((item, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={getRandomImage() || item.coverUrl}
                    alt={`Blog ${i + 1}`}
                    onClick={() => {
                      setIndex(i);
                      goToIndex(thumbCarousel.carouselRef, i);
                      goToIndex(rightCarousel.carouselRef, i);  
                      trackEvent({  
                        category: 'Testimonial Carousel',
                        action: 'Thumbnail Click',
                        label: visibleBlogs[i]?.title || 'Unknown',
                        value: 11,
                      });

                    }}
                    sx={{ width: 'auto', height: 400, pl: 0.5, cursor: 'pointer', objectFit: 'fit' }}
                  />
                ))}
              </Carousel>
            </Grid>
          </Grid>
        )
      )}

      {/* Pagination (desktop only) */}
      {!isMobile && visibleBlogs.length > 0 && (
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
            {index + 1}/{visibleBlogs.length} Articles
          </Typography>
          <Button
            onClick={handleNext}
            variant="text"
            sx={{ textTransform: 'none', ml: '-10px' }}
          >
            Next →
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default TestimonialSection;
