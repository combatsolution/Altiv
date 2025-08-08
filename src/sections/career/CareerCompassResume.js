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
} from '@mui/material';
import { FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { m, AnimatePresence } from 'framer-motion';
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

const nodeTypes = {
  career: ({ data }) => (
    <AnimatePresence>
      <m.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4 }}
        role="button"
        tabIndex={0}
        onClick={data.onClick}
        onKeyDown={(e) => e.key === 'Enter' && data.onClick?.()}
        style={{ width: 300, position: 'relative', cursor: 'pointer', zIndex: 2 }}
      >
        <Handle type="target" position={Position.Left} style={{ background: '#1976d2' }} />
        <CareerCard {...data} />
        <Handle type="source" position={Position.Right} style={{ background: '#1976d2' }} />
      </m.div>
    </AnimatePresence>
  ),
  label: ({ data }) => (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        padding: 10,
        background: '#1976d2',
        color: '#fff',
        borderRadius: '20px',
        fontSize: 12,
        textAlign: 'center',
        width: 100,
        whiteSpace: 'pre-line',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {data.label}
    </m.div>
  ),
};

export default function CareerPathProjection() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const [jobTitle, setJobTitle] = useState('Lead Data Scientist');
  const [expYears, setExpYears] = useState(5);
  const [userStartedWith, setUserStartedWith] = useState(null);
  const navigate = useNavigate();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [expanded, setExpanded] = useState(new Set());
  const [initialized, setInitialized] = useState(false);

  const handleExpand = useCallback(
    (parentId, level) => {
      setNodes((prevNodes) => {
        const parentNode = prevNodes.find((n) => n.id === parentId);
        if (!parentNode || expanded.has(parentId)) return prevNodes;

        setExpanded((prev) => new Set(prev).add(parentId));

        const children = mockData[level] || [];
        const levelMap = {
          next: { y: 300, label: 'Next Level\n(2-4 yrs)', id: 'label-next' },
          executive: { y: 600, label: 'Executive Level', id: 'label-executive' },
        };
        const { y, label, id: labelId } = levelMap[level] || {};

        const newNodes = [];
        const newEdges = [];

        if (y !== undefined && !prevNodes.find((n) => n.id === labelId)) {
          newNodes.push({
            id: labelId,
            type: 'label',
            data: { label },
            position: { x: 0, y },
            draggable: false,
          });
        }

        const HORIZONTAL_SPACING = 400;
        const BASE_OFFSET = -150;

        children.forEach((child, index) => {
          const nodeId = `${parentId}-${level}-${index}-${Date.now()}`;
          newNodes.push({
            id: nodeId,
            type: 'career',
            data: {
              ...child,
              onClick: () => {
                if (level === 'next') {
                  handleExpand(nodeId, 'executive');
                }
              },
            },
            position: {
              x: parentNode.position.x + BASE_OFFSET + index * HORIZONTAL_SPACING,
              y,
            },
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
          });

          newEdges.push({
            id: `edge-${parentId}-${nodeId}-${Date.now()}`,
            source: parentId,
            target: nodeId,
            animated: true,
          });
        });

        setEdges((prevEdges) => [
          ...prevEdges,
          ...newEdges.filter(
            (newEdge) =>
              !prevEdges.some(
                (edge) => edge.source === newEdge.source && edge.target === newEdge.target
              )
          ),
        ]);

        return [
          ...prevNodes,
          ...newNodes.filter((newNode) => !prevNodes.some((node) => node.id === newNode.id)),
        ];
      });
    },
    [expanded]
  );

  const initializeNodes = useCallback(() => {
    const initialNodes = [
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
          onClick: () => handleExpand('current-node', 'next'),
        },
        position: { x: 150, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      },
    ];
    setNodes(initialNodes);
    setInitialized(true);
  }, [handleExpand]);

  useEffect(() => {
    const startedWith = sessionStorage.getItem('userStartedWith');
    setUserStartedWith(startedWith);
    if (!initialized) initializeNodes();
  }, [initializeNodes, initialized]);

  return (
    <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3 } }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {userStartedWith === 'job' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button variant="outlined">Upload resume to unlock your potential</Button>
          </Box>
        )}

        <Box sx={{ bgcolor: 'white', p: { xs: 2, sm: 3, md: 4 } }}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 1 }}
          >
            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FaClipboardList size={16} />
              <Box sx={{ minWidth: 450, borderBottom: '1px solid #ccc', pb: 0.5 }}>
                <Typography variant="body2" color="text.primary" sx={{ px: 1, py: 0.5 }}>
                  {jobTitle}
                </Typography>
              </Box>
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
          </Grid>
        </Box>

        <Box sx={{ height: '90vh', width: '100%', mb: 4 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            key={`flow-${nodes.length}-${edges.length}`}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            sx={{
              borderRadius: 5,
              px: 4,
              bgcolor: 'primary.main',
              color: '#fff',
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
