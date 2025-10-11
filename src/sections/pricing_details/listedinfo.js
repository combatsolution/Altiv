
import { m } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { MotionViewport } from 'src/components/animate';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

export default function ListedInfo({ keyOutComes = [] }) {
  const theme = useTheme();

  // If API data is not available, show fallback message
  if (!keyOutComes || keyOutComes.length === 0) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          🚫 No key outcomes available
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      component={MotionViewport}
      sx={{
         maxWidth: '100%',
         width:'100%',
    py: { xs: 10, md: 10 },
    textAlign: 'center',
  

      
    boxShadow: 'none', // remove possible shadows

      }}
    >
      {/* Heading */}
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        <Box component="span" sx={{ 
          // color: theme.palette.primary.dark
          color:'primary.main'
         }}>
          Key outcomes
        </Box>
      </Typography>

      {/* Outcomes Grid */}
      <Grid container spacing={4} sx={{ mt: 6, justifyContent: 'center' }}>
        {keyOutComes.map((item, index) => (
          <Grid key={item.id || index} xs={12} md={4}>
            <Paper
              elevation={5}
              sx={{
                p: 4,
                height: { xs: 200, md: 150 },
                borderRadius: 2,
                textAlign: 'center',
                    bgcolor: 'background.paper', // or 'white' if you want white cards only

              }}
            >
              {/* Icon + Heading */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  mb: 1,
                }}
              >
                {/* Show image from backend if available, else fallback icon */}
                {item.image?.fileUrl ? (
                  <Box
                    component="img"
                    src={item.image.fileUrl}
                    alt={item.heading}
                    sx={{
                      width: 40,
                      height: 35,
                      borderRadius: 1,
                      objectFit: 'contain',
                    }}
                  />
                ) : (
                  <Icon
                    icon="iconamoon:profile-fill"
                    width={40}
                    height={35}
                    style={{ color: theme.palette.primary.main }}
                  />
                )}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: 15, md: 16 },
                    color: 'text.primary',
                  }}
                >
                  {item.heading}
                </Typography>
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: 12, md: 14 },
                }}
              >
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

ListedInfo.propTypes = {
  keyOutComes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      heading: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.shape({
        fileUrl: PropTypes.string,
      }),
    })
  ),
};

