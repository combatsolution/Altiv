
// import React from 'react'; 
// import {
//   Container,
//   Typography,
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   CardHeader,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   Divider,
//   Button,
//   useMediaQuery,
//   useTheme,
//   Avatar,
//   Chip,
//   Stack
// } from '@mui/material';
// import {
//   AutoAwesome as AIIcon,
//   Insights as InsightIcon,
//   Group as GroupIcon,
//   Psychology as ApproachIcon,
//   CheckCircle as CheckIcon,
//   History as HistoryIcon,
//   Stars as StarsIcon,
//   Flag as MissionIcon,
//   People as ServeIcon,
//   DirectionsRun as ApproachIcon2,
//   AutoAwesome,
//   DirectionsRun,
//   Psychology,
// } from '@mui/icons-material';
// import { m } from 'framer-motion';

// const MotionBox = m(Box);
// const MotionGrid = m(Grid);
// const MotionPaper = m(Paper);
// const MotionCard = m(Card);

// const fadeIn = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
//   }),
// };

// const cardVariants = {
//   hover: {
//     y: -10,
//     boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
//     transition: { duration: 0.3 }
//   }
// };

// export default function AboutUsPage() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <Container maxWidth="lg" sx={{ py: 8 }}>
//       {/* Hero Section */}
//       <MotionBox 
//         textAlign="center" 
//         mb={8}
//         variants={fadeIn} 
//         initial="hidden" 
//         whileInView="visible" 
//         viewport={{ once: true }}
//       >
//         <Chip 
//           label="AI Career Intelligence" 
//           color="primary" 
//           size="small" 
//           sx={{ mb: 2 }}
//           icon={<StarsIcon />}
//         />
//         <Typography variant="h3" fontWeight={700} gutterBottom>
//           About <span style={{ color: theme.palette.primary.main }}>Altiv.AI</span>
//         </Typography>
//         <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
//           A career intelligence platform that turns uncertainty into opportunity through AI-powered insights and personalized career pathways.
//         </Typography>
//       </MotionBox>

//       {/* Our Story */}
//       <Grid container spacing={4} mb={8} alignItems="center">
//         <MotionGrid
//           item
//           xs={12}
//           md={6}
//           variants={fadeIn}
//           custom={1}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <Chip 
//             label="Our Origin" 
//             color="secondary" 
//             size="small" 
//             sx={{ mb: 2 }}
//             icon={<HistoryIcon />}
//           />
//           <Typography variant="h4" fontWeight={600} gutterBottom>
//             Transforming Career Anxiety into Opportunity
//           </Typography>
//           <Typography paragraph>
//             Altiv.AI emerged from a simple observation: while AI generates endless career anxiety,
//             it also creates unprecedented opportunities for those who can adapt.
//           </Typography>
//           <Typography>
//             Traditional career platforms haven&apos;t kept pace – they are still matching static skills to job descriptions,
//             while the nature of work itself is being transformed.
//           </Typography>
//         </MotionGrid>
//         <MotionGrid
//           item
//           xs={12}
//           md={6}
//           variants={fadeIn}
//           custom={2}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <MotionCard 
//             elevation={3} 
//             sx={{ 
//               p: 3,
//               background: 'linear-gradient(135deg, rgba(101,78,163,0.1) 0%, rgba(234,67,53,0.1) 100%)',
//               borderLeft: `4px solid ${theme.palette.primary.main}`
//             }}
//             variants={cardVariants}
//             whileHover="hover"
//           >
//             <Box display="flex" alignItems="center" mb={2}>
//               <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
//                 <AIIcon />
//               </Avatar>
//               <Typography variant="h6" fontWeight={600}>
//                 Navigating the AI Revolution
//               </Typography>
//             </Box>
//             <List>
//               {[
//                 'Mapping your current skills against emerging AI capabilities',
//                 'Identifying your unique opportunities for AI augmentation',
//                 'Creating personalized pathways for career evolution',
//                 'Connecting you with roles that maximize your potential',
//               ].map((text, i) => (
//                 <ListItem key={i} sx={{ py: 0.5 }}>
//                   <ListItemIcon sx={{ minWidth: 32 }}>
//                     <CheckIcon color="primary" fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText primary={text} primaryTypographyProps={{ variant: 'body2' }} />
//                 </ListItem>
//               ))}
//             </List>
//           </MotionCard>
//         </MotionGrid>
//       </Grid>

