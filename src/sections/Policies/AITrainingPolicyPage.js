

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
  Avatar,
  Chip,
} from '@mui/material';
import { m } from 'framer-motion';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EmailIcon from '@mui/icons-material/Email';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';

const MotionBox = m(Box);
const MotionPaper = m(Paper);

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const cardVariants = {
  hover: {
    y: -5,
    boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
    transition: { duration: 0.3 }
  }
};

const AITrainingPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sections = [
    {
      title: '1. Overview',
      icon: <PolicyIcon color="primary" />,
      content:
        'This policy outlines the terms and conditions for using Altiv.AI content in training artificial intelligence models, including large language models (LLMs) and other machine learning systems.',
    },
    {
      title: '2. Permitted Uses',
      icon: <PolicyIcon color="success" />,
      items: [
        'Public blog content with proper attribution',
        'Published research and whitepapers',
        'Public documentation and guides',
        'Marketing materials and public announcements',
      ],
    },
    {
      title: '3. Restricted Content',
      icon: <GavelIcon color="warning" />,
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
      icon: <PolicyIcon color="info" />,
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
      icon: <PolicyIcon color="secondary" />,
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
      icon: <SecurityIcon color="primary" />,
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
      icon: <PolicyIcon color="success" />,
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
      icon: <PolicyIcon color="warning" />,
      items: [
        'Rate limiting: 100 requests per hour',
        'Data retention: Maximum 365 days',
        'Content freshness: Daily updates required',
        'API access: Restricted to authorized partners',
      ],
    },
    {
      title: '9. Compliance Monitoring',
      icon: <GavelIcon color="secondary" />,
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
      icon: <EmailIcon color="primary" />,
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
      icon: <PolicyIcon color="info" />,
      content:
        'This policy may be updated periodically. Users are responsible for reviewing changes and maintaining compliance with the current version.',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      <MotionPaper
        elevation={isMobile ? 0 : 2}
        sx={{ p: isMobile ? 2 : 4, borderRadius: 3 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Title */}
        <MotionBox 
          textAlign="center" 
          mb={5}
          variants={fadeIn}
        >
          <Chip
            label="Legal Policy"
            color="primary"
            size="medium"
            sx={{ mb: 2 }}
            icon={<PolicyIcon />}
          />
          <Typography
            variant="h3"
            component="h1"
            sx={{ 
              fontWeight: 700, 
              mb: 1, 
              color: theme.palette.primary.main,
              fontSize: isMobile ? '2rem' : '2.5rem'
            }}
          >
            AI Training Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last Updated: April 6, 2025
          </Typography>
        </MotionBox>

        {/* Section Loop */}
        <Grid container spacing={3}>
          {sections.map((section, index) => (
            <Grid item xs={12} key={index}>
              <MotionBox
                variants={fadeIn}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <MotionPaper
                  elevation={0}
                  sx={{ 
                    p: 3,
                    borderRadius: 2,
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[3],
                      borderLeft: `4px solid ${theme.palette.secondary.main}`,
                    }
                  }}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ 
                      bgcolor: theme.palette.background.paper,
                      color: theme.palette.primary.main,
                      mr: 2,
                      width: 40,
                      height: 40
                    }}>
                      {section.icon}
                    </Avatar>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: isMobile ? '1.1rem' : '1.25rem',
                        color: 'text.primary',
                      }}
                    >
                      {section.title}
                    </Typography>
                  </Box>

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
                </MotionPaper>
              </MotionBox>
            </Grid>
          ))}
        </Grid>

        {/* Contact Button */}
        <MotionBox
          sx={{
            mt: 6,
            p: 3,
            textAlign: 'center', 
          }}
          variants={fadeIn}
          custom={sections.length}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<EmailIcon />}
            href="mailto:hello@altiv.ai?subject=AI Training Policy Inquiry"
            sx={{
              fontWeight: 600,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: theme.shadows[4],
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[6],
              },
              transition: 'all 0.3s ease',
            }}
          >
            Contact Us About This Policy
          </Button>
        </MotionBox>
      </MotionPaper>
    </Container>
  );
};

export default AITrainingPolicy;