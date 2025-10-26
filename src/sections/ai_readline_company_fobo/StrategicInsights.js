
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
      color: "#FAFFFD",
      borderColor: "#00FF88", // Green border
      items: [
        "The Software Engineering (SE) domain exhibits a relatively lower FOBO score of 57.8 compared to other domains, indicating stronger resilience to automation risks.",
        "The overall workforce shows a strong augmentation score of 46.9, reflecting a healthy balance of human-AI collaboration that can be leveraged for competitive advantage.",
        "Product Management (PM) and Marketing domains, despite higher FOBO scores, demonstrate significant human task components (combined with augmentation), suggesting readiness for hybrid workflows.",
        "The human task score of 40.2 across the company indicates a substantial portion of uniquely human skills that can be further developed to maintain differentiation.",
        "The distribution of profiles analyzed (67 total, with a good spread across SE, DS, PM, and Marketing) provides a comprehensive base for targeted transformation initiatives.",
      ],
    },
    {
      title: "Gaps & Risks",
      color: "#FFFDFA",
      borderColor: "#FF8A04", // Light cream border
      items: [
        "Marketing titles have the highest FOBO score at 62.7, signaling elevated automation risk and urgent need for upskilling to mitigate task displacement.",
        "Product Management domain also shows a high FOBO score of 62.3, indicating vulnerability to automation of routine PM tasks without strategic intervention.",
        "Data Science (DS) domain, while critical, has a FOBO score of 57.1 with a relatively low automation score, suggesting potential under-leveraging of automation tools and risk of skill stagnation.",
        "The automation score of 12.7 overall, though moderate, highlights pockets of tasks that can be fully automated, posing risk if not proactively addressed through reskilling.",
        "The imbalance between augmentation (46.9) and human tasks (40.2) suggests a need to strengthen uniquely human capabilities to avoid over-reliance on AI augmentation, which may not fully replace human judgment.",
      ],
    },
    {
      title: "Act-Now Levers",
      color: "#F8FCFF",
      borderColor: "#04A5FF", // Very light blue border
      items: [
        "Initiate a 6-month targeted upskilling program for Marketing and PM domains focusing on AI-augmented decision-making and creative problem-solving to reduce FOBO scores below 60.",
        "Deploy AI-driven automation pilots in Data Science workflows within 3 months to enhance augmentation scores and free DS talent for higher-value uniquely human tasks.",
        "Implement a company-wide human skills development framework over the next 12 months emphasizing emotional intelligence, strategic thinking, and complex problem-solving to increase the human task score above 45.",
        "Establish cross-domain AI collaboration task forces by Q3 to share best practices and optimize augmentation opportunities, leveraging the current 46.9 augmentation score.",
        "Conduct quarterly FOBO score monitoring and workforce segmentation reviews to dynamically adjust transformation strategies and mitigate emerging automation risks.",
      ],
    },
  ];

  return (
    <Box
      p={isMobile ? 2 : 4}
      sx={{
        mx: "auto",
        maxWidth: "1155px",
        px: { xs: 3, md: 4 },
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ color: "primary.main" }}
      >
        Strategic Insights
      </Typography>

      <Divider sx={{ borderColor: "#00A3FF", mb: 3, height:2}}/>

      <Grid container spacing={3}>
        {sections.map((sec, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card
              sx={{
                backgroundColor: sec.color,
                height: "100%",
                borderLeft: `6px solid ${sec.borderColor}`,
                borderRadius: 2,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
               <Box sx={{
                 display:'flex',
                  flexDirection:'row',
                  alignItems:'center'
               }}>
                <Box sx={{  
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: sec.borderColor,
                  mr: 1.2,
                  mb:1,
                 
                }}/>

                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {sec.title}
                  </Typography>
                </Box>


                <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                  {sec.items.map((text, i) => (
                    <li key={i} style={{ listStyleType: 'disc' }}>
                      <Typography variant="body2" mb={0.5}>
                        {text}
                      </Typography>
                      <Box
                        sx={{
                          width: 30,
                          height: 1,
                          backgroundColor: 'grey.800',
                          mt: 0.5,
                          mb: 1,
                        }}
                      />
                    </li>
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
