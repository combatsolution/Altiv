import { m } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { MotionViewport } from 'src/components/animate';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

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

export default function ListedJourney({ price }) {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        maxWidth: '100%',
        width: '100%',
        py: { xs: 4, md: 4 },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
         <Divider sx={{my:3, width:'100%'}}/>
        
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

      {FAQS.map((faq, idx) => (
        <Box key={faq.question}>
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
              sx={{
                '& .MuiAccordionSummary-content': { my: 0.5 },
              }}
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
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>

          {/* ✅ Show divider only if not the last FAQ */}
          {idx < FAQS.length && (
            <Divider sx={{ bgcolor: 'grey.100', my: 1 }} />
          )}
        </Box>))}
      <Box
        sx={{ mt: 4, textAlign: 'center' }}>
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

        <Box sx={{ mt: 1, textAlign: 'center', display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          {/* Primary Button */}
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
            {/* Enroll & Pay ${price.toLocaleString()} */}
            Enroll & Pay ${price?.toLocaleString() || '0'}

          </Button>

          {/* Secondary Link */}
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


ListedJourney.propTypes = {
  price: PropTypes.number,
};