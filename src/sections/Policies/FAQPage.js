import React, { useState } from 'react';
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

 const sections = [
    {
      title: 'General Questions',
      qa: [
        {
          q: 'What is Altiv.AI and how is it different?',
          a: "Altiv.AI is a career intelligence platform that helps professionals understand and adapt to AI's impact on their roles. Unlike traditional career platforms, we analyze your work at a task level, providing specific insights about how AI will affect your role and clear pathways to adapt and grow."
        },
        {
          q: 'Who is Altiv.AI for?',
          a: "Our platform serves professionals in rapidly evolving fields, particularly in Marketing, Data Science, Product Management, and Software Engineering. We're especially helpful for mid to senior-career professionals concerned about AI's impact on their role and those looking to turn AI anxiety into career advantage."
        },
        {
          q: 'Do I need AI expertise to use Altiv.AI?',
          a: "No prior AI knowledge or coding is required. Our platform meets you where you are, whether you're just starting to explore AI's impact or already working with AI tools. We translate complex AI developments into clear, actionable career insights. All we ask for is an open mind - which is critical in times to come."
        }
      ]
    },
    {
      title: 'Platform Features',
      qa: [
        {
          q: 'What is the AI-vantage Score?',
          a: "The AI-vantage Score is our proprietary assessment that analyzes your current role at a task level, showing which aspects are likely to be augmented or automated by AI. It helps you understand your AI exposure and identifies specific opportunities to evolve your role. We help you beat FOBO (Fear of Being Obsolete) using our AI-vantage Score."
        },
        {
          q: 'How often is the analysis updated?',
          a: "Our AI impact analysis is updated monthly to reflect new AI capabilities and industry trends. Your personal insights and recommendations are refreshed continuously based on market changes and your progress."
        },
        {
          q: "Can I use this if I'm not actively job hunting?",
          a: "Absolutely. Many of our users are focused on evolving their current roles rather than job searching. The platform helps you understand AI's impact on your work and identifies specific ways to increase your value in your current position as well as build for your future."
        }
      ]
    },
    {
      title: 'Programs & Pricing',
      qa: [
        {
          q: "What's included in each program tier?",
          a: `Quick Start ($49/mo): Essential AI readiness assessment, basic guidance, self-paced learning materials, useful AI templates, and guided simulations.\nTransform ($999/mo): Comprehensive skill development, mentorship, support, and AI-Impact toolkit.\nEdge ($2,300/3mo): Executive coaching, leadership development, and strategic implementation support.`
        },
        {
          q: 'How much time should I commit?',
          a: `Quick Start: 2-3 hours/week\nTransform: 4-6 hours/week\nEdge: 4-6 hours/week\n\nAll programs are flexible and can be adapted to your schedule.`
        },
        {
          q: 'What kind of support do I get?',
          a: `Quick Start: AI-powered feedback and templates\nTransform: Group mentorship and implementation clinics\nEdge: 1-on-1 coaching and executive roundtables`
        },
        {
          q: 'How are the programs different from other options?',
          a: `They focus on real-world implementation, mentorship, problem-solving, and measurable outcomes—not just passive content. Ideal for professionals seeking impactful growth.`
        },
        {
          q: 'How does your refund policy work?',
          a: `Quick Start: Cancel anytime, prorated refund\nTransform: 14-day money-back guarantee\nEdge: 14-day evaluation with full refund option\n\nSpecial Circumstances: Contact us to pause, switch tracks, or discuss payment. Email hello@altiv.ai with subject 'Refund Request'.`
        }
      ]
    },
    {
      title: 'Outcomes & Results',
      qa: [
        {
          q: 'What concrete outcomes can I expect?',
          a: `Understanding AI exposure, skill roadmap, actionable adaptation plan, AI badges, and real-world project outcomes (Transform & Edge).`
        },
        {
          q: 'How do you measure success?',
          a: `Skill development, project delivery, career progression, and role impact.`
        },
        {
          q: 'Can my employer sponsor my participation?',
          a: `Yes. We provide documentation and ROI frameworks. Enterprise packages are available.`
        }
      ]
    },
    {
      title: 'Technical Questions',
      qa: [
        {
          q: 'Do you share my data with third parties?',
          a: `No. All data is confidential. Only anonymized data is used to improve models.`
        },
        {
          q: 'How do you ensure the accuracy of AI impact predictions?',
          a: `Based on real-world data, research, expert validation, and regular updates.`
        }
      ]
    }
  ];

export default function FAQPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = sections
    .map((section) => ({
      ...section,
      qa: section.qa.filter(
        (item) =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter((section) => section.qa.length > 0);

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              fontWeight={700}
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              Frequently Asked Questions
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={3}>
              Get answers to the most common questions
            </Typography>

            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                borderRadius: 10,
                boxShadow: theme.shadows[1],
                px: 2,
                py: 0.5,
                mb: 4
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search question here"
                inputProps={{ 'aria-label': 'search questions' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IconButton type="submit" sx={{ p: 1 }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </MotionBox>
        </Grid>

        <Grid item xs={12} md={6}>
          <MotionImg
            component="img"
            src="/assets/images/faq.jpg"
            alt="faq"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            sx={{ width: '100%' }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} mt={2}>
        {filteredSections.map((section, index) => (
          <Grid item xs={12} md={6} key={index}>
            <MotionPaper
              elevation={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
              variants={fadeIn}
              sx={{
                borderRadius: 2,
                p: { xs: 2, md: 3 },
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {section.title}
              </Typography>
              <Stack spacing={2}>
                {section.qa.map((item, i) => (
                  <Accordion key={i} sx={{ boxShadow: 'none' }}>
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
