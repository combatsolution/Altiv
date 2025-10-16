
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
        "The Software Engineering (SE) domain exhibits a relatively lower FOBO score of 57.8, indicating resilience to automation risks.",
        "The overall workforce shows a strong augmentation score of 46.9.",
        "Product Management (PM) and Marketing domains display strong human-task components.",
        "The human task score of 40.2 indicates substantial uniquely human skills.",
        "The distribution of profiles provides a comprehensive base for transformation.",
      ],
    },
    {
      title: "Gaps & Risks",
      color: "#FFFDFA",
      borderColor: "#FF8A04", // Light cream border
      items: [
        "Marketing holds the highest FOBO score at 62.7, indicating automation risk.",
        "Product Management domain also shows a high FOBO score of 62.3.",
        "Data Science, while critical, has a FOBO score of 57.1 with low automation leverage.",
        "Automation score of 12.7 overall highlights potential risk if not managed proactively.",
        "Imbalance between augmentation and human tasks shows need for capability strengthening.",
      ],
    },
    {
      title: "Act-Now Levers",
      color: "#F8FCFF",
      borderColor: "#04A5FF", // Very light blue border
      items: [
        "Initiate a 6-month AI upskilling program for PM and Marketing.",
        "Deploy AI automation pilots in Data Science within 3 months.",
        "Implement human skills development emphasizing creativity and problem-solving.",
        "Establish AI collaboration task forces across domains.",
        "Conduct quarterly FOBO monitoring and dynamic strategy adjustments.",
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
        variant="h5"
        mb={3}
        fontWeight={600}
        sx={{ color: "primary.main" }}
      >
        Strategic Insights
      </Typography>

      <Divider sx={{ borderColor: "#00A3FF", mb: 3 }} />

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
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {sec.title}
                </Typography>
                <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
                  {sec.items.map((text, i) => (
                    <li key={i}>
                      <Typography variant="body2" mb={1}>
                        {text}
                      </Typography>
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
