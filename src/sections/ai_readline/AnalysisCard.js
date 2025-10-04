import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import PropTypes from "prop-types";


export default function AnalysisCard({ title, badge, evidence, gap }) {
  const badgeStyles = {
    HIGH:   { bg: "#e0f2f1", color: "#00796b" },
    MEDIUM: { bg: "#fff3e0", color: "#ef6c00" },
    LOW:    { bg: "#fce4ec", color: "#c2185b" },
  };

  return (
    <Card
      sx={{
       
        borderRadius: 2,
        boxShadow: 2,
        p: 1,
        height: "100%",
      }}
    >
      <CardContent>
        {/* Title + Badge */}
        <Box display="flex"  justifyContent="space-between" alignItems="center"
      >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            {title}
          </Typography>
          <Chip
            label={badge}
            size="small"
           sx={{
              bgcolor: badgeStyles[badge]?.bg || "#eeeeee",
              color: badgeStyles[badge]?.color || "#333",
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* Evidence */}
        <Typography
          variant="body2"
          sx={{ mt: 1, mb: 1 }}
        >
          <b>Evidence:</b> {evidence}
        </Typography>

        {/* AI Readiness Gap */}
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            bgcolor: "#fce4ec",
          }}
        >
          <Typography variant="body2" sx={{ color: "#d32f2f" }}>
            <b>AI-Readiness Gap:</b> {gap}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

AnalysisCard.propTypes = {
  title: PropTypes.string.isRequired,
  badge: PropTypes.string.isRequired,
  evidence: PropTypes.string.isRequired,
  gap: PropTypes.string.isRequired,
};