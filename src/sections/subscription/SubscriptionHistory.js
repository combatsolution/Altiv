import React, { useState } from 'react';
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

const subscriptionData = {
  sms: [
    {
      date: 'Nov 21, 2016',
      amount: 'GHS 0.00',
      volume: '1000.0 Units',
      type: 'bonus',
      description: 'Bonus',
      status: 'Reconciled',
    },
    {
      date: 'Dec 11, 2015',
      amount: 'USD 0.00',
      volume: '450.0 Units',
      type: 'topup',
      description: 'No remarks',
      status: 'Reconciled',
    },
  ],
  software: [
    {
      date: 'Jun 5, 2017',
      amount: 'GHS 506.34',
      duration: '3 Months',
      description: 'No remarks',
      status: 'Pending',
    },
  ],
};

const statusColor = {
  Reconciled: 'success',
  Pending: 'warning',
};

export default function SubscriptionHistory() {
  const [service, setService] = useState('sms');

  const handleChange = (event) => {
    setService(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Title */}
      <Paper elevation={3} sx={{ p: 3, bgcolor: '#2196f3', color: 'white', mb: 3 }}>
        <Typography variant="h6" align="center">
          Your Subscription History
        </Typography>
      </Paper>

      {/* Service Selection */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Select Service
        </Typography>
        <Select value={service} onChange={handleChange} size="small">
          <MenuItem value="sms">SMS Subscription</MenuItem>
          <MenuItem value="software">Software Subscription</MenuItem>
        </Select>
      </Box>

      {/* Table */}
      <Paper variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              {service === 'sms' ? (
                <>
                  <TableCell>Volume</TableCell>
                  <TableCell>Type</TableCell>
                </>
              ) : (
                <TableCell>Duration</TableCell>
              )}
              <TableCell>Description</TableCell>
              <TableCell>Credit Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptionData[service].map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.amount}</TableCell>
                {service === 'sms' ? (
                  <>
                    <TableCell>{row.volume}</TableCell>
                    <TableCell>{row.type}</TableCell>
                  </>
                ) : (
                  <TableCell>{row.duration}</TableCell>
                )}
                <TableCell>{row.description}</TableCell>
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
                    {row.status === 'Pending' && (
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        sx={{ textTransform: 'none', minWidth: 80 }}
                      >
                        Re-verify
                      </Button>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
