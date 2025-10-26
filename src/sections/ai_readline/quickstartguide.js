import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

export default function QuickStartGuide({ data }) {
  const checklistData =
    data?.data?.json_schema_data?.first_30_days_quick_start_checklist?.checklist || [];
  const timePeriod =
    data?.data?.json_schema_data?.first_30_days_quick_start_checklist?.time_period_definition?.T ||
    "30 Days: Quick-Start Implementation Period";

  return (
    <Box
      sx={{
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
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1e40af" }}>
          {timePeriod}
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

      {/* Checklist */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {checklistData.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "flex-start",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              {/* Week Badge */}
              <Box
                sx={{
                  width: 70,
                  height: 30,
                  borderRadius: "10%",
                  background: "linear-gradient(135deg, #2c45e1, #0097f9)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  mx: 2,
                  fontSize: 12,
                  flexShrink: 0,
                }}
              >
                {item.Week}
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {/* Action */}
                <Typography
                  sx={{
                    fontSize: "15px",
                    mb: 1,
                    color: "primary.main",
                    fontWeight: "bold",
                  }}
                >
                  {item.Action}
                </Typography>

                {/* Output */}
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "#1e293b",
                    borderLeft: "2px solid #05FF8A",
                    bgcolor: "#FEF0EE",
                    p: 1,
                    borderRadius: 1,
                    mt: 1,
                  }}
                >
                  {item["Concrete Output"]}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

QuickStartGuide.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        first_30_days_quick_start_checklist: PropTypes.shape({
          time_period_definition: PropTypes.shape({
            T: PropTypes.string,
          }),
          checklist: PropTypes.arrayOf(
            PropTypes.shape({
              Week: PropTypes.string,
              Action: PropTypes.string,
              "Concrete Output": PropTypes.string,
            })
          ),
        }),
      }),
    }),
  }),
};
