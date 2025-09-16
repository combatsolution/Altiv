// routes
import { paths } from 'src/routes/paths';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  // {
  //   title: 'Career Compass',
  //   icon: <Iconify icon="solar:home-2-bold-duotone" />,
  //   path: paths.careerResume,
  // },

   {
    title: 'AI Career Coach',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    // path: paths.Analysis||`${paths.comingSoonWithType('Analysis')}`,
    path:'/',
  },
  
  { 
    title: 'FOBO',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: paths.fobo,
  },

 

  // {
  //   title: 'Programs',
  //   icon: <Iconify icon="solar:notebook-bold-duotone" />,
  //   path:`${paths.comingSoonWithType('program')}`,
  //   // paths.docs
  // },

  {
    title: 'Programs',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.pricing || paths.comingSoonWithType('program'),
  },
  {
    title: 'Jobs',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.jobFeed || paths.comingSoonWithType('jobs'),
    
    // paths.components
  },
  // {
  //   title: 'Analyze Your Resume',
  //   icon: <Iconify icon="solar:notebook-bold-duotone" />,
  //   path: `${paths.comingSoonWithType('analyze')}`,
  // },

   {
      title: 'Analyze Your Resume',
      icon: <Iconify icon="solar:notebook-bold-duotone" />,
      path: `${paths.fobo}?retry=true`,
      
    },
];
