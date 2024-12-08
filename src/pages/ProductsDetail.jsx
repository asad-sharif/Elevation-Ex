import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import image from '../assets/bikeSuit.jpg';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {
  Box,
  Typography,
  Button,
  Grid,
  Rating,
  Chip,
  Card,
  CardMedia,
  CardContent,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '@/theme';

const ProductsDetail = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data.product);

      const relatedResponse = await fetch(`/api/products?category=${data.product.category}`);
      const relatedData = await relatedResponse.json();
      const filteredProducts = relatedData.products
        .filter((p) => p.id !== data.product.id)
        .slice(0, 3);
      setRelatedProducts(filteredProducts);
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: '80rem',
        mx: 'auto',
        mt: '5rem',
        py: 6,
        px: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      {/* Product Header */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid #ddd',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 1,
            }}
          >
            <img
              src={image}
              alt={product.name}
              style={{ width: '100%', objectFit: 'cover', objectPosition: 'center', height: '60vh' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Chip label={product.category} sx={{ mb: '1rem', bgcolor: theme.palette.customRed.main, color: 'white' }} />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {product.headline}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="h5" sx={{ color: 'customRed', fontWeight: 'bold' }} gutterBottom>
            ${product.price}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} my={2}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.rating})
            </Typography>
          </Box>
          <Box mt={4} display="flex" gap={2}>
            <Button variant="contained" sx={{ bgcolor: theme.palette.customRed.main }} fullWidth>
              Add to Cart
            </Button>
            <Button variant="outlined" color="customRed" fullWidth>
              Buy Now
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Key Features Section */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={3}>
          {[
            'Impact-resistant padding for safety.',
            'Snug fit for enhanced comfort.',
            'Premium-quality leather for durability.',
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: 3,
                  boxShadow: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                  bgcolor: 'rgba(255, 0, 0, 0.05)',
                }}
              >
                <Typography variant="body1" fontWeight="500">
                  {feature}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className='product-page-collection-banner' sx={{ height: '70vh', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.3rem', md: '2rem', textAlign: 'center' } }}>Discover Your Next Adventure in Style</Typography>
        <Button variant="outlined" color="customRed">
          Browse Collection
        </Button>
      </Box>


      {/* FAQ and contact Section container */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: '3rem', justifyContent: 'center', my: '2rem' }}>

        {/* FAQ Section */}
        <Box >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {[
            { question: 'What is the delivery time?', answer: 'Delivery takes 5-7 business days.' },
            { question: 'Do you offer custom sizes?', answer: 'Yes, custom sizes are available upon request.' },
            { question: 'What is the return policy?', answer: 'We offer a 30-day return policy.' },
          ].map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                boxShadow: 2,
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="500">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact Section */}
        <Box
          sx={{
            // maxWidth: '600px',
            mx: 'auto',
            // px: 2,
            textAlign: 'center',
            borderLeft: { xs: '0', md: '1px solid gray' },
            pl: { xs: '0', md: '2rem' }

          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Have Questions About This Product?
          </Typography>
          <Typography variant="body1" mb={2}>
            If you have any questions or need more information about this product, our team is here to assist you.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Your Name" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Your Email" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Message (e.g., ask about sizing, materials, or shipping)"
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.customRed.main,
                  textTransform: 'none',
                  px: 4,
                }}
              >
                Send Inquiry
              </Button>
            </Grid>
          </Grid>
        </Box>

      </Box>


      {/* Related Products Section */}
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Related Products
        </Typography>
        <Grid container spacing={3}>
          {relatedProducts.map((relatedProduct) => (
            <Grid item xs={12} sm={4} key={relatedProduct.id}>
              <Link to={`/products/${relatedProduct.id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    transition: 'transform 0.3s',
                    ':hover': { transform: 'scale(1.02)' },
                    boxShadow: '5px 5px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={image} // Replace with actual related product images
                    alt={relatedProduct.name}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ color: 'customRed', fontWeight: 'bold' }}
                      gutterBottom
                    >
                      {relatedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {relatedProduct.headline}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

export default ProductsDetail;
