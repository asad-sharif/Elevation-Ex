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
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme } from '@/theme';
import { Notification, useToaster } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { FaWhatsapp, FaLinkedin, FaGithub, FaFilePdf, FaInstagram, FaEnvelope, FaWhatsappSquare, FaEnvelopeSquare, FaRegEnvelope, FaLinkedinIn } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/slices/cartSlice';

const ProductsDetail = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState()
  const toast = useToaster()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.login?.authenticated)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  console.log('Is Authenticated:', isAuthenticated);


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
    textAlign:'center'
  };

  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetch(`http://localhost:8000/api/products/${id}`);
      const data = await response.json();
      setProduct(data.product);

      setQuantity(data.product.quantity) //reset quantity when id changes

      const relatedResponse = await fetch(`http://localhost:8000/api/products/`);
      const relatedData = await relatedResponse.json();
      // console.log(relatedData);


      const filteredProducts = relatedData.products
        .filter((p) => p.id !== data.product._id)
        .slice(0, 3);
      // console.log(filteredProducts);
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

  function handleAddToCart() {
    if (!isAuthenticated) {
      return setOpen(true)
    }

    dispatch(addToCart({
      productId: id,
      quantity: quantity
    }))

    setQuantity(product.quantity)

    toast.push(
      <Notification type='success' header='Product added to cart' />,
      { placement: 'bottomEnd', duration: 1000 }
    )
  }

  function increment() {
    setQuantity(prev => prev += 1)
  }
  function decrement() {
    setQuantity(prev => (
      prev - 1 < product.quantity
        ? product.quantity
        : prev -= 1
    ))
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
              src={product.image}
              alt={product.name}
              style={{ width: '100%', objectFit: 'cover', objectPosition: 'center', height: '60vh', }}
              className='drop-shadow-2xl'
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

            {/* QUANTITY BUTTON===================== */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
              <Button
                variant='outlined'
                sx={{
                  color: theme.palette.customRed.main,
                  border: `1px solid ${theme.palette.customRed.main}`,
                  borderRadius: '50%',
                  minWidth: { xs: '30px', md: '40px' },
                  minHeight: { xs: '30px', md: '40px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                }}
                onClick={decrement}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                variant='outlined'
                sx={{
                  color: theme.palette.customRed.main,
                  border: `1px solid ${theme.palette.customRed.main}`,
                  borderRadius: '50%',
                  minWidth: { xs: '30px', md: '40px' },
                  minHeight: { xs: '30px', md: '40px' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0',
                }}
                onClick={increment}
              >
                +
              </Button>
            </Box>

            <Button
              variant="contained"
              color="customRed"
              sx={{ color: 'white' }}
              fullWidth
              // onClick={handleOpen}
              onClick={handleAddToCart}
            >
              Add to cart
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
            { title: 'Impact-resistant padding for safety.', icon: <VerifiedUserOutlinedIcon fontSize='large' sx={{ mr: '1rem' }} /> },
            { title: 'Snug fit for enhanced comfort.', icon: <SentimentSatisfiedOutlinedIcon fontSize='large' sx={{ mr: '1rem' }} /> },
            { title: 'Premium-quality leather for durability.', icon: <WorkspacePremiumOutlinedIcon fontSize='large' sx={{ mr: '1rem' }} /> },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  p: { xs: 1, md: 3 },
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
                {feature.icon}
                <Typography variant="body1" mt={3}>
                  {feature.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className='product-page-collection-banner' sx={{ height: '70vh', width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.3rem', md: '2rem', textAlign: 'center' } }}>Discover Your Next Adventure in Style</Typography>
        <Link to='/products'>
          <Button variant="outlined" color="customRed">
            Browse Collection
          </Button>
        </Link>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ width: { xs: '90%', md: '60%' }, mx: 'auto' }}>
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
            <Grid item xs={12} sm={4} key={relatedProduct._id}>
              <Link to={`/products/${relatedProduct._id}`} style={{ textDecoration: 'none' }}>
                <Card
                  sx={{
                    transition: 'transform 0.3s',
                    ':hover': { transform: 'scale(1.02)' },
                    boxShadow: '5px 5px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: '200px' }}
                    image={relatedProduct.image} // Replace with actual related product images
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
  );
};

export default ProductsDetail;
