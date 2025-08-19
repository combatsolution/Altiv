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
import ReactFlow, { Background, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { m } from 'framer-motion';
import CareerCard from './CareerCard';

const mockData = {
  next: [
    {
      title: 'Senior Data Scientist',
      match: 80,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    },
    {
      title: 'Senior Data Scientist 1',
      match: 80,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
    },
  ],
  executive: [
    {
      title: 'Director Data Science',
      match: 74,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '10-15 years',
    },
    {
      title: 'VP Data Science',
      match: 72,
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

  const nodeTypes = {
    career: ({ data, id }) => {
      const { isNew, onClick } = data;
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={() => onClick?.()}
          onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
          style={{ width: 260, position: 'relative', cursor: 'pointer', zIndex: 2 }}
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
          background: '#1976d2',
          color: '#fff',
          borderRadius: '20px',
          fontSize: 12,
          textAlign: 'center',
          width: 100,
          whiteSpace: 'pre-line',
          zIndex: 9999,
          position: 'relative',
        }}
      >
        {data.label}
        {/* Hidden handles for edge connections */}
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
        <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      </m.div>
    ),
  };

  // 👇 Generate all nodes at once (current + next + executive)
  const generateAllNodes = useCallback(() => {
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
          onClick: () => connectEdges('current-node', 'next'),
        },
        position: { x: isMdUp ? 150 : 110, y: 0 },
        sourcePosition: Position.Top,
        targetPosition: Position.Bottom,
      },
      {
        id: 'label-next',
        type: 'label',
        data: { label: 'Next Level\n(2-4 yrs)' },
        position: { x: 0, y: isMdUp ? 300 : 200 },
        draggable: false,
      },
      {
        id: 'label-executive',
        type: 'label',
        data: { label: 'Executive Level' },
        position: { x: 0, y: isMdUp ? 600 : 400 },
        draggable: false,
      },
    ];

    // next-level nodes
    const nextNodes = mockData.next.map((child, index) => ({
      id: `current-node-next-${index}`,
      type: 'career',
      data: {
        ...child,
        isNew: false,
        onClick: () => connectEdges(`current-node-next-${index}`, 'executive'),
      },
      position: {
        x: (isMdUp ? 150 : 110) + index * (isMdUp ? 300 : 320),
        y: isMdUp ? 300 : 200,
      },
      sourcePosition: Position.Top,
      targetPosition: Position.Bottom,
    }));

    // executive-level nodes (not yet connected, only edges added on click)
    const executiveNodes = mockData.executive.flatMap((child, index) =>
      mockData.next.map((_, parentIndex) => ({
        id: `current-node-next-${parentIndex}-executive-${index}`,
        type: 'career',
        data: { ...child, isNew: false },
        position: {
          x:
            (isMdUp ? 150 : 110) +
            parentIndex * (isMdUp ? 300 : 320) +
            index * (isMdUp ? 300 : 320),
          y: isMdUp ? 600 : 400,
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

    // 👇 Add edges that connect the labels vertically
    const labelEdges = [
      {
        id: 'edge-label-current-next',
        source: 'label-current',
        target: 'label-next',
        type: 'straight',
        style: { stroke: '#E6EBF2', strokeWidth: 6 }, // dashed grey line
      },
      {
        id: 'edge-label-next-exec',
        source: 'label-next',
        target: 'label-executive',
        type: 'straight',
        style: { stroke: '#E6EBF2', strokeWidth: 6 },
      },
    ];

    setEdges(labelEdges);
  }, [generateAllNodes]);

  // 👇 only connect edges on click
  const connectEdges = (parentId, level) => {
    if (level === 'next') {
      const newEdges = mockData.next.map((_, index) => ({
        id: `edge-${parentId}-next-${index}`,
        source: parentId,
        target: `current-node-next-${index}`,
        type: 'bezier',
        animated: false,
        style: { stroke: '#1976d2', strokeWidth: 3 },
      }));
      setEdges((prev) => [...prev, ...newEdges]);
    }

    if (level === 'executive') {
      const newEdges = mockData.executive.map((_, index) => ({
        id: `edge-${parentId}-exec-${index}`,
        source: parentId,
        target: `${parentId}-executive-${index}`,
        type: 'bezier',
        animated: false,
        style: { stroke: '#1976d2', strokeWidth: 3 },
      }));
      setEdges((prev) => [...prev, ...newEdges]);
    }
  };

  return (
    <Box sx={{ bgcolor: 'white', p: { xs: 1, sm: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {userStartedWith === 'job' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="outlined"
              size={isMdUp ? 'medium' : 'small'}
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              Upload resume to unlock your potential
            </Button>
          </Box>
        )}

        <Box sx={{ bgcolor: 'white', p: { xs: 1, sm: 2, md: 4 } }}>
          {isMdUp ? (
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={2}
              sx={{ mb: 1 }}
            >
              <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaClipboardList size={16} />
                <Select
                  size="small"
                  value="Lead Data Scientist"
                  onChange={(e) => setExpYears(e.target.value)}
                  variant="standard"
                  sx={{ minWidth: 450 }}
                >
                  <MenuItem value={jobTitle}>{jobTitle}</MenuItem>
                </Select>
              </Grid>
              <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaClipboardList size={16} />
                <Select
                  size="small"
                  value={expYears}
                  onChange={(e) => setExpYears(e.target.value)}
                  variant="standard"
                  sx={{ minWidth: 450 }}
                >
                  <MenuItem value={5}>5 Years</MenuItem>
                </Select>
              </Grid>
              <Grid item>
                <Button variant="outlined" sx={{ borderRadius: '100px', px: 6 }}>
                  Modify
                </Button>
              </Grid>
              <Box sx={{ textAlign: 'center', mt: 4, mb: 0 }}>
                <Typography color="#333333" sx={{ fontWeight: 400, fontSize: '24px' }}>
                  Personalized career path projection for <b>FirstName</b>
                </Typography>
              </Box>
            </Grid>
          ) : (
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaClipboardList size={14} />
                <Select
                  size="small"
                  value="Lead Data Scientist"
                  onChange={(e) => setExpYears(e.target.value)}
                  variant="standard"
                  sx={{ flex: 1, minWidth: 0 }}
                >
                  <MenuItem value={jobTitle}>{jobTitle}</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FaClipboardList size={14} />
                <Select
                  size="small"
                  value={expYears}
                  onChange={(e) => setExpYears(e.target.value)}
                  variant="standard"
                  sx={{ flex: 1, minWidth: 0 }}
                >
                  <MenuItem value={5}>5 Years</MenuItem>
                </Select>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" size="small" sx={{ borderRadius: '100px', px: 4 }}>
                  Modify
                </Button>
              </Box>
              <Box sx={{ textAlign: 'center', mt: 4, mb: 0 }}>
                <Typography color="#333333" sx={{ fontWeight: 400, fontSize: '18px' }}>
                  Personalized career path projection for FirstName
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>

        <Box
          sx={{
            height: { xs: '70vh', sm: '80vh', md: '90vh' },
            width: '100%',
            mb: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView={false}>
            <Background />
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
  );
}
