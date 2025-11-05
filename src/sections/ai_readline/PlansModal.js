import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "src/utils/axios";
import PropTypes from "prop-types";
import {useNavigate} from 'react-router-dom';

export default function PlansModal({ open, onClose }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate= useNavigate();
  const handleChoosePlan=(planId)=>{
    onClose();
    navigate(`/payment/${planId}`);
  }

  useEffect(() => {
    if (open) {
      fetchPlans();
    }
  }, [open]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      // ✅ Apply filter to fetch only planGroup = 1
      const filter = {
        where: {
          planGroup: 1,
        },
      };
      const filterString = encodeURIComponent(JSON.stringify(filter));
      const res = await axiosInstance.get(`/plans?filter=${filterString}`);

      setPlans(res.data || []);
    } catch (err) {
      console.error("Error loading plans:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95%", md: "50%" },
          maxHeight: "85vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 3,
          p: 4,
        }}
      >
        {/* ✅ Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            bgcolor: "grey.100",
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" textAlign="center" fontWeight={700} mb={3}>
          Choose Your Service
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {plans.map((plan) => {
              const serviceName = plan.services?.serviceName;
              const courseName = plan.courses?.courseName;
              const name = serviceName || courseName || "Unnamed Plan";
              const features =
                plan.services?.features || plan.courses?.features || [];

              return (
                <Grid item xs={12} md={4} key={plan.id}>
                  <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        color="primary"
                        textAlign="center"
                      >
                        {name}
                      </Typography>

                      <Typography
                        variant="h5"
                        fontWeight={700}
                        textAlign="center"
                        mt={1}
                      >
                        {plan.isFreePlan ? "Free" : `₹${plan.price}`}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                      >
                        Features:
                      </Typography>

                      {features.length > 0 ? (
                        features.map((f, i) => (
                          <Typography
                            key={i}
                            variant="body2"
                            sx={{ ml: 1, mb: 0.5 }}
                          >
                            • {f}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No features listed
                        </Typography>
                      )}

                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}
                           onClick={()=> handleChoosePlan(plan.id)}
                      >
                        Choose Plan 
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Modal>
  );
}

// ✅ PropTypes validation
PlansModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

