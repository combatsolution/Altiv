

// import { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import {
//   Box,
//   Stack,
//   Button,
//   Container,
//   Typography,
//   Divider,
//   Paper,
//   MenuItem,
//   Select,
//   FormControl,
//   ToggleButtonGroup,
//   ToggleButton,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import axiosInstance from 'src/utils/axios';
// import usFlag from 'src/assets/icons/us-flag.png';
// import inFlag from 'src/assets/icons/in-flag.png';
// import PricingCard from './pricing-card';

// const planCategories = [
//   { label: 'Marketing', value: 1, type: 'MT' },
//   { label: 'Data Science', value: 0, type: 'DS' },
//   { label: 'Product Management', value: 2, type: 'PM' },
// ];

// const categoryHeadings = {
//   Marketing: {
//     value: 1,
//     title: 'Marketing Mastery',
//     subtitle:
//       'Accelerate your AI Marketing Evolution - Transform your marketing strategies with cutting-edge AI tools and frameworks',
//   },
//   'Data Science': {
//     value: 0,
//     title: 'Data Science Leadership',
//     subtitle:
//       'Accelerate your AI-Driven Data Science Evolution - Master the implementation of AI solutions at scale',
//   },
//   'Product Management': {
//     value: 2,
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
//   const [servicesData, setServicesData] = useState([]);
//   const [mode, setMode] = useState('product');
//   const [heading, setHeading] = useState('');
//   const [subHeading, setSubHeading] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [currency, setCurrency] = useState('USD');
//   const [selectedService, setSelectedService] = useState(null);
//   const [openModal, setOpenModal] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleCurrencyChange = (event) => setCurrency(event.target.value);
//   const convertPrice = (price) => {
//     const rate = 83;
//     return currency === 'USD' ? `$${price}` : `₹${(price * rate).toLocaleString('en-IN')}`;
//   };

//   const fetchPlans = async (categoryValue) => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(`/plans/plan-by-type/${categoryValue}`);
//       const filtered = response?.data?.filter((res) => !res.isFreePlan) || [];
//       setPlansData(filtered);
//     } catch (error) {
//       console.error('Error fetching plans:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchServices = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(`/services`);
//       if (Array.isArray(response?.data)) {
//         setServicesData(response.data.filter((srv) => srv.isActive && !srv.isDeleted));
//       }
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const type = searchParams.get('type');
//     const category = planCategories.find((cat) => cat.type === type) || planCategories[0];
//     setSelectedCategory(category.value);
//     fetchPlans(category.value);
//     const { title, subtitle } = categoryHeadings[category.label];
//     setHeading(title);
//     setSubHeading(subtitle);
//   }, [searchParams]);

//   const handleCategoryChange = (category) => {
//     setSelectedCategory(category.value);
//     setSearchParams({ type: category.type });
//   };

//   const handleModeChange = (event, newMode) => {
//     if (!newMode) return;
//     setMode(newMode);
//     if (newMode === 'service') fetchServices();
//     else fetchPlans(selectedCategory);
//   };

//   const handleLearnMore = (service) => {
//     setSelectedService(service);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedService(null);
//   };

//   const handleContact = (id) => {
//     navigate(`/service/${id}`);
//   };

//   return (
//     <Container sx={{ pt: { xs: 10, md: 3 }, pb: { xs: 8, md: 10 }, minHeight: 1, position: 'relative' }}>
//       {/* Currency Switch */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 10,
//           right: 25,
//           display: 'flex',
//           alignItems: 'center',
//         }}
//       >
//         <FormControl size="small" sx={{ minWidth: 120, bgcolor: '#fff', borderRadius: 2 }}>
//           <Select
//             value={currency}
//             onChange={handleCurrencyChange}
//             sx={{ fontWeight: 600, color: 'primary.main', '& .MuiSelect-icon': { color: 'primary.main' } }}
//           >
//             <MenuItem value="USD">
//               <Box display="flex" alignItems="center" gap={1}>
//                 <img src={usFlag} alt="US Flag" width={20} height={15} />
//                 <Typography fontWeight={600}>USD</Typography>
//               </Box>
//             </MenuItem>
//             <MenuItem value="INR">
//               <Box display="flex" alignItems="center" gap={1}>
//                 <img src={inFlag} alt="IN Flag" width={20} height={15} />
//                 <Typography fontWeight={600}>INR</Typography>
//               </Box>
//             </MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Hero Section */}
//       <Box
//         sx={{
//           width: '100%',
//           bgcolor: 'primary.main',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           my: 4,
//           textAlign: 'center',
//           p: 4,
//           borderRadius: 0,
//         }}
//       >
//         <Typography variant="h4" sx={{ color: '#fff', mb: 1 }}>
//           Accelerate Your AI Evolution
//         </Typography>
//         <Typography variant="subtitle1" sx={{ color: '#fff' }}>
//           Transform your career or business with AI-powered products and services.
//         </Typography>
//       </Box>

//       {/* Product / Service Toggle */}
//       <Stack justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
//         <ToggleButtonGroup
//           color="primary"
//           value={mode}
//           exclusive
//           onChange={handleModeChange}
//           sx={{
//             bgcolor: '#f1f4ff',
//             borderRadius: 2,
//             '& .MuiToggleButton-root': {
//               textTransform: 'none',
//               fontSize: '16px',
//               px: 3,
//               py: 1,
//               border: 'none',
//               '&.Mui-selected': {
//                 bgcolor: 'primary.main',
//                 color: '#fff',
//                 '&:hover': { bgcolor: 'primary.dark' },
//               },
//             },
//           }}
//         >
//           <ToggleButton value="product">Products</ToggleButton>
//           <ToggleButton value="service">Services</ToggleButton>
//         </ToggleButtonGroup>
//       </Stack>

