import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import axiosInstance from 'src/utils/axios';
import PricingCard from './pricing-card';

// Category configuration
const planCategories = [
  { label: 'Marketing', value: 1, type: 'MT' },
  { label: 'Data Science', value: 2, type: 'DS' },
  { label: 'Product Management', value: 3, type: 'PM' },
  // { label: 'Software Engineering', value: 4, type: 'SE' },
];

const categoryHeadings = {
  'Marketing': {
    value: 1,
    title: ' Marketing Mastery',
    subtitle:
      'Accelerate your AI Marketing Evolution - Transform your marketing strategies with cutting-edge AI tools and frameworks',
  },
  'Data Science': {
    value: 2,
    title: ' Data Science Leadership',
    subtitle:
      'Accelerate your AI-Driven Data Science Evolution - Master the implementation of AI solutions at scale',
  },
  'Product Management': {
    value: 3,
    title: 'AI Product Innovation',
    subtitle:
      'Accelerate your AI-Enhanced Product Evolution - Build and scale AI-powered products that deliver real value',
  },
};

export default function PricingView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(0);
   const [plansData, setPlansData] = useState([]);
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  // const [plansData, setCourses] = useState([]);

  // Map type from query parameter to category value
  const typeToCategory = (type) => {
    const category = planCategories.find((cat) => cat.type === type);
    return category ? category.value : 1; // Default to Marketing (0) if type is invalid
  };

  // Fetch plans based on selected category
  const fetchPlans = async (categoryValue) => {
    try {
      const response = await axiosInstance.get(`/plans/plan-by-type/${categoryValue}`);
      if (response && response.data) {
        // setPlansData(response.data);
         const finalPlansData = response?.data?.length > 0 ? response?.data?.filter((res) => !res?.isFreePlan) : [];
        setPlansData(finalPlansData);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  }; 


  // Handle initial load and query parameter changes
  useEffect(() => {
    const type = searchParams.get('type');
    const categoryValue = typeToCategory(type);
    setSelectedCategory(categoryValue);

    // Fetch plans and update headings
    fetchPlans(categoryValue);
    // fetchCourses(categoryValue);

    const category = planCategories.find((cat) => cat.value === categoryValue);
    const { title, subtitle } = categoryHeadings[category.label] || {};
    setHeading(title);
    setSubHeading(subtitle);

    // Update document title
    document.title = `/pricing/${category.label.toLowerCase()}`;
  }, [searchParams]);

  // Handle tab click
  const handleCategoryChange = (category) => {
    setSelectedCategory(category.value);
    // Update URL with new type query parameter
    setSearchParams({ type: category.type });
  };

  return (
    <Container
      sx={{
        pt: { xs: 10, md: 3 },
        pb: { xs: 8, md: 10 },
        minHeight: 1,
      }}
    >
      {/* Buttons Above Headings */}
      <Stack
        direction="row"
        justifyContent="left"
        spacing={2}
        sx={{ mb: 3, flexWrap: 'wrap', fontSize: 2 }}
      >
        {planCategories.map((category) => (
          <Button
            key={category.value}
            variant="contained"
            onClick={() => handleCategoryChange(category)}
            sx={{
              fontSize: '17px',
              px: 2,
              py: 1,
              textTransform: 'none',
              backgroundColor: selectedCategory === category.value ? '#0040D8' : 'transparent',
              color: selectedCategory === category.value ? '#fff' : '#0040D8',
              '&:hover': {
                backgroundColor: selectedCategory === category.value ? '#0040D8' : '#e6e6e6',
              },
            }}
          >
            {category.label}
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
          mb: 1,
        }}
      />

      {/* Dynamic Heading and Subheading */}
      <Typography variant="h3" align="center" paragraph color="primary">
        {heading}
      </Typography>

      <Typography align="center" sx={{ color: 'text.secondary', mb: 4 }}>
        {subHeading}
      </Typography>

      {/* Pricing Cards */}
      <Box
        sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        gap={{ xs: 3, md: 2 }}
        display="grid"
        gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}
        
      >
        {plansData.length > 0 ? (
          plansData.map(( card, index) => (
            <Paper
              key={card.id}
              elevation={2}
              sx={{
                px: 1,
                borderRadius: 2,
                width:'30%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'scale(1.03)',
                  backgroundColor: '#f5f7ff',
                },
              }}
            >
              <PricingCard card={card} index={index} />
            </Paper>
          ))
        ) : (
          <Typography variant="h6">No plans available</Typography>
        )}
      </Box>
    </Container>
  );
}