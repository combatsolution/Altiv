
import React, { useEffect, useState } from "react";
import axiosInstance from 'src/utils/axios'; // ✅ adjust path if needed
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";

import { useNavigate, useParams, } from 'react-router-dom';
import Program from './programs';
import ListedInfo from "./keyoutcomes"; // ✅ import child component
import ProgramModule from './programmodule';
import ListedJourney from "./faq";
import ToolsMastery from './ToolsMastery'

export default function AIMarketingBuilder() {
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   const { id } = useParams();
  console.log("ID_is->", id);
 
  const [currency, setCurrency] = useState('USD'); // or 'INR'
  const convertPrice = (price) => {
    const rate = 83; // 1 USD = 83 INR
    return currency === 'USD'
      ? `$${price.toLocaleString()}`
      : `₹${(price * rate).toLocaleString('en-IN')}`;
  };

  // const keyOutComes = planData?.courses?.keyOutComes || [];

  // ✅ Fetch API data
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await axiosInstance.get(`/plans/${id}`); // use id dynamically if needed
        console.log("responses", response)
        setPlanData(response.data);
      } catch (error) {
        console.error("Error fetching plan data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <CircularProgress color="primary" />
        <Typography sx={{ mt: 2 }}>Loading course details...</Typography>
      </Box>
    );
  }

  if (!planData) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h6" color="error">
          ⚠️ No course data found.
        </Typography>
      </Box>
    );
  }
  console.log('aaaaaffff',planData)

  // ✅ Extract values
  const {
    price,
    isFreePlan,
    batch,
    courses = {},
  } = planData;

  const {
    courseName,
    heading,
    format,
    effort,
    courseDuration,
    description,
    thumbnail,
    keyOutComes = [],
    programModules = [], // ✅ Extract here
    tools = [], // ✅ Extract here

  } = courses;

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Container
        sx={{
          my: { xs: 2, md: 1 },
          py: { xs: 2, md: 1 },
          maxWidth: '100%', 
          width: '100%',
        }}>
        {/* Title */}
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ pt: 6 }}>
          {courseName}
        </Typography>
       <Box sx={{

        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',

       }} >
        {/* Subtitle */}
        <Typography variant="13px" sx={{ opacity: 0.85, }}>
          {heading ? (
            <Typography variant="13px" sx={{ opacity: 0.85 }}>
              4-month, hands-on cohort · No coding required
            </Typography>
          ): (
            <Typography
              variant="13px"
              sx={{ opacity: 0.85, }}
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          ) }     
         </Typography>

        {/* Price Button */}
        <Button
          variant="contained"
          onClick={()=> navigate(`/payment/${id}`)}
          sx={{
            width:'200px',
            bgcolor: "#00ff84",
            color: "black",
            fontWeight: "bold",
            fontSize: "1rem",
            px: 4,
            py: 2,
            borderRadius: "50px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            "&:hover": { bgcolor: "#00e676" },
            my: 2,
          }}
        >
          {planData.isFreePlan ? "Free" : `$${price.toLocaleString()} / month `}
        </Button>
</Box>
        {/* Info Grid */}
        <Grid container spacing={3} justifyContent="center">
          {[
            { label: "Duration", value: courseDuration || "N/A" },
            { label: "Format", value: format || "Live + Self-paced " },
            {
              label: "Batch Start Date",
              value: batch?.startDate
                ?  "Coming Soon.." :new Date(batch.startDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
            },
            { label: "Effort", value: effort || "2-3 h / week" },

          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  width: "100%",
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "white",
                  textAlign: "center",
                  borderRadius: 2,
                  p: 3,
                  fontSize: "1rem",
                  mb: 4
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.label}
                </Typography>
                <Typography variant="body1">{item.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Description */}

        {/* <Box sx={{ my: 1, textAlign: 'center' }}>
          <div
            dangerouslySetInnerHTML={{ __html: description || "<p>No description available</p>" }}
          />
        </Box> */}
      </Container>


      <Box sx={{ bgcolor: '#fff' }}>
        <Program />
        <ListedInfo keyOutComes={keyOutComes} />
        <ProgramModule programModules={programModules} /> {/* Pass as prop */}
        <ToolsMastery  tools={tools}/>
        <ListedJourney price={planData.price} />

      </Box>
    </Box>

  );
}
