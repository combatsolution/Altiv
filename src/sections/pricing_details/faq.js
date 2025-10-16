import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { MotionViewport } from 'src/components/animate';
import axiosInstance from 'src/utils/axios';

const FAQS = [
  {
    question: "Do I need coding experience?",
    answer: "No. All workflows are no-code with step-by-step templates.",
  },
  {
    question: "Will I get a certificate?",
    answer: "Yes. Finish the capstone to earn a verified digital badge shareable on LinkedIn.",
  },
  {
    question: "What if I miss a live session?",
    answer: "Sessions are recorded; you can catch up anytime.",
  },
];

export default function Faq({ price }) {
  const theme = useTheme();
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axiosInstance.get('/faqs');
       const filteredFaq = response.data.filter((faq)=>[17,18,19].includes(faq.id));
      
        setFaqs(filteredFaq);
        console.log('Fetched FAQs:', response.data);    
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <Container
      component={MotionViewport}
      sx={{ maxWidth: '100%', width: '100%', py: { xs: 4, md: 4 } }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Divider sx={{ my: 3, width: '100%' }} />
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.dark,
            mb: 1,
            fontSize: { xs: '1.5rem', md: '1.6rem' },
          }}
        >
          FAQs
        </Typography>
      </Box>

      {(faqs.length > 0 ? faqs : FAQS).map((faq, idx) => (
        <Box key={faq.question || idx}>
          <Accordion
            sx={{
              boxShadow: 'none',
              border: 0,
              borderRadius: 0,
              '&:before': { display: 'none' },
              width: '100%',  
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-content-${idx}`}
              id={`faq-header-${idx}`}
              sx={{ '& .MuiAccordionSummary-content': { my: 0.5 } }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ bgcolor: '#fafbfc' }}>
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.98rem',
                  textAlign:'left'
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {idx < FAQS.length && <Divider sx={{ bgcolor: 'grey.100', my: 1 }} />}
        </Box>
      ))}

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.dark,
            mb: 1,
            fontSize: { xs: '1.5rem', md: '1.6rem' },
          }}
        >
          Future-proof your marketing career today
        </Typography>

        <Box
          sx={{
            mt: 1,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 2,
              py: 1,
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: 1,
            }}
          >
            Enroll & Pay ${price?.toLocaleString() || '0'}
          </Button>

          <Button
            color="primary"
            sx={{
              px: 1,
              py: 1,
              fontWeight: 600,
              fontSize: '15px',
              borderRadius: 2,
            }}
          >
            Need more info
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

Faq.propTypes = {
  price: PropTypes.number,
};
