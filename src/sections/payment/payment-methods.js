// import PropTypes from 'prop-types';
// import { useState, useCallback } from 'react';
// // @mui
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import ListItemText from '@mui/material/ListItemText';
// import Paper from '@mui/material/Paper';
// // hooks
// import { useBoolean } from 'src/hooks/use-boolean'; 
// // components
// import Iconify from 'src/components/iconify';
// //
// import PaymentNewCardDialog from './payment-new-card-dialog';

// // ----------------------------------------------------------------------

// const PAYMENT_OPTIONS = [
//   {
//     value: 'stripe',
//     label: 'Stripe',
//   },
//   {
//     value: 'razerpay',
//     label: 'Razerpay',
//   },
//   // {
//   //   value: 'credit',
//   //   label: 'Credit / Debit Card',
//   // },
// ];

// const CARD_OPTIONS = [
//   {
//     value: 'visa1',
//     label: '**** **** **** 1212 - Jimmy Holland',
//   },
//   {
//     value: 'visa2',
//     label: '**** **** **** 2424 - Shawn Stokes',
//   },
//   {
//     value: 'mastercard',
//     label: '**** **** **** 4545 - Cole Armstrong',
//   },
// ];

// // ----------------------------------------------------------------------

// export default function PaymentMethods() {
//   const newCard = useBoolean();

//   const [method, setMethod] = useState('paypal');

//   const handleChangeMethod = useCallback((newValue) => {
//     setMethod(newValue);
//   }, []);

//   return (
//     <>
//       <Stack spacing={5}>
//         <Typography variant="h6">Payment Method</Typography>

//         <Stack spacing={3}>
//           {PAYMENT_OPTIONS.map((option) => (
//             <OptionItem
//               key={option.label}
//               option={option}
//               selected={method === option.value}
//               isCredit={option.value === 'credit' && method === 'credit'}
//               onOpen={newCard.onTrue}
//               onClick={() => handleChangeMethod(option.value)}
//             />
//           ))}
//         </Stack>
//       </Stack>

//       <PaymentNewCardDialog open={newCard.value} onClose={newCard.onFalse} />
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// function OptionItem({ option, selected, isCredit, onOpen, ...other }) {
//   const { value, label } = option;

//   return (
//     <Paper
//       variant="outlined"
//       key={value}
//       sx={{
//         p: 2.5,
//         cursor: 'pointer',
//         ...(selected && {
//           boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
//         }),
//       }}
//       {...other}
//     >
//       <ListItemText
//         primary={
//           <Stack direction="row" alignItems="center">
//             <Iconify
//               icon={selected ? 'eva:checkmark-circle-2-fill' : 'eva:radio-button-off-fill'}
//               width={24}
//               sx={{ mr: 2, color: selected ? 'primary.main' : 'text.secondary' }}
//             />

//             <Box component="span" sx={{ flexGrow: 1 }}>
//               {label}
//             </Box>

//             <Stack spacing={1} direction="row" alignItems="center">
//               {value === 'credit' && (
//                 <>
//                   <Iconify icon="logos:mastercard" width={24} />,
//                   <Iconify icon="logos:visa" width={24} />
//                 </>
//               )}

//               {value === 'stripe' && <Iconify icon="logos:stripe" width={24} />}

//               {value === 'razerpay' && (
                
//                 <Box
//                   component="img"
//                   src="/assets/images/razorpay-logo.svg"
//                   alt="Razorpay"
               
//                   sx={{ width: 44, height: 44 }}
//                 />
//               )}
//               {value === 'cash' && <Iconify icon="solar:wad-of-money-bold" width={24} />}
//             </Stack>
//           </Stack>
//         }
//         primaryTypographyProps={{ typography: 'subtitle2' }}
//       />

//       {isCredit && (
//         <Stack
//           spacing={2.5}
//           alignItems="flex-end" 
//           sx={{
//             pt: 2.5,
//           }}
//         >
//           <TextField select fullWidth label="Cards" SelectProps={{ native: true }}>
//             {CARD_OPTIONS.map((card) => (
//               <option key={card.value} value={card.value}>
//                 {card.label}
//               </option>
//             ))}
//           </TextField>

//           <Button
//             size="small"
//             color="primary"
//             startIcon={<Iconify icon="mingcute:add-line" />}
//             onClick={onOpen}
//           >
//             Add New Card
//           </Button>
//         </Stack>
//       )}
//     </Paper>
//   );
// }

// OptionItem.propTypes = {
//   isCredit: PropTypes.bool,
//   onOpen: PropTypes.func,
//   option: PropTypes.object,
//   selected: PropTypes.bool,
// };



