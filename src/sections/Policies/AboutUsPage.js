import React from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
  Avatar
} from '@mui/material';
import {
  RocketLaunch as RocketIcon,
  AutoAwesome as AIIcon,
  Groups as TeamIcon,
  TrendingUp as GrowthIcon,
  Explore as ExploreIcon,
  EmojiObjects as InsightIcon,
  Update as UpdateIcon
} from '@mui/icons-material';
import { Grid } from 'lucide-react';

const AboutUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const aboutData = {
    title: "About Us",
    tagline: "In an era where AI is reshaping careers faster than ever, we're building something different: a career intelligence platform that turns uncertainty into opportunity.",
    sections: [
      {
        title: "Our Story",
        icon: <RocketIcon color="primary" />,
        content: "Altiv.AI emerged from a simple observation: while AI generates endless career anxiety, it also creates unprecedented opportunities for those who can adapt. Traditional career platforms haven't kept pace with this reality - they're still matching static skills to job descriptions, while the nature of work itself is being transformed."
      },
      {
        title: "What We Do",
        icon: <AIIcon color="primary" />,
        content: "We help ambitious professionals navigate the AI revolution with clarity and confidence. Our platform combines advanced AI analysis with practical career guidance to:",
        items: [
          "Map your current skills against emerging AI capabilities",
          "Identify your unique opportunities for AI augmentation",
          "Create personalized pathways for career evolution",
          "Connect you with roles that maximize your potential"
        ]
      },
      {
        title: "Why We're Different",
        icon: <InsightIcon color="primary" />,
        content: "Unlike traditional job boards or career coaches, we:",
        items: [
          "Analyze tasks, not just skills",
          "Focus on augmentation opportunities, not just automation risks",
          "Provide dynamic career pathways, not static job matches",
          "Offer data-driven insights, not generic advice"
        ]
      },
      {
        title: "Our Mission",
        icon: <GrowthIcon color="primary" />,
        content: "We believe everyone deserves to thrive in the AI era. Our mission is to help one million professionals transform their relationship with AI from anxiety to advantage in 2025. Just like you we don't want to create static long term goals in this age of evolution."
      },
      {
        title: "Who We Serve",
        icon: <TeamIcon color="primary" />,
        content: "We specialize in supporting professionals in rapidly evolving fields:",
        items: [
          "Marketing Innovators",
          "Product Leaders",
          "Data Scientists",
          "Software Engineers",
          "And others embracing the AI transition"
        ],
        closing: "Whether you're looking to future-proof your career, pivot to an AI-enhanced role, or simply understand where you stand, we provide the insights and guidance you need to move forward with confidence."
      },
      {
        title: "Our Approach",
        icon: <UpdateIcon color="primary" />,
        items: [
          {
            title: "Clarity First",
            description: "We help you understand your current AI-readiness through our proprietary AI-vantage Score"
          },
          {
            title: "Strategic Guidance",
            description: "Transform insights into action with personalized development paths"
          },
          {
            title: "Continuous Evolution",
            description: "Stay ahead with ongoing updates and opportunities aligned with market changes"
          }
        ]
      }
    ],
    cta: {
      text: "The future of work is being rewritten. Don't just react to change - get ahead of it.",
      button: "Start Your AI-Ready Career Journey"
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 6 }}>
      {/* Hero Section */}
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h2" 
          component="h1"
          sx={{ 
            fontWeight: 800,
            color: 'primary.main',
            fontSize: isMobile ? '2rem' : '3rem',
            mb: 2,
            lineHeight: 1.2
          }}
        >
          {aboutData.title}
        </Typography>
        <Typography 
          variant="h5" 
          component="p"
          sx={{ 
            maxWidth: '800px',
            mx: 'auto',
            color: 'text.secondary',
            fontSize: isMobile ? '1.1rem' : '1.3rem'
          }}
        >
          {aboutData.tagline}
        </Typography>
      </Box>

      {/* Main Content Sections */}
      {aboutData.sections.map((section, index) => (
        <Box key={index} sx={{ mb: 8 }}>
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            mb: 4
          }}>
            <Divider sx={{ flexGrow: 1, mr: 2 }} />
            <Chip 
              label={section.title} 
              icon={section.icon}
              sx={{ 
                px: 2,
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 600,
                backgroundColor: 'primary.light',
                color: 'primary.contrastText'
              }} 
            />
            <Divider sx={{ flexGrow: 1, ml: 2 }} />
          </Box>

          {section.content && (
            <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
              {section.content}
            </Typography>
          )}

          {section.items && (
            <Box sx={{ 
              backgroundColor: theme.palette.grey[50],
              p: 3,
              borderRadius: 2,
              mb: 3
            }}>
              {typeof section.items[0] === 'string' ? (
                <List dense>
                  {section.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} sx={{ py: 0.5 }}>
                      <ListItemText 
                        primary={item} 
                        primaryTypographyProps={{ variant: 'body1' }}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Grid container spacing={3}>
                  {section.items.map((item, itemIndex) => (
                    <Grid item xs={12} sm={4} key={itemIndex}>
                      <Paper elevation={0} sx={{ 
                        height: '100%',
                        p: 3,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`
                      }}>
                        <Typography 
                          variant="h6" 
                          component="h3"
                          sx={{ 
                            fontWeight: 600,
                            mb: 1,
                            color: 'primary.main'
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body1">
                          {item.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {section.closing && (
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem' }}>
              {section.closing}
            </Typography>
          )}
        </Box>
      ))}

      {/* Call to Action */}
      <Box sx={{ 
        textAlign: 'center',
        mt: 8,
        p: 4,
        backgroundColor: theme.palette.primary.light,
        borderRadius: 2,
        color: 'primary.contrastText'
      }}>
        <Typography variant="h5" component="p" sx={{ mb: 3, fontWeight: 500 }}>
          {aboutData.cta.text}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ExploreIcon />}
          sx={{ 
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            fontWeight: 600
          }}
        >
          {aboutData.cta.button}
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUsPage;