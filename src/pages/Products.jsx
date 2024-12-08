import { Badge, Box, Paper, Typography, Pagination, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import image from '../assets/bikeSuit.jpg';
import { theme } from '@/theme';
import { Link } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // State to track the current page
  const itemsPerPage = 9; // Number of products per page

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data.products); // Ensure data is correctly accessed
    }

    fetchData().catch(console.error);
  }, []);

  // Paginate products
  const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
        {products.length ? (
          <>
            <Grid container spacing={{ xs: 6, sm: 2, md: 2 }} justifyContent="center">
              {paginatedProducts.map((product, index) => (
                <Grid item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Link to={`${product.id}`}>
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
                        src={image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: 'auto',
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
                            mb: 2,
                          }}
                        >
                          ${product.price}
                        </Typography>

                        {/* Add to Cart Button */}
                        <Button
                          variant="contained"
                          fullWidth
                          color='customRed'
                          sx={{
                            // bgcolor: 'customRed',
                            color: 'white',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                            textTransform: 'none',
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Box>
                    </Paper>
                  </Link>

                </Grid>
              ))}
            </Grid>


            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(products.length / itemsPerPage)} // Total pages
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
      </Box>
    </Box>
  );
};

export default Products;
