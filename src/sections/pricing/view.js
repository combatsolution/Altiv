// import { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import Paper from '@mui/material/Paper';
// import axiosInstance from 'src/utils/axios';
// import { _pricingPlans } from 'src/_mock';
// import PricingCard from './pricing-card';


// // Category configuration
// const planCategories = [
//   { label: 'Marketing', value: 1, type: 'MT' },
//   { label: 'Data Science', value: 2, type: 'DS' },
//   { label: 'Product Management', value: 3, type: 'PM' },
//   // { label: 'Software Engineering', value: 4, type: 'SE' },
// ];

// const categoryHeadings = {
//   'Marketing': {
//     value: 1,
//     title: ' Marketing Mastery',
//     subtitle:
//       'Accelerate your AI Marketing Evolution - Transform your marketing strategies with cutting-edge AI tools and frameworks',
//   },
//   'Data Science': {
//     value: 2,
//     title: ' Data Science Leadership',
//     subtitle:
//       'Accelerate your AI-Driven Data Science Evolution - Master the implementation of AI solutions at scale',
//   },
//   'Product Management': {
//     value: 3,
//     title: 'AI Product Innovation',
//     subtitle:
//       'Accelerate your AI-Enhanced Product Evolution - Build and scale AI-powered products that deliver real value',
//   },
// };

// export default function PricingView() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState(0);
//   const [plansData, setPlansData] = useState([]);
//   const [heading, setHeading] = useState('');
//   const [subHeading, setSubHeading] = useState('');
//   // const [plansData, setCourses] = useState([]);

//   // Map type from query parameter to category value
//   const typeToCategory = (type) => {
//     const category = planCategories.find((cat) => cat.type === type);
//     return category ? category.value : 1; // Default to Marketing (0) if type is invalid
//   };

//   // Fetch plans based on selected category
//   const fetchPlans = async (categoryValue) => {
//     try {
//       const response = await axiosInstance.get(`/plans/plan-by-type/${categoryValue}`);
//       if (response && response.data) {
//         // setPlansData(response.data);
//         const finalPlansData = response?.data?.length > 0 ? response?.data?.filter((res) => !res?.isFreePlan) : [];
//         setPlansData(finalPlansData);
//       }
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//     }
//   };


//   // Handle initial load and query parameter changes
//   useEffect(() => {
//     const type = searchParams.get('type');
//     const categoryValue = typeToCategory(type);
//     setSelectedCategory(categoryValue);

//     // Fetch plans and update headings
//     fetchPlans(categoryValue);
//     // fetchCourses(categoryValue);

//     const category = planCategories.find((cat) => cat.value === categoryValue);
//     const { title, subtitle } = categoryHeadings[category.label] || {};
//     setHeading(title);
//     setSubHeading(subtitle);

//     // Update document title
//     document.title = `/pricing/${category.label.toLowerCase()}`;
//   }, [searchParams]);

//   // Handle tab click
//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category.value);
//     // Update URL with new type query parameter
//     setSearchParams({ type: category.type });
//   };

//   return (

//     <Container
//       sx={{
//         pt: { xs: 10, md: 3 },
//         pb: { xs: 8, md: 10 },
//         minHeight: 1,
//       }}
//     >

//       <Box sx={{
//         width: '100%',
//         height: '300px',
//         background: 'linear-gradient(90deg, #4B69E9 5%, #00A3FF 100%)',
//         display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             my:4,
//             textAlign:'center',
//       }} >
//         <Typography sx={{
//           color:'#fff',
//         }}>
//           <h1 >Accelerate Your AI Evolution </h1>
//           <h4 > Transform your career with cutting-edge AI programs designed for real-world impact.</h4>
//         </Typography>

//       </Box>

