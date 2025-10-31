
// import React from "react";
// import PropTypes from "prop-types";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from "@mui/material";

// const sampleReadiness = [
//   { pillar: "Investment", metric: "Tech currency & Emerging awareness", weight: "25%", score: 65 },
//   { pillar: "Talent", metric: "100 - Avg FOBO", weight: "25%", score: 40 },
//   { pillar: "Process", metric: "Tool usage & AI/ML exposure", weight: "20%", score: 59 },
//   { pillar: "Automation", metric: "% Automated", weight: "15%", score: 11 },
//   { pillar: "Innovation", metric: "Industry relevance & Emerging awareness", weight: "15%", score: 57 },
// ];

// const analysisSummary = {
//   profiles: 67,
//   domains: 4,
//   overall: 60,
//   date: "07 Oct 2025",
// };

// function HeaderSteps() {
//   const steps = [
//     "Task Ingestion",
//     "Probabilities",
//     "FOBO_t",
//     "Role / Dept Avg",
//     "Composite Score",
//     "Erosion Model",
//   ];
//   return (
//     <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
//       {steps.map((s, i) => (
//         <Box key={s} sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 110 }}>
//           <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, mb: 1 }}>{i + 1}</Avatar>
//           <Typography variant="caption" align="center">{s}</Typography>
//         </Box>
//       ))}
//     </Box>
//   );
// }

// function ReadinessTable({ rows }) {
//   return (
//     <Card variant="outlined" sx={{ width: "100%", mt: 3 }}>
//       <CardContent>
//         <Table size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: 700 }}>Pillar</TableCell>
//               <TableCell sx={{ fontWeight: 700 }}>Metric</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 700 }}>Weight</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 700 }}>Score</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((r) => (
//               <TableRow key={r.pillar}>
//                 <TableCell>{r.pillar}</TableCell>
//                 <TableCell sx={{ color: "text.secondary" }}>{r.metric}</TableCell>
//                 <TableCell align="right">{r.weight}</TableCell>
//                 <TableCell align="right" sx={{ fontWeight: 600 }}>{r.score}</TableCell>
//               </TableRow>
//             ))}
//             <TableRow>
//               <TableCell colSpan={3} sx={{ fontWeight: 700 }}>Composite Readiness</TableCell>
//               <TableCell align="right" sx={{ fontWeight: 700 }}>48.25</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// function AnalysisSummary({ data }) {
//   const item = (val, label, color) => (
//     <Box sx={{ textAlign: "center", minWidth: 110 }}>
//       <Typography variant="h4" sx={{ color }}>{val}</Typography>
//       <Typography variant="caption" sx={{ color: "text.secondary" }}>{label}</Typography>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, mt: 2, flexWrap: "wrap" }}>
//       {item(data.profiles, "Profiles Analyzed", "#5B6BF7")}
//       {item(data.domains, "Domains Covered", "#3EC58F")}
//       {item(data.overall, "Overall FOBO Score", "#FF8A65")}
//       {item(data.date, "Analysis Date", "#9C6BFF")}
//     </Box>
//   );
// }

// export default function Page1() {
//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto", bgcolor: "background.default", minHeight: "100vh" }}>
//       <Card>
//         <CardContent>
//           <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}>
//             How These Numbers Are Calculated
//           </Typography>

//           <HeaderSteps />
//           <ReadinessTable rows={sampleReadiness} />
//           <AnalysisSummary data={analysisSummary} />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }


// /* ✅ Define PropTypes here */
// ReadinessTable.propTypes = {
//   rows: PropTypes.arrayOf(
//     PropTypes.shape({
//       pillar: PropTypes.string.isRequired,
//       metric: PropTypes.string.isRequired,
//       weight: PropTypes.string.isRequired,
//       score: PropTypes.number.isRequired,
//     })
//   ).isRequired,
// };

