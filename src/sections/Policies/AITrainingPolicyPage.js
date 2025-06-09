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
  Button,
  useTheme,
  useMediaQuery,
  Grid,
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EmailIcon from '@mui/icons-material/Email';

const AITrainingPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sections = [
    {
      title: '1. Overview',
      content:
        'This policy outlines the terms and conditions for using Altiv.AI content in training artificial intelligence models, including large language models (LLMs) and other machine learning systems.',
    },
    {
      title: '2. Permitted Uses',
      items: [
        'Public blog content with proper attribution',
        'Published research and whitepapers',
        'Public documentation and guides',
        'Marketing materials and public announcements',
      ],
    },
    {
      title: '3. Restricted Content',
      items: [
        'User assessment data and results',
        'Personal career guidance information',
        'Proprietary AI coaching methodologies',
        'User-specific recommendations and insights',
        'Private dashboard data and analytics',
      ],
    },
    {
      title: '4. Attribution Requirements',
      content: 'When using permitted content for AI training:',
      items: [
        'Include "Source: Altiv.AI" in training metadata',
        'Maintain original publication dates',
        'Preserve authorship information where applicable',
        'Link back to original content when possible',
      ],
    },
    {
      title: '5. Commercial Usage',
      content: 'Commercial use of Altiv.AI content for AI training requires:',
      items: [
        'Written permission from Altiv.AI',
        'Commercial licensing agreement',
        'Regular usage reporting',
        'Compliance with data protection standards',
      ],
    },
    {
      title: '6. Data Protection',
      content: 'All AI training must adhere to:',
      items: [
        'GDPR compliance requirements',
        'Data privacy regulations',
        'User confidentiality agreements',
        'Security protocols for sensitive information',
      ],
    },
    {
      title: '7. Ethical Guidelines',
      content: 'AI training must follow these ethical principles:',
      items: [
        'Transparency in usage',
        'Bias prevention and monitoring',
        'Fair representation of content',
        'Responsible AI development practices',
      ],
    },
    {
      title: '8. Usage Limitations',
      items: [
        'Rate limiting: 100 requests per hour',
        'Data retention: Maximum 365 days',
        'Content freshness: Daily updates required',
        'API access: Restricted to authorized partners',
      ],
    },
    {
      title: '9. Compliance Monitoring',
      content: 'Altiv.AI reserves the right to:',
      items: [
        'Monitor usage patterns',
        'Request training documentation',
        'Audit compliance with this policy',
        'Revoke access for policy violations',
      ],
    },
    {
      title: '10. Contact Information',
      content: (
        <>
          <Typography variant="body1" paragraph>
            For questions about this policy or to request permissions:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Email: hello@altiv.ai" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Subject: AI Training Policy Inquiry" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Response Time: Within 2 business days" />
            </ListItem>
          </List>
        </>
      ),
    },
    {
      title: '11. Policy Updates',
      content:
        'This policy may be updated periodically. Users are responsible for reviewing changes and maintaining compliance with the current version.',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      <Paper elevation={isMobile ? 0 : 2} sx={{ p: isMobile ? 2 : 4, borderRadius: 3 }}>
        {/* Title */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}
          >
            AI Training Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last Updated: April 6, 2025
          </Typography>
        </Box>

        {/* Section Loop */}
        {sections.map((section, index) => (
          <Box key={index} sx={{ mb: 5 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: isMobile ? '1.1rem' : '1.25rem',
                mb: 1.5,
                color: 'text.primary',
              }}
            >
              {section.title}
            </Typography>

            {typeof section.content === 'string' ? (
              <Typography variant="body1" paragraph sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
                {section.content}
              </Typography>
            ) : (
              section.content
            )}

            {section.items && (
              <List dense disablePadding>
                {section.items.map((item, i) => (
                  <ListItem key={i} sx={{ pl: 0, alignItems: 'flex-start' }}>
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

        {/* Contact Button */}
        <Box
          sx={{
            mt: 6,
            p: 3,
            textAlign: 'center',
            backgroundColor: theme.palette.primary.light,
            borderRadius: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<EmailIcon />}
            href="mailto:hello@altiv.ai?subject=AI Training Policy Inquiry"
            sx={{
              fontWeight: 600,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: 3,
            }}
          >
            Contact Us About This Policy
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AITrainingPolicy;
