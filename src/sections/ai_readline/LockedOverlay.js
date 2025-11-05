import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PlansModal from "./PlansModal";

export default function LockedOverlay() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* Blur background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.6)",
          zIndex: 9,
        }}
      />

      {/* Unlock button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<LockIcon />}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          zIndex: 10,
          borderRadius: "50px",
          px: 3,
          py: 1,
          boxShadow: 3,
          textTransform: "none",
          fontWeight: 600,
          backgroundColor: "#1565c0",
          "&:hover": {
            backgroundColor: "#0d47a1",
          },
        }}
        onClick={() => setOpenModal(true)}
      >
        Unlock to View
      </Button>

      {/* Plans modal */}
      <PlansModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}