//       {/* Differentiators Section */}
//       <Box mb={8}>
//         <MotionBox
//           textAlign="center"
//           mb={4}
//           variants={fadeIn}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <Chip 
//             label="Why Choose Us" 
//             color="info" 
//             size="small" 
//             sx={{ mb: 2 }}
//             icon={<InsightIcon />}
//           />
//           <Typography variant="h4" fontWeight={600} gutterBottom>
//             Why We are Different
//           </Typography>
//           <Typography color="text.secondary" maxWidth="700px" mx="auto">
//             We go beyond traditional career platforms with our AI-powered approach
//           </Typography>
//         </MotionBox>

//         <Grid container spacing={3}>
//           {[
//             {
//               icon: <InsightIcon color="secondary" fontSize="large" />,
//               title: 'Task Analysis',
//               desc: 'We analyze tasks, not just skills, for precise career matching'
//             },
//             {
//               icon: <AutoAwesome color="primary" fontSize="large" />,
//               title: 'Augmentation Focus',
//               desc: 'Focus on augmentation opportunities, not just automation risks'
//             },
//             {
//               icon: <DirectionsRun color="success" fontSize="large" />,
//               title: 'Dynamic Pathways',
//               desc: 'Provide dynamic career pathways, not static job matches'
//             },
//             {
//               icon: <Psychology color="warning" fontSize="large" />,
//               title: 'Data-Driven',
//               desc: 'Offer data-driven insights, not generic advice'
//             },
//           ].map((item, i) => (
//             <MotionGrid 
//               item 
//               xs={12} 
//               sm={6} 
//               md={3} 
//               key={i}
//               variants={fadeIn}
//               custom={i}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//             >
//               <MotionCard 
//                 sx={{ 
//                   height: '100%',
//                   p: 3,
//                   textAlign: 'center',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: theme.shadows[6]
//                   }
//                 }}
//                 variants={cardVariants}
//               >
//                 <Box sx={{ 
//                   width: 60, 
//                   height: 60, 
//                   borderRadius: '50%', 
//                   bgcolor: theme.palette.background.paper,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   mx: 'auto',
//                   mb: 2,
//                   boxShadow: theme.shadows[2]
//                 }}>
//                   {item.icon}
//                 </Box>
//                 <Typography variant="h6" fontWeight={600} gutterBottom>
//                   {item.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {item.desc}
//                 </Typography>
//               </MotionCard>
//             </MotionGrid>
//           ))}
//         </Grid>
//       </Box>

//       {/* Mission Section */}
//       <MotionBox
//         mb={8}
//         variants={fadeIn}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         <Card sx={{ 
//           background: 'linear-gradient(135deg, rgba(66,133,244,0.1) 0%, rgba(52,168,83,0.1) 100%)',
//           p: 4,
//           borderRadius: 2
//         }}>
//           <Box display="flex" alignItems="center" mb={2}>
//             <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2 }}>
//               <MissionIcon />
//             </Avatar>
//             <Typography variant="h4" fontWeight={600}>
//               Our Mission
//             </Typography>
//           </Box>
//           <Typography paragraph>
//             We believe everyone deserves to thrive in the AI era. Our mission is to help one million
//             professionals transform their relationship with AI from anxiety to advantage in 2025.
//           </Typography>
//           <Typography>
//             Just like you, we don&apos;t want to create static long-term goals in this age of evolution.
//           </Typography>
//         </Card>
//       </MotionBox>

