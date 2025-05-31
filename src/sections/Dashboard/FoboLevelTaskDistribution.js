// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   Button,
// } from "@mui/material";
// import {
//   PieChart,
//   Pie,
//   Sector,
//   Cell,
//   ResponsiveContainer,
//   Legend,
//   Tooltip,
// } from "recharts";
// import GaugeChart from "react-gauge-chart";

// const pieData = [
//   {
//     name: "Augmentation",
//     value: 30,
//     color: "#FF8A00",
//     detail:
//       "AI assists you, so time is available helping you do better work.",
//   },
//   {
//     name: "Automation",
//     value: 40,
//     color: "#E63946",
//     detail:
//       "Tasks at risk from full AI takeover, replacing human work.",
//   },
//   {
//     name: "Human",
//     value: 30,
//     color: "#2A9D8F",
//     detail: "Tasks that AI can't easily replace.",
//   },
// ];

// const renderActiveShape = (props) => {
//   const {
//     cx,
//     cy,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//   } = props;
//   return (
//     <g>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius + 10}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//     </g>
//   );
// };

// export default function FoboLevelTaskDistribution() {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [selectedSection, setSelectedSection] = useState(null);

//   const handlePieClick = (_, index) => {
//     setActiveIndex(index);
//     setSelectedSection(pieData[index]);
//   };

//   const handleMouseLeave = () => {
//     setActiveIndex(null);
//     setSelectedSection(null);
//   };

//   return (
//     <Box px={{ xs: 2, md: 6 }} py={4}>
//       <Grid container spacing={4}>
//         {/* FOBO Level */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             FOBO Level
//           </Typography>
//           <Box sx={{ maxWidth: 280, mx: "auto" }}>
//             <GaugeChart
//               id="fobo-gauge"
//               nrOfLevels={3}
//               arcsLength={[0.3, 0.4, 0.3]}
//               colors={["#00C853", "#FFEB3B", "#E53935"]}
//               percent={0.24}
//               arcPadding={0.02}
//               textColor="#000"
//               formatTextValue={() => "24"}
//             />
//           </Box>
//         </Grid>

//         {/* Task Distribution */}
//         <Grid item xs={12} md={6}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Task Distribution
//           </Typography>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={60}
//                 outerRadius={80}
//                 activeIndex={activeIndex}
//                 activeShape={renderActiveShape}
//                 onClick={handlePieClick}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 {pieData.map((entry, idx) => (
//                   <Cell key={`cell-${idx}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend
//                 verticalAlign="bottom"
//                 layout="horizontal"
//                 align="center"
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </Grid>

//         {/* Selected Section Detail */}
//         {selectedSection && (
//           <Grid item xs={12}>
//             <Card sx={{ p: 2, backgroundColor: "#F5FAFF" }}>
//               <Typography
//                 variant="h6"
//                 color="primary"
//                 gutterBottom
//               >
//                 {selectedSection.name} Details
//               </Typography>
//               <Typography variant="body2">
//                 {selectedSection.detail}
//               </Typography>
//             </Card>
//           </Grid>
//         )}

//         {/* Summary Text Placeholder */}
//         <Grid item xs={12}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Lorem Ipsum
//           </Typography>
//           <Typography variant="body2">• Lorem Ipsum</Typography>
//           <Typography variant="body2">• Lorem Ipsum</Typography>
//           <Typography variant="body2">• Lorem Ipsum</Typography>
//         </Grid>

//         {/* Recommendations */}
//         <Grid item xs={12}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Recommended Growth Strategies For &lt;First Name&gt;
//           </Typography>
//           <Box
//             mt={2}
//             sx={{ backgroundColor: "#F5FAFF", borderRadius: 2, p: 2 }}
//           >
//             {[
//               {
//                 title: "Master AI-Powered Product Strategies",
//                 benefit:
//                   "Lead AI integration in EdTech products, staying ahead of industry changes",
//               },
//               {
//                 title:
//                   "Develop Advanced Learning Experience Design Skills",
//                 benefit:
//                   "Create unique human-centered solutions that AI cannot easily replicate",
//               },
//               {
//                 title: "Focus on Complex Partnership Development",
//                 benefit:
//                   "Build relationships and strategies that require human judgement and leadership",
//               },
//               {
//                 title: "Strengthen Data-Driven Decision Making",
//                 benefit:
//                   "Use AI tools to enhance strategic planning and product innovation",
//               },
//             ].map((rec, i) => (
//               <Box key={i} mb={2}>
//                 <Typography fontWeight="bold" gutterBottom>
//                   {i + 1}. {rec.title}
//                 </Typography>
//                 <Typography variant="body2">
//                   Benefit: {rec.benefit}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         </Grid>

//         {/* CTA Button */}
//         <Grid item xs={12} textAlign="center">
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#2C47D3",
//               borderRadius: 10,
//               px: 4,
//               textTransform: "none",
//               fontWeight: "bold",
//             }}
//           >
//             Beat FOBO Now
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


import React, { useState } from "react"; 
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Customized,
} from "recharts";
import GaugeChart from "react-gauge-chart";

