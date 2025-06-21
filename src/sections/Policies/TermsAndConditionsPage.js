import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';

export default function TermsAndConditionsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Centered Headline */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        align="center"
        sx={{ color: '#2A4DD0' }}
      >
        Terms and Conditions
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        mb={4}
        align="center"
      >
        Last Updated: June 21, 2025
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {[
        {
          title: '1. Introduction',
          content:
            'Welcome to our application. By accessing or using our service, you agree to be bound by these terms.',
        },
        {
          title: '2. Use of the Service',
          content:
            'You agree to use the service only for lawful purposes and in accordance with these Terms.',
        },
        {
          title: '3. User Accounts',
          content:
            'When you create an account with us, you must provide us information that is accurate, complete, and current.',
        },
        {
          title: '4. Intellectual Property',
          content:
            'The service and its original content, features, and functionality are and will remain the exclusive property of the company.',
        },
        {
          title: '5. Termination',
          content:
            'We may terminate or suspend access to our service immediately, without prior notice, for any reason.',
        },
        {
          title: '6. Changes to Terms',
          content:
            'We reserve the right to update or change our Terms and Conditions at any time. Your continued use constitutes acceptance.',
        },
      ].map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {section.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {section.content}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ my: 4 }} />

      {/* Action Button */}
      <Box textAlign="center">
        <Button
          variant="contained"
          size={isMobile ? 'medium' : 'large'}
          sx={{
            backgroundColor: '#2A4DD0',
            color: '#fff',
            px: 4,
            '&:hover': {
              backgroundColor: '#2445b5',
            },
          }}
        >
          I Agree
        </Button>
      </Box>
    </Container>
  );
}
