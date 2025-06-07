import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Box,
  useTheme,
  useMediaQuery,
  Link
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is Altiv.AI and how is it different?",
          answer: "Altiv.AI is a career intelligence platform that helps professionals understand and adapt to AI's impact on their roles. Unlike traditional career platforms, we analyze your work at a task level, providing specific insights about how AI will affect your role and clear pathways to adapt and grow."
        },
        {
          question: "Who is Altiv.AI for?",
          answer: "Our platform serves professionals in rapidly evolving fields, particularly in Marketing, Data Science, Product Management, and Software Engineering. We're especially helpful for mid to senior-career professionals concerned about AI's impact on their role and those looking to turn AI anxiety into career advantage."
        },
        {
          question: "Do I need AI expertise to use Altiv.AI?",
          answer: "No prior AI knowledge or coding is required. Our platform meets you where you are, whether you're just starting to explore AI's impact or already working with AI tools. We translate complex AI developments into clear, actionable career insights. All we ask for is an open mind - which is critical in times to come."
        }
      ]
    },
    {
      category: "Platform Features",
      questions: [
        {
          question: "What is the AI-vantage Score?",
          answer: "The AI-vantage Score is our proprietary assessment that analyzes your current role at a task level, showing which aspects are likely to be augmented or automated by AI. It helps you understand your AI exposure and identifies specific opportunities to evolve your role. We help you beat FOBO (Fear of Being Obsolete) using our AI-vantage Score."
        },
        {
          question: "How often is the analysis updated?",
          answer: "Our AI impact analysis is updated monthly to reflect new AI capabilities and industry trends. Your personal insights and recommendations are refreshed continuously based on market changes and your progress."
        },
        {
          question: "Can I use this if I'm not actively job hunting?",
          answer: "Absolutely. Many of our users are focused on evolving their current roles rather than job searching. The platform helps you understand AI's impact on your work and identifies specific ways to increase your value in your current position as well as build for your future."
        }
      ]
    },
    {
      category: "Programs & Pricing",
      questions: [
        {
          question: "What's included in each program tier?",
          answer: (
            <>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                <strong>Quick Start ($49/mo):</strong> Essential AI readiness assessment, basic guidance, self-paced learning materials, useful AI templates, and guided simulations allowing you to apply AI to your day to day work.
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                <strong>Transform ($999/mo):</strong> Comprehensive skill development, small group mentorship, deep implementation support, access to community, and a toolkit to showcase your AI-Impact at work.
              </Typography>
              <Typography variant="body1" component="div">
                <strong>Edge ($2,300/3mo):</strong> Executive-level coaching, strategic guidance, leadership development, project implementation support, and a toolkit to showcase your AI-leadership both to your leadership and teams.
              </Typography>
            </>
          )
        },
        {
          question: "How much time should I commit?",
          answer: (
            <>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                <strong>Quick Start:</strong> 2-3 hours/week
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                <strong>Transform:</strong> 4-6 hours/week
              </Typography>
              <Typography variant="body1" component="div">
                <strong>Edge:</strong> 4-6 hours/week
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                All programs are flexible and can be adapted to your schedule, with content available on-demand.
              </Typography>
            </>
          )
        },
        {
          question: "What kind of support do I get?",
          answer: (
            <>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                <strong>Quick Start:</strong> AI-powered feedback and basic templates
              </Typography>
              <Typography variant="body1" component="div" sx={{ mb: 2 }}>
                <strong>Transform:</strong> Small group mentorship (1:5 ratio) and implementation clinics
              </Typography>
              <Typography variant="body1" component="div">
                <strong>Edge:</strong> 1-on-1 expert coaching and executive roundtables
              </Typography>
            </>
          )
        },
        {
          question: "How are the programs different from so many options available?",
          answer: (
            <>
              <Typography variant="body1" paragraph>
                Unlike traditional courses that offer static content and certificates, our programs combine intensive mentorship with real-world implementation in your specific work context.
                 You will be part of a small, focused cohort working on actual workplace challenges, with weekly clinics and expert guidance to ensure you absolutere creating immediate impact.
                  Rather than passive learning, you will experience a transformative journey that adapts to your role and industry, with clear metrics to demonstrate career evolution and ROI to your organization.
              </Typography>
              <Typography variant="body1" paragraph>
                In short join us if you are looking for:
              </Typography>
              <List dense>
                {[
                  "1. Contextual learning, not just content",
                  "2. Intensive Engagement, Not Passive Consumption",
                  "3. Active Problem-Solving, Not Just Theory",
                  "4. Community and Network Effects",
                  "5. Measurable Impact, Not Just Certificates"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </>
          )
        },
        {
          question: "How does your refund policy work?",
          answer: (
            <>
              <Typography variant="body1" paragraph>
                We believe in fair and transparent refund policies that protect both our students and the quality of our programs.
              </Typography>
              
              <Typography variant="h6" component="div" sx={{ mt: 3, mb: 1 }}>
                Quick Start Program ($49/month)
              </Typography>
              <List dense>
                {[
                  "Cancel anytime - no questions asked",
                  "Prorated refund for unused portion of current month",
                  "Access continues until the end of your billing period if not cancelled"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" component="div" sx={{ mt: 3, mb: 1 }}>
                Transform Program ($999/month)
              </Typography>
              <List dense>
                {[
                  "14-day money-back guarantee",
                  "Try one mentor session risk-free",
                  "Full refund if you're not satisfied with the program quality",
                  "After 14 days, prorated refund minus consumed services"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" component="div" sx={{ mt: 3, mb: 1 }}>
                Edge Program ($2,300/3 months)
              </Typography>
              <List dense>
                {[
                  "14-day evaluation period",
                  "Try two mentor sessions risk-free",
                  "Full refund if you're not satisfied with the program quality",
                  "After 14 days, prorated refund minus consumed services"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="h6" component="div" sx={{ mt: 3, mb: 1 }}>
                Special Circumstances
              </Typography>
              <Typography variant="body1" paragraph>
                We understand life happens. Contact us if you need to:
              </Typography>
              <List dense>
                {[
                  "Pause your program",
                  "Transfer to a different track",
                  "Address special circumstances",
                  "Discuss payment plans"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={`- ${item}`} />
                  </ListItem>
                ))}
              </List>
              
              <Typography variant="body1" sx={{ mt: 2 }}>
                For any refund requests or questions, email <Link href="mailto:hello@altiv.ai">hello@altiv.ai</Link> with Refund Request in the subject line. We typically process refunds within 5-7 business days.
              </Typography>
            </>
          )
        }
      ]
    },
    {
      category: "Outcomes & Results",
      questions: [
        {
          question: "What concrete outcomes can I expect?",
          answer: (
            <List dense>
              {[
                "Clear understanding of your AI exposure and opportunities",
                "Specific skill development roadmap",
                "Actionable career adaptation plan",
                "Industry-recognized AI readiness badges",
                "Transform and Edge participants typically complete real-world AI implementation projects."
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )
        },
        {
          question: "How do you measure success?",
          answer: (
            <List dense>
              {[
                "Skill development progress",
                "Project implementation outcomes",
                "Career advancement (promotions/transitions)",
                "Concrete impact in current role"
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 0 }}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          )
        },
        {
          question: "Can my employer sponsor my participation?",
          answer: "Yes, many employers support participation through L&D or professional development budgets. We provide documentation and ROI frameworks to help make the case to your organization. Enterprise packages are available for teams."
        }
      ]
    },
    {
      category: "Technical Questions",
      questions: [
        {
          question: "Do you share my data with third parties?",
          answer: "No. Your career and assessment data is kept strictly confidential. We only use aggregated, anonymized data for improving our AI models and insights."
        },
        {
          question: "How do you ensure the accuracy of AI impact predictions?",
          answer: (
            <>
              <Typography variant="body1" paragraph>
                Our analysis combines multiple data sources:
              </Typography>
              <List dense>
                {[
                  "Industry research and trends",
                  "Real-world implementation data",
                  "Expert validation",
                  "Continuous market feedback",
                  "We regularly update our models to reflect new developments in AI capabilities."
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0 }}>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </>
          )
        }
      ]
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            fontWeight: 700,
            color: 'primary.main',
            fontSize: isMobile ? '2rem' : '2.5rem',
            mb: 2
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find answers to common questions about Altiv.AI
        </Typography>
      </Box>

      {faqData.map((section, sectionIndex) => (
        <Box key={sectionIndex} sx={{ mb: 6 }}>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            mb: 3
          }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Chip 
              label={section.category} 
              sx={{ 
                mx: 2, 
                px: 2,
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                backgroundColor: 'primary.light',
                color: 'primary.contrastText'
              }} 
            />
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          
          {section.questions.map((item, index) => (
            <Accordion 
              key={index} 
              elevation={2}
              sx={{ 
                mb: 2,
                borderRadius: '8px !important',
                '&:before': {
                  display: 'none'
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: theme.palette.grey[50],
                  borderRadius: '8px',
                  '&.Mui-expanded': {
                    backgroundColor: theme.palette.grey[100],
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                  }
                }}
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ 
                backgroundColor: theme.palette.grey[50],
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px'
              }}>
                {typeof item.answer === 'string' ? (
                  <Typography variant="body1">
                    {item.answer}
                  </Typography>
                ) : (
                  item.answer
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
    </Container>
  );
};

export default FAQPage;