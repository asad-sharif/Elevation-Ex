import React, { useState, useEffect } from 'react';
import { Link, NavLink, useMatch, useParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Badge, Box, Drawer, IconButton, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector, useDispatch } from 'react-redux';
import { logout, logoutUser } from '@/slices/authSlice'; // Assuming you have a logout action in your authSlice
import { Notification, useToaster } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { addToCart } from '@/slices/cartSlice';
import Cart from './Cart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openCart, setOpenCart] = useState(false)
  const cartCount = useSelector(state => state.cart.products?.length)

  const dispatch = useDispatch();
  const toast = useToaster();
  let authenticatedUser = useSelector(state => state.login.user?.name);

  useEffect(() => {
    if (authenticatedUser) {
      setIsAuthenticated(true);
    }
  }, [authenticatedUser, isAuthenticated]);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    handleMenuClose();
    toast.push(
      <Notification type='success' header='You have been logged out successfully.' closable />,
      { placement: 'bottomEnd', duration: 5000 }
    );
  };

  // Check scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  const activeStyles = {
    fontWeight: 'bold',
  };

  const { id } = useParams();

  function toggleCart() {
    setOpenCart(prev => !prev)
  }

  const isPolicyPage = !!useMatch('/privacy-policies');
  const isTCPage = !!useMatch('/terms-and-conditions');
  const isAuthPage = !!useMatch('/auth');
  const isCartPage = !!useMatch('/cart');
  const isAuthLoginPage = !!useMatch('/auth/login');
  const isProductDetailPage = !!id || !!isPolicyPage || !!isTCPage || !!isAuthPage || !!isAuthLoginPage || !!isCartPage

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
          <p className={`text-2xl sm:text-3xl font-extrabold text-red-600
            ${open ? 'hidden' : 'flex'}
            `}
          >
            ELEVATION EX
          </p>
        </Link>

        {/* Navigation - hidden on small screens and visible on larger ones */}
        <nav className={`hidden md:flex gap-6 text-sm items-center
          ${scrolled ? 'text-white' : 'text-black'}
          // ${isProductDetailPage ? 'text-black' : 'text-white'}
          `} >
          {links.map((link, index) => (
            <NavLink
              key={index}
              style={({ isActive }) => (isActive ? activeStyles : null)}
              to={link.path}
            >
              {link.name}
            </NavLink>
          ))}

          {/* CART ICON ================= */}
          <Badge badgeContent={cartCount} color='primary' max={5}>
            <Link onClick={toggleCart}>
              {/* <FaShoppingCart /> */}
              <ShoppingCartIcon />
            </Link>
          </Badge>

          <Cart openCart={openCart} toggleCart={toggleCart} />

          {/* USER ICON ================= */}
          {isAuthenticated && authenticatedUser ? (
            <>
              <span onClick={handleMenuOpen} style={{ cursor: 'pointer' }}>
                {authenticatedUser}
              </span>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {/* <MenuItem onClick={handleMenuClose}>Account</MenuItem> */}
                <MenuItem onClick={handleLogout} sx={{":focus":{bgcolor:'transparent'}}}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to='/auth'>
              <AccountCircleIcon />
            </Link>
          )}
        </nav>

        <IconButton
          onClick={toggleOpen}
          sx={{
            display: { sm: 'block', md: 'none' },
            color: isProductDetailPage ? `${scrolled ? 'white' : 'black'}` : 'white',
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
              width: '100%',
              bgcolor: '#f4f4f4',
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
                to={link.path}
                onClick={() => setOpen(false)}
                style={({ isActive }) =>
                  isActive
                    ? { fontWeight: 'bold', color: '#d32f2f' }
                    : { color: '#333' }
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* CART LINK================= */}
            <NavLink
              onClick={() => {
                toggleCart()
                setOpen(false)
              }}
            // onClick={toggleCart}
            // onClick={() => setOpen(false)}
            >
              Cart
            </NavLink>

            {/* ACCOUNT LINK================= */}
            <NavLink to='/auth'
              onClick={() => setOpen(false)}
              style={({ isActive }) =>
                isActive
                  ? { fontWeight: 'bold', color: '#d32f2f' }
                  : { color: '#333' }
              }>
              Account
            </NavLink>
          </Box>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;