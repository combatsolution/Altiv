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
    id: "01",
    text: "Implement AI-enhanced process automation in hospital operations to reduce process inefficiencies by 30% within 36 months",
  },
  {
    id: "02",
    text: "Integrate advanced AI-driven compliance and quality monitoring systems to achieve a 20% reduction in audit-related incidents by Year 3",
  },
  {
    id: "03",
    text: "Establish a data analytics framework powered by AI for real-time reporting and predictive insights, increasing operational decision speed by 25% over three years",
  },
  {
    id: "04",
    text: "Develop AI-backed stakeholder engagement strategies (using CRM and sentiment analysis tools) to boost strategic partnerships by 15% within 36 months",
  },
  {
    id: "05",
    text: "Enhance team productivity by incorporating AI-driven scheduling and performance measurement tools, aiming for a 20% improvement in team efficiency by Year 3",
  },
  {
    id: "06",
    text: "Mentor and upskill two junior managers in AI-readiness and digital transformation, ensuring AI competencies are embedded within operational teams by the end of Year 3",
  },
];

// helper function to bold percentages like "30%"
const highlightPercentages = (text) => {
  const parts = text.split(/(\d+%)/g); // split around numbers followed by %
  return parts.map((part, index) =>
    /\d+%/.test(part) ? (
      <Box component="span" key={index} sx={{ fontWeight: "bold" }}>
        {part}
      </Box>
    ) : (
      part
    )
  );
};

export default function StrategicObjectives() {
  return (
    <Box sx={{ p: 3, mx: 'auto', maxWidth: { xs: '100%', md: '1200px', lg: '1200px' } }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center"
        sx={{

          pb: 2,
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
        }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e40af" }}>
          Strategic Objectives
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
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              {/* Number Badge */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "linear-gradient(135deg, #2c45e1, #0097f9)",
                  background: "linear-gradient(135deg, #2c45e1, #0097f9)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                {obj.id}
              </Box>

              {/* Objective Text */}
              {/* <Typography sx={{ fontSize: '15px', color: "#1e293b" }}>
                {obj.text}
              </Typography> */}
              <Typography sx={{ fontSize:'15px',
                color:'black'
              }}>

                {highlightPercentages(obj.text)}
              </Typography>

            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