//       {/* Who We Serve */}
//       <Grid container spacing={4} mb={8}>
//         <MotionGrid
//           item
//           xs={12}
//           md={6}
//           variants={fadeIn}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <Card sx={{ height: '100%' }}>
//             <CardHeader
//               avatar={
//                 <Avatar sx={{ bgcolor: theme.palette.success.main }}>
//                   <ServeIcon />
//                 </Avatar>
//               }
//               title={
//                 <Typography variant="h5" fontWeight={600}>
//                   Who We Serve
//                 </Typography>
//               }
//             />
//             <CardContent>
//               <List>
//                 {[
//                   'Marketing Innovators',
//                   'Product Leaders',
//                   'Data Scientists',
//                   'Software Engineers',
//                   'And others embracing the AI transition',
//                 ].map((text, i) => (
//                   <ListItem key={i} sx={{ py: 0.5 }}>
//                     <ListItemIcon sx={{ minWidth: 32 }}>
//                       <GroupIcon color="success" fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText primary={text} />
//                   </ListItem>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </MotionGrid>
//         <MotionGrid
//           item
//           xs={12}
//           md={6}
//           variants={fadeIn}
//           custom={1}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <Card sx={{ height: '100%' }}>
//             <CardHeader
//               avatar={
//                 <Avatar sx={{ bgcolor: theme.palette.info.main }}>
//                   <ApproachIcon2 />
//                 </Avatar>
//               }
//               title={
//                 <Typography variant="h5" fontWeight={600}>
//                   Our Approach
//                 </Typography>
//               }
//             />
//             <CardContent>
//               <List>
//                 {[
//                   {
//                     title: 'Clarity First',
//                     desc: 'We help you understand your current AI-readiness through our proprietary AI-vantage Score.',
//                   },
//                   {
//                     title: 'Strategic Guidance',
//                     desc: 'Transform insights into action with personalized development paths.',
//                   },
//                   {
//                     title: 'Continuous Evolution',
//                     desc: 'Stay ahead with ongoing updates and opportunities aligned with market changes.',
//                   },
//                 ].map(({ title, desc }, i) => (
//                   <ListItem key={i} alignItems="flex-start" sx={{ py: 1.5 }}>
//                     <ListItemIcon sx={{ minWidth: 36 }}>
//                       <ApproachIcon color="info" fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={<Typography fontWeight={600}>{`${i + 1}. ${title}`}</Typography>}
//                       secondary={desc}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </CardContent>
//           </Card>
//         </MotionGrid>
//       </Grid>

//       {/* CTA */}
//       <MotionBox
//         textAlign="center"
//         mt={6}
//         variants={fadeIn}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         <Typography variant="h4" fontWeight={700} gutterBottom>
//           The future of work is being rewritten.
//         </Typography>
//         <Typography variant="h6" color="text.secondary" mb={4}>
//           Don&apos;t just react to change – get ahead of it.
//         </Typography>
//         <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             sx={{ 
//               borderRadius: '50px', 
//               px: 5, 
//               py: 1.5,
//               fontWeight: 600,
//               boxShadow: theme.shadows[4]
//             }}
//           >
//             Start Your AI-Ready Journey
//           </Button>
          
//         </Stack>
//       </MotionBox>
//     </Container>
//   );
// }


import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Insights as InsightIcon,
  Group as GroupIcon,
  Psychology as ApproachIcon,
  CheckCircle as CheckIcon,
  History as HistoryIcon,
  Stars as StarsIcon,
  Flag as MissionIcon,
  People as ServeIcon,
  DirectionsRun as ApproachIcon2,
  AutoAwesome,
  DirectionsRun,
  Psychology,
} from '@mui/icons-material';
import { m } from 'framer-motion';

