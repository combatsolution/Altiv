import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";

// Helper to bold numeric percentages like "30%"
const highlightPercentages = (text) => {
  const parts = text.split(/(\d+%)/g);
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

export default function StrategicObjectives({ data }) {
  const strategicObjectives = data?.data?.json_schema_data?.strategic_objectives;
  const planList = strategicObjectives?.plan || [];
  const timePeriod = strategicObjectives?.timeperiod || "N/A";

  return (
    <Box
      sx={{
         pageBreakAfter: "always",
        p: 3,
        mx: "auto",
        maxWidth: { xs: "100%", md: "1200px", lg: "1200px" },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          pb: 2,
          my: 2,
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
        }}
      >
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

      {/* Time Period */}
      <Typography
        variant="subtitle1"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: "#334155",
        }}
      >
        Time Period: {timePeriod}
      </Typography>

      {/* Objectives List */}
      <Grid container spacing={2}>
        {planList.map((text, index) => (
          <Grid item xs={12} key={index}>
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
                  background: "linear-gradient(135deg, #2c45e1, #0097f9)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  mr: 2,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </Box>

              {/* Objective Text */}
              <Typography sx={{ fontSize: "15px", color: "black" }}>
                {highlightPercentages(text)}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

StrategicObjectives.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        strategic_objectives: PropTypes.shape({
          timeperiod: PropTypes.string,
          plan: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
    }),
  }),
};

