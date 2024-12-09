import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import React from 'react';
import img1 from '../../src/assets/productGallery/1.jpg';
import img2 from '../../src/assets/productGallery/2.jpg';
import img3 from '../../src/assets/productGallery/3.jpg';
import img4 from '../../src/assets/productGallery/4.jpg';
import img5 from '../../src/assets/productGallery/5.jpg';
import img6 from '../../src/assets/productGallery/6.jpg';
import img7 from '../../src/assets/productGallery/7.jpg';
import img8 from '../../src/assets/productGallery/8.jpg';
import img9 from '../../src/assets/productGallery/9.jpg';
import img10 from '../../src/assets/productGallery/10.jpg';

// List of images
const imgList = [
  { img: img1, altText: 'product image' },
  { img: img2, altText: 'product image' },
  { img: img3, altText: 'product image' },
  { img: img4, altText: 'product image' },
  { img: img5, altText: 'product image' },
  { img: img6, altText: 'product image' },
  { img: img7, altText: 'product image' },
  { img: img8, altText: 'product image' },
  { img: img9, altText: 'product image' },
  { img: img10, altText: 'product image' },
  { img: img1, altText: 'product image' },
  { img: img3, altText: 'product image' },
  { img: img6, altText: 'product image' },
  { img: img10, altText: 'product image' },
  { img: img5, altText: 'product image' },
  { img: img7, altText: 'product image' },
  { img: img4, altText: 'product image' },
  { img: img8, altText: 'product image' },
  { img: img9, altText: 'product image' },
  { img: img2, altText: 'product image' },
];

const Gallery = () => {
  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ height: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }} className='product-gallery-banner'>
        <Typography variant='h5' gutterBottom
          sx={{ fontSize: { sm: '2rem', md: '2rem', lg: '3rem' }, width: { sm: '90%', md: '60%' }, textAlign: 'center', px: '1rem' }}>
          Our Product Gallery
        </Typography>
        <Typography variant='body2'
          sx={{ fontSize: { md: '1rem' }, width: { sm: '90%', md: '50%' }, textAlign: 'center', px: '1rem' }}>
          Explore our diverse range of premium leather products. From gloves to jackets, each item is crafted with precision and care to ensure the highest quality and durability.
        </Typography>
      </Box>

      {/* Product Gallery Section */}
      <Box
        sx={{
          maxWidth: '80rem',
          mx: 'auto',
          my: 5,
          px: '1rem'
        }}
      >
        <ImageList
          variant="masonry"
          // cols={4} 
          cols={4}
          gap={5}>
          {imgList.map((item, index) => (
            <ImageListItem key={index}>
              <img src={item.img} alt={item.altText} className='w-full h-auto object-cover object-center' loading='lazy' />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box >
  );
};

export default Gallery;
