  // routes
  import { paths } from 'src/routes/paths';
  // config
  import { PATH_AFTER_LOGIN } from 'src/config-global';
  // components
  import Iconify from 'src/components/iconify';

  // ----------------------------------------------------------------------

  export const navConfig = [
    {
      title: 'FOBO',
      icon: <Iconify icon="solar:home-2-bold-duotone" />,
      path: paths.fobo,
    },
    {
      title: 'AI Career Coach',
    
      icon: <Iconify icon="solar:home-2-bold-duotone" />,
      path: `${paths.comingSoon}?type=ai`,
    },  
    {
      title: 'Programs',
      icon: <Iconify icon="solar:notebook-bold-duotone" />,
      path:`${paths.comingSoon}?type=program`,
      // paths.docs
    },
    { 
      title: 'Jobs',
      icon: <Iconify icon="solar:atom-bold-duotone" />,
      path:`${paths.comingSoon}?type=jobs`,
      // paths.components
    },
    {
      title: 'Analyze Your Resume',
      icon: <Iconify icon="solar:notebook-bold-duotone" />,
      path: `${paths.comingSoon}?type=analyze`,
      
    },
    
  ];
