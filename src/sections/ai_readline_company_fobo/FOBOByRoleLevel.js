import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const FOBOByRoleLevel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dataTemplates = [
    {
      title: "Product Management",
      labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],
      data: [70, 60, 65, 58, 50, 48, 48],
      roleLevels: [
        "L1: Product Analyst",
        "L2: Associate Product Manager",
        "L3: Product Manager",
        "L4: Senior Product Manager",
        "L5: Director of Product",
        "L6: VP Product",
        "L7: Chief Product Officer",
      ],
    },
    {
      title: "Software Engineering",
      labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],
      data: [55, 65, 62, 58, 48, 45, 42],
      roleLevels: [
        "L1: Engineering Intern",
        "L2: Associate Software Engineer",
        "L3: Software Engineer",
        "L4: Senior Software Engineer",
        "L5: Director of Engineering",
        "L6: VP Engineering",
        "L7: Chief Technology Officer",
      ],
    },
    {
      title: "Marketing",
      labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],
      data: [65, 63, 60, 50, 48, 45, 75],
      roleLevels: [
        "L1: Marketing Intern",
        "L2: Marketing Specialist",
        "L3: Marketing Manager",
        "L4: Senior Marketing Manager",
        "L5: Director Marketing",
        "L6: VP Marketing",
        "L7: Chief Marketing Officer",
      ],
    },
    {
      title: "Data Science",
      labels: ["L1", "L2", "L3", "L4", "L5", "L6", "L7"],
      data: [60, 65, 58, 54, 52, 50, 68],
      roleLevels: [
        "L1: Associate",
        "L2: Data Scientist",
        "L3: Senior Data Scientist",
        "L4: Lead Data Scientist",
        "L5: Director Data Science",
        "L6: VP Data Science",
        "L7: Chief Data Officer",
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
      <Typography variant="h5" mb={3} fontWeight={600} color="primary">
        FOBO by Role Level
      </Typography>

      <Divider sx={{ borderColor: "#00A3FF", mb: 3 }} />

      <Grid container spacing={3}>
        {dataTemplates.map((chart, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                height: "100%",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "primary.main", fontWeight: 600 }}
                >
                  {chart.title}
                </Typography>

                <Box sx={{ position: "relative", height: 250, mb: 2 }}>
                  <Bar
                    data={{
                      labels: chart.labels,
                      datasets: [
                        {
                          label: "FOBO Score",
                          data: chart.data,
                          backgroundColor: "#1BABFE",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { y: { beginAtZero: true, max: 100 } },
                      plugins: { legend: { display: false } },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    bgcolor: "#f9fafc",
                    borderRadius: 2,
                    p: 2,
                    mt: 1,
                    border: "1px solid #E0E0E0",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Role Levels:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      lineHeight: 1.6,
                      color: "text.secondary",
                      fontSize: 13,
                    }}
                  >
                    {chart.roleLevels.map((role, i) => (
                      <React.Fragment key={i}>
                        <b>{role.split(":")[0]}:</b> {role.split(":")[1]}
                        <br />
                      </React.Fragment>
                    ))}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FOBOByRoleLevel;
