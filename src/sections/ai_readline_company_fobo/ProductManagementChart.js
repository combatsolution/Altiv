import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const COLORS = ['#FF914D', '#1BABFE', '#34C38F']; // Automation, Augmentation, Human colors

const data = [
  { name: 'Automation', value: 12.6 },
  { name: 'Augmentation', value: 49.8 },
  { name: 'Human', value: 37.6 },
];

export default function DonutCard() {
  const foboScore = 62.3;

  return (
    <Card
      sx=
      {{
        borderRadius: 3,
        width: 320,
        textAlign: 'center',
        p: 2,
        mx:'auto',
        maxWidth:'1200px'
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: '#2D2D2D', mb: 1 }}
      >
        Product Management
      </Typography>

      <Box sx={{ width: '100%', height: 180, position: 'relative' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: '#333', lineHeight: 1 }}
          >
            {foboScore}
          </Typography>
          <Typography variant="caption" sx={{ color: '#999' }}>
            FOBO SCORE
          </Typography>
        </Box>
      </Box>

      {/* Legend */}
      <Stack
        spacing={0.8}
        sx={{ alignItems: 'left', mx:'10px', mt: 2 }}
      >
        {data.map((item, index) => (
          <Stack
            direction="row"
            spacing={1}
            key={item.name}
            alignItems="left"
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: COLORS[index],
                display:'flex',
                flexDirection:'column',
                justifyContent:'left',
                alignItems:'left',
              }}
            />
            <Typography variant="body2" sx={{ color: '#555' }}>
              {item.name}: {item.value}%
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* FOBO Score Box */}
      <Box
        sx={{
          border: '1px solid #1BABFE',
          borderRadius: 1.5,
          py: 1,
          backgroundColor: '#F7FBFF',
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: '#1BABFE', lineHeight: 1 }}
        >
          {foboScore}
        </Typography>
        <Typography variant="caption" sx={{ color: '#777' }}>
          FOBO SCORE
        </Typography>
      </Box>
    </Card>
  );
}
