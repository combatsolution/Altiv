import { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
// mock
import { _pricingPlans } from 'src/_mock';
import PricingCard from './pricing-card';

// ----------------------------------------------------------------------

const planCategories = ['Marketing', 'Data Science', 'Product Management'];

const categoryHeadings = {
  Marketing: {
    title: 'AI Marketing Mastery',
    subtitle:
      'Accelerate your AI Marketing Evolution - Transform your marketing strategies with cutting-edge AI tools and frameworks',
  },
  'Data Science': {
    title: 'AI Data Science Leadership',
    subtitle:
      'Accelerate your AI-Driven Data Science Evolution - Master the implementation of AI solutions at scale',
  },
  'Product Management': {
    title: 'AI Product Innovation',
    subtitle:
      'Accelerate your AI-Enhanced Product Evolution - Build and scale AI-powered products that deliver real value',
  },
};

export default function PricingView() {
  const [selectedCategory, setSelectedCategory] = useState('Marketing');

  const filteredPlans = _pricingPlans.filter((plan) => plan.category === selectedCategory);

  const { title, subtitle } = categoryHeadings[selectedCategory];

  return (
    <Container
      sx={{
        pt: { xs: 10, md: 15 },
        pb: { xs: 8, md: 10 },
        minHeight: 1,
      }}
    >
      {/* Buttons Above Headings */}
      <Stack
        direction="row"
        justifyContent="left"
        spacing={2}
        sx={{ mb: 5, flexWrap: 'wrap', fontSize: 2 }}
      >
        {planCategories.map((category) => (
          <Button
            key={category}
            variant="contained"
            onClick={() => setSelectedCategory(category)}
            sx={{
              fontSize:'17px',  
              px: 2,
              py: 1,
              textTransform: 'none',
              backgroundColor: selectedCategory === category ? '#0040D8' : 'transparent',
              // border: '1px solid #0040D8',
              color: selectedCategory === category ? '#fff' : '#0040D8',
              '&:hover': {
                backgroundColor: selectedCategory === category ? '#0040D8' : '#e6e6e6',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Stack>

      {/* Transparent Grey Divider */}
      <Divider
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          borderColor: 'rgba(145, 158, 171, 0.2)', // transparent grey
          mb: 4,
        }}
      />

      {/* Dynamic Heading and Subheading */}
      <Typography variant="h3" align="center" paragraph color="primary">
        {title}
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary', mb: 4 }}>
        {subtitle}
      </Typography>

      {/* Pricing Cards */}

      <Box
        gap={{ xs: 3, md: 4 }}
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
        alignItems="stretch"
      >
        {filteredPlans.map((card, index) => (
          <Paper
            key={card.subscription}
            elevation={2}
            sx={{
              px: 3,
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6, // increase elevation on hover
                transform: 'scale(1.03)', // slight zoom effect
                backgroundColor: '#f5f7ff', // optional light background on hover
              },
            }}
          >
            <PricingCard card={card} index={index} />
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
