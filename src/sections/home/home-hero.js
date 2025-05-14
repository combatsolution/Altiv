import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { blue } from "@mui/material/colors";
import heroImg from "src/images/hero-image.png";
import { Modal, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { paths } from 'src/routes/paths';

function HomeHero() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("resume");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newType) => {
    if (newType !== null) {
      setUploadType(newType);
    }
  };
  const handleClose = () => {
    setOpen(false);
  }


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
                  bgcolor: "#0040D8",
                  "&:hover": { bgcolor: blue[700] },
                  width: { xs: "100%", sm: "auto" },
                }}
                onClick={() => setOpen(true)}
              >
                Start Free
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  minHeight="100vh"
                  px={2}
                  textAlign="center"
                  backgroundColor="white"
                >
                  <Typography variant={isMobile ? "h5" : "h4"} fontWeight={500} gutterBottom>
                    Magic happens either ways
                  </Typography>
                  <Typography variant="body1" color="textSecondary" mb={3}>
                    You can choose to go with your updated resume or job title
                  </Typography>

                  <ToggleButtonGroup
                    value={uploadType}
                    exclusive
                    onChange={handleChange}
                    sx={{ mb: 3, borderRadius: 50, border: "1px solid #ccc" }}
                  >
                    <ToggleButton
                      value="resume"
                      sx={{
                        borderRadius: 50,
                        textTransform: "none",
                        px: 3,
                        color: uploadType === "resume" ? "white" : "#3f51b5",
                        backgroundColor: uploadType === "resume" ? "#3f51b5" : "transparent",
                        '&:hover': {
                          backgroundColor: uploadType === "resume" ? "#2f3da3" : "#f0f0f0",
                        },
                      }}
                    >
                      Resume
                    </ToggleButton>
                    <ToggleButton
                      value="job"
                      sx={{
                        borderRadius: 50,
                        textTransform: "none",
                        px: 3,
                        color: uploadType === "job" ? "white" : "#3f51b5",
                        backgroundColor: uploadType === "job" ? "#3f51b5" : "transparent",
                        '&:hover': {
                          backgroundColor: uploadType === "job" ? "#2f3da3" : "#f0f0f0",
                        },
                      }}
                    >
                      Job title
                    </ToggleButton>
                  </ToggleButtonGroup>

                  <Box
                    border="2px dashed #cbd5e0"
                    borderRadius={2}
                    bgcolor="#f8faff"
                    width="100%"
                    maxWidth={400}
                    py={4}
                    px={2}
                    textAlign="center"
                    mb={3}
                  >
                    <CloudUploadIcon fontSize="large" color="primary" />
                    <Typography variant="body1" fontWeight={500} mt={1}>
                      Drag & drop files or <Box component="span" color="#3f51b5" fontWeight="bold">Browse</Box>
                    </Typography>
                    <Typography variant="caption" display="block" color="textSecondary" mt={1}>
                      Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#3f51b5",
                      borderRadius: 999,
                      px: 5,
                      py: 1.5,
                      fontWeight: 500,
                      textTransform: "none",
                      '&:hover': {
                        backgroundColor: "#2f3da3",
                      }
                    }}
                  >
                    Upload Resume
                  </Button>
                </Box>
              </Modal>
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
                  borderRadius: "20px  ",
                }}
                onClick={() => navigate(paths.auth.jwt.register)}
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
              marginTop: "80px"
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomeHero;
