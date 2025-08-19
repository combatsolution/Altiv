import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery,
  Stack,
} from '@mui/material';
import { FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReactFlow, { Background, Handle, Position, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { m } from 'framer-motion';
import CareerCard from './CareerCard';

const mockData = {
  next: [
    {
      title: 'Senior Data Scientist',
      match: 50,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    },
    {
      title: 'Senior Data Scientist 1',
      match: 50,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    },
  ],
  executive: [
    {
      title: 'Director Data Science',
      match: 30,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '10-15 years',
    },
    {
      title: 'VP Data Science',
      match: 30,
      rate: '18%',
      salary: '$60L - $70L',
      experience: '15+ years',
    },
  ],
};

export default function CareerPathProjection() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState('Lead Data Scientist');
  const [expYears, setExpYears] = useState(5);
  const [userStartedWith, setUserStartedWith] = useState(null);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState({
    current: null,
    next: null,
    executive: null,
  });

  const nodeTypes = {
    career: ({ data, id }) => {
      const { isNew, onClick } = data;
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={() => onClick?.(id)}
          onKeyDown={(e) => e.key === 'Enter' && onClick?.(id)}
          style={{
            width: isMdUp ? 360 : 280,
            height: 127,
            position: 'relative',
            cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <Handle type="target" position={Position.Top} style={{ background: '#1976d2' }} />
          {isNew ? (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CareerCard {...data} />
            </m.div>
          ) : (
            <CareerCard {...data} />
          )}
          <Handle type="source" position={Position.Bottom} style={{ background: '#1976d2' }} />
        </div>
      );
    },
    label: ({ data }) => (
      <m.div
        style={{
          padding: 10,
          background: '#2A4DD0',
          color: '#fff',
          borderRadius: '25px',
          fontSize: '12px',
          textAlign: 'center',
          width: '64px',
          height: '64px',
          whiteSpace: 'pre-line',
          zIndex: 9999,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {data.label}
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      </m.div>
    ),
  };

  // 👇 Generate all nodes
  const generateAllNodes = useCallback(() => {
    const handleNodeClick = (id, level) => {
      setSelectedNodes((prev) => {
        let updated = { ...prev };

        // reset deeper selections when selecting higher level
        if (level === 'current') {
          updated = { current: id, next: null, executive: null };
        } else if (level === 'next') {
          updated = { ...updated, next: id, executive: null };
        } else if (level === 'executive') {
          updated = { ...updated, executive: id };
        }

        rebuildEdges(updated);
        return updated;
      });
    };

    const baseNodes = [
      {
        id: 'label-current',
        type: 'label',
        data: { label: 'Current Role' },
        position: { x: 0, y: 0 },
        draggable: false,
      },
      {
        id: 'current-node',
        type: 'career',
        data: {
          title: 'Lead Data Scientist',
          match: 95,
          rate: '18%',
          salary: '$50L - $55L',
          experience: '8-12 years',
          isNew: false,
          onClick: (id) => handleNodeClick(id, 'current'),
        },
        position: { x: isMdUp ? 150 : 80, y: 0 },
        sourcePosition: Position.Top,
        targetPosition: Position.Bottom,
      },
      {
        id: 'label-next',
        type: 'label',
        data: { label: 'Next Level 2-4 yrs' },
        position: { x: 0, y: isMdUp ? 200 : 200 },
        draggable: false,
      },
      {
        id: 'label-executive',
        type: 'label',
        data: { label: 'Executive Level' },
        position: { x: 0, y: isMdUp ? 400 : 400 },
        draggable: false,
      },
    ];

    const nextNodes = mockData.next.map((child, index) => ({
      id: `current-node-next-${index}`,
      type: 'career',
      data: {
        ...child,
        isNew: false,
        onClick: (id) => handleNodeClick(id, 'next'),
      },
      position: {
        x: (isMdUp ? 150 : 80) + index * (isMdUp ? 400 : 400),
        y: isMdUp ? 200 : 200,
      },
      sourcePosition: Position.Top,
      targetPosition: Position.Bottom,
    }));

    const executiveNodes = mockData.executive.flatMap((child, index) =>
      mockData.next.map((_, parentIndex) => ({
        id: `current-node-next-${parentIndex}-executive-${index}`,
        type: 'career',
        data: {
          ...child,
          isNew: false,
          onClick: (id) => handleNodeClick(id, 'executive'),
        },
        position: {
          x:
            (isMdUp ? 150 : 80) +
            parentIndex * (isMdUp ? 400 : 400) +
            index * (isMdUp ? 400 : 400),
          y: isMdUp ? 400 : 400,
        },
        sourcePosition: Position.Top,
        targetPosition: Position.Bottom,
      }))
    );

    return [...baseNodes, ...nextNodes, ...executiveNodes];
  }, [isMdUp]);

  useEffect(() => {
    const startedWith = sessionStorage.getItem('userStartedWith');
    setUserStartedWith(startedWith);

    const generatedNodes = generateAllNodes();
    setNodes(generatedNodes);

    // set initial edges using default selectedNodes (none selected yet)
    setEdges([
      {
        id: 'edge-label-current-next',
        source: 'label-current',
        target: 'label-next',
        type: 'straight',
        style: { stroke: '#E6EBF2', strokeWidth: 6 },
      },
      {
        id: 'edge-label-next-exec',
        source: 'label-next',
        target: 'label-executive',
        type: 'straight',
        style: { stroke: '#E6EBF2', strokeWidth: 6 },
      },
    ]);
  }, [generateAllNodes]);

  // 👇 Build edges dynamically
  const rebuildEdges = (selected) => {
    const newEdges = [
      {
        id: 'edge-label-current-next',
        source: 'label-current',
        target: 'label-next',
        type: 'straight',
        style: { stroke: '#E6EBF2', strokeWidth: 6 },
      },
      {
        id: 'edge-label-next-exec',
        source: 'label-next',
        target: 'label-executive',
        type: 'straight',
        style: { stroke: '#E6EBF2', strokeWidth: 6 },
      },
    ];

    // 🔹 current → next (always drawn, but highlight only selected branch)
    mockData.next.forEach((_, idx) => {
      const childId = `current-node-next-${idx}`;
      newEdges.push({
        id: `edge-current-node-${childId}`,
        source: 'current-node',
        target: childId,
        type: 'bezier',
        style: {
          stroke:
            selected.next === childId ||
            (typeof selected.executive === 'string' && selected.executive.startsWith(childId))
              ? '#1976d2'
              : '#999',
          strokeWidth: 3,
        },
      });
    });

    // 🔹 next → executive (only draw from the selected next OR the one linked to selected executive)
    if (selected.next || selected.executive) {
      mockData.next.forEach((_, parentIdx) => {
        const nextId = `current-node-next-${parentIdx}`;

        // expand only the selected next node or the one that leads to selected executive
        const shouldExpand =
          selected.next === nextId ||
          (typeof selected.executive === 'string' && selected.executive.startsWith(nextId));

        if (shouldExpand) {
          mockData.executive.forEach((__, execIdx) => {
            const execId = `${nextId}-executive-${execIdx}`;
            newEdges.push({
              id: `edge-${nextId}-${execId}`,
              source: nextId,
              target: execId,
              type: 'bezier',
              style: {
                stroke: selected.executive === execId ? '#1976d2' : '#999',
                strokeWidth: 3,
              },
            });
          });
        }
      });
    }

    setEdges(newEdges);
  };

  return (
    <Box sx={{ bgcolor: 'white', p: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ bgcolor: 'white', p: { xs: 1, sm: 2, md: 4 } }}>
          <Grid container direction="column" spacing={2}>
            <Grid item container spacing={2} alignItems="center">
              <Grid item xs={12} sm>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <img
                      src="\assets\icons\careerCompass\job_title.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                    <Select
                      fullWidth
                      size="small"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      variant="standard"
                      sx={{
                        '&:before': { borderBottom: '1px solid #D6DDEB' },
                        '&:after': { borderBottom: '1px solid #D6DDEB' },
                        '& .MuiSelect-select': {
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '160%',
                          letterSpacing: '0%',
                          color: '#25324B',
                          padding: '8px 0 4px',
                        },
                      }}
                    >
                      <MenuItem value={jobTitle}>{jobTitle}</MenuItem>
                    </Select>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      fontSize: '10px',
                      lineHeight: '160%',
                      color: '#202430',
                      opacity: 0.7,
                      ml: '32px', // Align with the input field (24px icon + 8px gap)
                      mt: 0.5,
                    }}
                  >
                    Popular: Senior Data Scientist, Director Data Science
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.4 }}>
                  <img
                    src="\assets\icons\careerCompass\job_experience.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                  <Select
                    fullWidth
                    size="small"
                    value={expYears}
                    onChange={(e) => setExpYears(e.target.value)}
                    variant="standard"
                    sx={{
                      '&:before': { borderBottom: '1px solid #D6DDEB' },
                      '&:after': { borderBottom: '1px solid #D6DDEB' },
                      '& .MuiSelect-select': {
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '160%',
                        letterSpacing: '0%',
                        color: '#25324B',
                        padding: '8px 0 4px',
                      },
                    }}
                  >
                    <MenuItem value={5}>5 Years</MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Button
                  variant="outlined"
                  sx={{
                    minWidth: '180px',
                    height: '48px',
                    borderRadius: '30px',
                    border: '2px solid #0040D8',
                    color: '#0040D8',
                    mb: 2.4,
                    '&:hover': {
                      border: '2px solid #0040D8',
                    },
                    '&.MuiButton-outlined': {
                      border: '2px solid #0040D8',
                    },
                    fontSize: { xs: '14px', sm: '16px' },
                    textTransform: 'none',
                  }}
                >
                  Modify
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'left', mt: '26px', mb: '36px' }}>
                <Typography
                  sx={{
                    fontFamily: { xs: 'Inter', sm: 'Roboto' },
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '30px',
                    letterSpacing: { xs: '-1.14px', sm: '-1.14px' },
                    color: '#333333',
                    '& b': {
                      fontWeight: 700,
                    },
                  }}
                >
                  Personalized career path projection for <b>FirstName</b>
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              height: { xs: '70vh', sm: '80vh', md: '90vh' },
              width: '100%',
              mb: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView={false}>
              <Background />
              <Controls />
            </ReactFlow>
          </Box>

          <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 3, md: 4 } }}>
            <Button
              size={isMdUp ? 'medium' : 'small'}
              sx={{
                borderRadius: 5,
                px: { xs: 3, sm: 4 },
                bgcolor: 'primary.main',
                color: '#fff',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              Show job match
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
