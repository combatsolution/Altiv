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

const lmsredirect = async (id) => {
    console.log('id', id);

    const fetchToken = async () => {
      const LmsTokenResp = await axiosInstance.get(endpoints.auth.me);
      const storedToken = LmsTokenResp.data.lmsToken;
      if (storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
        return storedToken;
      }
      const formData = new URLSearchParams();
      formData.append('grant_type', 'client_credentials');
      formData.append('client_id', process.env.REACT_APP_LEARNWORLDS_CLIENT_ID);
      formData.append('client_secret', process.env.REACT_APP_LEARNWORLDS_TOKEN);

      const response = await axios.post(
        'https://altiv.learnworlds.com/admin/api/oauth2/access_token',
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const token = response.data?.tokenData?.access_token;
      return token;
      
    };

    const token = await fetchToken();
    const ssoRes = await axiosInstance.get(`/sso/sso-login/${id}/${token}`);
    window.open(ssoRes.data.url, '_blank');
  };


// Component for subscription rows
const SubscriptionRows = ({ subscriptions, handleReverify }) => (
  <>
    {subscriptions.map((row, idx) => (
      <TableRow key={idx}>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.price}</TableCell>

        <TableCell
          sx={{
            cursor: 'pointer',
            color: 'primary.main',
            textDecoration: 'underline'
          }}
          onClick={() => lmsredirect(row.lmsId)}
        >
          {row.planname}
        </TableCell>


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
  const [service, setService] = useState(1); // Default to 0 (Marketing)
  const [subscriptions, setSubscriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Plan categories for filtering
  const planCategories = useMemo(() => [
    { label: 'Marketing', value: 1 },
    { label: 'Data Science', value: 2 },
    { label: 'Product Management', value: 3 },
  ], []); // Empty dependency array since planCategories is static

  // Map planType to category label
  const planTypeToLabel = useMemo(() => ({
    1: 'Marketing',
    2: 'Data Science',
    3: 'Product Management',
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
          planname: plan.planData?.courses?.courseName || 'N/A',
          paymenttype: plan.planData?.paymentType || 'N/A',
          status: plan.status ? plan.status.toUpperCase() : 'UNKNOWN',
          planType: plan.planData?.planType !== undefined ? plan.planData.planType : 0,
         lmsId: plan.planData?.courses?.lmsId || 'N/A',// <-- add this

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
              {/* <TableCell>Invoice</TableCell>  */}
            </TableRow>
          </TableHead>
          <TableBody>{renderTableContent()}</TableBody>
        </Table>
      </Paper>
    </Container>
  );
}