const pieData = [
  {
    name: "Augmentation",
    value: 30,
    color: "#FFB95A",
    detail:
      "AI assists you, so time is available helping you do better work.",
  },
  {
    name: "Automation",
    value: 40,
    color: "#EF4444",
    detail:
      "Tasks at risk from full AI takeover, replacing human work.",
  },
  {
    name: "Human",
    value: 30,
    color: "#84CC16",
    detail: "Tasks that AI can't easily replace.",
  },
];

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export default function FoboLevelTaskDistribution() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const handlePieClick = (_, index) => {
    setActiveIndex(index);
    setSelectedSection(pieData[index]);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    setSelectedSection(null);
  };

  return (
    <Box px={{ xs: 2, md: 6 }} py={4} sx={{ position: "relative" }}>
      <Grid container spacing={4}>
        {/* FOBO Level */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            FOBO Level
          </Typography>
          <Box sx={{ maxWidth: 280, mx: "auto" }}>
            <GaugeChart
              id="fobo-gauge"
              nrOfLevels={3}
              arcsLength={[0.3, 0.4, 0.3]}
              colors={["#00C853", "#FFEB3B", "#E53935"]}
              percent={0.24}
              arcPadding={0.02}
              textColor="#000"
              formatTextValue={() => "24"}
            />
          </Box>
        </Grid>

        {/* Task Distribution */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Task Distribution
          </Typography>
          {/* <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onClick={handlePieClick}
                onMouseLeave={handleMouseLeave}
              >
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                layout="horizontal"
                align="center"
              />
            </PieChart>
          </ResponsiveContainer> */}

          <ResponsiveContainer width="100%" height={250}>
  <PieChart>
    <Pie
      data={pieData}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      activeIndex={activeIndex}
      activeShape={renderActiveShape}
      onClick={handlePieClick}
      onMouseLeave={handleMouseLeave}
    >
      {pieData.map((entry, idx) => (
        <Cell key={`cell-${idx}`} fill={entry.color} />
      ))}
    </Pie>

    {/* Colored boxes inside the chart */}
    <Customized
      component={({ width, height }) => (
        <g>
          {/* Automation - Red */}
          <rect
            x={width - 160}
            y={60}
            width={40}
            height={20}
            rx={4}
            ry={4}
            fill="#EF4444"
          />
          <text x={width - 110} y={75} fontSize="12" alignmentBaseline="middle">
            Automation
          </text>

          {/* Augmentation - Orange */}
          <rect
            x={width - 160}
            y={90}
            width={40}
            height={20}
            rx={4}
            ry={4}
            fill="#FFB95A"
          />
          <text x={width - 110} y={105} fontSize="12" alignmentBaseline="middle">
            Augmentation
          </text>

          {/* Human - Green */}
          <rect
            x={width - 160}
            y={120}
            width={40}
            height={20}
            rx={4}
            ry={4}
            fill="#84CC16"
          />
          <text x={width - 110} y={135} fontSize="12" alignmentBaseline="middle">
            Human
          </text>
        </g>
      )}
    />

    <Tooltip />
    <Legend verticalAlign="bottom" layout="horizontal" align="center" />
  </PieChart>
</ResponsiveContainer>

        </Grid>

        {/* Selected Section Detail */}
        {selectedSection && (
          <Grid item xs={12}>
            <Card sx={{ p: 2, backgroundColor: "#F5FAFF" }}>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
              >
                {selectedSection.name} Details
              </Typography>
              <Typography variant="body2">
                {selectedSection.detail}
              </Typography>
            </Card>
          </Grid>
        )}

        {/* Summary Text Placeholder */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Lorem Ipsum
          </Typography>
          <Typography variant="body2">• Lorem Ipsum</Typography>
          <Typography variant="body2">• Lorem Ipsum</Typography>
          <Typography variant="body2">• Lorem Ipsum</Typography>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recommended Growth Strategies For &lt;First Name&gt;
          </Typography>
          <Box
            mt={2}
            sx={{ backgroundColor: "#F5FAFF", borderRadius: 2, p: 2 }}
          >
            {[
              {
                title: "Master AI-Powered Product Strategies",
                benefit:
                  "Lead AI integration in EdTech products, staying ahead of industry changes",
              },
              {
                title:
                  "Develop Advanced Learning Experience Design Skills",
                benefit:
                  "Create unique human-centered solutions that AI cannot easily replicate",
              },
              {
                title: "Focus on Complex Partnership Development",
                benefit:
                  "Build relationships and strategies that require human judgement and leadership",
              },
              {
                title: "Strengthen Data-Driven Decision Making",
                benefit:
                  "Use AI tools to enhance strategic planning and product innovation",
              },
            ].map((rec, i) => (
              <Box key={i} mb={2}>
                <Typography fontWeight="bold" gutterBottom>
                  {i + 1}. {rec.title}
                </Typography>
                <Typography variant="body2">
                  Benefit: {rec.benefit}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* CTA Button */}
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2C47D3",
              borderRadius: 10,
              px: 4,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Beat FOBO Now
          </Button>
        </Grid>
      </Grid>

      Absolute Positioned Color Labels
      {/* <Box
        sx={{
          position: "absolute",
          width: "192.87px",
          height: "97.8px",
          top: "419.65px",
          left: "1002.43px",
          backgroundColor: "#EF4444",
          borderRadius: 2,
          zIndex: 10,
        }}
      /> */}
      {/* <Box
        sx={{
          position: "absolute",
          width: "118.8px",
          height: "138.45px",
          top: "315px",
          left: "985.78px",
          backgroundColor: "#FFB95A",
          borderRadius: 2,
          zIndex: 10,
        }}
      /> */}
      {/* <Box
        sx={{
          position: "absolute",
          width: "90px",
          height: "93.14px",
          top: "319.66px",
          left: "1105.31px",
          backgroundColor: "#84CC16",
          borderRadius: 2,
          zIndex: 10,
        }}
      /> */}
    </Box>
  );
}

