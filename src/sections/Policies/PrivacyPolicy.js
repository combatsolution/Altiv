// import React from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Paper,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// const PrivacyPolicyPage = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const sections = [
//     {
//       title: 'What We Collect',
//       items: [
//         'Information you provide (name, email, phone number, professional details)',
//         'Assessment responses and career preferences',
//         'Usage data to improve your experience',
//         'Payment information (processed securely via trusted providers)'
//       ]
//     },
//     {
//       title: 'How We Use Your Information',
//       items: [
//         'Deliver personalized career insights and recommendations',
//         'Provide mentorship and program support',
//         'Improve our platform and services',
//         'Send relevant updates about your progress'
//       ]
//     },
//     {
//       title: "What We Don't Do",
//       items: [
//         "Sell your personal information",
//         "Share your data with third parties without your consent",
//         "Store payment details on our servers",
//         "Use your information for purposes you haven't agreed to"
//       ]
//     },
//     {
//       title: 'Data Security',
//       items: [
//         'Industry-standard encryption',
//         'Regular security audits',
//         'Secure data storage',
//         'Limited employee access'
//       ]
//     },
//     {
//       title: 'Your Rights',
//       content: 'You can:',
//       items: [
//         'Access your data',
//         'Request corrections',
//         'Download your information',
//         'Delete your account',
//         'Opt out of communications'
//       ]
//     },
//     {
//       title: 'Cookies',
//       content: 'We use cookies to:',
//       items: [
//         'Keep you logged in',
//         'Remember your preferences',
//         'Analyze platform usage',
//         'Improve performance'
//       ]
//     },
//     {
//       title: 'Contact Us',
//       content: 'Questions about your data? Email: privacy@altiv.ai'
//     }
//   ];

//   return (
//     <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
//       {/* <Paper elevation={isMobile ? 0 : 2} sx={{ p: isMobile ? 2 : 4, borderRadius: 3 }}> */}
//         <Box sx={{ textAlign: 'center', mb: 5 }}>
//           <Typography
//             variant="h3"
//             component="h1"
//             sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}
//           >
//             Privacy Policy
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             Last Updated: June 2025
//           </Typography>
//         </Box>

//         {sections.map((section, index) => (
//           <Box key={index} sx={{ mb: 5 }}>
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 600,
//                 fontSize: isMobile ? '1.1rem' : '1.25rem',
//                 mb: 1.5,
//                 color: 'text.primary'
//               }}
//             >
//               {section.title}
//             </Typography>

//             {section.content && (
//               <Typography
//                 variant="body1"
//                 paragraph
//                 sx={{ fontSize: '1rem', lineHeight: 1.7 }}
//               >
//                 {section.content}
//               </Typography>
//             )}

//             {section.items && (
//               <List dense disablePadding>
//                 {section.items.map((item, i) => (
//                   <ListItem key={i} sx={{ pl: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 28, pt: '6px' }}>
//                       <FiberManualRecordIcon sx={{ fontSize: 8 }} />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={item}
//                       primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1rem' } }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             )}
//           </Box>
//         ))}

//         {/* Footer Summary */}
//         <Box sx={{ mt: 4, borderTop: `1px solid ${theme.palette.divider}`, pt: 3 }}>
//           <Typography
//             variant="body1"
//             sx={{
//               fontStyle: 'italic',
//               color: 'text.secondary',
//               textAlign: 'center'
//             }}
//           >
//             We keep it simple: your data helps us help you, and we protect it like it`&apos;s our own.
//           </Typography>
//         </Box>
//       {/* </Paper> */}
//     </Container>
//   );
// };

// export default PrivacyPolicyPage;

import React from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PolicyIcon from '@mui/icons-material/Policy';
import LockIcon from '@mui/icons-material/Lock';
import GavelIcon from '@mui/icons-material/Gavel';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { m } from 'framer-motion';

