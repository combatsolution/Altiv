import React from 'react';
import { Box, Container, Typography, Divider, useMediaQuery, useTheme } from '@mui/material';
import Link from '@mui/material/Link';
import { trackEvent } from 'src/utils/google-analytics';

export default function TermsAndConditionsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleEmailClick = () => {
    trackEvent({
      category: 'Email Click',
      action: 'Clicked',
      label: '@altlegaliv.ai',
      value:'',
    });
  };

  const sections = [
    {
      title: '1. Using Our Platform',
      content: [
        'You must be at least 18 years old to use Altiv.AI.',
        'Keep your account information accurate and up-to-date.',
        "You're responsible for maintaining the confidentiality of your password.",
        "Don't share your account with others - we take this very seriously.",
      ],
    },
    {
      title: '2. Your Content',
      content: [
        'You own your content (resumes, career information, etc.).',
        'By uploading content, you give us permission to use it to provide our services.',
        "We won't share your personal information without your consent.",
        'You agree not to upload anything illegal or harmful.',
      ],
    },
    {
      title: '3. Our Services',
      content: [
        'We provide career intelligence and AI readiness assessment tools.',
        'Services are provided "as is" and may be updated periodically.',
        'We may modify or discontinue features with reasonable notice.',
        'Program content is for your personal use only – do not share via any means including screenshots, recordings, or password/account sharing.',
      ],
    },
    {
      title: '4. Payment Terms',
      content: [
        'Prices are clearly displayed before purchase.',
        'All payments are processed securely.',
        'Refunds are available according to our refund policy.',
        'We may change pricing with advance notice.',
      ],
    },
    {
      title: '5. Privacy',
      content: [
        'We protect your personal information.',
        'We use data to improve your experience.',
        'See our Privacy Policy for details.',
        'We use cookies to enhance functionality.',
      ],
    },
    {
      title: '6. Acceptable Use',
      content: [
        "Don't violate any laws.",
        "Don't share inappropriate content.",
        "Don't try to break or hack the platform.",
        "Don't resell or copy our content.",
        "Don't harass others or spam.",
      ],
    },
    {
      title: '7. Cancellation',
      content: [
        'You can cancel your subscription anytime.',
        'We may terminate accounts that violate these terms.',
      ],
    },
    {
      title: '8. Disclaimer',
      content: [
        "We work hard to provide accurate information but can't guarantee perfection.",
        'Career outcomes depend on many factors beyond our control.',
        "We're not responsible for third-party content or links.",
      ],
    },
    {
      title: '9. Changes to Terms',
      content: [
        'We may update these terms.',
        'We’ll notify you of significant changes.',
        'Continued use means you accept any changes.',
      ],
    },
    {
      title: '10. Contact Us',
      content: [
        <>
          Questions? Contact us at{' '}
          <Link href="mailto:legal@altiv.ai" 
         onClick={handleEmailClick} // ✅ Track email click

          color="primary" underline="hover">
            @altlegaliv.ai
          </Link>
          .
        </>,
      ],
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
        sx={{ color: '#2A4DD0' }}
      >
        Terms of Use
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" mb={4} align="center">
        Last Updated: June 2025
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Typography variant="subtitle1" color="text.secondary" mb={1} align="center">
        Welcome to Altiv.AI
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3} align="center">
        By using Altiv.AI, you agree to these straightforward terms. Please read them carefully.
      </Typography>

      {sections.map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {section.title}
          </Typography>

          {section.content.map((point, idx) => (
            <Typography key={idx} variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              • {typeof point === 'string' ? point : point}
            </Typography>
          ))}
        </Box>
      ))}

      <Divider sx={{ my: 4 }} />
    </Container>
  );
}
