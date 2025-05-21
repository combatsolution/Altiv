import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { blue } from "@mui/material/colors";
import security from "src/Fogoimages/flowstructure.png";

import {
    Modal,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { paths } from 'src/routes/paths';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { position } from 'stylis';

function Datasecuritypage() {
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
    };
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
        }
    };
    return (
        <Box sx={{ px: { xs: 2, sm: 4, md: 3 }, py: { xs: 4, sm: 6, md: 6 } }}>
            <Grid container spacing={4} alignItems="center">
                <Grid xs={12} md={6} pl="32px" >
                    <Stack spacing={3}>

                        {/* Main header: “Beat FOBO (Fear of Being Obsolete)” */}
                        <Box component='div' sx={{ position: 'relative', width: "696px", height: "200" }}>
                            <Typography
                                component="h1"

                                sx={{
                                    width: "100%",
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 700,
                                    fontSize: '72px',
                                    lineHeight: '100%',
                                    letterSpacing: '-0.02em', // Correct CSS value for -2%
                                    color: '#212529',
                                    mt: 0,
                                }}
                            >
                                Your data is 100% <br />SAFE
                            </Typography>
                            <img style={{ position: 'absolute', width: '250px', bottom: '15px', right: '150px', zIndex: -10 }} src='/assets/images/impact.svg' alt='impact' />
                        </Box>

                        <Typography
                            component="p"
                            sx={{
                                width:"2000px",
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '18px',
                                lineHeight: '30px',
                                letterSpacing: '-0.02em', // Corrected for -2%
                                color: '#212529',
                                mt: 0,
                                
                            }}
                        >
                            The app is open source and your notes are saved to an open format, so you will always <br />
                            have access to them. Uses End-To-End Encryption (E2EE) to secure your notes and <br />
                            ensure no-one but yourself can access them.
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                height:"63px",
                                width:"197px",
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 400,
                                fontSize: '18px',
                                padding: '10px 10px',
                                borderRadius: '8px',
                                textTransform: 'none',
                                backgroundColor: '#4F9CF9',
                                gap: '10px',
                                '&:hover': {
                                    backgroundColor: '#3f8de0',
                                },
                            }}
                        >
                            Read more <ArrowForwardIcon/>
                        </Button>

                    </Stack>
                </Grid>

                <Grid xs={12} md={6} sx={{ mt: { xs: 4, md: 0 } }}>
                    <Box
                        component="img"
                        src={security}
                        alt="AI Coach"
                        sx={{
                            
                            width: "681px",
                            Height: "381.13px",
                            maxHeight: { xs: "auto" },
                            objectFit: "cover",
                            marginTop: "25px",
                            marginLeft: "15px",

                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Datasecuritypage;
