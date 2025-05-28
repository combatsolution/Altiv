import React, { useState } from "react";
import { Box, Typography, Grid, Button, Stack, Link } from "@mui/material";
import mainImage from "src/images/testimonial-main.png";
import person1 from "src/images/person1.png";
import person2 from "src/images/person2.png";
import person3 from "src/images/person3.png";
import Carousel, { CarouselArrowIndex, useCarousel } from 'src/components/carousel';

const testimonials = [
  {
    image: mainImage,
    quote: "How AI and Data science is going to lead the world market.",
    content:
      "It is a long established fact that data is going to be the decisive factor for all organizations and AI is going to help get the accurate data at right time.",
    name: "James Olson",
    title: "Product Designer",
  },
  {
    image: person1,
    quote: "AI is transforming the creative process across industries.",
    content:
      "Creative roles now blend artistic vision with technical fluency. AI is not replacing designers, it's augmenting their abilities.",
    name: "Lena Ray",
    title: "UX Strategist",
  },
  {
    image: person2,
    quote: "Data is no longer an asset—it’s the fuel.",
    content:
      "Modern businesses are driven by data-backed decision-making, and AI helps harness that at scale and speed.",
    name: "Carlos Green",
    title: "AI Engineer",
  },
  {
    image: person3,
    quote: "Upskilling is no longer optional in the AI era.",
    content:
      "The speed at which tech evolves means continual learning is crucial for staying ahead of the curve.",
    name: "Ava Brooks",
    title: "Tech Educator",
  },
];

function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
    const carousel = useCarousel({
      autoplay: false,
      slidesToShow: 3
    });

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 6, md: 10 }, bgcolor: "#fff" }}>
      {/* Title */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: 32, md: 54 },
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            lineHeight: "160%",
          }}
        >
          Career Navigation: Expert Takes
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 18, md: 34 },
            color: "text.secondary",
            fontFamily: "Roboto, sans-serif",
            lineHeight: "160%",
          }}
        >
          Curated insights from industry leaders in the AI era.
        </Typography>
      </Box>

      {/* Testimonial Card */}
      <Grid
        container
        spacing={0}
        sx={{
          maxWidth: "1200px",
          margin: "0 auto",
          boxShadow: 3,
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        {/* Left image */}
        <Grid item xs={12} md={3} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Box
            component="img"
            src={t.image}
            alt="Main"
            sx={{ width: "100%", maxWidth: 250, height: { xs: 200, md: 400 }, objectFit: "contain" }}
          />
        </Grid>

        {/* Main content */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Box
              component="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 14"
              fill="currentColor"
              sx={{ width: 20, height: 20, color: "grey.300", mb: 2 }}
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </Box>
            <Typography sx={{ fontSize: 20, fontWeight: 300, fontFamily: "Roboto, sans-serif", mb: 2 }}>
              {t.quote}
            </Typography>
            <Typography sx={{ fontSize: 14, color: "grey.600", fontFamily: "Roboto, sans-serif", mb: 4 }}>
              {t.content}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontFamily: "Inter, sans-serif" }}>{t.name}</Typography>
            <Typography sx={{ fontSize: 14, color: "grey.500", fontFamily: "Roboto, sans-serif" }}>
              {t.title}
            </Typography>

            <Box mt={2}>
              <Link
                href="https://www.google.com"
                underline="hover"
                sx={{ fontSize: 14, fontFamily: "Roboto, sans-serif", color: "black", display: "inline-flex", alignItems: "center" }}
              >
                Read more <Box component="span" ml={1}>→</Box>
              </Link>
            </Box>
          </Box>
        </Grid>

        {/* Right images */}
        <Grid item xs={12} md={3}>
         

          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {testimonials.map((item, i) => (
              <Box
                  component="img"
                  src={item.image}
                  onClick={() => setIndex(i)}
                  alt={`Person ${i + 1}`}
                  sx={{
                    // width: { xs: 80, md: 100 },
                    // height: { xs: 80, md: 100 },
                    width:'100%',
                    height: '393px',
                    // objectFit: "contain",
                    cursor: 'pointer'
                  }}
                />
            ))}
          </Carousel>
        </Grid>
      </Grid>

      {/* Pagination */}
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
        <Button onClick={handleNext} variant="text" sx={{ textTransform: "none" , ml:'-10px'}}>
          Next →
        </Button>
      </Stack>
    </Box>
  );
}

export default TestimonialSection;
