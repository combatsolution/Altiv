import React from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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
        'Payment information (processed securely via trusted providers)'
      ]
    },
    {
      title: 'How We Use Your Information',
      items: [
        'Deliver personalized career insights and recommendations',
        'Provide mentorship and program support',
        'Improve our platform and services',
        'Send relevant updates about your progress'
      ]
    },
    {
      title: "What We Don't Do",
      items: [
        "Sell your personal information",
        "Share your data with third parties without your consent",
        "Store payment details on our servers",
        "Use your information for purposes you haven't agreed to"
      ]
    },
    {
      title: 'Data Security',
      items: [
        'Industry-standard encryption',
        'Regular security audits',
        'Secure data storage',
        'Limited employee access'
      ]
    },
    {
      title: 'Your Rights',
      content: 'You can:',
      items: [
        'Access your data',
        'Request corrections',
        'Download your information',
        'Delete your account',
        'Opt out of communications'
      ]
    },
    {
      title: 'Cookies',
      content: 'We use cookies to:',
      items: [
        'Keep you logged in',
        'Remember your preferences',
        'Analyze platform usage',
        'Improve performance'
      ]
    },
    {
      title: 'Contact Us',
      content: 'Questions about your data? Email: privacy@altiv.ai'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      {/* <Paper elevation={isMobile ? 0 : 2} sx={{ p: isMobile ? 2 : 4, borderRadius: 3 }}> */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last Updated: June 2025
          </Typography>
        </Box>

        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: isMobile ? '1.1rem' : '1.25rem',
                mb: 1.5,
                color: 'text.primary'
              }}
            >
              {section.title}
            </Typography>

            {section.content && (
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: '1rem', lineHeight: 1.7 }}
              >
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
                      primaryTypographyProps={{ variant: 'body1', sx: { fontSize: '1rem' } }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}

        {/* Footer Summary */}
        <Box sx={{ mt: 4, borderTop: `1px solid ${theme.palette.divider}`, pt: 3 }}>
          <Typography
            variant="body1"
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
              textAlign: 'center'
            }}  
          >
            We keep it simple: your data helps us help you, and we protect it like it`&apos;s our own.
          </Typography>
        </Box>
      {/* </Paper> */}
    </Container>
  );
};

export default PrivacyPolicyPage;
