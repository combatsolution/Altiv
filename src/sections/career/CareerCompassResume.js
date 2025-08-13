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
import ReactFlow, { Background, Controls, MiniMap, Handle, Position } from 'reactflow';
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
  const [expanded, setExpanded] = useState(new Set());
  const [initialized, setInitialized] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const nodeTypes = {
    career: ({ data, id }) => {
      const { isNew, onClick } = data;
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setSelectedNodeId(id);
            onClick?.();
          }}
          onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
          style={{ width: 300, position: 'relative', cursor: 'pointer', zIndex: 2 }}
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
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ duration: 0.6 }}
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
      </m.div>
    ),
  };

  /**
   * Helpers
   */

  // get all descendant node ids for a given parentId from a node list
  const getDescendantNodeIds = (nodeList, parentId) => {
    // descendants are nodes whose id starts with `${parentId}-`
    const directAndIndirect = nodeList
      .filter((n) => n.id.startsWith(`${parentId}-`))
      .map((n) => n.id);
    return directAndIndirect;
  };

  // remove nodes and edges by node ids
  const removeNodesAndEdgesByIds = (nodeIdsToRemove) => {
    setNodes((prev) => prev.filter((n) => !nodeIdsToRemove.includes(n.id)));
    setEdges((prev) =>
      prev.filter((e) => !nodeIdsToRemove.includes(e.source) && !nodeIdsToRemove.includes(e.target))
    );
  };

  const handleExpand = useCallback(
    (parentId, level) => {
      setNodes((prevNodes) => {
        const parentNode = prevNodes.find((n) => n.id === parentId);
        if (!parentNode) return prevNodes;

        // If already expanded, perform collapse: remove all descendants recursively
        if (expanded.has(parentId)) {
          // remove expanded state for parent and any descendants
          setExpanded((prev) => {
            const next = new Set(prev);
            next.delete(parentId);

            // also remove any descendant ids from expanded set
            const descendants = getDescendantNodeIds(prevNodes, parentId);
            descendants.forEach((d) => next.delete(d));
            return next;
          });

          // Remove all descendant nodes and their edges
          const descendants = getDescendantNodeIds(prevNodes, parentId);
          if (descendants.length) {
            setEdges((prevEdges) =>
              prevEdges.filter(
                (edge) => !descendants.includes(edge.source) && !descendants.includes(edge.target)
              )
            );
            return prevNodes.filter((n) => !descendants.includes(n.id));
          }
          return prevNodes;
        }

        // Otherwise, expand:
        // 1) mark parent as expanded
        setExpanded((prev) => new Set(prev).add(parentId));

        const children = mockData[level] || [];
        const levelMap = {
          next: {
            y: isMdUp ? 300 : 200,
            label: 'Next Level\n(2-4 yrs)',
            id: 'label-next',
          },
          executive: {
            y: isMdUp ? 600 : 400,
            label: 'Executive Level',
            id: 'label-executive',
          },
        };
        const { y, label, id: labelId } = levelMap[level] || {};

        // 2) remove children that belong to OTHER nodes at this same level
        //    Keep label nodes; remove any node whose id contains `-${level}-` but does not start with `${parentId}-`
        const nodesToRemove = prevNodes
          .filter(
            (n) =>
              n.type !== 'label' &&
              n.id.includes(`-${level}-`) &&
              !n.id.startsWith(`${parentId}-${level}-`)
          )
          .map((n) => n.id);

        // Also remove any descendants of those nodes (their grandchildren) for a full cleanup
        const extraDescendants = prevNodes
          .filter((n) => nodesToRemove.some((rid) => n.id.startsWith(`${rid}-`)))
          .map((n) => n.id);

        const allToRemove = Array.from(new Set([...nodesToRemove, ...extraDescendants]));

        // filter nodes first to compute an updated nodes list without other-level children
        const filteredNodes = prevNodes.filter((n) => !allToRemove.includes(n.id));

        // remove edges pointing to removed nodes
        setEdges((prevEdges) =>
          prevEdges.filter(
            (e) => !allToRemove.includes(e.source) && !allToRemove.includes(e.target)
          )
        );

        // 3) Prepare new nodes & edges to add for this parent
        const newNodes = [];
        const newEdges = [];

        if (y !== undefined && !filteredNodes.find((n) => n.id === labelId)) {
          newNodes.push({
            id: labelId,
            type: 'label',
            data: { label },
            position: { x: 0, y },
            draggable: false,
          });
        }

        const HORIZONTAL_SPACING = isMdUp ? 400 : 280;
        const BASE_OFFSET = isMdUp ? 150 : 100;

        children.forEach((child, index) => {
          // create deterministic-ish id using parentId, level, and index + timestamp to avoid collisions
          const nodeId = `${parentId}-${level}-${index}-${Date.now()}`;
          newNodes.push({
            id: nodeId,
            type: 'career',
            data: {
              ...child,
              isNew: true,
              // clicking a node in "next" expands its "executive" children
              onClick: () => {
                if (level === 'next') {
                  handleExpand(nodeId, 'executive');
                } else {
                  // if clicked on executive or deeper, you can implement further behavior
                }
              },
            },
            position: {
              x: parentNode.position.x + BASE_OFFSET + index * HORIZONTAL_SPACING,
              y,
            },
            sourcePosition: Position.Top,
            targetPosition: Position.Bottom,
          });

          newEdges.push({
            id: `edge-${parentId}-${nodeId}-${Date.now()}`,
            source: parentId,
            target: nodeId,
            animated: false,
            type: 'smoothstep',
          });
        });

        // 4) Merge filteredNodes + newNodes (avoid duplicates)
        const mergedNodes = [
          ...filteredNodes,
          ...newNodes.filter((newNode) => !filteredNodes.some((n) => n.id === newNode.id)),
        ];

        // 5) Add new edges to current edges (we already removed edges for other-level children earlier)
        setEdges((prevEdges) => [
          ...prevEdges,
          ...newEdges.filter(
            (ne) => !prevEdges.some((e) => e.source === ne.source && e.target === ne.target)
          ),
        ]);

        // 6) animate new nodes in (remove isNew after a short delay)
        setTimeout(() => {
          setNodes((prev) =>
            prev.map((node) =>
              node.data?.isNew ? { ...node, data: { ...node.data, isNew: false } } : node
            )
          );
        }, 500);

        return mergedNodes;
      });
    },
    [expanded, isMdUp]
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
          isNew: true,
          onClick: () => handleExpand('current-node', 'next'),
        },
        position: { x: isMdUp ? 150 : 100, y: 0 },
        sourcePosition: Position.Top,
        targetPosition: Position.Bottom,
      },
    ];

    setNodes(initialNodes);

    setTimeout(() => {
      setNodes((prev) =>
        prev.map((node) =>
          node.data?.isNew ? { ...node, data: { ...node.data, isNew: false } } : node
        )
      );
    }, 500);

    setInitialized(true);
  }, [handleExpand, isMdUp]);

  useEffect(() => {
    const startedWith = sessionStorage.getItem('userStartedWith');
    setUserStartedWith(startedWith);
    if (!initialized) initializeNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializeNodes, initialized]);

  // Dynamically color edges based on selected node
  const styledEdges = edges.map((edge) => ({
    ...edge,
    type: 'bezier', // smoother than smoothstep
    style: {
      stroke: edge.source === selectedNodeId || edge.target === selectedNodeId ? '#1976d2' : '#999',
      strokeWidth: 4, // thicker lines
    },
  }));

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
          {/* Desktop */}
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
                <Typography
                  color="#333333"
                  sx={{
                    fontWeight: 400,
                    fontSize: '24px',
                  }}
                >
                  Personalized career path projection for <b>FirstName</b>
                </Typography>
              </Box>
            </Grid>
          ) : (
            // Mobile
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
                <Typography
                  color="#333333"
                  sx={{
                    fontWeight: 400,
                    fontSize: '18px',
                  }}
                >
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
          <ReactFlow
            nodes={nodes}
            edges={styledEdges}
            nodeTypes={nodeTypes}
            fitView
            key={`flow-${nodes.length}-${edges.length}`}
            fitViewOptions={{
              padding: isMdUp ? 0.1 : 0.2,
              minZoom: isMdUp ? 0.5 : 0.3,
              maxZoom: isMdUp ? 2 : 1.5,
            }}
          >
            <Background />
            <Controls />
            <MiniMap
              style={{
                width: isMdUp ? 200 : 120,
                height: isMdUp ? 150 : 90,
              }}
            />
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
