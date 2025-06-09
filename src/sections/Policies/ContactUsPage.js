import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Paper,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';
import {
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  RecordVoiceOver as MediaIcon,
} from '@mui/icons-material';

const ContactUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const contactData = {
    heading: "Ready to future-proof your career? We're here to help.",
    sections: [
      {
        title: 'Get in Touch',
        icon: <EmailIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
        items: [
          {
            text: 'hello@altiv.ai',
            href: 'mailto:hello@altiv.ai',
            icon: <EmailIcon sx={{ color: '#1976d2' }} />,
          },
        ],
      },
      {
        title: 'Connect With Us',
        icon: (
          <LinkedInIcon
            sx={{ display: 'flex', alignItems: 'center', fontSize: 40, color: '#0a66c2' }}
          />
        ),
        description: 'Follow our journey and join the conversation about the future of work:',
        items: [
          {
            text: 'Altiv.AI',
            href: 'https://linkedin.com/company/altiv-ai',
            icon: <LinkedInIcon sx={{ color: '#0a66c2' }} />,
          },
          {
            text: '@altivai',
            href: 'https://twitter.com/altivai',
            icon: <TwitterIcon sx={{ color: '#1da1f2' }} />,
          },
          {
            text: '@altiv.ai',
            href: 'https://instagram.com/altiv.ai',
            icon: <InstagramIcon sx={{ color: '#e4405f' }} />,
          },
        ],
      },
      {
        title: 'Media Inquiries',
        icon: <MediaIcon sx={{ fontSize: 40, color: '#6a1b9a' }} />,
        items: [
          {
            text: "Email us with 'Media' in the subject line",
            href: 'mailto:hello@altiv.ai?subject=Media Inquiry',
            icon: <MediaIcon sx={{ color: '#6a1b9a' }} />,
          },
        ],
      },
    ],
    footerText:
      "Your success is our priority. Whether you have questions about our programs, want to discuss your AI-readiness assessment, or need guidance on getting started, we're here to help you navigate your career evolution in the AI era.",
  };

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 4 : 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            fontSize: isMobile ? '2rem' : '2.5rem',
            mb: 2,
          }}
        >
          Contact Us
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary">
          {contactData.heading}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {contactData.sections.map((section, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                height: '100%',
                p: 4,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Box sx={{ mb: 2 }}>{section.icon}</Box>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {section.title}
              </Typography>

              {section.description && (
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  {section.description}
                </Typography>
              )}

              <Box
                sx={{
                  width: '100%',
                  mt: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {section.items.map((item, itemIndex) => (
                  <Button
                    key={itemIndex}
                    component={Link}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textTransform: 'none',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      mb: 0.5,
                      fontWeight: 500,
                      textAlign: 'center',
                      gap: 0.5,
                      // py: 0.3,
                    }}
                  >
                    {item.icon}
                    <Typography variant="body1">{item.text}</Typography>
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          mt: 8,
          p: 4,
          backgroundColor: theme.palette.grey[50],
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          {contactData.footerText}
        </Typography>
      </Box>
    </Container>
  );
};

export default ContactUsPage;