const MotionBox = m(Box);
const MotionCard = m(Card);

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const cardHover = {
  hover: {
    y: -6,
    boxShadow: '0px 12px 20px rgba(0,0,0,0.08)',
    transition: { duration: 0.3 },
  },
};

const icons = [<PolicyIcon />, <VerifiedUserIcon />, <LockIcon />, <GavelIcon />];

const PrivacyPolicyPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sections = [
    {
      title: 'What We Collect',
      items: [
        'Information you provide (name, email, phone number, professional details)',
        'Assessment responses and career preferences',
        'Usage data to improve your experience',
        'Payment information (processed securely via trusted providers)',
      ],
    },
    {
      title: 'How We Use Your Information',
      items: [
        'Deliver personalized career insights and recommendations',
        'Provide mentorship and program support',
        'Improve our platform and services',
        'Send relevant updates about your progress',
      ],
    },
    {
      title: "What We Don't Do",
      items: [
        'Sell your personal information',
        'Share your data with third parties without your consent',
        'Store payment details on our servers',
        "Use your information for purposes you haven't agreed to",
      ],
    },
    {
      title: 'Data Security',
      items: [
        'Industry-standard encryption',
        'Regular security audits',
        'Secure data storage',
        'Limited employee access',
      ],
    },
    {
      title: 'Your Rights',
      content: 'You can:',
      items: [
        'Access your data',
        'Request corrections',
        'Download your information',
        'Delete your account',
        'Opt out of communications',
      ],
    },
    {
      title: 'Cookies',
      content: 'We use cookies to:',
      items: [
        'Keep you logged in',
        'Remember your preferences',
        'Analyze platform usage',
        'Improve performance',
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 4 : 8 }}>
      <MotionBox
        textAlign="center"
        mb={6}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Last Updated: June 2025
        </Typography>
      </MotionBox>

      <Grid container spacing={4}>
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <MotionCard
              whileHover={cardHover.hover}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }} 
              custom={index}
              variants={fadeIn}
              sx={{
                height: '100%',
                borderRadius: 2,
                p: 2,
                background:
                  theme.palette.mode === 'light' ? 'rgba(255,255,255,0.8)' : 'rgba(30,30,30,0.8)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.light,
                      mr: 2,
                    }}
                  >
                    {icons[index % icons.length]}
                  </Avatar>
                  <Typography variant="h6" fontWeight={600}>
                    {section.title}
                  </Typography>
                </Box>

                {section.content && (
                  <Typography variant="body2" paragraph color="text.secondary">
                    {section.content}
                  </Typography>
                )}

                {section.items && (
                  <List dense disablePadding>
                    {section.items.map((item, i) => (
                      <ListItem key={i} sx={{ pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 28, pt: '6px' }}>
                          <FiberManualRecordIcon sx={{ fontSize: 8 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            variant: 'body2',
                            sx: { fontSize: '0.95rem' },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      {/* Contact Us Button */}
      <MotionBox
        mt={8}
        textAlign="center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Contact Us
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Questions about your data? Reach out anytime.
        </Typography>

        <a href="mailto:privacy@altiv.ai" style={{ textDecoration: 'none' }}>
          <Box
            component={m.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            sx={{
              px: 3,
              py: 1.25,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              color: 'white',
              backgroundColor: theme.palette.primary.main,
              border: 'none',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Email Us at privacy@altiv.ai
          </Box>
        </a>
      </MotionBox>

      {/* Footer Note */}
      <MotionBox
        mt={6}
        pt={3}
        borderTop={`1px solid ${theme.palette.divider}`}
        textAlign="center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <Typography
          variant="body2"
          sx={{
            fontStyle: 'italic',
            color: 'text.secondary',
          }}
        >
          We keep it simple: your data helps us help you, and we protect it like it’s our own.
        </Typography>
      </MotionBox>
    </Container>
  );
};

export default PrivacyPolicyPage;
