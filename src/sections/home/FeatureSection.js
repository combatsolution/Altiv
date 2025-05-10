import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import videoThumb from "src/images/video-thumb.jpg";

const FeatureSection = () => (
    <Box
        sx={{
            backgroundColor: "rgba(128, 128, 128, 0.1)", // Light grey transparent background
            backdropFilter: "blur(6px)",                 // Optional: adds a subtle blur
            width: "92%",   
            mx:2   
        }}
    >
        <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 4, md: 8 }, maxWidth: "1440px", mx: "auto" }}>
            <Grid container spacing={6} alignItems="center">
                {/* Video Thumbnail Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                            width: "100%",
                            height: { xs: 250, sm: 350, md: 400 },
                        }}
                    >
                        <Box
                            component="img"
                            src={videoThumb}
                            alt="Video thumbnail"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
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
                                "&:hover": {
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                },
                            }}
                        >
                            ▶
                        </Box>
                    </Box>
                </Grid>

                {/* Text Content Section */}
                <Grid item xs={12} md={6}>
                    <Box display="flex" flexDirection="column" gap={4}>
                        {[
                            {
                                title: "Future-Proof Your Career",
                                body: `See around corners with AI-powered career predictions.
Understand upcoming trends, identify growth opportunities,
and plan your next moves with precision.`,
                            },
                            {
                                title: "Apply Smarter, Not Harder",
                                body: `Focus on opportunities that matter. Get matched to roles that
fit your profile with insights on your match strength and
tips to improve your chances.`,
                            },
                            {
                                title: "Master Your Career Journey",
                                body: `Transform uncertainty into opportunity with your AI career
partner. Get personalized guidance for everything from skill
development to salary negotiations.`,
                            },
                        ].map((item, index) => (
                            <Box key={index}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    {item.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                                    {item.body}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Box>
);

export default FeatureSection;
