


import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";

const headers = [
  "Task",
  "Automation Potential",
  "Current Time",
  "Projected Savings",
  "Recommended Tools",
];

// Utility for chip color
const getChipColor = (potential) => {
  switch (potential) {
    case "High":
      return { bgcolor: "#dcfce7", color: "#15803d" }; // green
    case "Medium":
      return { bgcolor: "#fef3c7", color: "#b45309" }; // amber
    default:
      return { bgcolor: "#f3f4f6", color: "#374151" }; // gray fallback
  }
};

export default function TopTasksExposureAnalysis({ data }) {
  // ✅ Dynamically access top_tasks_exposure_analysis from API response
  const top_tasks_exposure_analysis =
    data?.data?.json_schema_data?.top_tasks_exposure_analysis || [];

  return (
    <Box
      sx={{
        p: 3,
        mx: "auto",
        maxWidth: { xs: "100%", md: "1200px" },
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          py: 2,
          mb: 2,
          borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#1e40af" }}
        >
          Top Tasks Exposure Analysis
        </Typography>

        <Button
          size="small"
          variant="contained"
          startIcon={<Icon icon="ri:twitter-x-fill" width={18} />}
          sx={{
            textTransform: "none",
            bgcolor: "#00e0ac",
            "&:hover": { bgcolor: "#00c195" },
          }}
        >
          Tweet
        </Button>
      </Box>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          overflowX: "auto",
        }}
      >
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 6px", // vertical & horizontal gap
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header, i) => (
                <TableCell
                  key={i}
                  sx={{
                    bgcolor: "primary.main",
                    color: "#fff",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    borderRadius: "6px",
                    textAlign: "center",
                    borderLeft: i !== 0 ? "2px solid #f7f0f033" : "none", // subtle column separation
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {top_tasks_exposure_analysis.length > 0 ? (
              top_tasks_exposure_analysis.map((row, idx) => (
                <TableRow key={idx} hover>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {row.task}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={row.automation_potential}
                      sx={{
                        ...getChipColor(row.automation_potential),
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    {`${row.current_time_hours_per_week} hrs/week`}
                  </TableCell>

                  <TableCell sx={{ color: "#16a34a", fontWeight: "bold" }}>
                    {`${row.projected_savings_percentage}%`}
                  </TableCell>

                  <TableCell>
                    {Array.isArray(row.recommended_tools)
                      ? row.recommended_tools.join(", ")
                      : row.recommended_tools}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    No task data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

TopTasksExposureAnalysis.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.shape({
      json_schema_data: PropTypes.shape({
        top_tasks_exposure_analysis: PropTypes.arrayOf(
          PropTypes.shape({
            task: PropTypes.string,
            automation_potential: PropTypes.string,
            current_time_hours_per_week: PropTypes.number,
            projected_savings_percentage: PropTypes.number,
            recommended_tools: PropTypes.arrayOf(PropTypes.string),
          })
        ),
      }),
    }),
  }),
};