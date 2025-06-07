import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Link,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const PrivacyPolicy = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const policyData = {
    lastUpdated: "June 2025",
    introduction: "This Privacy Policy describes how we collect, use, and protect your personal information when you use our services. By accessing our platform, you agree to the terms outlined below.",
    sections: [
      {
        title: "Information We Collect",
        content: "We collect various types of information to provide and improve our services:",
        items: [
          "Personal information (name, email, phone number, professional details)",
          "Assessment responses and career preferences",
          "Usage data and analytics to improve your experience",
          "Payment information (processed securely via PCI-compliant providers)"
        ]
      },
      {
        title: "How We Use Your Information",
        content: "Your data enables us to deliver personalized services:",
        items: [
          "Provide customized career insights and recommendations",
          "Deliver mentorship and program support",
          "Enhance and optimize our platform",
          "Communicate important updates about your progress",
          "Develop new features and services"
        ]
      },
      {
        title: "Data Protection",
        content: "We implement robust security measures:",
        items: [
          "End-to-end encryption for all sensitive data",
          "Regular third-party security audits",
          "Secure cloud storage with access controls",
          "Limited employee access on a need-to-know basis",
          "Compliance with GDPR and other privacy regulations"
        ]
      },
      {
        title: "Your Privacy Rights",
        content: "You have full control over your data:",
        items: [
          "Access and review your personal information",
          "Request corrections to inaccurate data",
          "Download your data in portable format",
          "Request account deletion",
          "Opt-out of marketing communications",
          "Withdraw consent for data processing"
        ]
      },
      {
        title: "Cookies and Tracking",
        content: "We use cookies and similar technologies to:",
        items: [
          "Maintain secure user sessions",
          "Remember preferences and settings",
          "Analyze platform usage patterns",
          "Improve performance and reliability",
          "You can manage cookies through your browser settings"
        ]
      },
      {
        title: "Third-Party Services",
        content: "We only share data when necessary:",
        items: [
          "With trusted service providers under strict contracts",
          "When required by law or legal process",
          "During business transfers (mergers/acquisitions)",
          "Never for marketing purposes without consent"
        ]
      }
    ],
    contact: {
      heading: "Contact Our Privacy Team",
      text: "If you have questions about this policy or your data:",
      email: "privacy@altiv.ai",
      address: "Altiv Data Protection Officer, 123 Privacy Lane, San Francisco, CA 94107"
    },
    changes: "We may update this policy periodically. Significant changes will be notified through our platform or email.",
    tagline: "Your trust is our priority. We protect your data with the highest security standards and transparency."
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={isMobile ? 0 : 1} sx={{ 
        p: { xs: 3, md: 6 },
        borderRadius: 2,
        boxShadow: { md: theme.shadows[3] }
      }}>
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2
            }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Last Updated: {policyData.lastUpdated}
          </Typography>
        </Box>

        {/* Introduction */}
        <Typography paragraph sx={{ mb: 4, fontSize: '1.1rem' }}>
          {policyData.introduction}
        </Typography>

        {/* Policy Sections */}
        {policyData.sections.map((section, index) => (
          <Box key={index} sx={{ mb: 5 }}>
            <Typography 
              variant="h4" 
              component="h2"
              sx={{ 
                fontWeight: 600,
                color: 'primary.dark',
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                mb: 2
              }}
            >
              {section.title}
            </Typography>
            
            {section.content && (
              <Typography paragraph sx={{ mb: 2 }}>
                {section.content}
              </Typography>
            )}
            
            <List dense>
              {section.items.map((item, itemIndex) => (
                <ListItem key={itemIndex} sx={{ alignItems: 'flex-start', px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32, pt: '4px' }}>
                    <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item} 
                    primaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
              ))}
            </List>
            
            {index < policyData.sections.length - 1 && (
              <Divider sx={{ my: 4 }} />
            )}
          </Box>
        ))}

        {/* Contact Information */}
        <Box sx={{ 
          backgroundColor: theme.palette.grey[50],
          p: 4,
          borderRadius: 2,
          mt: 4
        }}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
            {policyData.contact.heading}
          </Typography>
          <Typography paragraph>
            {policyData.contact.text}
          </Typography>
          <List dense>
            <ListItem sx={{ px: 0 }}>
              <ListItemText
                primary={
                  <Link href={`mailto:${policyData.contact.email}`} color="primary">
                    {policyData.contact.email}
                  </Link>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary={policyData.contact.address} />
            </ListItem>
          </List>
        </Box>

        {/* Policy Changes */}
        <Typography paragraph sx={{ mt: 4, fontStyle: 'italic' }}>
          {policyData.changes}
        </Typography>

        {/* Footer Tagline */}
        <Typography 
          align="center" 
          sx={{ 
            mt: 6,
            fontWeight: 500,
            color: 'primary.main',
            fontSize: '1.1rem'
          }}
        >
          {policyData.tagline}
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;