//       {/* Buttons Above Headings */}
//       <Stack
//         direction="row"
//         justifyContent="left"
//         spacing={2}
//         sx={{ mb: 3, flexWrap: 'wrap', fontSize: 2 }}
//       >
//         {planCategories.map((category) => (
//           <Button
//             key={category.value}
//             variant="contained"
//             onClick={() => handleCategoryChange(category)}
//             sx={{
//               fontSize: '17px',
//               px: 2,
//               py: 0.5,
//               textTransform: 'none',
//               backgroundColor: selectedCategory === category.value ? '#0040D8' : 'transparent',
//               color: selectedCategory === category.value ? '#fff' : '#94979cff',
//               '&:hover': {
//                 backgroundColor: selectedCategory === category.value ? '#0040D8' : '#e6e6e6',
//               },
//             }}
//           >
//             {category.label}
//           </Button>
//         ))}
//       </Stack>

//       {/* Transparent Grey Divider */}
//       <Divider
//         sx={{
//           width: '100%',
//           maxWidth: 1000,
//           mx: 'auto',
//           borderColor: 'rgba(145, 158, 171, 0.2)', // transparent grey
//           mb: 1,
//         }}
//       />

//       {/* Dynamic Heading and Subheading */}
//       <Typography variant="h3" align="center" paragraph color="primary">
//         {heading}
//       </Typography>

//       <Typography align="center" sx={{ color: 'text.secondary', mb: 4 }}>
//         {subHeading}
//       </Typography>

//       {/* Pricing Cards */}
//       <Box
//         sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//         gap={{ xs: 3, md: 2 }}
//         display="grid"
//         gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }}

//       >
//         {plansData.length > 0 ? (
//           plansData.map((card, index) => (
//             <Paper
//               key={card.id}
//               elevation={2}
//               sx={{
//                 px: 1,
//                 borderRadius: 2,
//                 width: '30%',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 transition: 'all 0.3s ease',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   boxShadow: 6,
//                   transform: 'scale(1.03)',
//                   backgroundColor: '#f5f7ff',
//                 },
//               }}
//             >
//               <PricingCard card={card} index={index} />
//             </Paper>
//           ))
//         ) : (
//           <Typography variant="h6">No plans available</Typography>
//         )}
//       </Box>
//     </Container>
//   );
// }



import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  Button,
  Container,
  Typography,
  Divider,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axiosInstance from 'src/utils/axios';
import usFlag from 'src/assets/icons/us-flag.png';  // 🇺🇸 
import inFlag from 'src/assets/icons/in-flag.png';  // 🇮🇳
import PricingCard from './pricing-card';

// Category configuration
const planCategories = [
  { label: 'Marketing', value: 1, type: 'MT' },
  { label: 'Data Science', value: 0, type: 'DS' },
  { label: 'Product Management', value: 2, type: 'PM' },
];

const categoryHeadings = {
  Marketing: {
    value: 1,
    title: 'Marketing Mastery', 
    subtitle:
      'Accelerate your AI Marketing Evolution - Transform your marketing strategies with cutting-edge AI tools and frameworks',
  },
  'Data Science': {
    value: 0,
    title: 'Data Science Leadership',
    subtitle:
      'Accelerate your AI-Driven Data Science Evolution - Master the implementation of AI solutions at scale',
  },
  'Product Management': {
    value: 2,
    title: 'AI Product Innovation',
    subtitle:
      'Accelerate your AI-Enhanced Product Evolution - Build and scale AI-powered products that deliver real value',
  },
};

