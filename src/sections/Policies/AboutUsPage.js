import React from 'react';
import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  Button,
} from '@mui/material';
import { Explore as ExploreIcon } from '@mui/icons-material';

const AboutUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const aboutData = {
    title: 'About Us',
    tagline:
      "In an era where AI is reshaping careers faster than ever, we're building something different: a career intelligence platform that turns uncertainty into opportunity.",
    sections: [
      {
        title: '1. Our Story',
        content:
          'Altiv.AI emerged from a simple observation: while AI generates endless career anxiety, it also creates unprecedented opportunities for those who can adapt. Traditional career platforms haven\'t kept pace with this reality - they\'re still matching static skills to job descriptions, while the nature of work itself is being transformed.',
      },
      {
        title: '2. What We Do',
        content:
          'We help ambitious professionals navigate the AI revolution with clarity and confidence. Our platform combines advanced AI analysis with practical career guidance to:',
        items: [
          'Map your current skills against emerging AI capabilities',
          'Identify your unique opportunities for AI augmentation',
          'Create personalized pathways for career evolution',
          'Connect you with roles that maximize your potential',
        ],
      },
      {
        title: '3. Why We\'re Different',
        content:
          'Unlike traditional job boards or career coaches, we:',
        items: [
          'Analyze tasks, not just skills',
          'Focus on augmentation opportunities, not just automation risks',
          'Provide dynamic career pathways, not static job matches',
          'Offer data-driven insights, not generic advice',
        ],
      },
      {
        title: '4. Our Mission',
        content:
          'We believe everyone deserves to thrive in the AI era. Our mission is to help one million professionals transform their relationship with AI from anxiety to advantage in 2025.',
      },
      {
        title: '5. Who We Serve',
        content:
          'We specialize in supporting professionals in rapidly evolving fields:',
        items: [
          'Marketing Innovators',
          'Product Leaders',
          'Data Scientists',
          'Software Engineers',
          'And others embracing the AI transition',
        ],
        closing:
          'Whether you\'re looking to future-proof your career, pivot to an AI-enhanced role, or simply understand where you stand, we provide the insights and guidance you need to move forward with confidence.',
      },
      {
        title: '6. Our Approach',
        items: [
          'Clarity First: Understand your AI-readiness with our proprietary AI-vantage Score',
          'Strategic Guidance: Transform insights into action with personalized development paths',
          'Continuous Evolution: Stay ahead with ongoing updates aligned with market shifts',
        ],
      },
    ],
    cta: {
      text: 'The future of work is being rewritten. Don\'t just react to change - get ahead of it.',
      button: 'Start Your AI-Ready Career Journey',
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 4 : 8 }}>
      {/* Page Title */}
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: isMobile ? '2rem' : '3rem',
            mb: 2,
            color: 'primary.main',
          }}
        >
          {aboutData.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: isMobile ? '1.05rem' : '1.2rem',
            color: 'text.secondary',
            maxWidth: 700,
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          {aboutData.tagline}
        </Typography>
      </Box>

      {/* Section Loop */}
      {aboutData.sections.map((section, index) => (
        <Box key={index} sx={{ mb: 6 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: isMobile ? '1.15rem' : '1.35rem',
              mb: 2,
              color: 'text.primary',
            }}
          >
            {section.title}
          </Typography>

          {section.content && (
            <Typography
              variant="body1"
              sx={{ fontSize: '1rem', lineHeight: 1.8, mb: 2 }}
            >
              {section.content}
            </Typography>
          )}

          {section.items && (
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              {section.items.map((item, idx) => (
                <li key={idx}>
                  <Typography
                    component="span"
                    sx={{ fontSize: '1rem', lineHeight: 1.7 }}
                  >
                    {item}
                  </Typography>
                </li>
              ))}
            </Box>
          )}

          {section.closing && (
            <Typography
              variant="body1"
              sx={{ fontSize: '1rem', lineHeight: 1.8 }}
            >
              {section.closing}
            </Typography>
          )}

          {index !== aboutData.sections.length - 1 && (
            <Divider sx={{ mt: 4 }} />
          )}
        </Box>
      ))}

      {/* Call to Action */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          backgroundColor: theme.palette.primary.light,
          borderRadius: 2,
          textAlign: 'center',
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 600,
            fontSize: isMobile ? '1.1rem' : '1.25rem',
          }}
        >
          {aboutData.cta.text}
        </Typography>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          endIcon={<ExploreIcon />}
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1.05rem',
            fontWeight: 600,
            borderRadius: 3,
          }}
        >
          {aboutData.cta.button}
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUsPage;
