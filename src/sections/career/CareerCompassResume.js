import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
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
import ReactFlow, { Background, Handle, Position, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { m } from 'framer-motion';
import axiosInstance from 'src/utils/axios';
import CareerCard from './CareerCard';

const transformApiData = (apiData) => {
  if (!apiData) return null;

  const current = {
    id: 'current-node',
    title: apiData.currentRole.title,
    match: apiData.currentRole.match_percentage ?? 0,
    rate: apiData.currentRole.transition_rate || 'N/A',
    salary: apiData.currentRole.salary_range || 'N/A',
    experience: apiData.currentRole.experience_range || 'N/A',
    children: [],
  };

  const next = [];
  const executive = [];

  // Flatten levels into sequential "next" nodes
  let nextIndex = 0;
  Object.entries(apiData.levels || {}).forEach(([timeline, roles]) => {
    roles.forEach((role) => {
      const nextId = `next-${nextIndex}`;
      current.children.push(nextId);

      next.push({
        id: nextId,
        title: role.title,
        match: role.match_percentage ?? 0,
        rate: role.transition_rate || 'N/A',
        salary: role.salary_range || 'N/A',
        experience: role.experience_range || 'N/A',
        parent: current.id,
        children: [], // executives (future expansion if backend provides)
      });

      nextIndex += 1;
    });
  });

  return { current, next, executive };
};

export default function CareerPathProjection({ isResume, job, experience }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [showReactFlow, setShowReactFlow] = useState(false);
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Show React Flow if job and experience are provided or if isResume is true
  useEffect(() => {
    if (isResume || (job && experience)) {
      setShowReactFlow(true);
    }
  }, [isResume, job, experience]);

  // Show swipe hint on mobile after component mounts
  useEffect(() => {
    if (isMobile) {
      // const hasSwipedBefore = localStorage.getItem('hasSwiped');
      setShowSwipeHint(true);
    }
  }, [isMobile]);

  const handleSwipe = useCallback(() => {
    if (showSwipeHint) {
      setShowSwipeHint(false);
      localStorage.setItem('hasSwiped', 'true');
    }
  }, [showSwipeHint]);

  // Close hint on any interaction with the flow
  useEffect(() => {
    const handleInteraction = () => {
      if (showSwipeHint) {
        setShowSwipeHint(false);
      }
    };

    const flowPane = document.querySelector('.react-flow__pane');
    if (flowPane) {
      flowPane.addEventListener('click', handleInteraction);
      flowPane.addEventListener('touchstart', handleInteraction);
    }

    return () => {
      if (flowPane) {
        flowPane.removeEventListener('click', handleInteraction);
        flowPane.removeEventListener('touchstart', handleInteraction);
      }
    };
  }, [showSwipeHint]);

  const [jobTitle, setJobTitle] = useState(sessionStorage.getItem("designation"));
  const [expYears, setExpYears] = useState(sessionStorage.getItem("experience"));
  const [reusmeId, setResumeId] = useState(sessionStorage.getItem("resumeId"));

  const [errors, setErrors] = useState({
    jobTitle: '',
    expYears: '',
  });
  const jobTitles = [
    'Software Engineer',
    'Senior Software Engineer',
    'Lead Developer',
    'Engineering Manager',
    'Technical Lead',
    'Data Scientist',
  ];
  const [userStartedWith, setUserStartedWith] = useState(null);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState({
    current: null,
    next: null,
    executive: null,
  });

  // Track collapsed state - all nodes are expanded by default
  const [collapsedNodes, setCollapsedNodes] = useState(new Set());

  // Memoize isNodeCollapsed to prevent unnecessary recalculations
  const isNodeCollapsed = useCallback((nodeId) => collapsedNodes.has(nodeId), [collapsedNodes]);

  // Toggle node expansion
  const toggleNodeExpansion = (nodeId) => {
    setCollapsedNodes((prev) => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(nodeId)) {
        newCollapsed.delete(nodeId);
      } else {
        newCollapsed.add(nodeId);
      }
      return newCollapsed;
    });
  };

  const storedJob = sessionStorage.getItem("designation");
  const storedExp = sessionStorage.getItem("experience");
  const storedResumeId = sessionStorage.getItem("resumeId");
  const handleModify = useCallback(async (title, years, resumeId) => {
    if (!resumeId) {
      const newErrors = {
        jobTitle: !title ? 'Please select a job title' : '',
        expYears: !years ? 'Please select years of experience' : '',
      };
      setErrors(newErrors);

      if (!newErrors.jobTitle && !newErrors.expYears) {
        try {
          setLoading(true);
          const payload = {
            designation: title,
            experience: Number(years),
          };

          const res = await axiosInstance.post('/career-compass', payload);
          const mapped = transformApiData(res.data?.data);
          console.log("sasasa", res);
          setCareerData(mapped);

          setShowReactFlow(true);
        } catch (err) {
          console.error('Error fetching career compass:', err);
        } finally {
          setLoading(false);
        }
      }
    } else {
      try {
        setLoading(true);
        const payload = {
          resumeId: Number(resumeId)
        };

        const res = await axiosInstance.post('/career-compass', payload);
        const mapped = transformApiData(res.data?.data);
        console.log("sasasa", res);
        setCareerData(mapped);

        setShowReactFlow(true);
      } catch (err) {
        console.error('Error fetching career compass:', err);
      } finally {
        setLoading(false);
      }
    }
  }, []); // dependencies used inside the function
  // Build edges dynamically
  useEffect(() => {
    if (storedJob && storedExp) {
      setJobTitle(storedJob);
      setExpYears(storedExp);
      setResumeId(storedResumeId);
      // Run modify logic once on mount
      handleModify(storedJob, storedExp, storedResumeId);

      sessionStorage.removeItem('designation');
      sessionStorage.removeItem('experience');
      sessionStorage.removeItem('resumeId');
      sessionStorage.removeItem('userStartedWith');

    }

    if (storedResumeId) {
      setJobTitle(storedJob);
      setExpYears(storedExp);
      setResumeId(storedResumeId);
      handleModify(storedJob, storedExp, storedResumeId);

      sessionStorage.removeItem('designation');
      sessionStorage.removeItem('experience');
      sessionStorage.removeItem('resumeId');
      sessionStorage.removeItem('userStartedWith');
    }
  }, [handleModify, storedJob, storedExp, storedResumeId]);


  const rebuildEdges = useCallback((selected) => {
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
    careerData?.current.children.forEach((childId) => {
      console.log("=agasha->", careerData);
      const isActive =
        selected.next === childId || (selected.executive && careerData.executive.some((e) => e.parent === childId && selected.executive === e.id));

      newEdges.push({
        id: `edge-${careerData.current.id}-${childId}`,
        source: careerData.current.id,
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
    careerData?.next.forEach((nextNode) => {
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
  }, [careerData]);

  // Check if a node should be visible based on its parent's expanded state
  const isNodeVisible = useCallback(
    (node) => {
      // Always show current node and labels
      if (node.id === 'current-node' || node.id.startsWith('label-')) return true;

      // For next level nodes, check if top level is expanded
      if (node.id.startsWith('next-')) {
        return !isNodeCollapsed('current-node');
      }

      // For executive level nodes
      if (node.id.startsWith('exec-')) {
        // If top level is collapsed, hide all executive nodes
        if (isNodeCollapsed('current-node')) return false;

        // Find the parent node in the next level
        const parentNode = careerData?.next.find((n) => n.children?.includes(node.id));
        if (!parentNode) return true;

        // If parent (next-level node) is collapsed, hide this node
        return !isNodeCollapsed(parentNode.id);
      }

      return true;
    },
    [isNodeCollapsed, careerData?.next]
  );

  const nodeTypes = {
    career: ({ data, id }) => {
      const { isNew, onClick } = data;
      const isSelected =
        selectedNodes.current === id || selectedNodes.next === id || selectedNodes.executive === id;
      const isVisible = isNodeVisible({ id });
      const hasChildren = id === 'current-node' || id.startsWith('next-');
      const isExpanded = !isNodeCollapsed(id);

      return (
        <div
          role="button"
          tabIndex={0}
          onClick={() => onClick?.(id)}
          onKeyDown={(e) => e.key === 'Enter' && onClick?.(id)}
          style={{
            width: isMdUp ? 360 : 260,
            height: 127,
            position: 'relative',
            cursor: 'grab',
            zIndex: 2,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: isVisible ? 'auto' : 'none',
          }}
        >
          <Handle type="target" position={Position.Top} style={{ background: '#1976d2' }} />
          {isNew ? (
            <m.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{ pointerEvents: 'auto' }}
            >
              <CareerCard
                {...data}
                isSelected={isSelected}
                showExpandButton={hasChildren}
                isExpanded={isExpanded}
                onExpandToggle={(e) => {
                  e?.stopPropagation();
                  toggleNodeExpansion(id);
                }}
              />
            </m.div>
          ) : (
            <div style={{ pointerEvents: 'auto' }}>
              <CareerCard
                {...data}
                isSelected={isSelected}
                showExpandButton={hasChildren}
                isExpanded={isExpanded}
                onExpandToggle={(e) => {
                  e?.stopPropagation();
                  toggleNodeExpansion(id);
                }}
              />
            </div>
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
    (nodeList) => nodeList.filter((node) => isNodeVisible(node)),
    [isNodeVisible]
  );

  // Generate all nodes
  const generateAllNodes = useCallback(() => {
    if (!careerData) return [];

    const handleNodeClick = (id, level) => {
      setSelectedNodes((prev) => {
        let updated = { ...prev };

        if (level === 'current') {
          // When clicking current, clear all selections
          updated = { current: id, next: null, executive: null };
        } else if (level === 'next') {
          // When clicking next level, ensure current is selected and clear executive
          updated = {
            current: careerData.current.id,
            next: id,
            executive: null,
          };
        } else if (level === 'executive') {
          // When clicking executive, find and set its parent next level and current
          const executiveNode = careerData.executive.find((node) => node.id === id);
          if (executiveNode) {
            updated = {
              current: careerData.current.id,
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
        id: careerData.current.id,
        type: 'career',
        data: {
          ...careerData.current,
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

    const nextNodes = careerData.next.map((child, index) => ({
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

    const executiveNodes = careerData.executive.map((child, index) => ({
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
  }, [careerData, isMdUp, filterNodesByExpandedState, rebuildEdges]);

  useEffect(() => {
    const startedWith = sessionStorage.getItem('userStartedWith');
    setUserStartedWith(startedWith);

    const generatedNodes = generateAllNodes();
    setNodes(generatedNodes);

    // instead of only label edges, build full edges set
    rebuildEdges(selectedNodes);
  }, [generateAllNodes, selectedNodes, rebuildEdges]);




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
                    <Box sx={{ width: '100%' }}>
                      <Select
                        fullWidth
                        size="small"
                        value={jobTitle}
                        displayEmpty
                        onChange={(e) => {
                          setJobTitle(e.target.value);
                          if (errors.jobTitle) {
                            setErrors((prev) => ({ ...prev, jobTitle: '' }));
                          }
                        }}
                        variant="standard"
                        error={!!errors.jobTitle}
                        renderValue={(selected) => {
                          if (!selected) {
                            return <span style={{ color: '#7C8DB5' }}>Select job title</span>;
                          }
                          return selected;
                        }}
                        sx={{
                          '&:before': {
                            borderBottom: errors.jobTitle
                              ? '1px solid #FF4D4F'
                              : '1px solid #D6DDEB',
                          },
                          '&:after': {
                            borderBottom: errors.jobTitle
                              ? '1px solid #FF4D4F'
                              : '1px solid #D6DDEB',
                          },
                          '& .MuiSelect-select': {
                            fontWeight: 400,
                            fontSize: '16px',
                            lineHeight: '160%',
                            letterSpacing: '0%',
                            color: errors.jobTitle ? '#FF4D4F' : '#25324B',
                            padding: '8px 0 4px',
                          },
                        }}
                      >
                        {jobTitles.map((title) => (
                          <MenuItem key={title} value={title}>
                            {title}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.jobTitle && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ display: 'block', mt: 0.5, fontSize: '12px' }}
                        >
                          {errors.jobTitle}
                        </Typography>
                      )}
                    </Box>
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
                  {console.log("sdsddsdsdssd", expYears)}
                  <Box sx={{ width: '100%' }}>
                    <Select
                      fullWidth
                      size="small"
                      value={expYears}
                      displayEmpty
                      onChange={(e) => {
                        setExpYears(e.target.value);
                        if (errors.expYears) {
                          setErrors((prev) => ({ ...prev, expYears: '' }));
                        }
                      }}
                      variant="standard"
                      error={!!errors.expYears}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#7C8DB5' }}>Select years</span>;
                        }
                        return `${selected} Years`;
                      }}
                      sx={{
                        '&:before': {
                          borderBottom: errors.expYears ? '1px solid #FF4D4F' : '1px solid #D6DDEB',
                        },
                        '&:after': {
                          borderBottom: errors.expYears ? '1px solid #FF4D4F' : '1px solid #D6DDEB',
                        },
                        '& .MuiSelect-select': {
                          fontWeight: 400,
                          fontSize: '16px',
                          lineHeight: '160%',
                          letterSpacing: '0%',
                          color: errors.expYears ? '#FF4D4F' : '#25324B',
                          padding: '8px 0 4px',
                        },
                      }}
                    >
                      <MenuItem value={5}>5 Years</MenuItem>
                      <MenuItem value={10}>10 Years</MenuItem>
                      <MenuItem value={15}>15 Years</MenuItem>
                      <MenuItem value={20}>20 Years</MenuItem>
                      <MenuItem value={25}>25 Years</MenuItem>
                      <MenuItem value={30}>30 Years</MenuItem>
                    </Select>
                    {errors.expYears && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ display: 'block', mt: 0.5, fontSize: '12px' }}
                      >
                        {errors.expYears}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm="auto">
                <Button
                  variant="outlined"
                  onClick={() => handleModify(jobTitle, expYears)}
                  disabled={loading}
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
                  {loading ? 'Loading...' : 'Modify'}
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
                  Personalized career path projection for
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              height: { xs: '70vh', sm: '80vh', md: showReactFlow ? '90vh' : '50vh' },
              width: '100%',
              mb: { xs: 2, sm: 3, md: 4 },
              position: 'relative',
            }}
            onTouchStart={handleSwipe}
          >
            {showSwipeHint && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 16,
                  transform: 'translateY(-50%)',
                  // backgroundColor: 'rgba(0, 64, 216, 0.9)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.3 },
                    '100%': { opacity: 1 },
                  },
                }}
              >
                {/* <Typography variant="body2" sx={{ fontSize: '14px' }}>
                  Swipe right
                </Typography> */}
                <Box
                  component="img"
                  src="/assets/icons/careerCompass/swipe_right.png"
                  alt="swipe right"
                  sx={{
                    ml: 1,
                    width: '54px',
                    height: '54px',
                  }}
                />
              </Box>
            )}
            {showReactFlow ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                fitView={false}
                onPaneClick={handleSwipe}
                nodesDraggable={false}
                // nodesConnectable={false}
                // elementsSelectable={false}
                // panOnDrag={[0, 1, 2]} // Allow pan with left, right, and middle mouse buttons
                // panOnScroll
                // zoomOnScroll={!isMobile}
                // zoomOnPinch
                // preventScrolling={false}
                // defaultViewport={{ x: 0, y: 0, zoom: 1 }}
                // minZoom={0.5}
                // maxZoom={2}
                onNodeContextMenu={(e) => e.preventDefault()} // Prevent context menu on nodes
              >
                <Background />
                <Controls position="top-right" />
              </ReactFlow>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  p: 3,
                }}
              >
                <Typography variant="h6">
                  Select job and experience or upload your resume
                </Typography>
              </Box>
            )}
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

CareerPathProjection.propTypes = {
  isResume: PropTypes.bool,
  job: PropTypes.string,
  experience: PropTypes.number,
};