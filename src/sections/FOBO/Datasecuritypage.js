import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme, useMediaQuery } from "@mui/material";
import { useState, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { paths } from 'src/routes/paths';

import security from "src/Fogoimages/flowstructure.png";

function Datasecuritypage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
        }
    };

    return (
        <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: { xs: 4, sm: 6 }, overflowX: 'hidden' }}>
            <Grid container spacing={4} alignItems="center">
                <Grid xs={12} md={6}>
                    <Stack spacing={3}>
                        {/* Header */}
                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <Typography
                                component="h1"
                                sx={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    fontSize: { xs: '36px', sm: '48px', md: '64px' },
                                    lineHeight: '100%',
                                    letterSpacing: '-0.02em',
                                    color: '#212529',
                                }}
                            >
                                Your data is 100% <br /> SAFE
                            </Typography>

                            <Box
                                component="img"
                                src="/assets/images/impact.svg"
                                alt="impact"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: { xs: '150px', sm: '250px', md: '380px' },
                                    zIndex: -1,
                                }}
                            />
                        </Box>

                        {/* Subheading */}
                        <Typography
                            component="p"
                            sx={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '18px',
                                lineHeight: '30px',
                                letterSpacing: '-0.02em',
                                color: '#212529',
                            }}
                        >
                            The app is open source and your notes are saved to an open format, so you will always<br />
                            have access to them. Uses End-To-End Encryption (E2EE) to secure your notes and<br />
                            ensure no-one but yourself can access them.
                        </Typography>

                        {/* Button */}
                        <Button
                            variant="contained"
                            sx={{
                                height: "56px",
                                width: "fit-content",
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                                fontSize: '16px',
                                px: 3,
                                borderRadius: '8px',
                                textTransform: 'none',
                                backgroundColor: '#4F9CF9',
                                gap: '10px',
                                '&:hover': {
                                    backgroundColor: '#3f8de0',
                                },
                            }}
                            onClick={()=> navigate(paths.comingsoon)}

                            
                        >
                            Read more <ArrowForwardIcon />
                        </Button>
                    </Stack>
                </Grid>

                {/* Image Section */}
                <Grid xs={12} md={6}>
                    <Box
                        component="img"
                        src={security}
                        alt="AI Coach"
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            mt: { xs: 4, md: 0 },
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Datasecuritypage;
