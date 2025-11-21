import React, { useState } from "react";
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
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";
import { useAuthContext } from "src/auth/hooks";
import PlansModal from "./PlansModal";

const headers = [
  "Task",
  "Automation Potential",
  "Current Time",
  "Projected Savings",
  "Recommended Tools",
];

// ✅ Utility for chip color
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

export default function TopTasksExposureAnalysis({ data, serviceResp = false }) {
  const { user } = useAuthContext();
  const [openPlans, setOpenPlans] = useState(false);
  const handleOpenPlans = () => setOpenPlans(true);
  const handleClosePlans = () => setOpenPlans(false);

  // ✅ Unlock check
  const isContentVisible = user?.isPro || serviceResp;

  // ✅ Dummy fallback data
  const dummyData = [
    {
      task: "Inventory Replenishment Planning",
      automation_potential: "High",
      current_time_hours_per_week: 12,
      projected_savings_percentage: 60,
      recommended_tools: ["Blue Yonder", "UiPath"],
    },
    {
      task: "Purchase Order Follow-ups",
      automation_potential: "Medium",
      current_time_hours_per_week: 8,
      projected_savings_percentage: 45,
      recommended_tools: ["Automation Anywhere", "Zapier"],
    },
    {
      task: "Sales Data Reconciliation",
      automation_potential: "High",
      current_time_hours_per_week: 10,
      projected_savings_percentage: 55,
      recommended_tools: ["Power BI", "Excel Macros"],
    },
    {
      task: "Demand Forecast Review",
      automation_potential: "Medium",
      current_time_hours_per_week: 6,
      projected_savings_percentage: 40,
      recommended_tools: ["PlanVisage AI", "Python (Prophet)"],
    },
    {
      task: "Reporting & Dashboard Updates",
      automation_potential: "High",
      current_time_hours_per_week: 5,
      projected_savings_percentage: 70,
      recommended_tools: ["Tableau", "Looker Studio"],
    },
  ];

  // ✅ Use API data if unlocked, otherwise dummy data
  const top_tasks_exposure_analysis = serviceResp
    ? data?.data?.json_schema_data?.top_tasks_exposure_analysis || []
    : dummyData;

  return (
    <Box sx={{ position: "relative" }}>
      {/* 🔒 Locked Overlay */}
      {!isContentVisible && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 2,
          }}
        >
          <Box
            sx={{
              mx: "auto",
              bgcolor: "white",
              p: { xs: 2, sm: 3, md: 4 },          // Responsive padding
              borderRadius: 3,
              textAlign: "center",                 // Center content on all screens
              width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },  // Adaptive width
              boxShadow: 3,
            }}
          >
            
          <LockIcon sx={{ fontSize: 60, color: "#1565c0", mb: 2 }} />
          <Typography variant="h6" fontWeight={600}>
            Task Automation Insights Locked
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
            Upgrade to unlock your detailed task exposure and automation analysis
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={handleOpenPlans}
          >
            Unlock to View
          </Button>
          </Box>
        </Box>
      )}

      {/* ✅ Main Content */}
      <Box
        sx={{
          p: 3,
          mx: "auto",
          maxWidth: { xs: "100%", md: "1200px" },
          filter: !isContentVisible ? "blur(3px)" : "none",
          pointerEvents: !isContentVisible ? "none" : "auto",
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
            Share
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
              borderSpacing: "0 6px",
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
                      borderLeft: i !== 0 ? "2px solid #f7f0f033" : "none",
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

      {/* 🔓 Upgrade Modal */}
      <PlansModal open={openPlans} onClose={handleClosePlans} />
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
  serviceResp: PropTypes.bool,
};
