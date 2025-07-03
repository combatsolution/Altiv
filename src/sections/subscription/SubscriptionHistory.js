
import React, { useState, useEffect } from 'react';
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
        <TableCell>${row.price}</TableCell>
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
            {row.status === 'EXPIRED' && (
              <Button
                variant="outlined"
                size="small"
                color="success"
                sx={{ textTransform: 'none', minWidth: 80 }}
                onClick={() => handleReverify(row.id)}
              >
                Re-verify
              </Button>
            )}
          </Stack>
        </TableCell>
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
  const planCategories = [
    { label: 'Marketing', value: 0 },
    { label: 'Data Science', value: 1 },
    { label: 'Product Management', value: 2 },
  ];

  // Fetch subscription history using plans API
  const fetchSubscriptionHistory = async (planType) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/subscriptions/user`);
      if (response && response.data) {  
        const formattedData = response.data.map((plan, idx) => ({
          id: plan.id,
          date: plan.createdAt ? new Date(plan.createdAt).toLocaleDateString() : 'N/A',
          price: plan.price || 'N/A',
          planname: plan.planName || 'N/A',
          paymenttype: plan.paymentType || 'Credit Card', // Default if not provided
          // status: idx % 2 === 0 ? 'SUCCESS' : 'EXPIRED', // Mock status
        }));
        setSubscriptions(formattedData);
      } else {
        setSubscriptions([]);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      setSubscriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle re-verification (mock)
  const handleReverify = async (subscriptionId) => {
    try {
      // Simulate re-verification
      console.log(`Re-verifying subscription {subscriptionId}`);
      setSubscriptions((prev) =>
        prev.map((sub) =>
          sub.id === subscriptionId ? { ...sub, status: 'SUCCESS' } : sub
        )
      );
      alert('Re-verification simulated successfully');
    } catch (error) {
      console.error('Error re-verifying subscription:', error);
      alert('Failed to re-verify subscription. Please try again.');
    }
  };

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
  }, [service]);

  const handleChange = (event) => {
    setService(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Title */}
      <Paper elevation={2} sx={{ p: 2, bgcolor: '#2196f3', color: 'white', mb: 3 }}>
        <Typography variant="h6" align="center">
          Your Subscription History
        </Typography>
      </Paper>

      {/* Service Selection */}
      <Box sx={{ mb: 2 }}>
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
            </TableRow> 
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </Paper>
    </Container>
  );
}