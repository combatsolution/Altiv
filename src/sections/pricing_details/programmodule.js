import { m } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { MotionViewport } from 'src/components/animate';
import Divider from '@mui/material/Divider';

export default function ProgramModule({ programModules = [] }) {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      
      sx={{
        my: { xs: 2, md: 3 },
        py: { xs: 2, md: 5 },
         maxWidth: '100%',
         width:'100%',
        backgroundColor: '#fff',
        boxShadow: 'none', // remove possible shadows
      }}
    >
         
         <Divider sx={{my:3, width:'100%'}}/>
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.dark,
            mb: 1,
            fontSize: { xs: '1.5rem', md: '2rem' },
          }}
        >
          Program Modules
        </Typography>
        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '1rem',
            mb: 2,
          }}
        >
          Explore the complete breakdown of the learning modules below.
        </Typography>
      </Box>

      {console.log("sfb", programModules)}
      {programModules.length > 0 ? (
        programModules.map((mod, idx) => (
          <Accordion
            key={mod.id || idx}
            sx={{
              mb: 2,
              boxShadow: 'none',
              border: '1px solid #eee',
              borderRadius: 1,
              '&:before': { display: 'none' },
              width: '100%',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq-content-${idx}`}
              id={`faq-header-${idx}`}
              sx={{
                '& .MuiAccordionSummary-content': { my: 0.5 },
              }}
            >
              <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
                {mod.moduleName}
              </Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ bgcolor: '#fafbfc' }}>
              <Box>
                {mod.modules?.map((topic, i) => (
                  <Typography
                    key={i}
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: '0.98rem',
                      display: 'flex',
                      alignItems: 'left',
                    }}
                  >
                    • {topic}
                  </Typography>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography
          sx={{
            color: theme.palette.text.secondary,
            textAlign: 'center',
            mt: 4,
          }}
        >
          🚫 No modules found for this course.
        </Typography>
      )}
    </Container>
  );
}

// ✅ Prop validation
ProgramModule.propTypes = {
  programModules: PropTypes.array,
};
