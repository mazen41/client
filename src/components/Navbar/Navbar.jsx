import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, IconButton, useMediaQuery } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isArabic = i18n.language === 'ar';
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [hasShadow, setHasShadow] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    const handleScroll = () => {
      // Get the about section element
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        // Calculate when to add shadow (100px before reaching about section)
        const triggerPoint = aboutSection.offsetTop - 100;
        setHasShadow(window.scrollY > triggerPoint);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'services', path: '/services' },
    { key: 'why', path: '/why' }
  ];

  return (
    <AppBar 
      position="sticky"
      elevation={hasShadow ? 4 : 0}
      sx={{ 
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: hasShadow ? 'none' : '1px solid',
        borderColor: 'divider',
        py: 1,
        transition: 'all 0.3s ease',
        boxShadow: hasShadow ? '0px 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <Toolbar sx={{ 
        maxWidth: '1280px',
        width: '100%',
        mx: 'auto',
        px: { xs: 2, md: 4 },
      }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '120px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src="./logo2.png" 
              alt="NadaPay Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </motion.div>

          {!isMobile && (
            <Box sx={{ display: 'flex', ml: 4 }}>
              {navItems.map((item) => (
                <Button
                  key={item.key}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                >
                  {t(`navbar.${item.key}`)}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
                borderColor: 'primary.dark',
              },
            }}
          >
            {t('navbar.login')}
          </Button>
          
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
          >
            {t('navbar.register')}
          </Button>

          <IconButton
            onClick={() => changeLanguage(isArabic ? 'en' : 'ar')}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <LanguageIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
// import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { motion } from 'framer-motion';
// import { AppBar, Toolbar, Button, Box, IconButton, useMediaQuery } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import LanguageIcon from '@mui/icons-material/Language';

// const Navbar = () => {
//   const { t, i18n } = useTranslation();
//   const isArabic = i18n.language === 'ar';
//   const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//     document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
//   };

//   const navItems = ['products', 'solutions', 'developers', 'pricing'];

//   return (
//     <AppBar 
//       position="static"
//       elevation={0}
//       sx={{ 
//         background: 'linear-gradient(135deg, #6C63FF 0%, #4D8AF0 100%)',
//         color: 'white',
//         py: 1,
//         direction: isArabic ? 'rtl' : 'ltr'
//       }}
//     >
//       <Toolbar sx={{ justifyContent: 'space-between', maxWidth: 1280, mx: 'auto', width: '100%' }}>
//         {/* Logo with gradient border */}
//         <motion.div whileHover={{ scale: 1.05 }}>
//           <Box sx={{ 
//             width: 120, 
//             height: 40, 
//             bgcolor: 'white',
//             borderRadius: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}>
//             {/* Your logo here
//              */}

//           </Box>
//         </motion.div>
        
//         {!isMobile && (
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {navItems.map((item) => (
//               <motion.div
//                 key={item}
//                 whileHover={{ y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Button 
//                   color="inherit"
//                   sx={{ 
//                     fontWeight: 500,
//                     '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
//                   }}
//                 >
//                   {t(`navbar.${item}`)}
//                 </Button>
//               </motion.div>
//             ))}
//           </Box>
//         )}
        
//         <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//           <motion.div whileHover={{ scale: 1.05 }}>
//             <Button 
//               variant="outlined"
//               sx={{
//                 color: 'white',
//                 borderColor: 'white',
//                 '&:hover': { borderColor: 'rgba(255,255,255,0.7)' }
//               }}
//             >
//               {t('navbar.signin')}
//             </Button>
//           </motion.div>
//           <motion.div 
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Button 
//               variant="contained"
//               sx={{
//                 bgcolor: 'white',
//                 color: '#6C63FF',
//                 fontWeight: 600,
//                 '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
//               }}
//             >
//               {t('navbar.signup')}
//             </Button>
//           </motion.div>
//           <IconButton 
//             onClick={() => changeLanguage(isArabic ? 'en' : 'ar')}
//             sx={{ color: 'white' }}
//           >
//             <LanguageIcon />
//           </IconButton>
//           {isMobile && (
//             <IconButton onClick={() => setMobileOpen(!mobileOpen)} sx={{ color: 'white' }}>
//               <MenuIcon />
//             </IconButton>
//           )}
//         </Box>
//       </Toolbar>

//       {/* Mobile menu */}
//       {isMobile && mobileOpen && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           transition={{ duration: 0.3 }}
//           style={{ overflow: 'hidden', background: 'rgba(255,255,255,0.1)' }}
//         >
//           <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
//             {navItems.map((item) => (
//               <Button 
//                 key={item} 
//                 color="inherit" 
//                 fullWidth
//                 sx={{ justifyContent: isArabic ? 'flex-end' : 'flex-start' }}
//               >
//                 {t(`navbar.${item}`)}
//               </Button>
//             ))}
//           </Box>
//         </motion.div>
//       )}
//     </AppBar>
//   );
// };

// export default Navbar;