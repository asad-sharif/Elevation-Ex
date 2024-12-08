import React from 'react'
import { Link } from 'react-router-dom'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Footer = () => {
  return (
    <footer class="w-full -t-2 -gray-200">
      <div class="max-w-7xl py-16 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0">
        {/* Useful Links Section */}
        <div class="px-4 ">
          <h2 class="title-font font-medium text-gray-900 mb-3">Useful Links</h2>
          <nav className='flex flex-col text-gray-600 hover:text-gray-800'>
            <Link to='products'>Products</Link>
            <Link to='about'>About</Link>
            <Link to='contact'>Contact</Link>
          </nav>
        </div>

        {/* Policies Section */}
        <div class="px-4 ">
          <h2 class="title-font font-medium text-gray-900 mb-3">Policies</h2>
          <nav className='flex flex-col gap-4 text-gray-600 hover:text-gray-800'>
            <Link to=''>Privacy Policy</Link>
            <Link to=''>Another Policy</Link>
            <Link to=''>Another Policy</Link>
          </nav>
        </div>

        {/* Contact Us Section */}
        <div class="px-4 text-gray-600 ">
          <h2 class="title-font font-medium text-gray-900 mb-3">Contact Us</h2>
          <p className='text-sm'>
            <span><LocationOnOutlinedIcon sx={{ mr: '5px' }} /></span>
            Akbar Abad, Sialkot - 51310 Pakistan
          </p>
          <p className='my-4 text-sm'>
            <span><LocalPhoneOutlinedIcon sx={{ mr: '5px', alignItems: 'center' }} /></span>
            <a href="tel:+923466745213">03466745213</a>
          </p>
          <p className='text-sm'>
            <span><EmailOutlinedIcon sx={{ mr: '5px' }} /></span>
            <a href="mailto:info@gog-industry.com">info@gog-industry.com</a>
          </p>
        </div>

        {/* Brand Section */}
        <div class="w-full px-4 mt-6 sm:mt-0 ">
          <div class="mb-4">
            {/* <p className='text-5xl sm:text-7xl text-center text-red-700 font-extrabold tracking-[9px]'>ELEVATION EX</p> */}
            <p className='text-center text-3xl tracking-widest text-red-700'>ELEVATION EX</p>
          </div>
          <p class="mt-2 text-gray-500 text-sm text-center">is the prominent entity of Pakistan; it was established in 2010 and situated in Sialkot with an aim to build the highest quality products with greatest value in Shoes and Leather Goods.</p>
        </div>
      </div>

      {/* footer bottom------------------------------------------------------------ */}
      <div class="bg-red-700 w-full text-white">
        <div class="max-w-7xl mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p class=" text-sm text-center sm:text-left">© 2024 GOG INDUSTRY</p>

          <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a class=" cursor-pointer">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-3 cursor-pointer">
              <svg fill='white' xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 50 50">
                <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
              </svg>
            </a>

            <a class="ml-3  cursor-pointer">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a class="ml-3  cursor-pointer">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer