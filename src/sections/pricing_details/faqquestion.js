  // import { m } from 'framer-motion';
  // import { useTheme } from '@mui/material/styles';
  // import Container from '@mui/material/Container';
  // import Typography from '@mui/material/Typography';
  // import Accordion from '@mui/material/Accordion';
  // import AccordionSummary from '@mui/material/AccordionSummary';
  // import AccordionDetails from '@mui/material/AccordionDetails';
  // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  // import Box from '@mui/material/Box';
  // import { MotionViewport, varFade } from 'src/components/animate';

  // const FAQS = [
  //   {
  //     question: "Module 1 – AI Fundamentals   for Marketers",
  //     answer: "LLM basics & prompt patterns, Ethical guard-rails & policy",
  //   },

  //   {
  //     question: "Module 2 – Content Creation Automation",
  //     answer: " Ad copy & blog drafts with ChatGPT, Visuals with Midjourney & Canva",

  //   },
  //   {
  //     question: "Module 3 – Analytics & Personalisation",
  //     answer: " AI segmentation & predictive scores, Dashboards in Looker Studio",

  //   },
  //   {
  //     question: "Module 4 – Capstone & Certification",
  //     answer: "End-to-end campaign using ≥2 AI tools, Live demo & feedback",
  //   }
  // ];

  // export default function FAQSection() {
  //   const theme = useTheme();

  //   return (
  //     <Container
  //       component={MotionViewport}
  //       sx={{
  //         py: { xs: 8, md: 12 },
  //         maxWidth: { xs: '100% !important', md: '1000px !important' }, // increased size
  //       }}
  //     >
  //       <Box sx={{ textAlign: 'center', mb: 4 }}>
  //         <Typography
  //           variant="h3"
  //           sx={{
  //             fontWeight: 'bold',
  //             color: theme.palette.primary.dark,
  //             mb: 1,
  //             fontSize: { xs: '1.5rem', md: '2rem' }
  //           }}
  //         >
  //           Program modules

  //         </Typography>
  //         <Typography
  //           sx={{
  //             color: theme.palette.text.secondary,
  //             fontSize: '1rem',
  //             mb: 2
  //           }}
  //         >
  //           Get answers to common questions about government bond investments.
  //         </Typography>
  //       </Box>

  //       {FAQS.map((faq, idx) => (
  //         <Accordion
  //           key={faq.question}
  //           sx={{
  //             mb: 2,
  //             boxShadow: 'none',
  //             border: '1px solid #eee',
  //             borderRadius: 1,
  //             '&:before': { display: 'none' },
  //             width: '100%' // let it take full width of container
  //           }}
  //         >
  //           <AccordionSummary
  //             expandIcon={<ExpandMoreIcon />}
  //             aria-controls={`faq-content-${idx}`}
  //             id={`faq-header-${idx}`}
  //             sx={{
  //               '& .MuiAccordionSummary-content': { my: 0.5 }
  //             }}
  //           >
  //             <Typography sx={{ fontWeight: 500, fontSize: '1rem' }}>
  //               {faq.question}
  //             </Typography>
  //           </AccordionSummary>
  //           <AccordionDetails sx={{ bgcolor: '#fafbfc' }}>
  //             <Box>
  //               {faq.answer.split(',').map((line, i) => (
  //                 <Typography
  //                   key={i} sx={{ color: theme.palette.text.secondary, fontSize: '0.98rem' }}>
  //                   {line.trim()}
  //                 </Typography>))}
  //             </Box>
  //           </AccordionDetails>
  //         </Accordion>
  //       ))}
  //     </Container>
  //   );
  // }


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

export default function FAQSection({ programModules = [] }) {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 8, md: 12 },
        maxWidth: { xs: '100% !important', md: '1000px !important' },
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
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

      {console.log("sfb",programModules)}
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
FAQSection.propTypes = {
  programModules: PropTypes.array,
};
