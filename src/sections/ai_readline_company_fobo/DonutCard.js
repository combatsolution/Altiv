import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
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
import { Donut } from 'lucide-react';

const COLORS = ['#FF914D', '#1BABFE', '#34C38F']; // slice colors

export default function DonutCard({ title, data, foboScore }) {
    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fontWeight="600"
            >
                {`${value}%`}
            </text>
        );
    };

    return (
        <Box
            sx={{
                mx: 'auto',
                maxWidth: '1155px',
                px: { xs: 3, md: 4 },
                Width: '1000px',
            }}>
            <Card
                sx={{

                    borderRadius: 3,
                    width: 300,
                    textAlign: 'left',
                    p: 3,
                    boxShadow: '0px 2px 10px rgba(0,0,0,0.05)',
                    bgcolor: '#fff',
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: '#2A4C94', mb: 1 }}
                >
                    {title}
                </Typography>

                <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                                paddingAngle={1.5}
                                label={renderCustomLabel}
                                labelLine={false}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => [`${value}%`, name]}
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>

                {/* Legend */}
                <Stack spacing={1.2} sx={{ mt: 2 }}>
                    {data.map((item, index) => (
                        <Stack key={item.name} direction="row" alignItems="flex-start" spacing={1}>
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 0.5,
                                    backgroundColor: COLORS[index % COLORS.length],
                                    mt: 0.4,
                                }}
                            />
                            <Typography variant="body2" sx={{ fontSize: 13, color: '#333', lineHeight: 1.4 }}>
                                <b>{item.name}:</b> {item.desc}
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
                        textAlign: 'center',
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

        </Box>
    );
}


// PropTypes validation
DonutCard.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            desc: PropTypes.string.isRequired,
        })
    ).isRequired,
    foboScore: PropTypes.number.isRequired,
};