import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import PaymentNewCardDialog from './payment-new-card-dialog';

const PAYMENT_OPTIONS = [
  {
    value: 'stripe',
    label: 'Stripe',
  },
  {
    value: 'razerpay',
    label: 'Razerpay',
  },
];

const CARD_OPTIONS = [
  {
    value: 'visa1',
    label: '**** **** **** 1212 - Jimmy Holland',
  },
  {
    value: 'visa2',
    label: '**** **** **** 2424 - Shawn Stokes',
  },
  {
    value: 'mastercard',
    label: '**** **** **** 4545 - Cole Armstrong',
  },
];

export default function PaymentMethods() {
  const newCard = useBoolean();
  const [method, setMethod] = useState('stripe');

  const handleChangeMethod = useCallback(async (newValue) => {
    setMethod(newValue);

    if (newValue === 'razerpay') {
      const loadRazorpayScript = () =>
        new Promise((resolve) => 
          {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Please check your internet connection.');
        return;
      }

      try {
        const { data: order } = await axios.post('http://localhost:5000/create-order', {
          amount: 50000,
        });

        const options = {
          key: 'rzp_test_wuPE6o4FGorY46',
          amount: order.amount,
          currency: order.currency,
          name: 'Your Company',
          description: 'Test Transaction',
          order_id: order.id,
          handler: async (response) => {
            try {
              const verifyRes = await axios.post('http://localhost:5000/verify-payment', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              alert(verifyRes.data.status === 'success' ? 'Payment Success!' : 'Payment Failed');
            } catch (err) {
              console.error('Verification error:', err.response?.data || err.message);
              alert('Payment verification failed.');
            }
          },
          prefill: {
            name: 'Shubham',
            email: 'user@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Order creation error:', error.response?.data || error.message);
        alert('Payment initiation failed.');
      }
    }
  }, []);

  return (
    <>
      <Stack spacing={5}>
        <Typography variant="h6">Payment Method</Typography>

        <Stack spacing={3}>
          {PAYMENT_OPTIONS.map((option) => (
            <OptionItem
              key={option.label}
              option={option}
              selected={method === option.value}
              isCredit={option.value === 'credit' && method === 'credit'}
              onOpen={newCard.onTrue}
              onClick={() => handleChangeMethod(option.value)}
            />
          ))}
        </Stack>
      </Stack>

      <PaymentNewCardDialog open={newCard.value} onClose={newCard.onFalse} />
    </>
  );
}

function OptionItem({ option, selected, isCredit, onOpen, ...other }) {
  const { value, label } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        p: 2.5,
        cursor: 'pointer',
        ...(selected && {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        }),
      }}
      {...other}
    >
      <ListItemText
        primary={
          <Stack direction="row" alignItems="center">
            <Iconify
              icon={selected ? 'eva:checkmark-circle-2-fill' : 'eva:radio-button-off-fill'}
              width={24}
              sx={{ mr: 2, color: selected ? 'primary.main' : 'text.secondary' }}
            />

            <Box component="span" sx={{ flexGrow: 1 }}>
              {label}
            </Box>

            <Stack spacing={1} direction="row" alignItems="center">
              {value === 'credit' && (
                <>
                  <Iconify icon="logos:mastercard" width={24} />,
                  <Iconify icon="logos:visa" width={24} />
                </>
              )}

              {value === 'stripe' && <Iconify icon="logos:stripe" width={24} />}

              {value === 'razerpay' && (
                <Box
                  component="img"
                  src="/assets/images/razorpay-logo.svg"
                  alt="Razorpay"
                  sx={{ width: 44, height: 44 }}
                />
              )}

              {value === 'cash' && <Iconify icon="solar:wad-of-money-bold" width={24} />}
            </Stack>
          </Stack>
        }
        primaryTypographyProps={{ typography: 'subtitle2' }}
      />

      {isCredit && (
        <Stack spacing={2.5} alignItems="flex-end" sx={{ pt: 2.5 }}>
          <TextField select fullWidth label="Cards" SelectProps={{ native: true }}>
            {CARD_OPTIONS.map((card) => (
              <option key={card.value} value={card.value}>
                {card.label}
              </option>
            ))}
          </TextField>

          <Button size="small" color="primary" startIcon={<Iconify icon="mingcute:add-line" />} onClick={onOpen}>
            Add New Card
          </Button>
        </Stack>
      )}
    </Paper>
  );
}

OptionItem.propTypes = {
  isCredit: PropTypes.bool,
  onOpen: PropTypes.func,
  option: PropTypes.object,
  selected: PropTypes.bool,
};
