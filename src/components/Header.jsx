import React, { useState, useEffect } from 'react';
import { Link, NavLink, useMatch } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Drawer, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Products', 'About', 'Contact'];

  const activeStyles = {
    fontWeight: 'bold',
  };

  const isProductDetailPage = !!useMatch('/products/:id')

  return (
    <header
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-[95%] transition-all duration-500 ease-in-out 
        ${scrolled ? 'bg-black/50 backdrop-blur-xl max-w-5xl rounded-full py-2 sm:top-5 top-2'
          : 'bg-transparent py-5 max-w-7xl'}
          `}
    >
      <div className="flex justify-between items-center px-4 sm:px-8">
        {/* Centered brand name */}
        <Link to="/" className={`text-center `}>
          <p className={`text-2xl sm:text-4xl font-extrabold 
            ${scrolled ? 'text-red-600' : 'text-white'} 
            ${open ? 'hidden' : 'flex'}
            ${isProductDetailPage ? 'text-red-500' : ''}`
          }
          >
            ELEVATION EX
          </p>
        </Link>

        {/* Navigation - hidden on small screens and visible on larger ones */}
        <nav className={`hidden md:flex gap-6 text-lg
          ${scrolled ? 'text-white' : 'text-white'}
          ${isProductDetailPage ? `${scrolled ? 'text-white': 'text-black'}` : 'text-white'}
          `} >
          {links.map((link, index) => (
            <NavLink
              key={index}
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to={`${link.toLowerCase()}`}
            >
              {link}
            </NavLink>
          ))}
        </nav>

        <IconButton
          onClick={toggleOpen}
          sx={{
            display: { sm: 'block', md: 'none' },
            color: isProductDetailPage? `${scrolled? 'white': 'black'}`: 'white',
            zIndex: '50',
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              width: '100%', // Adjust drawer width
              bgcolor: '#f4f4f4', // Drawer background
              padding: '1rem',
              display: { sm: 'block', md: 'none' }
            },
          }}
        >

          {/* Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              alignItems: 'start',

            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Link to="/" onClick={() => setOpen(false)}>
                <p className='text-2xl sm:text-4xl font-extrabold text-red-700'>
                  ELEVATION EX
                </p>
              </Link>
              <IconButton
                onClick={toggleOpen}
                sx={{
                  display: { sm: 'block', md: 'none' },
                  color: '#b91c1c',
                  zIndex: '50',
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {links.map((link, index) => (
              <NavLink
                key={index}
                to={`${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                style={({ isActive }) =>
                  isActive
                    ? { fontWeight: 'bold', color: '#d32f2f' }
                    : { color: '#333' }
                }
              >
                {link}
              </NavLink>
            ))}
          </Box>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
