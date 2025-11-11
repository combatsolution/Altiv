import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Chip,
  Paper,
  Stack,
  Divider,
  Container,
  CardActions,
  FormControl,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material';
import { trackEvent } from 'src/utils/google-analytics';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from 'src/utils/axios';
import PropTypes from 'prop-types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  Cell,
  PolarAngleAxis,

} from 'recharts';
import Slider from 'react-slick';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Sunburst from "highcharts/modules/sunburst";
import { useAuthContext } from 'src/auth/hooks';


// Legend data
const LEGENDS = [
  { label: "8 – 10 years", color: "#20C997" },
  { label: "11 – 12 years", color: "#4285F4" },
  { label: "13 – 15 years", color: "#F4A300" },
  { label: "15+ years", color: "#FFD43B" }
];

const getBadgeColor = (score) => {
  if (score >= 60) return "success.main"; // Matching
  if (score >= 20) return "warning.main"; // Close Matching
  if (score >= 1 && score <= 10) return "warning.main"; // Close Matching
  return "error.main"; // Not Matching
};


const ProductManagementPage = () => {
  const { job_id: jobId } = useParams();   // ✅ get from URL params
  const [selectedFilter, setSelectedFilter] = useState("Everything");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [boostData, setBoostData] = useState(null);
  const [statisticalData, setStatisticalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const lastResume = user.resumes.at(-1).id;
  console.log("last resume id:", lastResume);
  const [graphdata, setGraphdata] = useState([]);
  const [radialchartdata, setRadialchartdata] = useState([]);
  const [companyBackgroundData, setCompanyBackgroundData] = useState([]);


  // Booster base weights
  const boosterWeights = {
    Everything: 100,
    Matching: 62,
    "Close Matching": 24,
    "Not Matching": 14,
    Improved: 100,
  };

  // Base skill data
  const baseSkills = [
    { label: "Core Experience", base: 78 },
    { label: "Technical Skills", base: 74 },
    { label: "Domain Knowledge", base: 70 },
  ];

  const [skills, setSkills] = useState(baseSkills.map(s => ({ ...s, score: s.base })));

  // Recalculation logic
  const calculateScores = (filterValue) => {
    const weight = boosterWeights[filterValue] || 100;

    const newSkills = baseSkills.map(skill => ({
      ...skill,
      score: ((skill.base * weight) / 100).toFixed(2),
    }));

    setSkills(newSkills);
  };


  const COLORS = useMemo(() => ["#20C997", "#4285F4", "#F4A300", "#FFD43B"], []);


  // ✅ Now it's safe to derive these
  const matchedItems = boostData?.matched?.category_wise || {};
  const closeMatchedItems = boostData?.close_matched?.category_wise || {};
  const notMatchedItems = boostData?.not_matched?.category_wise || {};
  const improvements = boostData?.improvement_suggestions || [];
  const resumeId = lastResume;
  console.log("jobidsdfbhjfv:", jobId);
  console.log("resumeiddsh:", resumeId);


  useEffect(() => {
    if (!boostData) return;
    // chips logic
    const keywords = boostData.matching_keywords || {};
    const mappedSkills = Object.entries(keywords).map(([key, value]) => ({
      label: key.replace(/_/g, " "), // turn "technical_skills" -> "technical skills"
      score: Math.round(value * 100), // convert 0.78 -> 78
    }));

    setSkills(mappedSkills);
  }, [boostData]);



  //   chart: {
  //     height: "80%",
  //     spacingRight: 100,
  //     events: { /* ...same render logic... */ 
  //          render() {
  //     const chart = this;
  //     const series = chart.series?.[0];
  //     if (!series) return;

  //     // Flip bottom labels upright
  //     series.points.forEach((point) => {
  //       const shape = point.shapeArgs;
  //       if (!shape || !point.dataLabel) return;

  //       const mid = shape.start + (shape.end - shape.start) / 2;
  //       const midAngle = (mid * 180) / Math.PI;

  //       const flip = midAngle > 90 && midAngle < 270;
  //       point.dataLabel.attr({
  //         rotation: flip ? 180 : 0,
  //       });

  //       // ✅ If point is "Data Science", force parallel mode
  //       if (point.name === "Data Science") {
  //         point.dataLabel.css({
  //           transform: "rotate(0deg)", // ensure upright text
  //           fontWeight: "bold",
  //         });
  //       }
  //     });
  //   },
  //     }
  //   },
  //   credits: { enabled: false },
  //   plotOptions: { sunburst: { allowDrillToNode: true, cursor: "pointer" } },
  //   title: { text: "" },
  //   series: [{
  //     type: "sunburst",
  //     name: "Education",
  //     data: [],
  //     borderWidth: 2,  /* eslint-disable react/no-this-in-sfc */
  //     startAngle: 295,
  //     dataLabels: {
  //       rotationMode: "parallel",
  //       formatter() {
  //         const name = this.point?.name || "";
  //         if (/^education$/i.test(name)) {
  //           // root label
  //           return `<span style="color:black;font-size:16px;font-weight:700">${name}</span>`;
  //         }

  //          return `${name}<br>${this.point.value}%`;

  //       },
  //       style: {
  //         color: "#fff",       // default for other labels
  //         fontSize: "11px",
  //         textOutline: "none",
  //       },
  //     },

  //     /* eslint-disable react/no-this-in-sfc */

  //     levels: [
  //       { level: 1, dataLabels: { rotationMode: "circular" } },
  //       { level: 2, colorByPoint: true, dataLabels: { rotationMode: "circular" } }
  //     ]
  //   }],
  //   tooltip: { pointFormat: "<b>{point.name}</b> {point.value}%" }
  // });

  const [options, setOptions] = useState({
    chart: {
      height: "80%",
      styledMode: false,
      backgroundColor: "transparent", // hide chart background
    },
    credits: { enabled: false },
    title: { text: "" },
    tooltip: { pointFormat: "<b>{point.name}</b> {point.value}%" },
    plotOptions: {
      sunburst: {
        allowDrillToNode: true,
        cursor: "pointer",
        // rotation: -60, ❌ (doesn't work)
        // ✅ Instead use startAngle to tilt the entire chart
        startAngle: -60, // tilt 45° clockwise (change value for desired tilt)
      },
    },
    series: [
      {
        type: "sunburst",
        name: "Education",
        data: [],
        borderWidth: 2,
        dataLabels: {
          rotation: 0,             // keep labels horizontal
          rotationMode: undefined, // disable auto rotation
          style: {
            color: "#fff",
            fontSize: "11px",
            textOutline: "none",
          },
          align: "center",
          formatter() {
            // eslint-disable-next-line react/no-this-in-sfc, prefer-template
            const name = this.point?.name || "";
            const shortName = name.length > 10 ? name.slice(0, 5) + ".." : name; // truncate
            // eslint-disable-next-line react/no-this-in-sfc
            return `${shortName}<br>${this.point.value || ""}%`;
          },
        },


        levels: [
          {
            level: 1,
            dataLabels: { rotationMode: "circular" },
          },
          {
            level: 2,
            colorByPoint: true,
            dataLabels: { rotationMode: "circular" },
          },
        ],
      },
    ],
  });
  const transformEducationToSunburst = (educationData) => {
    const sunburstData = [
      {
        id: "0.0",
        parent: "",
        textcolor: "black",
        name: "Education",
        color: "transparent",
        dataLabels: { color: "#000" },
      },
    ];

    const mainColors = ["#1976D2", "#FF8800", "#0BA02C", "#9C27B0"]; // color set (last one for "Other")
    const mainColor = ["#1BABFE", "#FBBC05", "#4CAF50", "#CE93D8"];

    let i = 1;
    const tempData = [];

    // Build main categories from backend data
    Object.entries(educationData).forEach(([field, details]) => {
      const parentId = `1.${i}`;
      const parentColor = mainColors[(i - 1) % mainColors.length];
      const parentObj = {
        id: parentId,
        parent: "0.0",
        name: field,
        value: details.percentage,
        color: parentColor,
      };

      const children = [];
      let j = 1;
      Object.entries(details.distribution).forEach(([tier, value]) => {
        const childColor = mainColor[(i - 1) % mainColor.length];
        children.push({
          id: `2.${i}.${j}`,
          parent: parentId,
          name: tier,
          value,
          color: childColor,
        });
        j += 1;
      });

      tempData.push({ parentObj, children });
      i += 1;
    });

    // 🆕 Create and insert manual “Other” category (no children)
    const otherIndex = 1; // place after Data Science (adjust if needed)
    const otherParentId = `1.${i}`;
    const otherColor = "#9C27B0"; // purple

    const otherParentObj = {
      id: otherParentId,
      parent: "0.0",
      name: "Other",
      value: 15, // optional (can be dynamic)
      color: otherColor,
    };

    // Insert manually between Data Science and Computer Science
    tempData.splice(otherIndex, 0, { parentObj: otherParentObj, children: [] });

    // Merge all final data
    tempData.forEach(({ parentObj, children }) => {
      sunburstData.push(parentObj, ...children);
    });

    return sunburstData;
  };



  useEffect(() => {
    if (!jobId && !resumeId) return;
    const fetchBoostData = async () => {
      try {
        setLoading(true);

        const payload = {
          jobId: Number(jobId),
          resumeId: user.resumes.at(-1).id,
        };
        const res = await axiosInstance.post("/jobs/job-boost", payload);
        setBoostData(res.data?.data);
        console.log("sfsdfjkhsdf:", res.data?.data);
      } catch (error) {
        console.error("Error fetching job boost data:", error);
      } finally {
        setLoading(false);
      }
    };


    const fetchStatisticalData = async () => {
      try {
        const res = await axiosInstance.post(`/jobs/job-boost-statistical-data/${Number(jobId)}`);
        const educationData = res.data?.data?.company_benchmark?.education_background;
        const experienceData = res.data?.data?.company_benchmark?.experience_years_distribution;
        const companyBackground = res.data?.data?.company_benchmark?.previous_company_background;
        console.log("bsdkfb:", companyBackground);


        if (educationData) {
          const sunburstData = transformEducationToSunburst(educationData);

          setOptions((prev) => {
            const updatedSeries = [...prev.series];
            const existingData = [...(updatedSeries[0].data || [])];

            // Append new dataset
            existingData.push(...sunburstData);

            updatedSeries[0] = {
              ...updatedSeries[0],
              data: existingData,
              allowDrillToNode: true,
              cursor: "pointer"
            };

            return { ...prev, series: updatedSeries };
          });
        }


        // Transform experience -> bar chart
        if (experienceData) {
          const formattedGraphData = Object.entries(experienceData).map(([range, percentage]) => ({
            range,
            percentage
          }));
          setGraphdata(formattedGraphData);
        }

        // Company Background → Radial Chart
        if (companyBackground) {
          const formattedRadialData = Object.entries(companyBackground).map(([name, value], idx) => ({
            name,
            value,
            fill: COLORS[idx % COLORS.length]
          }));
          setRadialchartdata(formattedRadialData);
          setCompanyBackgroundData(formattedRadialData);
        }
      } catch (err) {
        console.error("Error fetching statistical data", err);
      }
    };
    fetchBoostData();
    fetchStatisticalData();
  }, [jobId, COLORS, resumeId, user?.resumes]);


  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  const [hoveredInner, setHoveredInner] = useState(null);
  const [hoveredOuter, setHoveredOuter] = useState(null);
  const navigate = useNavigate();

  // Filter change handler with tracking
  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);

    // ✅ Analytics tracking
    trackEvent({
      category: 'Job Detail',
      action: 'Filter Changed',
      label: `Filter: ${filterValue}`,
      value: 75,
    });

    // ✅ Update skill scores dynamically
    calculateScores(filterValue);
  };

  // Select All handler
  const handleSelectAll = () => {
    setSelectedFilter("Everything");
    trackEvent({
      category: 'Job Detail',
      action: 'Select All Clicked',
      label: 'Select All Filter',
      value: 76,
    });
  };

  // Clear All handler
  const handleClearAll = () => {
    setSelectedFilter("everything");
    trackEvent({
      category: 'Job Detail',
      action: 'Clear All Clicked',
      label: 'Clear All Filter',
      value: 77,
    });
  };

  // Explore jobs handler
  const handleExploreJobs = () => {
    trackEvent({
      category: 'Job Detail',
      action: 'Explore More Jobs Clicked',
      label: 'Navigate to Job Feed',
      value: ''
    });
    navigate('/job-feed');
  };

  // Sign up handler
  const handleSignUp = () => {
    trackEvent({
      category: 'Job Detail',
      action: 'Sign Up Clicked',
      label: 'Navigate to Registration',
      value: 78,
    });
  };


  /* eslint-disable react/prop-types */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {`${payload[0].name}: ${payload[0].value}%`}
          </p>
        </div>
      );
    }
    return null;
  };
  /* eslint-enable react/prop-types */

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number,
      })
    ),
  };

  CustomTooltip.defaultProps = {
    active: false,
    payload: [],
  };



  // Custom Legend Component
  const CustomLegend = () => (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      flexWrap="wrap"
      mt={2}
    >
      {LEGENDS.map((item, index) => (
        <Stack
          maxWidth="100px"
          key={index}
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: { xs: 1, sm: 0 } }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: item.color,
              borderRadius: "20px"
            }}
          />
          <Typography fontSize='12px'>{item.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>

      {/* Full Page Loader */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            bgcolor: 'background.default',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={70} thickness={5} color="primary" />
          <Typography sx={{ mt: 2, fontWeight: 500, color: 'primary.main' }}>
            Loading your match analysis...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ px: { xs: 0, md: 1 }, py: { xs: 4, md: 2 }, maxWidth: 1300, mx: 'auto' }}>
          <Container maxWidth="auto">
            <Box sx={{ pl: { xs: 2, md: 8 }, pr: { xs: 2, md: 4 }, py: 2, order: { xs: 2, md: 1 } }}>

              <Grid container spacing={2}>
                {/* desktop Left Column */}
                <Grid item xs={12} lg={6} order={{ xs: 2, md: 1 }} sx={{ maxWidth: { xs: "100%", lg: "550px" } }}>
                  <Grid sx={{ display: { xs: 'none', lg: 'block' }, mb: 2 }} >
                    <Typography fontSize="30px" fontWeight="700"  >
                      Product Management at Mastercard
                    </Typography>
                    <Typography fontSize="20px" fontFamily="roboto" fontWeight="400" color="text.secondary"  >
                      Match analysis and background
                    </Typography>
                  </Grid>

                  {/* Filters desktop */}
                  <Stack
                    sx={{
                      display: { xs: "none", lg: 'block' }, maxWidth: '551px',
                      width: { xs: '100%', md: '501px', lg: '550px' }
                    }}
                    direction={{ xs: 'column', sm: 'row', md: 'column' }}
                    spacing={1}
                    mb={2}
                    alignItems={{ xs: 'flex-start', sm: 'center', md: 'flex-start' }}
                    flexWrap="wrap"
                  >
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} maxWidth="451px">
                      <Box
                        display="flex"
                        flexDirection="row"
                        sx={{
                          mb: '7px',
                          width: { xs: '100%', sm: '250px', lg: '350px' }, // ⚠ probably meant 650px not 6550px
                        }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            bgcolor: 'grey.100',
                            flex: 1,
                            p: 1,
                            textAlign: 'center',
                            borderRadius: '0px',
                            width: '90px',
                            borderColor: 'grey.800',
                            fontSize: '13px'
                          }}
                        >
                          Match Score
                        </Paper>
                        <FormControl size="small" variant="outlined" sx={{ minWidth: 180 }}>
                          <Select
                            value={selectedFilter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            displayEmpty
                            renderValue={(selected) => selected}
                            sx={{
                              bgcolor: 'grey.300',
                              textAlign: 'center',
                              "& .MuiSelect-select": {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1

                              }
                            }}
                            IconComponent={KeyboardArrowDownIcon}
                          >
                            <MenuItem value="Everything">Everything</MenuItem>
                            <MenuItem value="Matching">Matching 62%</MenuItem>
                            <MenuItem value="Close Matching">Close Matching 24%</MenuItem>
                            <MenuItem value="Not Matching">Not Matching 14%</MenuItem>
                            <MenuItem value="Improved">Things can be improved</MenuItem>
                          </Select>
                        </FormControl>

                      </Box>

                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        sx={{ mt: { xs: 1, sm: 0 } }}

                      >
                        <Button
                          size="medium"
                          variant="outlined"
                          sx={{ color: 'grey.600', borderRadius: '100px', width: '110px', height: '35px', fontSize: '13px' }}
                          onClick={handleSelectAll}

                        >
                          Select All
                        </Button>

                        <Button
                          size="medium"
                          variant="outlined"
                          sx={{ color: 'grey.600', borderRadius: '100px', width: '110px', height: '35px', fontSize: '13px' }}
                          onClick={handleClearAll}

                        >
                          Clear All
                        </Button>

                        {/* <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: '100px', width: '80px', height:'35px', fontSize:'13px' }}
                  >
                    Update
                  </Button> */}
                      </Stack>
                    </Stack>

                    {/* Chips BELOW the buttons */}
                    <Stack direction="row" spacing={4} flexWrap="wrap" mt={1} sx={{ width: "100%" }}>
                      {skills.map((skill, index) => {
                        const badgeColor = getBadgeColor(skill.score);
                        return (
                          <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                            {/* The Chip */}
                            <Chip
                              label={<Typography fontWeight={600} fontSize={12} >{skill.label}</Typography>}
                              variant="outlined"
                              sx={{
                                width: "130px",
                                borderRadius: "20px",
                                py: 0.2,

                              }}
                            />
                            {/* The floating badge */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: -8,
                                right: -20,
                                bgcolor: badgeColor,
                                color: "white",
                                borderRadius: "50%",
                                fontSize: "0.6rem",
                                fontWeight: "bold",
                                width: 31,
                                height: 31,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: 1,
                              }}
                            >
                              {skill.score}%
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>
                  </Stack>

                  {/* mobile view Matching */}
                  <Stack
                    sx={{ display: { xs: "block", lg: 'none' } }}
                    direction={{ xs: 'column', sm: 'row', md: 'column' }}
                    spacing={0}
                    mb={2}
                    alignItems={{ xs: 'flex-start', sm: 'center', md: 'flex-start' }}
                    flexWrap="wrap"
                    width={{ xs: '100%', md: '100%' }}
                  >

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%">
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        gutterBottom
                        sx={{ display: { xs: "block", lg: "none" }, mt: 5, }}
                      >
                        Background of Product Management at Mastercard
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        sx={{
                          gap: 0,
                          width: { xs: '100%', sm: '100%', lg: '100%' }, // ⚠ probably meant 650px not 6550px
                          maxWidth: '500px',
                          mb: 2,
                        }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            bgcolor: 'grey.100',
                            display: 'flex',
                            textAlign: 'center',
                            p: 0.5,
                          }}
                        >
                          Match Score
                        </Paper>
                        <FormControl size="small" variant="outlined" sx={{ minWidth: 180 }}>
                          <Select
                            value={selectedFilter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            displayEmpty
                            renderValue={(selected) => selected}
                            sx={{
                              bgcolor: '#0BA02C',
                              color: '#fff',
                              borderRadius: 0,
                              textAlign: 'center',
                              "& .MuiSelect-select": {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 1
                              }
                            }}
                            IconComponent={KeyboardArrowDownIcon}
                          >
                            <MenuItem value="Everything">Everything</MenuItem>
                            <MenuItem value="Matching">Matching 75%</MenuItem>
                            <MenuItem value="Close Matching">Close Matching 65%</MenuItem>
                            <MenuItem value="Not Matching">Not Matching 65%</MenuItem>
                            <MenuItem value="Improved">Things can be improved</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Stack>


                    {/* Chips BELOW the buttons mobile view */}
                    <Stack direction="row" spacing={2} flexWrap="wrap" mt={1} sx={{ width: "100%" }}>
                      {skills.map((skill, index) => {
                        const badgeColor = getBadgeColor(skill.score);
                        return (
                          <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                            {/* The Chip */}
                            <Chip
                              label={<Typography fontWeight={600}>{skill.label}</Typography>}
                              variant="outlined"
                              sx={{
                                borderRadius: "20px",
                                px: 1,
                                py: 0.5,
                              }}
                            />
                            {/* The floating badge */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: -8,
                                right: -8,
                                bgcolor: badgeColor,
                                color: "white",
                                borderRadius: "50%",
                                fontSize: "0.6rem",
                                fontWeight: "bold",
                                minWidth: 28,
                                height: 28,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: 1,
                              }}
                            >
                              {skill.score}%
                            </Box>
                          </Box>
                        );
                      })}
                    </Stack>

                    <Stack
                      direction={{ xs: 'row', sm: 'row' }}
                      spacing={1}
                      sx={{ mt: { xs: 1, sm: 1 } }}
                      width='280px'
                      height='60px'
                      bgcolor='grey.200'
                      borderRadius='10px'
                      padding='10px'
                      paddingleft='20px'
                    >

                      <Button
                        size="medium"
                        variant="outlined"
                        sx={{ color: 'grey.600', borderRadius: '100px', width: '85px', height: '35px', fontSize: '13px' }}
                        onClick={handleSelectAll}

                      >
                        Select All
                      </Button>

                      <Button
                        size="medium"
                        variant="outlined"
                        sx={{ color: 'grey.600', borderRadius: '100px', width: '80px', height: '35px', fontSize: '13px' }}
                        onClick={handleClearAll}
                      >
                        Clear All
                      </Button>

                      {/* <Button

                  variant="contained"
                  color="primary" 
                  sx={{ borderRadius: '100px', width: '100px' }}
                >
                  Update
                </Button> */}
                    </Stack>
                  </Stack>


                  {(selectedFilter === "Everything" || selectedFilter === "Matching")
                    && (<Paper sx={{ p: 1, mb: 1, bgcolor: '#e8f5e9' }}>
                      <Typography variant="h6" paddingLeft='25px' color="success.main" fontFamily='Roboto'>
                        Matching ({boostData?.matched?.percentage}%)
                      </Typography>
                      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 8 }}>
                        {Object.entries(matchedItems).map(([category, items]) =>
                          items.map((item, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 4 }}>
                              <Box
                                component="span"
                                sx={{
                                  width: 3,
                                  height: 3,
                                  bgcolor: 'success.main',
                                  borderRadius: '50%',
                                  flexShrink: 0,
                                  mt: 1.2,
                                  mr: 1.5,
                                  ml: 2,
                                  fontFamily: 'Epiloguelo'

                                }}
                              />
                              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                {category}: {item}
                              </Typography>
                            </li>
                          ))
                        )}
                      </ul>
                    </Paper>)}

                  {(selectedFilter === "Everything" || selectedFilter === "Close Matching") && (<Paper sx={{ p: 1, mb: 1, bgcolor: '#fff3e0' }}>
                    <Typography variant="h6" paddingLeft='20px' color="warning.main" fontFamily='Roboto'>
                      Close Matching ({boostData?.close_matched?.percentage}%)
                    </Typography>

                    <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 8 }}>
                      {Object.entries(closeMatchedItems).map(([category, items]) =>
                        items.map((item, idx) => (
                          <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 4 }}>
                            <Box
                              component="span"
                              sx={{
                                width: 3,
                                height: 3,
                                bgcolor: 'warning.main',
                                borderRadius: '50%',
                                flexShrink: 0,
                                mt: 1.2,
                                mr: 1.5,
                                ml: 2,
                                fontFamily: 'Epilogue',

                              }}
                            />
                            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                              {category}: {item}
                            </Typography>
                          </li>
                        )))}
                    </ul>
                  </Paper>)}

                  {(selectedFilter === "Everything" || selectedFilter === "Not Matching") &&
                    (<Paper sx={{ p: 1, mb: 1, bgcolor: '#ffebee' }}>
                      <Typography variant="h6" paddingLeft='20px' color="error.main" fontFamily='Roboto'>
                        Not Matching ({boostData?.not_matched?.percentage}%)
                      </Typography>

                      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 8 }}>
                        {Object.entries(notMatchedItems).map(([category, items]) =>
                          items.map((item, idx) => (
                            <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 4 }}>
                              <Box
                                component="span"
                                sx={{
                                  width: 3,
                                  height: 3,
                                  bgcolor: 'error.main',
                                  borderRadius: '50%',
                                  flexShrink: 0,
                                  mt: 1.2,
                                  mr: 1.5,
                                  ml: 2,
                                  fontFamily: 'Epilogue',

                                }}
                              />
                              <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                                {item}
                              </Typography>
                            </li>
                          )))}
                      </ul>
                    </Paper>)}

                  {(selectedFilter === "Everything" || selectedFilter === "Improved") &&
                    (<Grid item xs={12} md={12}>
                      <Paper elevation={2} sx={{ p: 2, bgcolor: "#fffbe6", borderRadius: 2 }}>
                        <Typography variant="h6" color="warning.main" gutterBottom>
                          Things can be improved
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                          {improvements.map((suggestion, idx) => (
                            <li key={idx}>
                              <Typography variant="body2" color="text.secondary">
                                {suggestion}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Paper>
                    </Grid>)}
                </Grid>


                {/* Right Column mb+desk */}
                <Grid item xs={12} lg={6} order={{ xs: 1, md: 2 }}>
                  <Box
                    sx={{
                      maxWidth: '517px',
                      bgcolor: { xs: "transparent", lg: "grey.200" },
                      p: { xs: -2, lg: 2 },
                      borderRadius: 1,
                      m: { xs: -2, lg: 2 },
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ display: { xs: "block", lg: "block" } }}
                    >
                      Background of Product Management at Mastercard
                    </Typography>

                    {isMobile ? (
                      <Slider {...sliderSettings}>
                        {/* Slide 1 - Education Background Pie */}
                        <Box>
                          <Typography variant="body2" fontWeight="800" mb={1} >
                            Education Background of Directors
                          </Typography>

                          <Divider />
                          <Grid sx={{
                            position: 'relative',
                            width: '350px',
                            height: '300px'
                          }}>
                            <HighchartsReact highcharts={Highcharts} options={options} />
                          </Grid>
                        </Box>

                        {/* Slide 2 - Bar Chart */}
                        <Paper sx={{ p: 2, mb: 2, width: "100%" }}>
                          <Typography variant="body2" fontWeight="800" mb={1}>
                            Years of Experience vs Percentage of Directors
                          </Typography>
                          <Divider />

                          <Box sx={{ height: { xs: 200, md: 250 }, width: "100%", mt: 1 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={graphdata} barCategoryGap="10%">
                                {/* Remove CartesianGrid or comment it out */}
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}

                                <XAxis
                                  dataKey="range"
                                  fontSize={12}
                                  axisLine={false}
                                  tickLine={false}
                                />
                                <YAxis
                                  fontSize={12}
                                  domain={[0, 50]}
                                  ticks={[0, 10, 20, 30, 40, 50]}
                                  tickFormatter={(value) => `${value}%`}
                                  axisLine={false}   // hides Y-axis line
                                  tickLine={false}   // hides tick marks
                                />
                                <Tooltip cursor={{ fill: "transparent" }} />
                                <Bar dataKey="percentage">
                                  {graphdata.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </Box>

                          <CustomLegend />
                        </Paper>



                        {/* Slide 3 - Radial Chart */}
                        <Paper sx={{ p: 2, width: '100%', bgcolor: '#fff', maxWidth: '450px' }}>
                          <Typography variant="body2" fontWeight="800" mb={1} >
                            Previous Company Background
                          </Typography>
                          <Divider />

                          <Box
                            sx={{
                              position: 'relative',
                              height: { xs: 200, md: 250, },
                              width: '100%',
                              mt: 1,
                              display: 'block',
                              alignItems: 'center',
                            }}
                          >

                            {/* Labels */}
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '7%',
                                left: { xs: 10, md: 80 },

                              }}
                            >
                              {companyBackgroundData.map((item, index) => (
                                <Box
                                  key={index}
                                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                                >
                                  <Typography sx={{ fontSize: { xs: 10, md: 11 }, color: 'text.secondary' }} >
                                    {item.name} </Typography>
                                  <Typography sx={{
                                    ml: 1, fontSize: { xs: 10, md: 11 }, fontWeight: 'bold',
                                    color: 'text.primary'
                                  }} > {item.value}%  </Typography>
                                </Box>
                              ))}

                            </Box>
                            {/* Chart */}
                            <ResponsiveContainer width="100%" height="100%">
                              <RadialBarChart
                                cx="31%"
                                cy="57%"
                                innerRadius="51%"
                                outerRadius="112%"
                                barSize={12}
                                data={radialchartdata}
                                barCategoryGap="60%"
                                startAngle={91}
                                endAngle={-270}
                              >
                                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

                                <RadialBar dataKey="value" clockWise>
                                  {[...radialchartdata].reverse().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </RadialBar>
                              </RadialBarChart>
                            </ResponsiveContainer>
                          </Box>
                        </Paper>
                      </Slider>

                    ) : (
                      <>
                        {/* Desktop: All stacked */}
                        <Box sx={{ bgcolor: '#fff', p: 2, mb: 2, maxWidth: '450px', height: '420px', border: '1px' }}>

                          <Grid style={{ maxWidth: '450px', width: "100%", marginBottom: '10px' }}>
                            <Typography variant="body2" fontWeight="800" mb={1} >
                              Education Background of Directors
                            </Typography>
                            <Divider />
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={options}
                              containerProps={{
                                style: { transform: "translateY(10px)" }, // 👈 moves chart right by 20px
                              }} />
                          </Grid>
                        </Box>

                        <Paper sx={{ p: 2, mb: 2, width: "100%" }}>
                          <Typography variant="body2" fontWeight="800" mb={1}>
                            Years of Experience vs Percentage of Directors
                          </Typography>
                          <Divider />

                          <Box sx={{ height: { xs: 200, md: 250 }, width: "100%", mt: 1 }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={graphdata} barCategoryGap="10%">
                                {/* Remove CartesianGrid or comment it out */}
                                {/* <CartesianGrid strokeDasharray="3 3" /> */}

                                <XAxis
                                  dataKey="range"
                                  fontSize={12}
                                  axisLine={false}
                                  tickLine={false}
                                />
                                <YAxis
                                  fontSize={12}
                                  domain={[0, 50]}
                                  ticks={[0, 10, 20, 30, 40, 50]}
                                  tickFormatter={(value) => `${value}%`}
                                  axisLine={false}   // hides Y-axis line
                                  tickLine={false}   // hides tick marks
                                />
                                <Tooltip cursor={{ fill: "transparent" }} />
                                <Bar dataKey="percentage">
                                  {graphdata.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </Box>

                          <CustomLegend />
                        </Paper>



                        {/* RADIAL CHART */}
                        <Paper sx={{ p: 2, width: '100%', bgcolor: '#fff', maxWidth: '450px' }}>
                          <Typography variant="body2" fontWeight="800" mb={1} >
                            Previous Company Background
                          </Typography>
                          <Divider />

                          <Box
                            sx={{
                              position: 'relative',
                              height: { xs: 200, md: 250, },
                              width: '100%',
                              mt: 1,
                              display: 'block',
                              alignItems: 'center',
                            }}
                          >

                            {/* Labels */}
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '7%',
                                left: { xs: 10, md: 80 },

                              }}
                            >
                              {companyBackgroundData.map((item, index) => (
                                <Box
                                  key={index}
                                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
                                >
                                  <Typography sx={{ fontSize: { xs: 10, md: 11 }, color: 'text.secondary' }} > {item.name} </Typography>
                                  <Typography sx={{ ml: 1, fontSize: { xs: 10, md: 11 }, fontWeight: 'bold', color: 'text.primary' }} > {item.value}%  </Typography>
                                </Box>
                              ))}
                            </Box>


                            {/* Chart */}
                            <ResponsiveContainer width="100%" height="100%">
                              <RadialBarChart
                                cx="40%"
                                cy="56%"
                                innerRadius="54%"
                                outerRadius="110%"
                                barSize={12}
                                data={radialchartdata}
                                barCategoryGap="60%"
                                startAngle={91}
                                endAngle={-270}
                              >
                                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />

                                <RadialBar dataKey="value" clockWise>
                                  {[...radialchartdata].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                  ))}
                                </RadialBar>
                              </RadialBarChart>
                            </ResponsiveContainer>
                          </Box>
                        </Paper>
                      </>
                    )}
                  </Box>
                </Grid>
              </Grid>

              <CardActions
                sx={{
                  display: { xs: 'block', md: 'none', lg: 'flex' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 2,
                  mt: 4,

                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    mb: { xs: 2, md: 0 },
                    color: '#fff',
                    backgroundColor: 'primary.main',
                    borderRadius: '100px',
                    width: { xs: '100%', sm: '200px' },
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                  onClick={handleExploreJobs}
                  a
                >
                  Explore more jobs
                </Button>

                {!user && (
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      color: '#0040D8',
                      backgroundColor: '#fff',
                      borderRadius: '100px',
                      width: { xs: '100%', sm: '200px' },
                    }}
                    href={paths.auth.jwt.register}
                    onClick={handleSignUp}

                  >
                    Sign up
                  </Button>

                )}

              </CardActions>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default ProductManagementPage;