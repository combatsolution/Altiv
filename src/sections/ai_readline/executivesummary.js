import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ExecutiveSummary() {
    const [summaryData, setSummaryData] = useState(null);

    // Simulate API call
    useEffect(() => {
        const fetchData = async () => {
            // later replace with API call like:
            // const res = await axios.get('/api/executive-summary');
            const data = {
                name: "Dr. Rishabh Gandhi",
                title: "Strategic Account Manager",
                company: "Red.Health",
                qualifications: "BDS, MBA in Hospital & Healthcare Administration",
                achievements: [
                    "Leading NABH accreditation at ESIC Hospital",
                    "Operational optimization at Fortis Hospital",
                    "Revenue generation of ₹10+ lakh/month at Red.Health",
                ],
                summary:
                    "A results-driven healthcare operations and administration leader with a strong clinical foundation (BDS) and strategic management expertise (MBA in Hospital & Healthcare Administration) who has recently driven revenues of over ₹10+ lakh/month at Red.Health.",
            };
            setSummaryData(data);
        };
        fetchData();
    }, []);

    if (!summaryData) return null;

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#fafafa" }}>
            <Box sx={{
                display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
                borderBottom: (t) => `2px solid ${t.palette.grey[300]}`,
                mb:2,
                py:1    
                
            }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#3f51b5" }}
                >
                    Executive Summary
                </Typography>

                {/* Share Button */}

                <Button
                    variant="contained"
                    color="info"
                    sx={{ textTransform: "none", borderRadius: 2 }}
                >
                    Share
                </Button>
            </Box>

            <Grid container spacing={2}>
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 2,
                            backgroundColor: "#1a2238",
                            color: "white",
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                            Professional Profile
                        </Typography>
                        <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.2)" }} />
                        <Typography sx={{ fontSize: 14, mt: 1 }}>
                            <strong>Name:</strong> {summaryData.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14, mt: 1 }}>
                            <strong>Title:</strong> {summaryData.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14, mt: 1 }}>
                            <strong>Company:</strong> {summaryData.company}
                        </Typography>
                        <Typography sx={{ fontSize: 14, mt: 1 }}>
                            <strong>Qualifications:</strong> {summaryData.qualifications}
                        </Typography>
                    </Paper>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Key Achievements
                        </Typography>
                        <List dense>
                            {summaryData.achievements.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <CheckCircleIcon color="success" />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            {/* Summary Box */}
            <Paper
                sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#e8f5e9",
                }}
            >
                <Typography variant="body2">{summaryData.summary}</Typography>
            </Paper>

        </Box>
    );
}
