
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
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/auth/hooks";

export default function PlansModal({ open, onClose, onPaymentSuccess, unlockedPages = [] }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [subscribedPages, setSubscribedPages] = useState([]);
  const subscribedPages = unlockedPages || [];

  const navigate = useNavigate();
  const { user } = useAuthContext();

  // Fetch plans
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const filter = {
        where: { planGroup: 1 },
        include: [{ relation: "services" }],
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

  // Fetch user subscriptions
  // const fetchUserSubscriptions = async () => {
  //   if (!user?.id) return;
  //   try {
  //     const res = await axiosInstance.get(
  //       `/subscriptions/service-subscriptions-by-user/fobo-pro`
  //     );
  //     if (res.data?.success && res.data?.subscriptionId) {
  //       setSubscribedPages(["fobo-pro"]); // Add all subscribed pages here
  //     }
  //   } catch (err) {
  //     console.error("Error fetching user subscriptions:", err);
  //   }
  // };

  useEffect(() => {
    if (open) {
      fetchPlans();
      // fetchUserSubscriptions();
    }
  }, [open]);

  const handleChoosePlan = async (planId, servicePage) => {
    try {
      localStorage.removeItem("foboProUnlocked");
      sessionStorage.removeItem("foboProUnlocked");
      sessionStorage.removeItem("foboProSubscriptionId");

      onClose();

      const payload = {
        planId: Number(planId),
        paymentMethod: 1, // Razorpay for India
        isDeleted: false,
      };

      const res = await axiosInstance.post("/subscriptions", payload);
      const { data } = res;

      if (data.paymentMethod === 1) {
        launchRazorpay(data, planId);
      } else if (data.paymentMethod === 0) {
        window.location.href = data.paymentObject.sessionUrl;
      } else {
        console.error("Unknown payment method:", data.paymentMethod);
      }
    } catch (err) {
      console.error("Subscription creation failed:", err);
      alert("Failed to create subscription. Please try again.");
    }
  };

  const launchRazorpay = (data, planId) => {
    const payment = data.paymentObject;

    const options = {
      key: payment.razorpayKeyId,
      amount: payment.amount,
      currency: payment.currency,
      name: "Altiv AI",
      description: "Plan Purchase",
      order_id: payment.orderId,
      handler: async (response) => {
        try {
          const verifyPayload = {
            subscription_id: payment.subscriptionId,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const verifyRes = await axiosInstance.post(
            "/subscriptions/callback/verify",
            verifyPayload
          );

          if (verifyRes.data.success) {
            sessionStorage.setItem(
              "foboProSubscriptionId",
              payment.subscriptionId
            );

            if (onPaymentSuccess) onPaymentSuccess();
            navigate("/ai-readiness-analysis", { replace: true });
          } else {
            alert("Payment verification failed. Please try again.");
            navigate("/pricing");
          }
        } catch (err) {
          console.error("Verification failed:", err);
          alert("Server error verifying payment.");
          navigate("/pricing");
        }
      },
      prefill: {
        name: data.customerName || user?.name,
        email: data.customerEmail || user?.email,
        contact: data.customerPhone || user?.phone,
      },
      notes: { planId },
      theme: { color: "#3399cc" },
    };

    const razor = new window.Razorpay(options);

    razor.on("payment.failed", (response) => {
      console.error("Razorpay payment failed:", response.error);
      alert("Payment failed. Please try again.");
    });

    razor.open();
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
              const name = serviceName || plan.planName || "Unnamed Plan";
              const features = plan.services?.features || [];

              // ✅ Disable button if user already subscribed
              const isSubscribed = plan.services?.page?.some((p) =>
                subscribedPages.includes(p)
              );

              return (
                <Grid item xs={12} md={4} key={plan.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
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
                          <Typography key={i} variant="body2" sx={{ ml: 1, mb: 0.5 }}>
                            • {f}
                          </Typography>
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No features listed
                        </Typography>
                      )}
                    </CardContent>

                    <Box sx={{ mt: "auto", p: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isSubscribed}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                        onClick={() => handleChoosePlan(plan.id, serviceName)}
                      >
                        {isSubscribed ? "Already Purchased" : "Choose Plan"}
                      </Button>
                    </Box>
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

PlansModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPaymentSuccess: PropTypes.func,
    unlockedPages: PropTypes.arrayOf(PropTypes.string),

};
