import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    section: 'General Questions',
    qa: [
      {
        q: 'What is Altiv.AI and how is it different?',
        a: `Altiv.AI is a career intelligence platform that helps professionals understand and adapt to AI's impact on their roles. Unlike traditional career platforms, we analyze your work at a task level, providing specific insights about how AI will affect your role and clear pathways to adapt and grow.`
      },
      {
        q: 'Who is Altiv.AI for?',
        a: `Our platform serves professionals in rapidly evolving fields, particularly in Marketing, Data Science, Product Management, and Software Engineering. We're especially helpful for mid to senior-career professionals concerned about AI's impact on their role and those looking to turn AI anxiety into career advantage.`
      },
      {
        q: 'Do I need AI expertise to use Altiv.AI?',
        a: `No prior AI knowledge or coding is required. Our platform meets you where you are, whether you're just starting to explore AI's impact or already working with AI tools. We translate complex AI developments into clear, actionable career insights. All we ask for is an open mind - which is critical in times to come.`
      }
    ]
  },
  {
    section: 'Platform Features',
    qa: [
      {
        q: 'What is the AI-vantage Score?',
        a: `The AI-vantage Score is our proprietary assessment that analyzes your current role at a task level, showing which aspects are likely to be augmented or automated by AI. It helps you understand your AI exposure and identifies specific opportunities to evolve your role.`
      },
      {
        q: 'How often is the analysis updated?',
        a: `Our AI impact analysis is updated monthly to reflect new AI capabilities and industry trends. Your personal insights and recommendations are refreshed continuously based on market changes and your progress.`
      },
      {
        q: "Can I use this if I'm not actively job hunting?",
        a: `Absolutely. Many of our users are focused on evolving their current roles rather than job searching. The platform helps you understand AI's impact on your work and identifies specific ways to increase your value in your current position as well as build for your future.`
      }
    ]
  },
  {
    section: 'Programs & Pricing',
    qa: [
      {
        q: `What's included in each program tier?`,
        a: `Quick Start ($49/mo): Essential AI readiness assessment, self-paced materials.\nTransform ($999/mo): Skill development, small group mentorship, community.\nEdge ($2,300/3mo): Executive coaching, strategic projects, leadership support.`
      },
      {
        q: 'How much time should I commit?',
        a: `Quick Start: 2-3 hrs/week\nTransform: 4-6 hrs/week\nEdge: 4-6 hrs/week\n\nAll programs are flexible with on-demand content.`
      },
      {
        q: 'What kind of support do I get?',
        a: `Quick Start: AI-powered feedback\nTransform: Small group mentorship (1:5 ratio)\nEdge: 1-on-1 coaching + executive roundtables`
      },
      {
        q: 'How are the programs different from so many options available?',
        a: `Unlike static online courses, we offer real-world mentorship and implementation. You'll work in small cohorts on actual workplace challenges with expert guidance and measurable outcomes.`
      },
      {
        q: 'How does your refund policy work?',
        a: `Quick Start: Cancel anytime, prorated refund\nTransform: 14-day guarantee, full refund after 1 mentor session\nEdge: 14-day period, full refund after 2 mentor sessions\n\nEmail: hello@altiv.ai (Subject: Refund Request)`
      }
    ]
  },
  {
    section: 'Outcomes & Results',
    qa: [
      {
        q: 'What concrete outcomes can I expect?',
        a: `- Clear AI exposure understanding\n- Specific skill roadmap\n- Career adaptation plan\n- AI readiness badges\nTransform & Edge complete real-world AI projects`
      },
      {
        q: 'How do you measure success?',
        a: `We track skill progress, implementation results, promotions, and role impact metrics.`
      },
      {
        q: 'Can my employer sponsor my participation?',
        a: `Yes. We provide ROI docs and enterprise options for team-based support.`
      }
    ]
  },
  {
    section: 'Technical Questions',
    qa: [
      {
        q: 'Do you share my data with third parties?',
        a: `No. Your data is confidential and only used in aggregate to improve insights.`
      },
      {
        q: 'How do you ensure the accuracy of AI impact predictions?',
        a: `We combine expert analysis, real-world feedback, industry data, and continuous updates.`
      }
    ]
  }
];

const FAQPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      <Paper elevation={isMobile ? 0 : 3} sx={{ p: isMobile ? 2 : 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 1, color: theme.palette.primary.main }}
          >
            Frequently Asked Questions
          </Typography>
        </Box>

        {faqData.map((section, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}
            >
              {section.section}
            </Typography>

            {section.qa.map((qaItem, idx) => (
              <Accordion key={idx} disableGutters>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 500 }}>{qaItem.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-line',
                      color: theme.palette.text.secondary,
                      fontSize: '1rem'
                    }}
                  >
                    {qaItem.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default FAQPage;
