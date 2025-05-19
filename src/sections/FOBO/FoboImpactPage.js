import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { blue } from "@mui/material/colors";
import Impact from "src/Fogoimages/impact.png";
import {
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { paths } from 'src/routes/paths';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function FoboImpactPage() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("resume");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newType) => {
    if (newType !== null) {
      setUploadType(newType);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
    }
  };
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 3 }, py: { xs: 4, sm: 6, md: 6 }  }}>
      <Grid container spacing={4} alignItems="center">
        <Grid xs={12} md={6} pl="32px" >
          <Stack spacing={3}>
           
       {/* Main header: “Beat FOBO (Fear of Being Obsolete)” */}
            <Typography
              component="h1"
              sx={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: '72px',
                lineHeight: '100%',
                letterSpacing: '-2%',
                color: '#212529',
                mt: 0,
              }}
            >
              How FOBO <br/>Impacts You
              
            </Typography>

            <Typography
              component="p"
              sx={{
                fontFamily: 'Inter, sans-serif',  
                fontWeight: 400,
                fontSize: '17px',
                lineHeight: '30px',
                letterSpacing: '-2%',
                color: '#212529',
                mt: 0,
              }}
            >
              • Decreased confidence in career decisions<br/>
              • Uncertainty about which skills to develop<br/>
              • Stress about keeping pace with AI advances<br/>
              • Missed opportunities for AI augmentation<br/>
              • Decision paralysis about upskilling
            </Typography>

          
          </Stack>
        </Grid>

        <Grid xs={12} md={6} sx={{ mt: { xs: 4, md: 0 } }}>
          <Box
            component="img"
            src={Impact}
            alt="AI Coach"
            sx={{
              width: "685px",
              Height : "456.39px",
              maxHeight: { xs: "auto" },
              objectFit: "cover",
              marginTop: "25px",
             
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default FoboImpactPage;
