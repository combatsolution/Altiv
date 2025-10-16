// src/components/ToolsMastery.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
  
export default function ToolsMastery({ tools = [] }) {
    console.log("sdsfgg", tools)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // 🧠 Defensive check: handle if tools array is empty
  if (!tools.length) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="body1" color="text.secondary">
          No tools data available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mx: "auto",
        maxWidth: "1200px",
        width: "100%",
        px: { xs: 2, sm: 3 },
      }}
    >
      <Divider sx={{ my: 3, width: "100%" }} />

      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        sx={{ mb: 2, color: theme.palette.primary.dark }}
      >
        Tools you’ll master
      </Typography>
      {tools.map((section, i) => (
        <Box
          key={section.id || i}
          sx={{
            bgcolor: "#f4f6ff",
            borderRadius: 2,
            p: { xs: 2, sm: 4 },
            mb: 4,
          }}
        >
          {/* 🏷️ Category name */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ mb: 2, color: "#000" }}
          >
            {section.category}
          </Typography>
 

          <Grid container spacing={2}>
            {section.tools.map((tool, idx) => (
              <Grid
                item
                xs={12}
                sm={section.tools.length === 1 ? 12 : 6}
                key={idx}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      transform: "translateY(-3px)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="600"
                      gutterBottom
                      align={isMobile ? "center" : "center"}
                    >
                      {tool.toolName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align={isMobile ? "center" : "center"}
                    >
                      {tool.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

ToolsMastery.propTypes ={
  tools: PropTypes.string.isRequired,
};