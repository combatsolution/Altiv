import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { blue } from "@mui/material/colors";
import heroImg from "src/images/hero-image.png";

function HomeHero() {
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 12 }, py: { xs: 4, sm: 6, md: 6 } }}>
      <Grid container spacing={4} alignItems="center">
        {/* Text Section */}
        <Grid xs={12} md={6}>
          <Stack spacing={3}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ fontSize: { xs: "2rem", sm: "2.5rem", md: "2rem" } }}
            >
              Your career’s secret weapon
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
            >
              Tired of career uncertainty and endless job searches? <br />
              Our AI coach guides your next move with data-driven insights <br />
              while matching you to roles you’re truly qualified for — all in one place.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor:"#0040D8",
                  "&:hover": { bgcolor: blue[700] },
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Start Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  textTransform: "none",
                  color: "#0040D8",
                  borderColor: "#0040D8",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: blue[700],
                    color: blue[700],
                  },
                  width: { xs: "90%", sm: "auto" },
                  borderRadius:"20px  ",
                }}
              >
                Know How it Works
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {/* Image Section */}
        <Grid xs={12} md={6} sx={{ mt: { xs: 4, md: 0 } }}>
          <Box
            component="img"
            src={heroImg}
            alt="AI Coach"
            sx={{
             
              width: "100%",
              maxHeight: { xs: "auto", md: "500px" },
              objectFit: "cover",
              marginTop:"80px"
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeHero;