//       {/* Category Buttons */}
//       {mode === 'product' && (
//         <Stack direction="row" justifyContent="flex-start" spacing={2} sx={{ mb: 3, flexWrap: 'wrap' }}>
//           {planCategories.map((category) => (
//             <Button
//               key={category.value}
//               variant="contained"
//               onClick={() => handleCategoryChange(category)}
//               sx={{
//                 fontSize: "17px",
//                 px: 2,
//                 py: 0.5,
//                 textTransform: "none",
//                 borderRadius: "8px",
//                 transition: "all 0.3s ease",
//                 backgroundColor:
//                   selectedCategory === category.value ? "#0040D8" : "transparent",
//                 color: selectedCategory === category.value ? "#fff" : "#94979cff",
//                 border:
//                   selectedCategory === category.value
//                     ? "1px solid #0040D8"
//                     : "1px solid #e0e0e0",
//                 "&:hover": {
//                   backgroundColor:
//                     selectedCategory === category.value ? "#0040D8" : "#f2f2f2",
//                 },
//               }}
//             >
//               {category.label}
//             </Button>
//           ))}
//         </Stack>
//       )}

//       <Divider sx={{ width: '100%', maxWidth: 1000, mx: 'auto', mb: 3 }} />

//       {mode === 'product' ? (
//         <>
//           <Typography variant="h3" align="center" paragraph color="primary">
//             {heading}
//           </Typography>
//           <Typography align="center" sx={{ color: 'text.secondary', mb: 4 }}>
//             {subHeading}
//           </Typography>
//         </>
//       ) : (
//         <Typography variant="h3" align="center" color="primary" sx={{ mb: 4 }}>
//           Our Services
//         </Typography>
//       )}

//       {/* Cards */}
//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={5}>
//           <CircularProgress />
//         </Box>
//       ) : mode === 'product' ? (
//         <Grid container spacing={3}>
//           {plansData.map((card, index) => (
//             <Grid item xs={12} md={4} key={card.id}>
//               <Paper
//                 elevation={3}
//                 sx={{
//                   borderRadius: 3,
//                   p: 1,
//                   transition: 'all 0.3s ease',
//                   '&:hover': { boxShadow: 8, transform: 'scale(1.03)' },
//                 }}
//               >
//                 <PricingCard card={{ ...card, price: convertPrice(card.price) }} index={index} />
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Grid container spacing={3}>
//           {servicesData.map((srv) => (
//             <Grid item xs={12} md={4} key={srv.id}>
//               <Paper
//                 elevation={4}
//                 sx={{
//                   p: 3,
//                   height: '100%',
//                   borderRadius: 3,
//                   background: 'linear-gradient(180deg, #f8faff 0%, #ffffff 100%)',
//                   transition: 'all 0.3s ease',
//                   '&:hover': { boxShadow: 10, transform: 'translateY(-6px)' },
//                 }}
//               >
//                 {srv.icon && (
//                   <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//                     <img src={srv.icon} alt={srv.serviceName} width={64} height={64} />
//                   </Box>
//                 )}
//                 <Typography variant="h6" color="primary" fontWeight={700} sx={{ mb: 1 }}>
//                   {srv.serviceName}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="text.secondary"
//                   sx={{ mb: 2 }}
//                   dangerouslySetInnerHTML={{ __html: srv.description }}
//                 />
//                 <Stack direction="row" spacing={2}>
//                   <Button variant="outlined" onClick={() => handleLearnMore(srv)}>
//                     Learn More
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{
//                       bgcolor: 'primary.main',        // main button color
//                       color: '#fff',                   // text color
//                       '&:hover': {
//                         bgcolor: 'primary.dark',       // hover color
//                       },
//                       textTransform: 'none',           // optional: keep original text casing
//                     }}
//                     onClick={() => handleContact(srv.id)}
//                   >
//                     Contact Us
//                   </Button>
//                 </Stack>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Learn More Modal */}
//       <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
//         {selectedService && (
//           <>
//             <DialogTitle>{selectedService.serviceName}</DialogTitle>
//             <DialogContent dividers>
//               <Typography variant="body1" paragraph>
//                 {selectedService.description}
//               </Typography>
//               {selectedService.features?.length > 0 && (
//                 <>
//                   <Typography variant="subtitle1" fontWeight={600}>
//                     Key Features:
//                   </Typography>
//                   <ul>
//                     {selectedService.features.map((f, i) => (
//                       <li key={i}>
//                         <Typography variant="body2">{f}</Typography>
//                       </li>
//                     ))}
//                   </ul>
//                 </>
//               )}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleCloseModal}>Close</Button>
//               <Button
//                 variant="contained"
//                 sx={{
//                   bgcolor: 'primary.main',
//                   '&:hover': { bgcolor: 'primary.dark' },
//                 }}
//                 onClick={() => handleContact(selectedService.id)}
//               >
//                 Contact Us
//               </Button>
//             </DialogActions>
//           </>
//         )}
//       </Dialog>
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
        <FormControl size="small" sx={{ minWidth: 120, bgcolor: '#fff',
           borderRadius:2, borderColor:'primary.main' }}>
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
