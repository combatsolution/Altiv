import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const Attributions = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 4 : 8 }}>
      <Paper elevation={3} sx={{ p: isMobile ? 3 : 5, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
            Data Sources & Acknowledgments
          </Typography>
        </Box>

        {/* Main Attribution Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <DescriptionIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Economic Impact Analysis
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Our AI Career Impact Assessment feature incorporates data from:
          </Typography>

          <List dense>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1">
                   <strong>Primary Dataset:</strong> &quot;EconomicIndex&quot; by Anthropic – MIT License (

                    <Link
                      href="https://huggingface.co/datasets/Anthropic/EconomicIndex/tree/main/release_2025_02_10"
                      target="_blank"
                      rel="noopener"
                      underline="hover"
                    >
                      View Dataset
                    </Link>
                    )
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Box>

        {/* Components Used Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FormatListBulletedIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Dataset Components Used
            </Typography>
          </Box>

          <List dense>
            {[
              'SOC Structure Analysis',
              'Automation vs Augmentation Patterns',
              'ONET Task Mappings', 
              'Employment Data',
            ].map((item, idx) => (
              <ListItem key={idx} sx={{ py: 0.5 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Proprietary Section */}
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            This data is combined with Altiv.AI is proprietary:
          </Typography>
          <List dense>
            {[
              'AI Impact Assessment Models',
              'Career Trajectory Analysis',
              'Skill Evolution Frameworks',
              'Industry-specific Augmentation Patterns',
            ].map((item, idx) => (
              <ListItem key={idx} sx={{ py: 0.5 }}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Container>
  );
};

export default Attributions;
