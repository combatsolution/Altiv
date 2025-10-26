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

const domainPlans = [
    {
        title: "Product Management",
        sections: [
            {
                heading: "1. Executive Summary",
                content:
                    "Product management professionals across the domain demonstrate strong expertise in agile methodologies, product lifecycle management, and cross-functional leadership, driving impactful digital transformations in diverse sectors including SaaS, e-commerce, ERP, and cloud-based solutions."
            },
            {
                heading: "2. Current State Diagnostic",
                content:
                    "Strong foundations in product strategy, agile delivery, and technical proficiency with identified gaps in AI-driven analytics and automation."
            },
            {
                heading: "3. Strategic Objectives (3 Years)",
                list: [
                    "Integrate AI-driven analytics across product management processes",
                    "Develop AI-enhanced product roadmaps",
                    "Establish comprehensive AI upskilling programs"
                ]
            }
        ]
    },
    {
        title: "Software Engineering",
        sections: [
            {
                heading: "1. Executive Summary",
                content:
                    "Software engineering teams display robust capabilities in full-stack development, cloud-native architectures, and DevOps practices, driving scalable and efficient digital ecosystems."
            },
            {
                heading: "2. Current State Diagnostic",
                content:
                    "Strong expertise in microservices, CI/CD pipelines, and agile frameworks with room for improvement in automated testing, AI-assisted coding, and low-code adoption."
            },
            {
                heading: "3. Strategic Objectives (3 Years)",
                list: [
                    "Adopt AI-assisted code generation and quality assurance tools",
                    "Accelerate migration to cloud-native and serverless architectures",
                    "Implement continuous learning programs for emerging tech stacks"
                ]
            }
        ]
    },
    {
        title: "Marketing",
        sections: [
            {
                heading: "1. Executive Summary",
                content:
                    "Marketing professionals demonstrate strategic acumen in digital branding, customer engagement, and data-driven campaigns across global markets."
            },
            {
                heading: "2. Current State Diagnostic",
                content:
                    "Strong digital presence and analytics proficiency with gaps in AI-enabled personalization, automation, and cross-channel integration."
            },
            {
                heading: "3. Strategic Objectives (3 Years)",
                list: [
                    "Integrate AI-driven customer segmentation and targeting",
                    "Enhance marketing automation and cross-channel analytics",
                    "Develop creative optimization using generative AI tools"
                ]
            }
        ]
    },
    {
        title: "Data Science",
        sections: [
            {
                heading: "1. Executive Summary",
                content:
                    "Data science professionals exhibit advanced skills in statistical modeling, predictive analytics, and data visualization, enabling business insights and innovation."
            },
            {
                heading: "2. Current State Diagnostic",
                content:
                    "Strong technical foundation in analytics and visualization, with evolving maturity in deploying scalable machine learning and AI governance frameworks."
            },
            {
                heading: "3. Strategic Objectives (3 Years)",
                list: [
                    "Deploy AI models across enterprise operations for decision automation",
                    "Enhance data governance and model explainability frameworks",
                    "Foster collaboration between data scientists and business units for actionable insights"
                ]
            }
        ]
    }
];


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
                    <Typography variant="h6" gutterBottom color='primary.main' sx={{
                        mt: 3,
                    }}>
                        Company FOBO Comprehensive Plan - Accenture
                    </Typography>
                    <Divider sx={{ borderColor: "#00A3FF", mb: 2 }} />
                    <Typography variant="h6" gutterBottom color='primary.main'>
                        Company FOBO Summary
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column", // each row (group) goes under the previous one
                            gap: 0.5, // small space between rows
                            mb: 2,
                        }}
                    >
                        {[
                            { label: "Automation Score", value: "12.66" },
                            { label: "Augmentation Score", value: "46.88" },
                            { label: "Human-Only Score", value: "41.39" },
                            { label: "FOBO Score", value: "59.54" },
                        ].map((item, idx) => (
                            <Typography
                                key={idx}
                                variant="body2"
                                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                            >
                                <strong>{item.label}:</strong> {item.value}
                                {idx !== 3 && " |"}
                            </Typography>
                        ))}
                    </Box>



                    <Typography variant="subtitle1" fontWeight={600} mb={1} color='primary.main'>
                        1. Executive Summary
                    </Typography>
                    <Divider sx={{ borderColor: "#00A3FF", mb: 1 }} />
                    <Typography variant="body2">
                        Accenture&apos;s enterprise transformation is driven by a convergence of strengths across product management,
                        software engineering, marketing, and data science – united by a strategic emphasis on agile methodologies, cloud adoption, artificial intelligence (AI)/machine learning (ML) integration,
                        and digital innovation. The company&apos;s FOBO (Fear of Better Options) score of 59.5 reflects high potential in human creativity (40.2%) and augmentation (46.9%) while revealing opportunities in automation (12.7%).
                        This unified strategy prioritizes incorporating advanced AI techniques, modernizing operational workflows, and fostering a culture of continuous upskilling and cross-domain collaboration.
                    </Typography>

                </CardContent>
            </Card>

            <Box mt={3}>
                <Typography variant="h4" mb={1} color="primary.main">
                    Domain Comprehensive Plans
                </Typography>
                <Divider sx={{ borderColor: "#00A3FF", mb: 2 }} />

                {domainPlans.map((domain, idx) => (
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
                                "&:before": { display: "none" },
                            }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#00A3FF" }} />}>
                                <Typography fontWeight={600} color="#2A4C94">
                                    {domain.title}
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                                {domain.sections.map((sec, i) => (
                                    <Box key={i} sx={{ mb: 2 }}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={600}
                                            color="#2A4C94"
                                            sx={{ mb: 1 }}
                                        >
                                            {sec.heading}
                                        </Typography>
                                        {sec.content && (
                                            <Typography variant="body2" sx={{ color: "#444", mb: 1 }}>
                                                {sec.content}
                                            </Typography>
                                        )}
                                        {sec.list && (
                                            <ul style={{ marginTop: 0, marginBottom: "8px" }}>
                                                {sec.list.map((item, j) => (
                                                    <li key={j}>
                                                        <Typography variant="body2" sx={{ color: "#444" }}>
                                                            {item}
                                                        </Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                ))}

            </Box>
        </Box>
    );
};

export default CompanyComprehensivePlan;
