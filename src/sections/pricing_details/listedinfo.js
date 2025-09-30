import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// components
import { MotionViewport } from 'src/components/animate';
import { Icon } from '@iconify/react'; // ✅ Iconify import

// ----------------------------------------------------------------------

export default function ListedInfo() {
  const theme = useTheme();

  const features = [
    {
      Icon: 'ci:hamburger-lg',
      title: 'Automate 30% of routine tasks',
      subtitle: 'Use templates & prompts to slash production time.',
    },
    {
      Icon: 'iconamoon:profile-fill',
      title: 'Portfolio-ready capstone',
      subtitle: 'Showcase a live AI-driven campaign to employers.',
    },
    {
      Icon: 'iconamoon:profile-fill',
      title: 'Altiv “AI Marketing Foundation” badge',
      subtitle: 'Shareable on LinkedIn & resumes.',
    },
  ];

  return (
    <Container
      component={MotionViewport}
      sx={{
        maxWidth: '1061px',
        py: { xs: 10, md: 10 },
        textAlign: 'center',
      }}
    >
      {/* Heading */}
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        <Box component="span" sx={{ color: 'primary.main' }}>
          Key outcomes
        </Box>
      </Typography>

      {/* Features */}
      <Grid container spacing={4} sx={{ mt: 6, justifyContent: 'center' }}>
        {features.map((feature) => (
          <Grid key={feature.title} xs={12} md={4}>
            <Paper
              elevation={5}
              sx={{
                p: 4,
                height: { xs: 200, md: 150 },
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              {/* Icon + Title */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  mb: 1,
                }}
              >
                <Icon
                  icon={feature.Icon}
                  width={40}
                  height={35}
                  style={{ color: theme.palette.primary.main }}
                />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: 15, md: 16 },
                    color: 'text.primary',
                  }}
                >
                  {feature.title}
                </Typography>
              </Box>

              {/* Subtitle */}
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: 12, md: 14 },
                }}
              >
                {feature.subtitle}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
