

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import {
  AutoAwesome as AIIcon,
  Insights as InsightIcon,
  Group as GroupIcon,
  Psychology as ApproachIcon,
  CheckCircle as CheckIcon,
  History as HistoryIcon,
  Stars as StarsIcon,
  Flag as MissionIcon,
  People as ServeIcon,
  DirectionsRun as ApproachIcon2,
  AutoAwesome,
  DirectionsRun,
  Psychology,
} from '@mui/icons-material';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router';

const MotionBox = m(Box);
const MotionGrid = m(Grid);
const MotionCard = m(Card);
const MotionPaper = m(Paper);

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const iconVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutUsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionBox
        textAlign="center"
        mb={8}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Chip
          label="AI Career Intelligence"
          color="primary"
          size="small"
          sx={{ mb: 2 }}
          icon={<StarsIcon />}
        />
        <Typography variant="h3" fontWeight={700} gutterBottom>
          About <span style={{ color: theme.palette.primary.main }}>Altiv.AI</span>
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
          A career intelligence platform that turns uncertainty into opportunity through AI-powered insights and personalized career pathways.
        </Typography>
      </MotionBox>

      {/* Our Story */}
      <Grid container spacing={4} mb={8} alignItems="center">
        <MotionGrid
          item
          xs={12}
          md={6}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Chip
            label="Our Origin"
            color="secondary"
            size="small"
            sx={{ mb: 2 }}
            icon={<HistoryIcon />}
          />
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Transforming Career Anxiety into Opportunity
          </Typography>
          <Typography paragraph>
            Altiv.AI emerged from a simple observation: while AI generates endless career anxiety,
            it also creates unprecedented opportunities for those who can adapt.
          </Typography>
          <Typography>
            Traditional career platforms haven&apos;t kept pace – they are still matching static skills to job descriptions,
            while the nature of work itself is being transformed.
          </Typography>
        </MotionGrid>
        <MotionGrid
          item
          xs={12}
          md={6}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MotionCard
            elevation={3}
            whileHover={{ scale: 1.03 }}
            sx={{
              p: 3,
              background: 'linear-gradient(135deg, rgba(101,78,163,0.1) 0%, rgba(234,67,53,0.1) 100%)',
              borderLeft: `4px solid ${theme.palette.primary.main}`,
            }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <AIIcon />
              </Avatar>
              <Typography variant="h6" fontWeight={600}>
                Navigating the AI Revolution
              </Typography>
            </Box>
            <List>
              {[...Array(4)].map((_, i) => (
                <ListItem key={i} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={[
                      'Mapping your current skills against emerging AI capabilities',
                      'Identifying your unique opportunities for AI augmentation',
                      'Creating personalized pathways for career evolution',
                      'Connecting you with roles that maximize your potential',
                    ][i]}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </MotionCard>
        </MotionGrid>
      </Grid>

      {/* Differentiators Section */}
      <MotionBox
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        mb={8}
      >
        <MotionBox textAlign="center" mb={4} variants={fadeInUp}>
          <Chip label="Why Choose Us" color="info" size="small" sx={{ mb: 2 }} icon={<InsightIcon />} />
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Why We are Different
          </Typography>
          <Typography color="text.secondary" maxWidth="700px" mx="auto">
            We go beyond traditional career platforms with our AI-powered approach
          </Typography>
        </MotionBox>

        <Grid container spacing={3}>
          {[
            {
              icon: <InsightIcon color="secondary" fontSize="large" />,
              title: 'Task Analysis',
              desc: 'We analyze tasks, not just skills, for precise career matching'
            },
            {
              icon: <AutoAwesome color="primary" fontSize="large" />,
              title: 'Augmentation Focus',
              desc: 'Focus on augmentation opportunities, not just automation risks'
            },
            {
              icon: <DirectionsRun color="success" fontSize="large" />,
              title: 'Dynamic Pathways',
              desc: 'Provide dynamic career pathways, not static job matches'
            },
            {
              icon: <Psychology color="warning" fontSize="large" />,
              title: 'Data-Driven',
              desc: 'Offer data-driven insights, not generic advice'
            },
          ].map((item, i) => (
            <MotionGrid item xs={12} sm={6} md={3} key={i} variants={fadeInUp}>
              <MotionCard
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                sx={{
                  height: '100%',
                  p: 3,
                  textAlign: 'center',
                }}
              >
                <MotionBox
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: theme.palette.background.paper,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: theme.shadows[2],
                  }}
                >
                  {item.icon}
                </MotionBox>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </MotionCard>
            </MotionGrid>
          ))}
        </Grid>
      </MotionBox>

      {/* CTA */}
      <MotionBox
        textAlign="center"
        mt={6}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          The future of work is being rewritten.
        </Typography>
        <Typography variant="h6" color="text.secondary" mb={4}>
          Don&apos;t just react to change – get ahead of it.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Button
            onClick={() => navigate('/?retry=true')}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: '50px',
              px: 5,
              py: 1.5,
              fontWeight: 600,
              boxShadow: theme.shadows[4],
            }}
          >
            Start Your AI-Ready Journey
          </Button>
        </Stack>
      </MotionBox>
    </Container>
  );
}

