
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

import { useParams, } from 'react-router-dom';
import Program from './programs';
import ListedInfo from "./listedinfo"; // ✅ import child component
import FAQSection from './faqquestion';
import ListedJourney from "./listedjourney";
import ToolsMastery from './ToolsMastery'

export default function AIMarketingBuilder() {
  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);
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
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h6" color="error">
          ⚠️ No course data found.
        </Typography>
      </Box>
    );
  }

  // ✅ Extract values
  const {
    price,
    isFreePlan,
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

  } = courses;

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        pt: 1,
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        {/* Title */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {courseName}
        </Typography>

        {/* Subtitle */}
        <Typography variant="subtitle1" sx={{ opacity: 0.85, mb: 3 }}>
          {heading || "Cohort-based course · No coding required"}
        </Typography>

        {/* Price Button */}
        <Button
          variant="contained"
          sx={{
            bgcolor: "#00ff84",
            color: "black",
            fontWeight: "bold",
            fontSize: "1rem",
            px: 4,
            py: 1.5,
            borderRadius: "50px",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
            "&:hover": { bgcolor: "#00e676" },
            mb: 6,
          }}
        >
          {planData.isFreePlan ? "Free" : `$${price.toLocaleString()}`}
        </Button>

        {/* Info Grid */}
        <Grid container spacing={3} justifyContent="center">
          {[
            { label: "Duration", value: courseDuration || "N/A" },
            { label: "Format", value: format || "Live + Self-paced" },
            { label: "Effort", value: effort || "2-3 h / week" },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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

        <Box sx={{ my: 1, textAlign: 'center' }}>
          <div
            dangerouslySetInnerHTML={{ __html: description || "<p>No description available</p>" }}
          />
        </Box>
      </Container>


      <Box sx={{ bgcolor: '#fff' }}>
        <Program />
        <ListedInfo keyOutComes={keyOutComes} />
        <FAQSection programModules={programModules} /> {/* Pass as prop */}
        <ToolsMastery/>
        <ListedJourney price={planData.price} />

      </Box>
    </Box>

  );
}
