import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typography, Divider } from "@mui/material";

const data = [
  { year: "Year 0", baseline: 100, aiAugmented: 100 },
  { year: "Year 1", baseline: 87, aiAugmented: 93 },
  { year: "Year 2", baseline: 72, aiAugmented: 86 },
  { year: "Year 3", baseline: 61, aiAugmented: 79 },
  { year: "Year 4", baseline: 52, aiAugmented: 72 },
  { year: "Year 5", baseline: 43, aiAugmented: 67 },
];

const SkillErosionProjection = () => {
  const [visibleLines, setVisibleLines] = useState({
    baseline: true,
    aiAugmented: true,
  });
  const [hoveredLegend, setHoveredLegend] = useState(null);

  const toggleLine = (lineKey) => {
    setVisibleLines((prev) => ({ ...prev, [lineKey]: !prev[lineKey] }));
  };

  const LegendButton = ({ label, color, lineKey }) => {
    const isVisible = visibleLines[lineKey];
    const isHovered = hoveredLegend === lineKey;

    let bgColor = "transparent";
    if (isHovered) {
      if (color === "#FF8C00") bgColor = "rgba(255, 140, 0, 0.08)";
      else if (color === "#00D98E") bgColor = "rgba(0, 217, 142, 0.08)";
    }

    let boxShadow = "none";
    if (isVisible && isHovered) {
      boxShadow = `0 0 12px ${color}40`;
    } else if (isVisible) {
      boxShadow = `0 2px 6px ${color}20`;
    }

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => toggleLine(lineKey)}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && toggleLine(lineKey)
        }
        onMouseEnter={() => setHoveredLegend(lineKey)}
        onMouseLeave={() => setHoveredLegend(null)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer",
          opacity: isVisible ? 1 : 0.35,
          transition: "all 0.3s ease",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          padding: "8px 14px",
          borderRadius: "20px",
          backgroundColor: bgColor,
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "50%",
            backgroundColor: isVisible ? color : "#fff",
            border: `3px solid ${isVisible ? color : "#d0d0d0"}`,
            boxShadow,
          }}
        />
        <span
          style={{
            fontSize: "14px",
            color: "#555",
            fontWeight: 500,
            letterSpacing: "0.3px",
          }}
        >
          {label}
        </span>
      </div>
    );
  };


  // ✅ PropTypes for LegendButton
  LegendButton.propTypes = {
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    lineKey: PropTypes.string.isRequired,
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "14px 18px",
            boxShadow:
              "0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <p
            style={{
              margin: "0 0 10px 0",
              fontWeight: 600,
              color: "#1f2937",
              fontSize: "14px",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "8px",
            }}
          >
            {label}
          </p>
          {payload.map((entry, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: entry.color,
                  boxShadow: `0 0 8px ${entry.color}40`,
                }}
              />
              <span
                style={{
                  color: "#6b7280",
                  fontSize: "13px",
                  marginRight: "8px",
                }}
              >
                {entry.name === "baseline"
                  ? "Baseline"
                  : "AI-Augmented"}
                :
              </span>
              <span
                style={{
                  fontWeight: 600,
                  color: entry.color,
                  fontSize: "14px",
                }}
              >
                {entry.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // ✅ PropTypes for CustomTooltip
  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string,
  };

  return (
    <div
      style={{
        margin: "24px auto",
        maxWidth: "1155px",
        width: "100%",
        borderRadius: "12px",
        boxShadow:
          "0 4px 20px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)",
        padding: "32px 36px",
        backgroundColor: "#fff",
        border: "1px solid #f0f0f0",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ color: "primary.main" }}
      >
        Skill-Erosion Projection (Company-wide)
      </Typography>

      <Divider sx={{ borderColor: "#00A3FF", mb: 3, height: 2 }} />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "32px",
          marginBottom: "30px",
        }}
      >
        <LegendButton
          label="Baseline Retention"
          color="#FF8C00"
          lineKey="baseline"
        />
        <LegendButton
          label="AI-Augmented Retention"
          color="#00D98E"
          lineKey="aiAugmented"
        />
      </div>

      <div style={{ height: "390px", width: "100%", position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 15, right: 35, left: -5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFD699" stopOpacity={0.6} />
                <stop offset="30%" stopColor="#FFE4CC" stopOpacity={0.4} />
                <stop offset="70%" stopColor="#FFF0E0" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#FFFAF5" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="aiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#80EDD5" stopOpacity={0.6} />
                <stop offset="30%" stopColor="#B3F5E5" stopOpacity={0.4} />
                <stop offset="70%" stopColor="#CCFAEF" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#E6FDF8" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#e0e0e0"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              stroke="#999"
              tick={{ fill: "#666", fontSize: 13 }}
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0", strokeWidth: 1.5 }}
              tickMargin={12}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              tickFormatter={(v) => `${v}%`}
              stroke="#999"
              tick={{ fill: "#666", fontSize: 13 }}
              tickLine={false}
              axisLine={{ stroke: "#e0e0e0", strokeWidth: 1.5 }}
              tickMargin={10}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#d0d0d0",
                strokeWidth: 1.5,
                strokeDasharray: "5 5",
              }}
            />

            {visibleLines.baseline && (
              <>
                <Area
                  type="monotone"
                  dataKey="baseline"
                  fill="url(#baselineGradient)"
                  stroke="none"
                />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#FF8C00"
                  strokeWidth={3.5}
                  dot={{ r: 6, fill: "#FF8C00", strokeWidth: 3, stroke: "#fff" }}
                  activeDot={{
                    r: 9,
                    fill: "#FF8C00",
                    strokeWidth: 4,
                    stroke: "#fff",
                  }}
                />
              </>
            )}

            {visibleLines.aiAugmented && (
              <>
                <Area
                  type="monotone"
                  dataKey="aiAugmented"
                  fill="url(#aiGradient)"
                  stroke="none"
                />
                <Line
                  type="monotone"
                  dataKey="aiAugmented"
                  stroke="#00D98E"
                  strokeWidth={3.5}
                  dot={{ r: 6, fill: "#00D98E", strokeWidth: 3, stroke: "#fff" }}
                  activeDot={{
                    r: 9,
                    fill: "#00D98E",
                    strokeWidth: 4,
                    stroke: "#fff",
                  }}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillErosionProjection;
