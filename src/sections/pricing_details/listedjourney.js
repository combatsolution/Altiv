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

export default function FAQSection() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 8, md: 12 },
        maxWidth: { xs: '100% !important', md: '1000px !important' },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            mb: 1,
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          FAQs
        </Typography>
        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '1rem',
            mb: 2,
          }}
        >
          Get answers to common questions about government bond investments.
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
          {idx < FAQS.length - 1 && (
            <Divider sx={{ bgcolor: 'grey.300', my: 1 }} />
          )}
        </Box>
      ))}
    </Container>
  );
}
