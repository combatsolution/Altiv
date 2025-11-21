

import React from "react";
import { Card, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const data = [
  { domain: "Product Management", accenture: 62, capgemini: 58, ibm: 60, cognizant: 57 },
  { domain: "Software Engineering", accenture: 58, capgemini: 52, ibm: 55, cognizant: 53 },
  { domain: "Marketing", accenture: 63, capgemini: 60, ibm: 61, cognizant: 59 },
  { domain: "Data Science", accenture: 57, capgemini: 51, ibm: 54, cognizant: 52 },
  { domain: "Finance", accenture: 61, capgemini: 55, ibm: 58, cognizant: 56 },
  { domain: "Operations", accenture: 64, capgemini: 59, ibm: 62, cognizant: 60 },
  { domain: "Design", accenture: 56, capgemini: 53, ibm: 54, cognizant: 52 },
];

export default function FoboHeatmapCard() {
  return (
    <Card
      sx={{
        width: 350,
         height:460,
        mt:2,
        p: 2,
        borderRadius: 3,
        boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
        bgcolor: "#fff",
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2A4C94", mb: 1 }}>
        FOBO Heat-Map vs. Industry
      </Typography>

      <Box
        sx={{
          mt:3, 
          maxHeight: 300,
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 5 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#535151ff",
            borderRadius: 30,
          },  
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Domain</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>ACCENTURE</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>CAPGEMINI</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>IBM</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>COGNIZANT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.domain}</TableCell>
                <TableCell align="center" sx={{ color: "#FF914D", fontWeight: 600 }}>
                  {row.accenture}
                </TableCell>
                <TableCell align="center" sx={{ color: "#1BABFE", fontWeight: 600 }}>
                  {row.capgemini}
                </TableCell>
                <TableCell align="center" sx={{ color: "#1BABFE", fontWeight: 600 }}>
                  {row.ibm}
                </TableCell>
                <TableCell align="center" sx={{ color: "#1BABFE", fontWeight: 600 }}>
                  {row.cognizant}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}

