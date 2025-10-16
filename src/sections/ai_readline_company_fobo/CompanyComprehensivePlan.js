import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from '@mui/material/Divider';

const CompanyComprehensivePlan = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box p={isMobile ? 2 : 4}
            sx={{
                mx: 'auto',
                maxWidth: '1155px',
                px: { xs: 3, md: 4 },
                py: 4,
                Width: '1200px',
            }}>
            <Typography variant="h4" mb={3} fontWeight={600} color='primary.main'>
                Company Comprehensive Plan
            </Typography>
            <Divider sx={{ borderColor: "#00A3FF", mb: 3 }} />
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom color='primary.main'>
                        Company FOBO Comprehensive Plan - Accenture
                    </Typography>
                    <Divider sx={{ borderColor: "#00A3FF", mb: 2 }} />
                    <Typography variant="h6" gutterBottom color='primary.main'>
                        Company FOBO Summary
                    </Typography>
                    <Typography variant="body2" mb={2} sx={{
                        display: "flex",
                        flexDirection: 'column',

                    }}>
                        <strong>Automation Score:</strong> 12.66 |{" "}
                        <strong>Augmentation Score:</strong> 46.88 |{" "}
                        <strong>Human-Only Score:</strong> 41.39 |{" "}
                        <strong>FOBO Score:</strong> 59.54
                    </Typography>

                    <Typography variant="subtitle1" fontWeight={600} mb={1} color='primary.main'>
                        1. Executive Summary
                    </Typography>
                    <Divider sx={{ borderColor: "#00A3FF", mb: 1 }} />
                    <Typography variant="body2">
                        Accenture's enterprise transformation is driven by a convergence of strengths across product management,
                        software engineering, marketing, and data science – united by a strategic emphasis on agile methodologies, cloud adoption, artificial intelligence (AI)/machine learning (ML) integration,
                        and digital innovation. The company's FOBO (Fear of Better Options) score of 59.5 reflects high potential in human creativity (40.2%) and augmentation (46.9%) while revealing opportunities in automation (12.7%).
                        This unified strategy prioritizes incorporating advanced AI techniques, modernizing operational workflows, and fostering a culture of continuous upskilling and cross-domain collaboration.
                    </Typography>
                </CardContent>
            </Card>

            <Box mt={3}>
                <Typography variant="h4" mb={1} color="primary.main">
                    Domain Comprehensive Plans
                </Typography>
                <Divider sx={{ borderColor: "#00A3FF", mb: 2 }} />

                {["Product Management", "Software Engineering", "Marketing", "Data Science"].map(
                    (domain, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                border: "1px solid #E0E0E0",
                                borderRadius: 2,
                                p: 2,
                                mb: 2,
                                backgroundColor: "#FAFCFF",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#00A3FF",
                                    boxShadow: "0 4px 12px rgba(0,163,255,0.1)",
                                },
                            }}
                        >
                            <Accordion
                                disableGutters
                                elevation={0}
                                sx={{
                                    backgroundColor: "transparent",
                                    "&:before": { display: "none" }, // remove default MUI divider
                                }}
                            >
                                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#00A3FF" }} />}>
                                    <Typography fontWeight={600} color="#2A4C94">
                                        {domain}
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Typography variant="body2" sx={{ color: "#444" }}>
                                        Placeholder for detailed {domain} FOBO strategy and action plan.
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    )
                )}
            </Box>
        </Box>
    );
};

export default CompanyComprehensivePlan;
