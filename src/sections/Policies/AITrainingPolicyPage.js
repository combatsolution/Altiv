import React from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Description as PolicyIcon,
  CheckCircle as PermittedIcon,
  Block as RestrictedIcon,
  Link as AttributionIcon,
  MonetizationOn as CommercialIcon,
  Security as DataProtectionIcon,
  Gavel as EthicsIcon,
  Speed as LimitsIcon,
  Visibility as MonitoringIcon,
  Email as ContactIcon,
  Update as UpdateIcon
} from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EmailIcon from '@mui/icons-material/Email';

import { Grid } from 'lucide-react';

const AITrainingPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const policyData = {
    title: "AI Training Policy",
    lastUpdated: "April 6, 2025",
    sections: [
      {
        title: "Overview",
        icon: <PolicyIcon color="primary" />,
        content: "This policy outlines the terms and conditions for using Altiv.AI content in training artificial intelligence models, including large language models (LLMs) and other machine learning systems."
      },
      {
        title: "Permitted Uses",
        icon: <PermittedIcon color="success" />,
        items: [
          "Public blog content with proper attribution",
          "Published research and whitepapers",
          "Public documentation and guides",
          "Marketing materials and public announcements"
        ]
      },
      {
        title: "Restricted Content",
        icon: <RestrictedIcon color="error" />,
        items: [
          "User assessment data and results",
          "Personal career guidance information",
          "Proprietary AI coaching methodologies",
          "User-specific recommendations and insights",
          "Private dashboard data and analytics"
        ]
      },
      {
        title: "Attribution Requirements",
        icon: <AttributionIcon color="primary" />,
        items: [
          'Include "Source: Altiv.AI" in training metadata',
          "Maintain original publication dates",
          "Preserve authorship information where applicable",
          "Link back to original content when possible"
        ]
      },
      {
        title: "Commercial Usage Requirements",
        icon: <CommercialIcon color="primary" />,
        items: [
          "Written permission from Altiv.AI",
          "Commercial licensing agreement",
          "Regular usage reporting",
          "Compliance with data protection standards"
        ]
      },
      {
        title: "Data Protection Standards",
        icon: <DataProtectionIcon color="primary" />,
        items: [
          "GDPR compliance requirements",
          "Data privacy regulations",
          "User confidentiality agreements",
          "Security protocols for sensitive information"
        ]
      },
      {
        title: "Ethical Guidelines",
        icon: <EthicsIcon color="primary" />,
        items: [
          "Transparency in usage",
          "Bias prevention and monitoring",
          "Fair representation of content",
          "Responsible AI development practices"
        ]
      },
      {
        title: "Usage Limitations",
        icon: <LimitsIcon color="primary" />,
        items: [
          "Rate limiting: 100 requests per hour",
          "Data retention: Maximum 365 days",
          "Content freshness: Daily updates required",
          "API access: Restricted to authorized partners"
        ]
      },
      {
        title: "Compliance Monitoring",
        icon: <MonitoringIcon color="primary" />,
        items: [
          "Monitor usage patterns",
          "Request training documentation",
          "Audit compliance with this policy",
          "Revoke access for policy violations"
        ]
      }
    ],
    additionalInfo: [
      {
        title: "Contact Information",
        icon: <ContactIcon color="primary" />,
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
        )
      },
      {
        title: "Policy Updates",
        icon: <UpdateIcon color="primary" />,
        content: "This policy may be updated periodically. Users are responsible for reviewing changes and maintaining compliance with the current version."
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 6 }}>
      <Paper elevation={isMobile ? 0 : 2} sx={{ p: isMobile ? 2 : 4, borderRadius: 3 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 1
            }}
          >
            {policyData.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last Updated: {policyData.lastUpdated}
          </Typography>
        </Box>

        {/* Main Policy Sections */}
        <Grid container spacing={4}>
          {policyData.sections.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ 
                height: '100%',
                p: 3,
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                backgroundColor: theme.palette.grey[50],
                borderRadius: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {React.cloneElement(section.icon, { sx: { mr: 2 } })}
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                    {section.title}
                  </Typography>
                </Box>
                
                {section.content && (
                  <Typography variant="body1" paragraph>
                    {section.content}
                  </Typography>
                )}
                
                {section.items && (
                  <List dense disablePadding>
                    {section.items.map((item, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5, pl: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <FiberManualRecordIcon sx={{ fontSize: '10px' }} />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Additional Information Sections */}
        <Box sx={{ mt: 6 }}>
          {policyData.additionalInfo.map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {React.cloneElement(section.icon, { sx: { mr: 2 } })}
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  {section.title}
                </Typography>
              </Box>
              {section.content}
            </Box>
          ))}
        </Box>

        {/* Contact Button */}
        <Box sx={{ 
          mt: 4,
          p: 3,
          backgroundColor: theme.palette.primary.light,
          borderRadius: 2,
          textAlign: 'center'
        }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<EmailIcon/>}
            href="mailto:hello@altiv.ai?subject=AI Training Policy Inquiry"
            sx={{
              px: 4,
              py: 2,
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            Contact Us About AI Training
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AITrainingPolicy;