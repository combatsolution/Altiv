

import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  Avatar,
  Link,
  keyframes,
  styled
} from '@mui/material';
import {
  Description as DescriptionIcon,
  FormatListBulleted as ListIcon,
  BarChart as ChartIcon,
  Lock as LockIcon,
  Public as PublicIcon,
  TrendingUp as TrendIcon
} from '@mui/icons-material';

// Enhanced animations
const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
`;

const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

// Styled components with animations
const AnimatedContainer = styled(Container)({
  '& > *': {
    animation: `${fadeIn} 0.8s ease-out forwards`
  }
});

const FloatCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8],
    '& .MuiAvatar-root': {
      animation: `${float} 3s ease-in-out infinite`
    }
  }
}));

const StaggerGrid = styled(Grid)({
  '& .MuiGrid-item': {
    opacity: 0,
    animation: `${slideUp} 0.6s ease-out forwards`,
    '&:nth-of-type(1)': { animationDelay: '0.1s' },
    '&:nth-of-type(2)': { animationDelay: '0.2s' },
    '&:nth-of-type(3)': { animationDelay: '0.3s' },
    '&:nth-of-type(4)': { animationDelay: '0.4s' },
    '&:nth-of-type(5)': { animationDelay: '0.5s' },
    '&:nth-of-type(6)': { animationDelay: '0.6s' }
  }
});

const IconAvatar = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.dark
}));

const Attributions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AnimatedContainer maxWidth="lg" sx={{ py: isMobile ? 4 : 8 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" sx={{ 
            fontWeight: 800,
            mb: 2,
            lineHeight: 1.2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Data Sources & Acknowledgments
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            maxWidth: 700,
            mx: 'auto',
            color: theme.palette.text.secondary,
          }}
        >
          We combine open datasets with proprietary models to deliver accurate career impact
          assessments
        </Typography>
      </Box>

      {/* Main cards grid */}
      <StaggerGrid container spacing={3}>
        {/* Economic Impact Card */}
        <Grid item xs={12} md={6} lg={4}>
          <FloatCard elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconAvatar sx={{color:'white'}}>
                  <PublicIcon fontSize="large" />
                </IconAvatar>

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    textAlign: 'center',   // 🔥 keep heading centered
                    mt: 1,                 // optional spacing
                  }}
                >
                  Open Economic Data
                </Typography>
              </Box>

              <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                Our AI Career Impact Assessment incorporates data from:
              </Typography>
              <Box sx={{ textAlign: 'left', pl: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  &quot;EconomicIndex&quot; by Anthropic
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                  MIT Licensed dataset
                </Typography>
                <Link
                  href="https://huggingface.co/datasets/Anthropic/EconomicIndex/tree/main/release_2025_02_10"
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: theme.palette.primary.main,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  View Source
                  <Box component="span" sx={{ ml: 1, fontSize: '0.8rem' }}>
                    →
                  </Box>
                </Link>
              </Box>
            </CardContent>
          </FloatCard>
        </Grid>

        {/* Dataset Components Card */}
        <Grid item xs={12} md={6} lg={4}>
          <FloatCard elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconAvatar sx={{color:'white'}}>
                <ChartIcon fontSize="large" />
              </IconAvatar>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',   // 🔥 keep heading centered
                  mt: 1,                 // optional spacing
                }}
              >
                Open Economic Data
              </Typography>
            </Box>

              <Box
                component="ul"
                sx={{
                  textAlign: 'left',
                  pl: 2,
                  listStyleType: 'none',
                  '& li': {
                    mb: 1,
                    position: 'relative',
                    pl: 3,
                    '&:before': {
                      content: '"•"',
                      position: 'absolute',
                      left: 0,
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              >
                {[
                  'SOC Structure Analysis',
                  'Automation vs Augmentation',
                  'ONET Task Mappings',
                  'Employment Data Trends',
                ].map((item) => (
                  <li key={item}>
                    <Typography variant="body1">{item}</Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </FloatCard>
        </Grid>

        {/* Proprietary Data Card */}
        <Grid item xs={12} md={6} lg={4}>
          <FloatCard elevation={3} sx={{ height: '100%', borderRadius: 3 }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <IconAvatar sx={{color:'white'}}>
                <LockIcon fontSize="large" />
              </IconAvatar>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textAlign: 'center',   // 🔥 keep heading centered
                  mt: 1,                 // optional spacing
                }}
              >
                Proprietary Models
              </Typography>
            </Box>


              <Box
                component="ul"
                sx={{
                  textAlign: 'left',
                  pl: 2,
                  listStyleType: 'none',
                  '& li': {
                    mb: 1,
                    position: 'relative',
                    pl: 3,
                    '&:before': {
                      content: '"▹"',
                      position: 'absolute',
                      left: 0,
                      color: theme.palette.secondary.main,
                    },
                  },
                }}
              >
                {[
                  'AI Impact Assessment Models',
                  'Career Trajectory Analysis',
                  'Skill Evolution Frameworks',
                  'Industry-specific Augmentation Patterns',
                ].map((item) => (
                  <li key={item}>
                    <Typography variant="body1">{item}</Typography>
                  </li>
                ))}
              </Box>
            </CardContent>
          </FloatCard>
        </Grid>

        {/* Additional feature cards */}
        <Grid
          item
          xs={12}
          md={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <FloatCard
            elevation={3}
            sx={{
              maxWidth:500,
              height: '100%',
              borderRadius: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: 'common.white',
            }}
          >
            <CardContent sx={{ p: 4, textAlign: 'center',alignItems: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <IconAvatar sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'common.white' }}>
                  <TrendIcon fontSize="large" />
                </IconAvatar>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                Career Trajectory Analysis
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Our proprietary models analyze how careers evolve with AI integration, identifying:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                {['Growth Sectors', 'At-Risk Roles', 'Emerging Skills', 'Hybrid Careers'].map(
                  (item) => (
                    <Paper
                      key={item}
                      elevation={0}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 20,
                        color: '#fff',
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(5px)',
                      }}
                    >
                      <Typography variant="body2">{item}</Typography>
                    </Paper>
                  )
                )}
              </Box>
            </CardContent>
          </FloatCard>
        </Grid>
        {/* 
        <Grid item xs={12} md={6}>
          <FloatCard elevation={3} sx={{ 
            height: '100%', 
            borderRadius: 3,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.paper'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  width: 40, 
                  height: 40, 
                  mr: 2,
                  backgroundColor: theme.palette.secondary.light
                }}>
                  <DescriptionIcon fontSize="small" />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Methodology Details
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Our approach combines quantitative analysis with qualitative insights to provide comprehensive career guidance in the age of AI.
              </Typography>
              <Box sx={{ 
                backgroundColor: theme.palette.action.hover,
                p: 2,
                borderRadius: 2,
                borderLeft: `4px solid ${theme.palette.primary.main}`
              }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                  We believe in transparent AI - understanding the data behind predictions is key to trust.
                </Typography>
              </Box>
            </CardContent>
          </FloatCard>
        </Grid> */}
      </StaggerGrid>
    </AnimatedContainer>
  );
};

export default Attributions;