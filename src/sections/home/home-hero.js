
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { blue } from '@mui/material/colors';
import heroImg from "src/images/hero-image.png";

function HomeHero() {
  return (
    <Box sx={{ p: { xs: 3, } }}>
      <Grid container spacing={4} padding={5} margin={4} alignItems="center">
        <Grid item xs={12} md={6} >
          <Stack spacing={3}>
            <Typography variant="h3" component="h1" fontWeight="bold">
              Your careers secret weapon
            </Typography>
            <Typography variant="body1" color="text.secondary ">
              Tired of career uncertainty and endless job searches? <br/> 
              Our AI coach guides your next move with data-driven <br/>
              insights while matching you to roles you are truly <br/> 
              qualified for — all in one place.
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="contained" size="large" sx={{ bgcolor: blue[600], '&:hover': { bgcolor: blue[700] } }}>
                Start Free
              </Button>
              <Button variant="outlined" size="large" sx={{
                textTransform: 'none',
                color: blue[600],
                borderColor: blue[600],
                '&:hover': {
                  backgroundColor: 'transparent',
                  borderColor: blue[700],
                  color: blue[700],
                },
              }}>
                Know How it Works
              </Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} mt={6}>
          <Box component="img" src={heroImg} alt="AI Coach" sx={{ borderRadius: 2, width: "100%" }} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeHero;
