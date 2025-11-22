import React, { useState } from "react";
import {
  Card,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Modal,
  Paper,
} from "@mui/material";

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

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MAIN CARD */}
      <Card
        sx={{
          width: 400,
          height: 460,
          mt: 2,
          p: 2,
          borderRadius: 3,
          bgcolor: "#fff",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#2A4C94", mb: 1 }}>
          FOBO Heat-Map vs. Industry
        </Typography>

        {/* TABLE WITHOUT SCROLL + ONLY 2 COLUMNS */}
        <Box sx={{ mt: 3 }}>
          <Table size="small">
          <TableHead>
  <TableRow>
    {["Domain", "ACCENTURE", "CAPGEMINI"].map((text) => (
      <TableCell
        key={text}
        align={text === "Domain" ? "left" : "center"}
        sx={{
          fontWeight: 600,
          color: "#fff",
          background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)", // fallback colors
        }}
      >
        {text}
      </TableCell>
    ))}
  </TableRow>
</TableHead>

            <TableBody>
              {data.slice(0, 5).map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.domain}</TableCell>
                  <TableCell align="center" sx={{ color: "#FF914D", fontWeight: 600 }}>
                    {row.accenture}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#1BABFE", fontWeight: 600 }}>
                    {row.capgemini}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        {/* VIEW MORE TEXT */}
        <Typography
          onClick={() => setOpen(true)}
          sx={{
            mt: 2,
            color: "primary.dark",
            cursor: "pointer",
            fontWeight: 600,
            textAlign: "right",
            pr: 3,
          }}
        >
          View More
        </Typography>
      </Card>

      {/* POPUP MODAL WITH FULL TABLE */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          sx={{
            width: 700,
            maxHeight: "80vh",
            overflowY: "auto",
            p: 3,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Full FOBO Heat-Map
          </Typography>

          <Table size="small">
            <TableHead>
               <TableRow
    sx={{
      "& > th": {
        fontWeight: 600,
        color: "#fff",
        background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
      },
    }}
  >
                <TableCell >Domain</TableCell>
                <TableCell >ACCENTURE</TableCell>
                <TableCell >CAPGEMINI</TableCell>
                <TableCell >IBM</TableCell>
                <TableCell >COGNIZANT</TableCell>
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
                  <TableCell align="center" sx={{ color: "#4CAF50", fontWeight: 600 }}>
                    {row.ibm}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#9C27B0", fontWeight: 600 }}>
                    {row.cognizant}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Modal>
    </>
  );
}
