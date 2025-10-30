    import React from "react";
    import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    } from "@mui/material";
    import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    } from "recharts";

    const skillErosionData = [
    { month: 0, baseline: 0, upskilling: 0 },
    { month: 12, baseline: 40, upskilling: 15 },
    { month: 24, baseline: 60, upskilling: 25 },
    { month: 36, baseline: 80, upskilling: 35 },
    { month: 48, baseline: 95, upskilling: 45 },
    ];

    export default function SkillErosionProjection() {
    return (
        <Box
        sx={{
            p: { xs: 2, md: 4 },
            maxWidth: 1200,
            mx: "auto",
            minHeight: "500px",
            bgcolor: "background.default",
        }}
        >
        {/* Header */}
        <Typography
            variant="h6"
            sx={{
            fontWeight: 600,
            textAlign: "center",
            mb: 1.5,
            }}
        >
            Skill-Erosion Projection (Company-wide)
        </Typography>

        {/* Baseline / Upskilling labels below title */}
        <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            mb: 3,
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
                sx={{
                width: 25,
                height: 8,
                bgcolor: "#f44336",
                borderRadius: 1,
                }}
            />
            <Typography variant="body2" color="text.secondary">
                Baseline
            </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
                sx={{
                width: 25,
                height: 8,
                bgcolor: "#4caf50",
                borderRadius: 1,
                }}
            />
            <Typography variant="body2" color="text.secondary">
                With Upskilling
            </Typography>
            </Box>
        </Box>

        {/* Line Chart Section */}
        <Card variant="outlined" sx={{ pb: 5 }}>
            <CardContent>
            <Box sx={{ width: "100%", height: 450 }}>
                <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={skillErosionData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                    dataKey="month"
                    label={{
                        value: "Months",
                        position: "insideBottom",
                        offset: -5,
                    }}
                    />
                    <YAxis
                    domain={[0, 100]}
                    ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                    label={{
                        value: "Skill Erosion (%)",
                        angle: -90,
                        position: "insideLeft",
                    }}
                    />
                    <Tooltip />
                    <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#f44336"
                    strokeWidth={3}
                    name="Baseline"
                    />
                    <Line
                    type="monotone"
                    dataKey="upskilling"
                    stroke="#4caf50"
                    strokeWidth={3}
                    name="With Upskilling"
                    />
                </LineChart>
                </ResponsiveContainer>

                {/* Buttons */}
                <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 1,
                }}
                >
                <Button variant="outlined">Show/Hide Individuals</Button>
                <Button variant="outlined">Show/Hide Skills</Button>
                </Box>
            </Box>
            </CardContent>
        </Card>
        </Box>
    );
    }
