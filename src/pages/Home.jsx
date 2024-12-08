import gloves from '../assets/gloves.jpg';
import jacket from '../assets/jacket.jpg';
import bikeSuit from '../assets/bikeSuit.jpg';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import { Box, Typography, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
// import { makeServer } from '../server'; // Corrected import path
import '../server'
import image from '../assets/jacket.jpg'
import bikestyle from '../assets/bikestyle.png'
import lifestyle from '../assets/lifestyle.png'
import { theme } from '@/theme';
import { Link } from 'react-router-dom';
import logo1 from '../assets/logos/logo1.png'
import logo2 from '../assets/logos/logo2.png'
import logo3 from '../assets/logos/logo3.png'
import logo4 from '../assets/logos/logo4.png'
import logo5 from '../assets/logos/logo5.png'
import logo6 from '../assets/logos/logo6.png'
import logo7 from '../assets/logos/logo7.png'

// thi prepares the server for the development so it does not interfere with production
// if (process.env.NODE_ENV === 'development') {
//   makeServer();
// }

const Home = () => {
  const [products, setProducts] = useState([]);


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

  const images = [
    {
      img: gloves,
      headline: 'Unmatched Protection, Unyielding Performance',
      subheading: 'Top-tier gloves for maximum safety and comfort, no matter the challenge.'
    },
    {
      img: jacket,
      headline: 'Live with Comfort and Confidence',
      subheading: 'Designed to withstand the elements, offering style, protection, and superior durability'
    },
    {
      img: bikeSuit,
      headline: 'Precision, Power, and Protection – All in One Suit',
      subheading: "Blend cutting-edge design with uncompromising safety"
    },
  ];

  const clientLogos = [
    { image: logo1 },
    { image: logo2 },
    { image: logo3 },
    { image: logo4 },
    { image: logo5 },
    { image: logo6 },
    { image: logo7 },
  ]

  return (
    <>
      {/* Hero carousel/section---------------------------------------- */}
      <div className="w-full">
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          opts={{ loop: true }} // Enables infinite scrolling
        >
          <CarouselContent className="h-[100vh] relative">
            {images.map((slide, index) => (
              <CarouselItem key={index} className="relative">
                <div className="absolute inset-0 h-full bg-gradient-to-r from-black to-black opacity-70 z-10"></div>
                <img
                  src={slide.img}
                  alt={slide.headline}
                  className="object-cover object-center w-full h-full"
                />
                <div className="absolute inset-0 flex flex-col gap-4 items-start justify-center  text-white z-20 w-full max-w-7xl mx-auto px-12">
                  <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold w-full sm:w-1/2">{slide.headline}</h1>
                  <p className="text-sm sm:text-lg lg:text-xl">{slide.subheading}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Featured Products section---------------------------------------- */}
      <Box sx={{ maxWidth: '80rem', mx: 'auto', py: '50px', px: '1rem', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" component={'h2'} sx={{ mb: 4 }}>
          Popular Products
        </Typography>
        {products ? (
          <Grid container spacing={4} justifyContent={'center'}>
            {products.map((product, index) => (
              <Grid item size={{ xs: 12, md: 4 }} key={product.id}>
                  <Link to={`products/${product.id}`} >
                  <Box sx={{ position: 'relative', borderRadius: '5px', height: '500px', transition: 'transform 0.3s ease-in-out', ":hover": { transform: 'scale(1.02)' } }}>
                    <img src={image} alt=""
                      className='w-full h-full object-cover object-center rounded-[5px]' />
                    {/* Rotated Arrow Icon */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '5%',
                        right: '5%',
                        width: '40px',
                        height: '40px',
                        bgcolor: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 2,
                        transition: 'all 0.3s ease-in-out',
                        transform: 'rotate(-45deg)',
                        cursor: 'pointer',
                        ":hover": { bgcolor: 'red' },
                      }}
                    >
                      <Typography
                        sx={{
                          color: 'red',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                          transition: 'all 0.3s ease-in-out',
                          ":hover": { color: 'white', fontSize: '2rem' },
                        }}
                      >
                        →
                      </Typography>
                    </Box>

                    {/* dark overlay */}
                    <Box sx={{ width: '100%', height: '100%', bgcolor: 'rgba(0,0,0,0.6)', position: 'absolute', top: '0', borderRadius: '5px' }}></Box>

                    {/* Text */}
                    <Box sx={{ position: 'absolute', bottom: '0', top: '0', px: '1rem', pb: '2rem', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'end', zIndex: '1', color: 'white', borderRadius: '5px' }}>
                      <Typography variant="h5" fontWeight={'bold'}>{product.name}</Typography>
                      <Typography variant="body1" fontWeight={'thin'}>{product.headline}</Typography>
                    </Box>
                  </Box>
              </Link>
                </Grid>

            )).slice(0, 3)}
          </Grid>
        ) : (
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Loading...
          </Typography>
        )}
        <Button variant="outlined" color="customRed" sx={{ mt: '2rem', alignSelf: 'center' }}>
          <Link to='products'>Browse all products</Link>
        </Button>
      </Box >

      {/* Featured Categories section---------------------------------------- */}
      < Box
        sx={{
          display: 'flex',
          // Changed flexDirection to use 'column' for xs and sm, 'row' for md and above
          flexDirection: { xs: 'column', sm: 'column', md: 'row' },
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          my: '4rem'
        }
        }
      >
        {/* Dark Overlay */}
        < Box
          sx={{
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0,0,0,0.7)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        ></Box >

        {/* Lifestyle Apparel */}
        < Box sx={{ flex: 1, position: 'relative' }}>
          <img
            src={lifestyle}
            alt=""
            className='w-full object-cover object-center rounded-none'
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              color: 'white',
              textAlign: 'center',
              width: '100%',
              px: '1rem'
            }}
          >
            <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem', lg: '3rem' } }} gutterBottom>
              Style That Moves with You
            </Typography>
            <Typography variant="body1" mb={4}>
              Apparel that redefines versatility and sophistication.
            </Typography>
            <Button variant="outlined" color='customRed'>
              Discover Lifestyle Apparel
            </Button>
          </Box>
        </Box >

        {/* Motorbike Gear */}
        < Box sx={{ flex: 1, position: 'relative' }}>
          <img
            src={bikestyle}
            alt=""
            className='w-full object-cover object-center rounded-none'
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
              color: 'white',
              textAlign: 'center',
              width: '100%',
              px: '1rem'
            }}
          >
            <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '2rem', lg: '3rem' } }} gutterBottom>
              Gear Up for the Ride
            </Typography>
            <Typography variant="body1" mb={4}>
              Built for speed, safety, and unmatched performance.
            </Typography>
            <Button variant="contained" color='customRed'>
              Explore Motorbike Gear
            </Button>
          </Box>
        </Box >
      </Box >

      {/* Marquee section || Trusted clients logos section---------------------------------------- */}
      < Box
        sx={{
          maxWidth: '80rem',
          px: '1rem',
          mx: 'auto',
          my: '5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography variant="h4" component={'h2'} sx={{ mb: 4 }}>
          Trusted Clients
        </Typography>

        {/* Gradient Wrapper */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            width: '90%',
            mx: 'auto',
            alignItems: 'center',
            overflow: 'hidden',
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)',
          }}
        >
          {/* Scrolling Container */}
          <Box
            sx={{
              display: 'flex',
              gap: '1.5rem',
              animation: 'marquee 30s linear infinite', // Adjust animation speed as needed
              willChange: 'transform', // Optimize animation performance
              '@keyframes marquee': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' }, // Move by 50% for seamless effect
              },
            }}
          >
            {/* Render logos twice for seamless scrolling */}
            {clientLogos.concat(clientLogos).map((logo, index) => (
              <Box
                key={index}
                sx={{
                  flexShrink: 0,
                  width: '150px', // Fixed width
                  height: '100%', // Match container height
                }}
              >
                <img
                  src={logo.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box >





      {/* Inquiry section---------------------------------------- */}
      < Box
        sx={{
          backgroundColor: theme.palette.grey[900],
          py: 8,
          px: 3,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 'bold',
          }}
        >
          Ready to Elevate Your Business?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          Partner with us for premium leather products that combine craftsmanship, durability, and style. Whether you're looking for gloves, jackets, or bike suits, we've got you covered. Let's bring your vision to life.
        </Typography>
        <Button
          variant="contained"
          color="customRed"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          <Link to='contact'>Inquire Now</Link>
        </Button>
      </Box >

    </>
  );
};

export default Home;