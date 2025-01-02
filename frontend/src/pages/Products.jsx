import { Badge, Box, Paper, Typography, Pagination, Button, Stack, Tooltip, Modal } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid2';
import image from '../assets/bikeSuit.jpg';
import { theme } from '@/theme';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';
import { Notification, useToaster } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';



const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // State to track the current page
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const toast = useToaster()
  const isAuthenticated = useSelector(state => state.login?.authenticated)
  const itemsPerPage = 9; // Number of products per page

  // console.log('Is Aunthenticated:', isAuthenticated);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.products); // Ensure data is correctly accessed
      // console.log(data.products);
    }

    fetchData().catch(console.error);

  }, []);

  const categoryFilter = searchParams.get('category')
  // console.log(categoryFilter);

  // Paginate products
  const paginatedProducts = React.useMemo(() => {
    return categoryFilter
      ? products.filter(product => product.category.toLowerCase() === categoryFilter).slice((page - 1) * itemsPerPage, page * itemsPerPage)
      : products.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  }, [products, page, categoryFilter])

  // console.log(paginatedProducts);

  const categories = [
    { category: "Gloves", search: "gloves" },
    { category: "Jackets", search: "jackets" },
    { category: "Shoes", search: "shoes" },
    { category: "Suits", search: "suits" },
    { category: "Bags", search: "bags" },
    { category: "Outdoor", search: "outdoor" },
    { category: "Electronics", search: "electronics" },
    { category: "Fitness", search: "fitness" },
    { category: "Accessories", search: "accessories" },
    { category: "Climbing", search: "climbing" },
    { category: "Helmets", search: "helmets" }
  ];

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filterLinkStyles = {
    backgroundColor: '#b91c1c', // A vibrant blue color
    color: '#fff', // White text color for contrast
    fontSize: '0.8rem',
    padding: '4px 10px', // Increased padding for better spacing
    borderRadius: '20px', // More rounded corners for a pill shape
    border: 'none', // Removing the border for a cleaner look
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Adding a subtle shadow for depth
    cursor: 'pointer', // Changing cursor to pointer to indicate it's clickable
    transition: 'background-color 0.3s ease', // Smooth transition for background color
  };

  const filterLinkActiveStyles = {
    backgroundColor: 'black', // A vibrant blue color
    color: '#fff', // White text color for contrast
    fontSize: '0.8rem',
    padding: '4px 10px', // Increased padding for better spacing
    borderRadius: '20px', // More rounded corners for a pill shape
    border: 'none', // Removing the border for a cleaner look
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Adding a subtle shadow for depth
    cursor: 'pointer', // Changing cursor to pointer to indicate it's clickable
    transition: 'background-color 0.3s ease', // Smooth transition for background color
  };

  function handleOpen() {
    setOpen(prev => !prev)
  }

  const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    backgroundColor: 'white',
    borderRadius: '5px',
    maxHeight: '90vh',
    overflowY: 'auto',
    width: '90%', // Adjust width as needed
    maxWidth: '600px', // Set maximum width
    textAlign: 'center'
  };

  function handleAddToCart(product) {
    if (!isAuthenticated) return

    dispatch(addToCart({
      productId: product._id,
      quantity: product.quantity
    }))

    toast.push(
      <Notification type='success' header='Product added to cart' />,
      { placement: 'bottomEnd', duration: 3000 }
    )
  }

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }} className='products-header'>
        <Typography variant='h5' gutterBottom
          sx={{ fontSize: { sm: '2rem', md: '2rem', lg: '3rem' }, width: { sm: '90%', md: '60%' }, textAlign: 'center', px: '1rem' }}>
          Explore Our Products
        </Typography>
        <Typography variant='body2'
          sx={{ fontSize: { md: '1rem' }, width: { sm: '90%', md: '50%' }, textAlign: 'center', px: '1rem' }}>
          From the thrill of adventure to the elegance of everyday life, explore products that combine passion, purpose, and perfection.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: '80rem', mx: 'auto', py: '50px', px: '1rem' }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '1.2rem', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            {categories.map((filter, index) => (
              <NavLink
                key={index}
                to={`?category=${filter.search}`}
                style={() =>
                  categoryFilter === filter.search ? filterLinkActiveStyles : filterLinkStyles
                }
              >
                {filter.category}
              </NavLink>
            ))}
          </Box>
          {categoryFilter && <Link to='' className='underline'>Clear filter</Link>}
        </Box>

        {products.length ? (
          <>
            <Grid container spacing={{ xs: 6, sm: 2, md: 2 }} justifyContent="center">
              {paginatedProducts.map((product, index) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  {/* <Link to={`${product._id}`}> */}
                  <Paper
                    elevation={6} // Subtle shadow for depth
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '5px',
                      position: 'relative',
                      overflow: 'hidden',
                      height: '100%',
                      bgcolor: '#ffffff',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover effects
                      '&:hover': {
                        transform: 'scale(1.01)', // Slightly scale up on hover
                        boxShadow: 20,
                      },
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                    {/* Category Badge */}
                    <Typography
                      variant="body2"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        zIndex: 10,
                        bgcolor: 'black', // Vibrant background color
                        color: 'white',
                        px: '1.2rem',
                        py: '0.4rem',
                        borderBottomLeftRadius: '25px',
                        borderTopRightRadius: '5px',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                      }}
                    >
                      {product.category}
                    </Typography>

                    {/* Card Body */}
                    <Box sx={{ px: '1rem', py: '1.2rem', flex: 1 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: '600',
                          color: '#333',
                          lineHeight: 1.4,
                          mb: 1,
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: '#666',
                          mb: 2,
                          fontSize: '0.875rem',
                          fontStyle: 'italic',
                        }}
                      >
                        {product.headline}
                      </Typography>

                      {/* Price */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 'bold',
                          color: '#e53935', // Red for price emphasis
                          // mb: 2,
                        }}
                      >
                        ${product.price}
                      </Typography>

                      {/* min qyuantity */}
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Min Quantity: {product.quantity} units
                      </Typography>


                      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {/* View Details Button */}
                        <Link to={`${product._id}`} style={{ flex: '10' }}>
                          <Button
                            variant="contained"
                            fullWidth
                            color='customRed'
                            sx={{
                              // bgcolor: 'customRed',
                              color: 'white',
                              fontWeight: 'bold',
                              borderRadius: '5px',
                              textTransform: 'none'
                            }}
                          >
                            View Details
                          </Button>
                        </Link>

                        {/* <Tooltip title={isAuthenticated ? "Add to cart" : "Login to add to cart"} arrow>
                          <span> */}
                        <Button
                          size='large'
                          // disabled={!isAuthenticated}
                          sx={{
                            border: isAuthenticated ? `1px solid ${theme.palette.customRed.main}` : '1px solid #9999',
                            color: theme.palette.customRed.main,
                            flex: '1',
                          }}
                          onClick={isAuthenticated ? () => handleAddToCart(product) : () => setOpen(true)}
                        >
                          <FaShoppingCart size='20px' />
                        </Button>
                        {/* </span>
                        </Tooltip> */}

                      </Box>

                    </Box>
                  </Paper>
                  {/* </Link> */}

                </Grid>
              ))}
            </Grid>


            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(categoryFilter ? paginatedProducts.length / itemsPerPage : products.length / itemsPerPage)} // Total pages
                page={page} // Current page
                onChange={handlePageChange} // Page change handler
              // color="red"
              />
            </Box>
          </>
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Loading...
          </Typography>
        )}

        {/* Modal ------------------------------------- */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{ px: '1rem', py: '2rem', display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '1rem', flexDirection: 'column' }}
            style={modalStyles}
          >
            <Typography variant="body1" component={'h2'}>
              Only Logged in users can add products to the cart.
            </Typography>

            <Link to='/auth/login' className='underline font-bold'>Please, login here</Link>

          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Products;
