  import React, { useEffect, useRef, useState } from "react";
  import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Button,
    Avatar,
  } from "@mui/material";

  import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
  import axiosInstance from 'src/utils/axios';
  import BoltIcon from "@mui/icons-material/Bolt";
  import TrackChangesIcon from "@mui/icons-material/TrackChanges";
  import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
  import { m, animate, useMotionValue, useTransform } from "framer-motion";
  import PropTypes from "prop-types";
  import { useAuthContext } from 'src/auth/hooks';
  import { useNavigate } from 'react-router';

  // Motion wrapper for Paper
  const MotionPaper = m(Paper);

  // ✅ Animated number counter
  function AnimatedNumber({ value, suffix }) {
    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, (latest) => Math.floor(latest));
    const displayedValue = useTransform(rounded, (val) => `${val}${suffix}`);

    useEffect(() => {
      motionValue.set(0);
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut",
      });
      return () => controls.stop();
    }, [value, motionValue]);

    return <m.span style={{ display: "inline-block" }}>{displayedValue}</m.span>;
  }

  AnimatedNumber.propTypes = {
    value: PropTypes.number.isRequired,
    suffix: PropTypes.string,
  };
  AnimatedNumber.defaultProps = { suffix: "" };

  // ✅ Main component
  function AIReadinessDashboard({ data, onExportPDF,myProfile }) {
    console.log("jshdkjadaks", data);

    useEffect(() => {
      console.log("AIReadinessDashboard data:", data);
    }, [data]);

    // ✅ Determine if user can export PDF
    const [serviceUnlocked, setServiceUnlocked] = useState(false);
    const { user } = useAuthContext();
    const navigate = useNavigate();


    useEffect(() => {
      const checkAccess = async () => {
        if (!user?.id) return; // not logged in → cannot export
        try {
          const res = await axiosInstance.get(
            `/subscriptions/service-subscriptions-by-user/fobo-pro`
          );
          if (res.data?.success || user?.planType === "pro") {
            setServiceUnlocked(true);
          } else {
            setServiceUnlocked(false);
          }
        } catch (err) {
          console.error("Error checking subscription:", err);
          setServiceUnlocked(false);
        }
      };
      checkAccess();
    }, [user,data]);


    const Aireadline = data?.data ? data?.data:data;
    console.log("AIReadiness data:", Aireadline);
    const [showAllSections, setShowAllSections] = useState(false);
    const pdfRef = useRef(null);

    // ✅ Memoized metrics
    const metrics = React.useMemo(
      () => [
        {
          title: "AI-Readiness Score",
          value: Aireadline?.AI_Readiness_Score ?? 32,
          suffix: "%",
          subtitle: Aireadline?.aiReadinessRating ?? "Above Average",
          color: "#3b82f6",
          icon: <TrackChangesIcon sx={{ fontSize: 28, color: "#3b82f6" }} />,
        },
        {
          title: "Transformation Timeline",
          value: Aireadline?.transformation_timeline ?? 3,
          suffix: " ",
          subtitle: "Months",
          color: "#f59e0b",
          icon: <BoltIcon sx={{ fontSize: 28, color: "#f59e0b" }} />,
        },
        {
          title: "Automation Potential",
          value: Aireadline?.automation_potential ?? 34,
          suffix: "%",
          subtitle: data?.automationImpact ?? "High Impact",
          color: "#ec4899",
          icon: <RocketLaunchIcon sx={{ fontSize: 28, color: "#ec4899" }} />,
        },
        {
          title: "Strategic Objectives",
          value: Aireadline?.strategic_objective_count ?? 35,
          suffix: "",
          subtitle: "Key Goals",
          color: "#facc15",
          icon: <EmojiObjectsIcon sx={{ fontSize: 28, color: "#facc15" }} />,
        },
      ],
      [Aireadline, data?.automationImpact]
    );

    const viewProfile = () => {
      console.log("sdsdsadasda");
      navigate("/ai-readiness-analysis");
    };


    return (

    <Box
        sx={{
          bgcolor: "#f4f7fb",
          minHeight: "370px",
          my: 2,
          mx:{ xs:'0', lg:"auto"},
          width: { xs: "100%", md: "1330px", lg: "1350px" },
        }}
      >
        {/* Header */}
        <Box
          alignItems={{ xs: "left", md: "center" }}
          sx={{
            bgcolor: "#2563eb",
            color: "white",
            px: { xs: 3, md: 8 },
            py: 3,
            display: "flex",
            mx: "auto",
            justifyContent:{xs:'left', md:"space-between"},
            flexDirection: {  xs: "column", md: "row" },
            mb: 4,
            gap: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={2} 
          sx={{
            display:'flex',
            flexDirection:{xs:'column', lg:'row'},
            justifyContent:{xs:'left'},
            alignItems:{xs:'left', lg:'center'}

          }}>
            <Avatar
              sx={{
                bgcolor: "white",
                width: 90,
                height: 40,
                borderRadius: "8px",
                color: "primary.main",
                fontWeight: "bold",
                fontSize: 16,
                ml: { xs: 0, md: 4.7 },
              }}
            >
              ALTIV.AI
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Personalized AI-Readiness Analysis
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#00FD8D" }}>
                {Aireadline?.json_schema_data?.executive_summary?.profile?.name ?? "Rahul Mishra"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#d1e9ff" }}>
                Report ID: {data?.reportId ?? "N/A"} &nbsp; | &nbsp; Generated:{" "}
                {data?.generatedDate ?? "N/A"}
              </Typography>
            </Box>
          </Box>
          {console.log("DDDDDDDDDDDD",serviceUnlocked,myProfile)}

          <Button
            variant="outlined"
            startIcon={myProfile ? <VisibilityIcon/> : <PictureAsPdfIcon /> }
            sx={{
              bgcolor: serviceUnlocked ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)",
              color: "white",
              borderColor: "white",
              mr: { xs: 0, md: 4.7 },
              cursor: "pointer",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
                borderColor: "white",
              },
            }}
            // onClick={serviceUnlocked ? onExportPDF : viewProfile}
            onClick={ myProfile ? viewProfile : serviceUnlocked ? onExportPDF : undefined }
            disabled={!serviceUnlocked ? (!myProfile) : (!serviceUnlocked)}
          >
            {myProfile ? "View Profile" : "Export Full PDF"}
          </Button>


        </Box>

        {/* Metrics Cards */}
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            {metrics.map((metric, index) => (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={3}
                sx={{ maxWidth: 270, display: "flex", justifyContent: "center" }}
              >
                <MotionPaper
                  elevation={3}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)",
                  }}
                  sx={{
                    borderRadius: 3,
                    cursor: "pointer",
                    background: "white",
                    borderTop: `4px solid ${metric.color}`,
                    minHeight: 180,
                    width: "100%",
                    maxWidth: 270,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: 60,
                      height: 56,
                      borderRadius: "50%",
                      bgcolor: `${metric.color}1A`,
                      mr: 1,
                    }}
                  >
                    {metric.icon}
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      fontWeight="600"
                      sx={{
                        textAlign: "left",
                        wordBreak: "break-word",
                        color: "text.secondary",
                        fontSize: 14
                      }}
                    >
                      {metric.title}
                    </Typography>

                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{ textAlign: "left" }}
                      color="primary.main"
                    >
                      <AnimatedNumber value={metric.value} suffix={metric.suffix} />
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "left" }}
                    >
                      {metric.subtitle}
                    </Typography>
                  </Box>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Container>

      </Box>
    );
  }

  // ✅ Memoized export
  export default React.memo(AIReadinessDashboard, (prev, next) =>
    JSON.stringify(prev.data) === JSON.stringify(next.data)
  );

  AIReadinessDashboard.propTypes = {
    data: PropTypes.object,
    onExportPDF: PropTypes.func, // optional callback
    myProfile:Boolean
  };