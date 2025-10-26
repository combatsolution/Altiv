import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { Box, Info } from 'lucide-react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { padding } from '@mui/system';

const TopTasksAutomationExposure = () => {
    const [hoveredRow, setHoveredRow] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const tasks = [
        { department: 'Data Science', task: 'Clean and preprocess raw datasets to prepare them for analysis and modeling.', present: 0.53, past: 0.60, future: 0.67, index: 89 },
        { department: 'Data Science', task: 'Implement train validation from creating models (e.g., hyperprm, classification, cluster regression)', present: 0.53, past: 0.59, future: 0.67, index: 87 },
        { department: 'Data Science', task: 'Visualize Data findings using charts, graphs, and dashboards for internal stakeholders', present: 0.54, past: 0.59, future: 0.67, index: 87 },
        { department: 'Marketing', task: 'Monitor and analyze digital using performance using analytics tools and report on key metrics', present: 0.51, past: 0.56, future: 0.64, index: 85 },
        { department: 'Marketing', task: 'Schedule posts on social media platforms', present: 0.51, past: 0.56, future: 0.64, index: 85 },
        { department: 'Marketing', task: 'Segment email lists and personalize email content (e.g., A/B tests) signals, match metrics)', present: 0.51, past: 0.56, future: 0.64, index: 85 },
        { department: 'Product Management', task: 'Extract, clean, and manipulate product usage data from internal analytics tools', present: 0.50, past: 0.61, future: 0.40, index: 84 },
        { department: 'Product Management', task: 'Create and maintain dashboards to track key product metrics', present: 0.50, past: 0.61, future: 0.40, index: 84 },
        { department: 'Product Management', task: 'Prepare insights reports summarizing key product metrics and insights', present: 0.50, past: 0.61, future: 0.40, index: 84 },
        { department: 'Software Engineering', task: 'Automate infrastructure provisioning and configuration management', present: 0.48, past: 0.60, future: 0.13, index: 82 },
        { department: 'Software Engineering', task: 'Implement and manage monitoring, logging, and alerting solutions', present: 0.48, past: 0.60, future: 0.13, index: 82 },
        { department: 'Software Engineering', task: 'Configure and manage version control systems and branching strategies', present: 0.48, past: 0.60, future: 0.13, index: 82 },
    ];

    const getIndexColor = (index) => {
        if (index >= 85) return '#4169E1';
        if (index >= 80) return '#1E90FF';
        return '#87CEEB';
    };

    const styles = {
        container: {
            margin: '0 auto',
            maxWidth: '1155px',
            padding: isMobile ? '24px' : '32px',
            backgroundColor: '#fff', // fixed typo (#FFf → #fff)
            borderRadius: '12px', // optional, makes the container look smoother
            minHeight: '100vh',
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            // boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', // subtle shadow for elevation
        },

        header: { marginBottom: '32px', animation: 'fadeIn 0.6s ease-in' },
        title: {
          
            fontSize: isMobile ? '16px' : '24px',
            fontWeight: '700',
            color: '#2A4DD0',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        subtitle: { fontSize: '14px', color: '#666', marginTop: '8px' },
        tableContainer: {
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            animation: 'slideUp 0.5s ease-out'
        },
        th: {
            backgroundColor: '#4169E1',
            color: 'white',
            padding: '16px 12px',
            textAlign: 'left',
            fontWeight: '600',
            fontSize: '14px'
        },
        td: {
            padding: '16px 12px',
            borderBottom: '1px solid #e0e0e0',
            fontSize: '14px',
            color: '#333'
        },
        chip: { display: 'inline-block', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: '600' },
        deptChip: { backgroundColor: '#f0f4ff', color: '#1a237e' },
        indexChip: { color: 'white', minWidth: '40px', textAlign: 'center' },
        card: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease',
            animation: 'fadeIn 0.4s ease-in'
        },
        metricContainer: { display: 'flex', justifyContent: 'space-around', marginTop: '16px', gap: '8px' },
        metricBox: { textAlign: 'center', flex: 1 },
        metricLabel: { fontSize: '11px', color: '#666', marginBottom: '4px' },
        metricValue: { fontSize: '18px', fontWeight: '600' },
        legend: {
            marginTop: '32px',
            padding: '16px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        },
        legendTitle: { fontWeight: '600', fontSize: '14px', marginBottom: '12px' },
        legendItems: { display: 'flex', flexWrap: 'wrap', gap: '16px' },
        legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' },
        colorBox: { width: '16px', height: '16px', borderRadius: '4px' },
    };

    // ✅ MobileCard component
    const MobileCard = ({ task, index }) => (
        <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ ...styles.chip, ...styles.deptChip }}>{task.department}</span>
                <span style={{ ...styles.chip, ...styles.indexChip, backgroundColor: getIndexColor(task.index) }}>{task.index}</span>
            </div>

            <div style={{ fontSize: '13px', color: '#333', marginBottom: '16px', lineHeight: '1.5' }}>
                {task.task}
            </div>

            <div style={styles.metricContainer}>
                <div style={styles.metricBox}>
                    <div style={styles.metricLabel}>Present</div>
                    <div style={{ ...styles.metricValue, color: '#1976d2' }}>{task.present.toFixed(2)}</div>
                </div>
                <div style={styles.metricBox}>
                    <div style={styles.metricLabel}>Past</div>
                    <div style={{ ...styles.metricValue, color: '#388e3c' }}>{task.past.toFixed(2)}</div>
                </div>
                <div style={styles.metricBox}>
                    <div style={styles.metricLabel}>Future</div>
                    <div style={{ ...styles.metricValue, color: '#f57c00' }}>{task.future.toFixed(2)}</div>
                </div>
            </div>
        </div>
    );

    // ✅ Add PropTypes for MobileCard
    MobileCard.propTypes = {
        task: PropTypes.shape({
            department: PropTypes.string.isRequired,
            task: PropTypes.string.isRequired,
            present: PropTypes.number.isRequired,
            past: PropTypes.number.isRequired,
            future: PropTypes.number.isRequired,
            index: PropTypes.number.isRequired,
        }).isRequired,
        index: PropTypes.number.isRequired,
    };

    return (


        <div style={styles.container}>
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .table-row:hover {
 
          transform: scale(1.005);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }   
      `}</style>


            <div style={styles.header}>
                <div style={styles.title}>
                    <Info size={28} sx={{ color: "primary.main" }} />
                    Top Tasks by Automation Exposure
                </div>
                <Divider sx={{ borderColor: "#00A3FF", mb: 3, height: 2 }} />
            </div>

            <Grid
                sx={{
                    backgroundColor: '#fff',
                    border: '2px solid #0000',
                    borderRadius: '12px',
                    p: 3,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    mt: 6,
                }}
            >
                {isMobile ? (
                    <div>
                        {tasks.map((task, index) => (
                            <MobileCard key={index} task={task} index={index} />
                        ))}
                    </div>
                ) : (


                    <div style={styles.tableContainer}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>DEPARTMENT</th>
                                    <th style={styles.th}>TASK</th>
                                    <th style={{ ...styles.th, textAlign: 'center' }}>PAUTO</th>
                                    <th style={{ ...styles.th, textAlign: 'center' }}>PAUG</th>
                                    <th style={{ ...styles.th, textAlign: 'center' }}>PHUM</th>
                                    <th style={{ ...styles.th, textAlign: 'center' }}>FOBO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, index) => (
                                    <tr
                                        key={index}
                                        className="table-row"
                                        style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
                                        onMouseEnter={() => setHoveredRow(index)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <td style={styles.td}>
                                            <span style={{ ...styles.chip, ...styles.deptChip }}>{task.department}</span>
                                        </td>
                                        <td style={{ ...styles.td, maxWidth: '500px' }}>{task.task}</td>
                                        <td style={{ ...styles.td, textAlign: 'center', fontWeight: '600', color: '#1976d2' }}>
                                            {task.present.toFixed(2)}
                                        </td>
                                        <td style={{ ...styles.td, textAlign: 'center', fontWeight: '600', color: '#388e3c' }}>
                                            {task.past.toFixed(2)}
                                        </td>
                                        <td style={{ ...styles.td, textAlign: 'center', fontWeight: '600', color: '#f57c00' }}>
                                            {task.future.toFixed(2)}
                                        </td>
                                        <td style={{ ...styles.td, textAlign: 'center' }}>
                                            <span style={{ ...styles.chip, ...styles.indexChip, backgroundColor: getIndexColor(task.index) }}>
                                                {task.index}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
                <Grid
                    container
                    direction="column"
                    sx={{
                        mt: 2,
                        p: 2,
                        border: '1px solid #E0E0E0',
                        borderRadius: 2,
                        // backgroundColor: '#FAFCFF',
                        maxWidth: '100%',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        sx={{ mb: 1 }}
                    >
                        Legend:
                    </Typography>

                    <Grid
                        container
                        spacing={1.5}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                    >
                        {[
                            { name: 'Pauto', label: 'Probability of Automation ' },
                            { name: 'Paug', label: ' Probability of Augmentation' },
                            { name: 'Phum', label: 'Probability Human Only' },
                            { name: 'FOBO', label: ' Fear of Skill Becoming Obsolete' },
                        ].map((item, index) => (
                            <Grid
                                item
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.2,
                                }}
                            >
                                <Typography variant="body2" sx={{ color: "primary.main" }}>
                                    {item.name} =
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#444' }}>
                                    {item.label}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default TopTasksAutomationExposure;