export default function PricingView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [plansData, setPlansData] = useState([]);
  const [heading, setHeading] = useState('');
  const [subHeading, setSubHeading] = useState('');
  const [currency, setCurrency] = useState('USD'); // 💰 Currency State
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const typeToCategory = (type) => {
    const category = planCategories.find((cat) => cat.type === type);
    return category ? category.value : 1;
  };

  const fetchPlans = async (categoryValue) => {
    try {
      const response = await axiosInstance.get(`/plans/plan-by-type/${categoryValue}`);
      if (response?.data) {
        const filtered = response.data.filter((res) => !res.isFreePlan);
        setPlansData(filtered);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  useEffect(() => {
    const type = searchParams.get('type');
    const categoryValue = typeToCategory(type);
    setSelectedCategory(categoryValue);
    fetchPlans(categoryValue);

    const category = planCategories.find((cat) => cat.value === categoryValue);
    const { title, subtitle } = categoryHeadings[category?.label] || {};
    setHeading(title);
    setSubHeading(subtitle);

    document.title = `/pricing/${category?.label?.toLowerCase()}`;
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category.value);
    setSearchParams({ type: category.type });
  };

  // 💱 Currency Change Handler
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  // 💰 Currency Conversion Logic
  const convertPrice = (price) => {
    const rate = 83; // 1 USD = 83 INR
    return currency === 'USD' ? `$${price}` : `₹${(price * rate).toLocaleString('en-IN')}`;
  };

  return (
    <Container
      sx={{
        pt: { xs: 10, md: 3 },
        pb: { xs: 8, md: 10 },
        minHeight: 1,
        position: 'relative',
      }}
    >
      {/* 🔝 Currency Dropdown Top-Right */}
      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 25,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',mb:2
        }}
      >
        <FormControl size="small" sx={{ minWidth: 120, bgcolor: '#fff', borderRadius:2, borderColor:'primary.main' }}>
          <Select
            value={currency}
            onChange={handleCurrencyChange}
            sx={{
            
              fontWeight: 600,
              color: '#0040D8',
              '& .MuiSelect-icon': { color: '#0040D8' },
            }}
          >
            <MenuItem value="USD">
              <Box display="flex" alignItems="center" gap={1} >
                <img src={usFlag} alt="US Flag" width={20} height={15} />
                <Typography fontWeight={600}> USD</Typography>
              </Box>
            </MenuItem>
            <MenuItem value="INR">
              <Box display="flex" alignItems="center" gap={1}>
                <img src={inFlag} alt="IN Flag" width={20} height={15} />
                <Typography fontWeight={600}> INR</Typography>
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* 🟦 Hero Section */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 240, md: '100%' },
          // background: 'linear-gradient(90deg, #4B69E9 5%, #00A3FF 100%)',
          bgcolor:'primary.main',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          my: 4,
          textAlign: 'center',
        }}
      >
        <Typography sx={{ color: '#fff' }}>
          <h1>Accelerate Your AI Evolution</h1>
          <h4>
            Transform your career with cutting-edge AI programs designed for real-world impact.
          </h4>
        </Typography>
      </Box>

      {/*  Category Buttons */}
      <Stack direction="row" justifyContent="left" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
        {planCategories.map((category) => (
          <Button
            key={category.value}
            variant="contained"
            onClick={() => handleCategoryChange(category)}
            sx={{
              fontSize: '17px',
              px: 2,
              py: 0.5,
              textTransform: 'none',
              backgroundColor: selectedCategory === category.value ? '#0040D8' : 'transparent',
              color: selectedCategory === category.value ? '#fff' : '#94979cff',
              '&:hover': {
                backgroundColor: selectedCategory === category.value ? '#0040D8' : '#e6e6e6',
              },
            }}
          >
            {category.label}
          </Button>
        ))}
      </Stack>

      {/* Divider */}
      <Divider
        sx={{
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
          borderColor: 'rgba(145, 158, 171, 0.2)',
          mb: 1,
        }}
      />

      {/* Headings */}
      <Typography variant="h3" align="center" paragraph color="primary">
        {heading}
      </Typography>
      <Typography align="center" sx={{ color: 'text.secondary', mb: 4 }}>
        {subHeading}
      </Typography>

      {/* 💵 Pricing Cards */}
      <Box
        sx={{
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 3, md: 2 },
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {plansData.length > 0 ? (
          plansData.map((card, index) => (
            <Paper
              key={card.id}
              elevation={2}
              sx={{
                px: 1,
                borderRadius: 2,
                width: '100%',
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
              <PricingCard
                card={{
                  ...card,
                  price: convertPrice(card.price), // 💰 Pass converted price
                }}
                index={index}
              />
            </Paper>
          ))
        ) : (
          <Typography variant="h6">No plans available</Typography>
        )}
      </Box>
    </Container>
  );
}
