
import React from "react";
import Divider from '@mui/material/Divider';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const StrategicInsights = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const sections = [
    {
      title: "Strengths",
      textcolor: '#5E7A57',
      bgcolor: "#ECFDF5",
      "items": [
        "Data Science (DS) domain exhibits the lowest FOBO score at 57.1, indicating relatively higher resilience to automation compared to other domains.",
        "High Augmentation Score of 46.9 across the company suggests strong potential for human-AI collaboration, positioning Accenture well for AI-augmented workflows.",
        "Project Management (PM) and Marketing domains have balanced Human Scores (around 40.2) supporting uniquely human tasks critical for strategic decision-making and creativity.",
        "The relatively moderate Automation Score of 12.7 indicates that a smaller portion of tasks are fully automatable, allowing focus on augmentation rather than full automation.",
        "The workforce composition across 67 profiles with diverse domain representation enables cross-functional AI transformation initiatives leveraging domain-specific strengths."
      ],
    },
    {
      title: "Gaps & Risks",
      textcolor: '#B45310',
      bgcolor: "#FFFBEB",
      "items": [
        "Marketing domain has the highest FOBO score at 62.7, indicating elevated automation risk and potential skill erosion in marketing roles.",
        "Project Management roles show a high FOBO score of 62.3, signaling vulnerability to automation of routine PM tasks and risk of workforce displacement without reskilling.",
        "Software Engineering (SE) domain FOBO score of 57.8 suggests moderate automation risk, especially in repetitive coding or testing tasks, requiring attention to upskilling.",
        "The relatively low Human Score (40.2) across the company signals potential underinvestment in uniquely human skills, which could limit differentiation in client engagements.",
        "The imbalance between high augmentation (46.9) and lower human task scores may create challenges in workforce transformation if employees lack skills to effectively collaborate with AI tools."
      ],
    },
    {
      title: "Act-Now Levers",
      textcolor: '#4855D1',
      bgcolor: "#EEF2FF",
      "items": [
        "Implement targeted reskilling programs in Marketing and Project Management domains within the next 6 months to address high FOBO scores and reduce automation risk.",
        "Develop AI-augmentation training modules for Software Engineering teams focusing on advanced coding and AI-assisted testing by Q4 2024 to enhance augmentation capabilities.",
        "Launch a company-wide initiative to strengthen uniquely human skills such as creativity, emotional intelligence, and complex problem-solving over the next 12 months.",
        "Establish cross-domain AI transformation task forces leveraging DS domain strengths to pilot human-AI collaboration projects starting Q3 2024.",
        "Integrate FOBO score monitoring into workforce planning processes to continuously identify at-risk roles and adjust talent strategies dynamically."
      ],
    },
  ];

  return (
    <Box
      p={isMobile ? 2 : 4}
      sx={{
        mx: "auto",
        maxWidth: "1205px",
        px: { xs: 3, md: 4 },
        py: 4,
      }}
    >
      <Grid container spacing={3}>
        {sections.map((sec, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card
              sx={{
                backgroundColor: sec.bgcolor,
                height: "100%",
                borderRadius: 2,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>

                  <Typography variant="subtitle2" gutterBottom fontWeight={600} sx={{
                    color: sec.textcolor,
                  }}>
                    {sec.title}
                  </Typography>
                </Box>


                <ul style={{ paddingLeft: '0px', marginTop: '8px' }}>
                  {sec.items.map((text, i) => (
                    <Box
                    key={i}
                    marginBottom={1}
                    >
                      <Typography variant="subtitle2"
                      sx={{
                        gap:2,
                        fontWeight:200,
                        fontSize:'14px',
                        lineHeight:1,
                        color:'text.primary',
                      }}>

                        {text}
                      </Typography>
                    </Box>
                  ))}
                </ul>
              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StrategicInsights;
