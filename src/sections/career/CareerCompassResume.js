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
  current: {
    id: 'current-node',
    title: 'Lead Data Scientist',
    match: 95,
    rate: '18%',
    salary: '$50L - $55L',
    experience: '8-12 years',
    children: ['next-0', 'next-1'],
  },
  next: [
    {
      id: 'next-0',
      title: 'Senior Data Scientist',
      match: 50,
      rate: '18%',
      salary: '$50L - $55L',
      experience: '8-12 years',
      parent: 'current-node',
      children: ['exec-0', 'exec-1'],
    },
    {
      id: 'next-1',
      title: 'Principal Data Scientist',
      match: 45,
      rate: '15%',
      salary: '$55L - $60L',
      experience: '10-14 years',
      parent: 'current-node',
      children: ['exec-2'],
    },
  ],
  executive: [
    {
      id: 'exec-0',
      title: 'Director Data Science',
      match: 30,
      rate: '12%',
      salary: '$60L - $70L',
      experience: '12-16 years',
      parent: 'next-0',
    },
    {
      id: 'exec-1',
      title: 'VP Data Science',
      match: 25,
      rate: '10%',
      salary: '$70L - $90L',
      experience: '15+ years',
      parent: 'next-0',
    },
    {
      id: 'exec-2',
      title: 'Data Science',
      match: 25,
      rate: '10%',
      salary: '$70L - $90L',
      experience: '15+ years',
      parent: 'next-1',
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

  const [expandedCards, setExpandedCards] = useState({
    current: true,
    next: true,
    executive: true,
  });

  const toggleCardExpansion = (level) => {
    setExpandedCards((prev) => {
      // If collapsing the next level, also collapse the executive level
      if (level === 'next') {
        return {
          ...prev,
          next: !prev.next,
          executive: prev.next ? false : prev.executive,
        };
      }
      // If collapsing the current level, collapse both next and executive levels
      if (level === 'current') {
        return {
          ...prev,
          next: !prev.next,
          executive: false,
        };
      }
      // For executive level, just toggle its own state
      return {
        ...prev,
        [level]: !prev[level],
      };
    });
  };

  const nodeTypes = {
    career: ({ data, id }) => {
      const { isNew, onClick } = data;
      const isSelected =
        selectedNodes.current === id || selectedNodes.next === id || selectedNodes.executive === id;

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
            opacity:
              id === 'current-node' ||
              (id.startsWith('next-') && expandedCards.next) ||
              (id.startsWith('exec-') && expandedCards.executive)
                ? 1
                : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents:
              id === 'current-node' ||
              (id.startsWith('next-') && expandedCards.next) ||
              (id.startsWith('exec-') && expandedCards.executive)
                ? 'auto'
                : 'none',
          }}
        >
          <Handle type="target" position={Position.Top} style={{ background: '#1976d2' }} />
          {isNew ? (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {(() => {
                const getExpandedState = () => {
                  if (id === 'current-node') return expandedCards.current;
                  if (id.startsWith('next-')) return expandedCards.next;
                  return expandedCards.executive;
                };

                return (
                  <CareerCard
                    {...data}
                    isSelected={isSelected}
                    showExpandButton={id === 'current-node' || id.startsWith('next-')}
                    isExpanded={getExpandedState()}
                    onExpandToggle={() => {
                      if (id === 'current-node') toggleCardExpansion('next');
                      else if (id.startsWith('next-')) toggleCardExpansion('executive');
                    }}
                  />
                );
              })()}
            </m.div>
          ) : (
            (() => {
              const getExpandedState = () => {
                if (id === 'current-node') return expandedCards.current;
                if (id.startsWith('next-')) return expandedCards.next;
                return expandedCards.executive;
              };

              return (
                <CareerCard
                  {...data}
                  isSelected={isSelected}
                  showExpandButton={id === 'current-node' || id.startsWith('next-')}
                  isExpanded={getExpandedState()}
                  onExpandToggle={() => {
                    if (id === 'current-node') toggleCardExpansion('next');
                    else if (id.startsWith('next-')) toggleCardExpansion('executive');
                  }}
                />
              );
            })()
          )}
          <Handle type="source" position={Position.Bottom} style={{ background: '#1976d2' }} />
        </div>
      );
    },
    label: ({ data, id }) => {
      const isCurrentLevel = id === 'label-current' && selectedNodes.current;
      const isNextLevel = id === 'label-next' && selectedNodes.next;
      const isExecutiveLevel = id === 'label-executive' && selectedNodes.executive;
      const isActive = isCurrentLevel || isNextLevel || isExecutiveLevel;

      return (
        <m.div
          style={{
            padding: 10,
            background: isActive ? theme.palette.primary.main : '#fff',
            color: isActive ? '#fff' : '#000',
            border: `1px solid ${isActive ? theme.palette.primary.main : '#E6EBF2'}`,
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
            transition: 'all 0.3s ease',
            dropShadow: isActive ? '0px 0px 10px rgba(0, 0, 0, 0.5)' : 'none',
          }}
        >
          {data.label}
          <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
          <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
        </m.div>
      );
    },
  };

  // Filter nodes based on expanded state
  const filterNodesByExpandedState = useCallback(
    (nodeList) =>
      nodeList.filter((node) => {
        if (node.id === 'current-node') return true; // Always show current node
        if (node.id.startsWith('next-')) return expandedCards.next;
        if (node.id.startsWith('exec-')) return expandedCards.executive;
        return true; // Keep all other nodes (labels, etc.)
      }),
    [expandedCards]
  );

  // 👇 Generate all nodes
  const generateAllNodes = useCallback(() => {
    const handleNodeClick = (id, level) => {
      setSelectedNodes((prev) => {
        let updated = { ...prev };

        if (level === 'current') {
          // When clicking current, clear all selections
          updated = { current: id, next: null, executive: null };
        } else if (level === 'next') {
          // When clicking next level, ensure current is selected and clear executive
          updated = {
            current: mockData.current.id,
            next: id,
            executive: null,
          };
        } else if (level === 'executive') {
          // When clicking executive, find and set its parent next level and current
          const executiveNode = mockData.executive.find((node) => node.id === id);
          if (executiveNode) {
            updated = {
              current: mockData.current.id,
              next: executiveNode.parent,
              executive: id,
            };
          }
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
        id: mockData.current.id,
        type: 'career',
        data: {
          ...mockData.current,
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
      id: child.id,
      type: 'career',
      data: {
        ...child,
        isNew: false,
        onClick: (id) => handleNodeClick(id, 'next'),
      },
      position: {
        x: (isMdUp ? 150 : 80) + index * (isMdUp ? 400 : 300),
        y: isMdUp ? 200 : 200,
      },
      sourcePosition: Position.Top,
      targetPosition: Position.Bottom,
    }));

    const executiveNodes = mockData.executive.map((child, index) => ({
      id: child.id,
      type: 'career',
      data: {
        ...child,
        isNew: false,
        onClick: (id) => handleNodeClick(id, 'executive'),
      },
      position: {
        x: (isMdUp ? 150 : 80) + index * (isMdUp ? 400 : 300),
        y: isMdUp ? 400 : 400,
      },
      sourcePosition: Position.Top,
      targetPosition: Position.Bottom,
    }));

    const allNodes = [...baseNodes, ...nextNodes, ...executiveNodes];
    return filterNodesByExpandedState(allNodes);
  }, [isMdUp, filterNodesByExpandedState]);

  useEffect(() => {
    const startedWith = sessionStorage.getItem('userStartedWith');
    setUserStartedWith(startedWith);

    const generatedNodes = generateAllNodes();
    setNodes(generatedNodes);

    // instead of only label edges, build full edges set
    rebuildEdges(selectedNodes);
  }, [generateAllNodes, selectedNodes]);

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

    // Connect current node to its children
    mockData.current.children.forEach((childId) => {
      const isActive =
        selected.next === childId ||
        (selected.executive &&
          mockData.executive.some((e) => e.parent === childId && selected.executive === e.id));
      newEdges.push({
        id: `edge-${mockData.current.id}-${childId}`,
        source: mockData.current.id,
        target: childId,
        type: 'bezier',
        style: {
          stroke: isActive ? '#1976d2' : '#999',
          strokeWidth: isActive ? 3 : 1,
          opacity: isActive ? 1 : 0.6,
        },
      });
    });

    // Connect next level nodes to their executive children
    mockData.next.forEach((nextNode) => {
      if (nextNode.children) {
        nextNode.children.forEach((childId) => {
          const isActive = selected.next === nextNode.id && selected.executive === childId;
          newEdges.push({
            id: `edge-${nextNode.id}-${childId}`,
            source: nextNode.id,
            target: childId,
            type: 'bezier',
            style: {
              stroke: isActive ? '#1976d2' : '#999',
              strokeWidth: isActive ? 3 : 1,
              opacity: isActive ? 1 : 0.6,
            },
          });
        });
      }
    });

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
              <Controls position="top-right" />
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