// AnalysisSummary.propTypes = {
//   data: PropTypes.shape({
//     profiles: PropTypes.number.isRequired,
//     domains: PropTypes.number.isRequired,
//     overall: PropTypes.number.isRequired,
//     date: PropTypes.string.isRequired,
//   }).isRequired,
// };

    

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

// ✅ Example data (replace this with import from your JSON constant)
const ai_readiness_data = {
  investment: 65,
  talent: 40,
  process: 59,
  automation: 13,
  innovation: 57,
  composite: 48.55,
};

// ✅ Map JSON data to table-ready format
const readinessRows = [
  {
    pillar: "Investment",
    metric: "Tech currency & Emerging awareness",
    weight: "25%",
    score: ai_readiness_data.investment,
  },
  {
    pillar: "Talent",
    metric: "100 - Avg FOBO",
    weight: "25%",
    score: ai_readiness_data.talent,
  },
  {
    pillar: "Process",
    metric: "Tool usage & AI/ML exposure",
    weight: "20%",
    score: ai_readiness_data.process,
  },
  {
    pillar: "Automation",
    metric: "% Automated",
    weight: "15%",
    score: ai_readiness_data.automation,
  },
  {
    pillar: "Innovation",
    metric: "Industry relevance & Emerging awareness",
    weight: "15%",
    score: ai_readiness_data.innovation,
  },
];

const analysisSummary = {
  profiles: 67,
  domains: 4,
  overall: 60,
  date: "07 Oct 2025",
};

function HeaderSteps() {
  const steps = [
    "Task Ingestion",
    "Probabilities",
    "FOBO_t",
    "Role / Dept Avg",
    "Composite Score",
    "Erosion Model",
  ];
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
      }}
    >
      {steps.map((s, i) => (
        <Box
          key={s}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 110 }}
        >
          <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, mb: 1 }}>{i + 1}</Avatar>
          <Typography variant="caption" align="center">
            {s}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function ReadinessTable({ rows, compositeScore }) {
  return (
    <Card variant="outlined" sx={{ width: "100%", mt: 3 }}>
      <CardContent>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Pillar</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Metric</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Weight
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                Score
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.pillar}>
                <TableCell>{r.pillar}</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>{r.metric}</TableCell>
                <TableCell align="right">{r.weight}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  {r.score}
                </TableCell>
              </TableRow>
            ))}
            {/* ✅ Composite Readiness dynamically from JSON */}
            <TableRow>
              <TableCell colSpan={3} sx={{ fontWeight: 700 }}>
                Composite Readiness
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>
                {ai_readiness_data.composite}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

ReadinessTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      pillar: PropTypes.string.isRequired,
      metric: PropTypes.string.isRequired,
      weight: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
  compositeScore: PropTypes.number,
};

function AnalysisSummary({ data }) {
  const item = (val, label, color) => (
    <Box sx={{ textAlign: "center", minWidth: 110 }}>
      <Typography variant="h4" sx={{ color }}>
        {val}
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        mt: 2,
        flexWrap: "wrap",
      }}
    >
      {item(data.profiles, "Profiles Analyzed", "#5B6BF7")}
      {item(data.domains, "Domains Covered", "#3EC58F")}
      {item(data.overall, "Overall FOBO Score", "#FF8A65")}
      {item(data.date, "Analysis Date", "#9C6BFF")}
    </Box>
  );
}

AnalysisSummary.propTypes = {
  data: PropTypes.shape({
    profiles: PropTypes.number.isRequired,
    domains: PropTypes.number.isRequired,
    overall: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Page1() {
  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        maxWidth: 1200,
        mx: "auto",
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, textAlign: "center" }}>
            How These Numbers Are Calculated
          </Typography>

          <HeaderSteps />
          {/* ✅ Pass dynamic JSON data */}
          <ReadinessTable rows={readinessRows} compositeScore={ai_readiness_data.composite} />
          <AnalysisSummary data={analysisSummary} />
        </CardContent>
      </Card>
    </Box>
  );
}
