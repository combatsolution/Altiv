import React, { useState, useEffect } from 'react';

import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
  IconButton,
  InputBase
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from 'src/utils/axios';
import { m } from 'framer-motion';

const MotionBox = m(Box);
const MotionPaper = m(Paper);
const MotionImg = m(Box);

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function FAQPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [faqs, setFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axiosInstance.get('/faqs');
        const data = response.data;

        // Group by category
        const grouped = data.reduce((acc, item) => {
          const category = item.faqCategory?.categoryName || 'Other';
          if (!acc[category]) acc[category] = [];
          acc[category].push({
            q: item.question,
            a: item.answer
          });
          return acc;
        }, {});

        // Format data
        const formatted = Object.entries(grouped).map(([title, qa]) => ({
          title,
          qa
        }));

        setFaqs(formatted);
      } catch (err) {
        console.error('Error fetching FAQ:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const filteredFaqs = faqs
    .map((section) => ({
      ...section,
      qa: section.qa.filter(
        (item) =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter((section) => section.qa.length > 0);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h6" align="center">
          Loading FAQs...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Header Section */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: { xs: 4, md: 6 } }}
      >
        <Grid item xs={12} md={6}>
          <MotionBox
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: '1.8rem', md: '2.2rem' }, 
              }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={3}>
              Get answers to your most common questions about our platform, pricing, and outcomes.
            </Typography>

            {/* Search Input */}
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 1,
                borderRadius: 5,
                mb: 3,
                width: '100%',
                boxShadow: theme.shadows[2],
              }}
            >
              <InputBase
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ ml: 1, flex: 1, fontSize: 15 }}
              />
              <IconButton color="primary">
                <SearchIcon />
              </IconButton>
            </Paper>
          </MotionBox>
        </Grid>

        {!isMobile && (
          <Grid item md={5}>
            <MotionImg
              component="img"
              src="/assets/images/faq.jpg" // ✅ replace with your actual image path
              alt="FAQ Illustration"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              sx={{
                width: '100%',
                borderRadius: 3,
                boxShadow: theme.shadows[3],
              }}
            />
          </Grid>
        )}
      </Grid>

      {/* FAQ Content */}
      <Grid container spacing={4}>
        {filteredFaqs.map((section, index) => (
          <Grid item xs={12} md={6} key={index}>
            <MotionPaper
              elevation={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={fadeIn}
              sx={{
                borderRadius: 3,
                p: { xs: 2, md: 3 },
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{ color: theme.palette.primary.main }}
              >
                {section.title}
              </Typography>

              <Stack spacing={2}>
                {section.qa.map((item, i) => (
                  <Accordion
                    key={i}
                    sx={{
                      boxShadow: 'none',
                      borderRadius: 2,
                      '&:before': { display: 'none' },
                      transition: 'all 0.3s ease',
                      '&.Mui-expanded': {
                        bgcolor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography fontWeight={600}>{item.q}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="text.secondary" whiteSpace="pre-line">
                        {item.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </MotionPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
