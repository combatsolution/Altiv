import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Container,
} from '@mui/material';
import axiosInstance from 'src/utils/axios';

const statusColor = {
  SUCCESS: 'success',
  EXPIRED: 'warning',
  PENDING: 'info',
};

// Component for loading state
const LoadingRow = () => (
  <TableRow>
    <TableCell colSpan={5} align="center">
      <Typography>Loading...</Typography>
    </TableCell>
  </TableRow>
);

// Component for empty state
const EmptyRow = () => (
  <TableRow>
    <TableCell colSpan={5} align="center">
      <Typography variant="h6">No subscriptions found</Typography>
    </TableCell>
  </TableRow>
);

// Component for subscription rows
const SubscriptionRows = ({ subscriptions, handleReverify }) => (
  <>
    {subscriptions.map((row, idx) => (
      <TableRow key={idx}>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell>{row.planname}</TableCell>
        <TableCell>{row.paymenttype}</TableCell>
        <TableCell>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="contained"
              size="small"
              color={statusColor[row.status] || 'default'}
              sx={{ textTransform: 'none', minWidth: 80 }}
            >
              {row.status}
            </Button>
            
          </Stack>
        </TableCell>
        {/* <TableCell>{row.paymenttype}</TableCell> */}

      </TableRow>
    ))}
  </>
);
            

SubscriptionRows.propTypes = {
  subscriptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      date: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      planname: PropTypes.string,
      paymenttype: PropTypes.string,
      status: PropTypes.string,
    })
  ).isRequired,
  handleReverify: PropTypes.func.isRequired,
};

export default function SubscriptionHistory() {
  const [service, setService] = useState(0); // Default to 0 (Marketing)
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Plan categories for filtering
  const planCategories = useMemo(() => [
    { label: 'Marketing', value: 0 }, 
    { label: 'Data Science', value: 1 },
    { label: 'Product Management', value: 2 },
  ], []); // Empty dependency array since planCategories is static

  // Map planType to category label
  const planTypeToLabel = useMemo(() => ({
    0: 'Marketing',
    1: 'Data Science',
    2: 'Product Management',
  }), []); // Empty dependency array since planTypeToLabel is static

  // Fetch subscription history using plans API
  const fetchSubscriptionHistory = useCallback(async (planType) => {
  setIsLoading(true);
  try {
    const response = await axiosInstance.get(`/subscriptions/user`);
    if (response && response.data) {
      console.log('Fetched plans:', response);
      const data = Array.isArray(response.data) ? response.data : [response.data];
      const formattedData = data.map((plan) => ({
        id: plan.id || `sub_${Date.now()}`,
        date: plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : 'N/A',
        price: plan.planData?.price ? `₹${plan.planData.price}` : 'N/A',
        planname: plan.planData?.planName || 'N/A',
        paymenttype: plan.planData?.paymentType || 'N/A',
        status: plan.status ? plan.status.toUpperCase() : 'UNKNOWN',
        planType: plan.planData?.planType !== undefined ? plan.planData.planType : 0,
      }));

      const filteredData = formattedData.filter((sub) => sub.planType === planType);

      setSubscriptions(filteredData);
    } else {
      setSubscriptions([]);
    }
  } catch (error) {
    console.error('Error fetching plans:', error);
    setSubscriptions([]);
  } finally {
    setIsLoading(false);
  }
}, []);


  // Handle re-verification (mock)
  const handleReverify = useCallback(async (subscriptionId) => {
    try {
      // Simulate re-verification
      console.log(`Re-verifying subscription ${subscriptionId}`);
      setSubscriptions((prev) =>
        prev.map((sub) => (sub.id === subscriptionId ? { ...sub, status: 'SUCCESS' } : sub))
      );
      alert('Re-verification simulated successfully');
    } catch (error) {
      console.error('Error re-verifying subscription:', error);
      alert('Failed to re-verify subscription. Please try again.');
    }
  }, [setSubscriptions]); // Dependency for useCallback

  // Render table content
  const renderTableContent = () => {
    if (isLoading) {
      return <LoadingRow />;
    }
    if (subscriptions.length === 0) {
      return <EmptyRow />;
    }
    return <SubscriptionRows subscriptions={subscriptions} handleReverify={handleReverify} />;
  };

  // Fetch subscriptions when component mounts or service changes
  useEffect(() => {
    fetchSubscriptionHistory(service);
  }, [service, fetchSubscriptionHistory]);

  const handleChange = (event) => {
    setService(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Title */}
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          bgcolor: 'primary.main',
          color: '#fff',
          mb: 3,
          width: '80%',
          mx: 'auto',
        }}
      >
        <Typography variant="h6" align="center">
          Your Subscription History
        </Typography>
      </Paper>

      {/* Service Selection */}
      <Box sx={{mb:2}}>
        <Select value={service} onChange={handleChange} size="small">
          {planCategories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Table */}
      <Paper variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Plan Name</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Credit Status</TableCell>
              {/* <TableCell>Invoice</TableCell>  */}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </Paper>
    </Container>
  );
}