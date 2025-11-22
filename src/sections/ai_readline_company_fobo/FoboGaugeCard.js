
import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import PropTypes from "prop-types";

const COLORS = ["#FF4D4F", "#FFC107", "#00C49F"];

export default function FoboHalfGaugeCard({ score = 60 }) {
  const data = [
    { name: "Low", value: 40 },
    { name: "Moderate", value: 30 },
    { name: "Good", value: 30 },
  ];

  return (
    <Card
      sx={{
        display:'flex',
        flexDirection:'Column',
        justifyContent:'center',
        alignItems:'center',
        width: 350,
        height:460,
         mt:2,
      
        borderRadius: 3,  
        boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
        bgcolor: "#fff",
        textAlign: "left",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2A4C94", mb: 1 }}>
        Domain Task Portfolio & FOBO Scores
      </Typography>

        <Box
          sx={{
            width: 250,
            height: 300,
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: 220, height: 200 }}>
            <PieChart width={250} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Box>

          <Typography
            variant="h3"
            sx={{
              position: "absolute",
              top: "50%",
              left: "55%",
              transform: "translate(-50%, -50%)",
              fontWeight: 700,
              color: "#2A4C94",
            }}
          >
            {score}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              width:'150px',
              position: "absolute",
                 top: "60%", // moves label below the number
              left: "65%",
              transform: "translateX(-50%)",
              color: "#777",
            }}
          >
            AI Readiness Score
          </Typography>
        </Box>

    </Card>
  );
}

FoboHalfGaugeCard.propTypes = {
 score: PropTypes.number,
};