const MotionBox = m(Box);
const MotionGrid = m(Grid);
const MotionCard = m(Card);
const MotionPaper = m(Paper);

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutUsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionBox
        textAlign="center"
        mb={8}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Chip
          label="AI Career Intelligence"
          color="primary"
          size="small"
          sx={{ mb: 2 }}
          icon={<StarsIcon />}
        />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          About <span style={{ color: theme.palette.primary.main }}>Altiv.AI</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
          A career intelligence platform that turns uncertainty into opportunity through AI-powered insights and personalized career pathways.
        </Typography>
      </MotionBox>

      {/* Our Story */}
      <Grid container spacing={4} mb={8} alignItems="center">
        <MotionGrid
          item
          xs={12}
          md={6}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Chip
            label="Our Origin"
            color="secondary"
            size="small"
            sx={{ mb: 2 }}
            icon={<HistoryIcon />}
          />
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Transforming Career Anxiety into Opportunity
          </Typography>
          <Typography paragraph>
            Altiv.AI emerged from a simple observation: while AI generates endless career anxiety,
            it also creates unprecedented opportunities for those who can adapt.
          </Typography>
          <Typography>
            Traditional career platforms haven&apos;t kept pace – they are still matching static skills to job descriptions,
            while the nature of work itself is being transformed.
          </Typography>
        </MotionGrid>
        <MotionGrid
          item
          xs={12}
          md={6}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MotionCard
            elevation={3}
            whileHover={{ scale: 1.03 }}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, rgba(101,78,163,0.1) 0%, rgba(234,67,53,0.1) 100%)',
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <AIIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                Navigating the AI Revolution
              </Typography>
            </Box>
            <List>
              {[...Array(4)].map((_, i) => (
                <ListItem key={i} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={[
                      'Mapping your current skills against emerging AI capabilities',
                      'Identifying your unique opportunities for AI augmentation',
                      'Creating personalized pathways for career evolution',
                      'Connecting you with roles that maximize your potential',
                    ][i]}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </MotionCard>
        </MotionGrid>
      </Grid>

      {/* Differentiators Section */}
      <MotionBox
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        mb={8}
      >
        <MotionBox textAlign="center" mb={4} variants={fadeInUp}>
          <Chip label="Why Choose Us" color="info" size="small" sx={{ mb: 2 }} icon={<InsightIcon />} />
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Why We are Different
          </Typography>
          <Typography color="text.secondary" maxWidth="700px" mx="auto">
            We go beyond traditional career platforms with our AI-powered approach
          </Typography>
        </MotionBox>

        <Grid container spacing={3}>
          {[
            {
              icon: <InsightIcon color="secondary" fontSize="large" />,
              title: 'Task Analysis',
              desc: 'We analyze tasks, not just skills, for precise career matching'
            },
            {
              icon: <AutoAwesome color="primary" fontSize="large" />,
              title: 'Augmentation Focus',
              desc: 'Focus on augmentation opportunities, not just automation risks'
            },
            {
              icon: <DirectionsRun color="success" fontSize="large" />,
              title: 'Dynamic Pathways',
              desc: 'Provide dynamic career pathways, not static job matches'
            },
            {
              icon: <Psychology color="warning" fontSize="large" />,
              title: 'Data-Driven',
              desc: 'Offer data-driven insights, not generic advice'
            },
          ].map((item, i) => (
            <MotionGrid item xs={12} sm={6} md={3} key={i} variants={fadeInUp}>
              <MotionCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                sx={{
                  height: '100%',
                  p: 3,
                  textAlign: 'center',
                }}
              >
                <MotionBox
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: theme.palette.background.paper,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: theme.shadows[2],
                  }}
                >
                  {item.icon}
                </MotionBox>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </MotionCard>
            </MotionGrid>
          ))}
        </Grid>
      </MotionBox>

      {/* CTA */}
      <MotionBox
        textAlign="center"
        mt={6}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          The future of work is being rewritten.
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Don&apos;t just react to change – get ahead of it.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: '50px',
              px: 5,
              py: 1.5,
              fontWeight: 600,
              boxShadow: theme.shadows[4],
            }}
          >
            Start Your AI-Ready Journey
          </Button>
        </Stack>
      </MotionBox>
    </Container>
  );
}

