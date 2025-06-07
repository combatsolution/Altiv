import React from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
  Chip,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import DataObjectIcon from '@mui/icons-material/DataObject';
import AttributionIcon from '@mui/icons-material/Attribution';

const AttributionsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const attributionData = {
    title: "Data Sources & Acknowledgments",
    sections: [
      {
        title: "Economic Impact Analysis",
        icon: <ScienceIcon color="primary" />,
        description: "Our AI Career Impact Assessment feature incorporates data from:",
        items: [
          {
            title: "Primary Dataset",
            content: (
              <>
                <Typography component="span">
                  &quot;EconomicIndex&quot;    by Anthropic - MIT License
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Link 
                    href="https://huggingface.co/datasets/Anthropic/EconomicIndex/tree/main/release_2025_02_10" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    sx={{ display: 'inline-flex', alignItems: 'center' }}
                  >
                    <DataObjectIcon sx={{ mr: 1, fontSize: '1rem' }} />
                    View Dataset Source
                  </Link>
                </Box>
              </>
            )
          },
          {
            title: "Dataset Components Used",
            content: (
              <List dense sx={{ pl: 2 }}>
                {[
                  "SOC Structure Analysis",
                  "Automation vs Augmentation Patterns",
                  "ONET Task Mappings",
                  "Employment Data"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0, pl: 0 }}>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>
            )
          },
          {
            title: "Proprietary Enhancements",
            content: (
              <List dense sx={{ pl: 2 }}>
                {[
                  "AI Impact Assessment Models",
                  "Career Trajectory Analysis",
                  "Skill Evolution Frameworks",
                  "Industry-specific Augmentation Patterns"
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0, pl: 0 }}>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>
            )
          }
        ]
      }
    ],
    footer: "We're committed to transparency in our data sources and methodologies. All third-party data is used in accordance with its licensing terms."
  };

  return (
    <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6 }}>
      <Paper elevation={isMobile ? 0 : 1} sx={{ p: isMobile ? 2 : 4, borderRadius: 2 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 4
        }}>
          <AttributionIcon color="primary" sx={{ fontSize: '2.5rem', mr: 2 }} />
          <Typography 
            variant="h3" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              fontSize: isMobile ? '1.8rem' : '2.2rem'
            }}
          >
            {attributionData.title}
          </Typography>
        </Box>

        {/* Main Content */}
        {attributionData.sections.map((section, sectionIndex) => (
          <Box key={sectionIndex} sx={{ mb: 6 }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 3
            }}>
              <Divider sx={{ flexGrow: 1 }} />
              <Chip 
                label={section.title} 
                icon={section.icon}
                sx={{ 
                  mx: 2, 
                  px: 2,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  fontWeight: 600,
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText'
                }} 
              />
              <Divider sx={{ flexGrow: 1 }} />
            </Box>

            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {section.description}
            </Typography>

            {section.items.map((item, itemIndex) => (
              <Box key={itemIndex} sx={{ mb: 4 }}>
                <Typography 
                  variant="h6" 
                  component="h3"
                  sx={{ 
                    fontWeight: 600,
                    mb: 1,
                    color: 'text.secondary'
                  }}
                >
                  {item.title}
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {typeof item.content === 'string' ? (
                    <Typography variant="body1">{item.content}</Typography>
                  ) : (
                    item.content
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        ))}

        {/* Footer */}
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            mt: 4,
            fontStyle: 'italic',
            color: 'text.secondary'
          }}
        >
          {attributionData.footer}
        </Typography>
      </Paper>
    </Container>
  );
};

export default AttributionsPage;