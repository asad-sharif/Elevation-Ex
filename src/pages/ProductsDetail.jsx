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
  Modal,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '@/theme';
import { Notification,  useToaster } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';



const ProductsDetail = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [open, setOpen] = useState(false)
  const toast = useToaster()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  function handleOpen() {
    setOpen(prev => !prev)
  }

  function handleChange(e) {
    const { name, phone, email, message, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();

    toast.push(
      <Notification type='success' header='Order Submitted' closable>
        We have received your details. Our team will contact you soon to finalize the order!
      </Notification>,
      { placement: 'bottomEnd', duration: 5000 }
    )

    setOpen(false)
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    })
    console.log("Form Data Submitted:", formData);
  }



  const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    backgroundColor: 'white',
    borderRadius: '5px'
  };

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
            <Button variant="contained" color="customRed" sx={{ color: 'white' }} fullWidth onClick={handleOpen}>
              Order Now
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

        {/* FAQ Section */}
        <Box sx={{width:{xs: '90%', md: '60%'}, mx:'auto'}}>
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

      {/* Modal ------------------------------------- */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ px: '1rem', py: '2rem', width:{xs:'90%', md:'50%', lg:'50%'} }}
          style={modalStyles}
        >
          <form className='flex flex-col md:ml-auto w-full' onSubmit={handleSubmit}>
            <h2 className='text-gray-900 text-2xl mb-1 font-medium title-font'>Your order details</h2>

            <div className='relative mb-4'>
              <label htmlFor='name' className='leading-7 text-sm text-gray-600'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                onChange={handleChange}
                value={formData.name}
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                required
              />
            </div>
            <div className='relative mb-4'>
              <label htmlFor='phoneNumber' className='leading-7 text-sm text-gray-600'>Phone</label>
              <input
                type='tel'
                id='phone'
                name='phone'
                onChange={handleChange}
                value={formData.phone}
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              />
            </div>
            <div className='relative mb-4'>
              <label htmlFor='email' className='leading-7 text-sm text-gray-600'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                onChange={handleChange}
                value={formData.email}
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
                required
              />
            </div>
            <div className='relative mb-4'>
              <label htmlFor='message' className='leading-7 text-sm text-gray-600'>Message</label>
              <textarea
                id='message'
                name='message'
                onChange={handleChange}
                value={formData.message}
                className='w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out'
                required
              ></textarea>
            </div>
            <button type='submit' className='text-white w-full bg-gradient-to-r from-red-700 to bg-red-900 border-0 py-2 px-6 focus:outline-none hover:bg-red-800 rounded text-lg'>
              Confirm Your Order
            </button>
            <p className='text-xs text-gray-500 mt-3'>
              We may reach out to you via email or phone number.
            </p>
          </form>

        </Box>
      </Modal>

    </Box>
  );
};

export default ProductsDetail;
