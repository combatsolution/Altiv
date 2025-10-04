import React from "react";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const objectives = [
    {
        id: "Week 1",
        head: 'Assessment & Baseline',
        output: 'Output: Documented current state report with identified AI-readiness gaps',
        text: "Set up baseline AI-readiness & digital maturity assessments",
    },
    {
        id: "Week 2",
        head: 'Initial Pilot',
        output: 'Output: Operational pilot report; streamline scheduling and document workflows',
        text: "Pilot initial AI tools (Microsoft Copilot, Zapier AI) in one operational process",
    },
    {
        id: "Week 3",
        head: 'Learning & Training',
        output: 'Output: Completion certificates and a summary of key takeaways',
        text: "Attend targeted online modules covering AI in Healthcare and Process Automation",
    },
    {
        id: " Week 4",
        head: 'Dashboard Implementation',
        output: 'Output: Deployed dashboard with at least 2 key performance metrics; report on improvements',
        text: "Implement initial AI dashboard integration for process monitoring and quality audits",
    },

];



export default function QuickStartGuide() {
    return (
        <Box sx={{ p: 3, mx: 'auto', maxWidth: { xs: '100%', md: '1200px', lg: '1200px' } }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center"
                sx={{

                    pb: 2,
                    borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
                }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e40af" }}>
                    4-Week Quick Start Guide
                </Typography>
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<ShareIcon />}
                    sx={{
                        textTransform: "none",
                        bgcolor: "#00e0ac",
                        "&:hover": { bgcolor: "#00c195" },
                    }}
                >
                    Share
                </Button>
            </Box>

            {/* Objectives List */}
            <Grid container spacing={2}>
                {objectives.map((obj) => (
                    <Grid item xs={12} key={obj.id}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                alignItems: "top",
                                borderRadius: 2,
                                boxShadow: 1,
                            }}
                        >

                            {/* Number Badge */}
                            <Box
                                sx={{
                                    width: 70,
                                    height: 30,
                                    borderRadius: "10%",
                                    bgcolor: "linear-gradient(135deg, #2c45e1, #0097f9)",
                                    background: "linear-gradient(135deg, #2c45e1, #0097f9)",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "bold",
                                    mx: 2,
                                    fontSize: 12,
                                }}
                            >
                                {obj.id}
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                                <Typography sx={{ fontSize: '15px', mb: 1, color: "primary.main", fontWeight: 'bold' }}>
                                    {obj.head}</Typography>

                                {/* Objective Text */}
                                <Typography sx={{ fontSize: '15px', color: "#1e293b" }}>
                                    {obj.text} </Typography>

                                <Typography sx={{ fontSize: '15px', color: "#1e293b",
                                    borderLeft: '2px solid #05FF8A', 
                                    bgcolor: '#FEF0EE', p: 1, 
                                    borderRadius: 1, mt: 1, }}>
                                    {obj.output} </Typography>
                            </Box>

                        </Paper>
                    </Grid>
                ))}
            </Grid> 
        </Box>
    );
}
