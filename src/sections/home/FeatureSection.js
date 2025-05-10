import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import videoThumb from "src/images/video-thumb.jpg";

const FeatureSection = () => (
    <Box sx={{ p: 6 }}>
        <Grid container spacing={6}>
            {/* Video Thumbnail Section */}
            <Grid item xs={6} md={6}>
                <Box sx={{ position: "relative", borderRadius: 2, overflow: "auto",  ml: 20 }}>
                    <img
                        src={videoThumb}
                        alt="Video thumbnail"
                        style={{ width:700, borderRadius: 2 }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: 50,
                            cursor: "pointer",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        ▶
                    </Box>
                </Box>
            </Grid> 

            {/* Text Content Section */}
            <Grid item xs={6} md={6} display="flex" flexDirection="column" gap={2}>
                <Box mt={{ xs: 0, md: 5 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Future-Proof Your Career
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        See around corners with AI-powered career predictions.<br />
                        Understand upcoming trends, identify growth opportunities,<br />
                        and plan your next moves with precision.
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Apply Smarter, Not Harder
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Focus on opportunities that matter. Get matched to roles that <br />
                        fit your profile with insights on your match strength and<br />
                        tips to improve your chances.
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Master Your Career Journey
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Transform uncertainty into opportunity with your AI career <br /> 
                        partner. Get personalized guidance for everything from skill <br />
                         development to salary negotiations.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    </Box>
);

export default FeatureSection;
