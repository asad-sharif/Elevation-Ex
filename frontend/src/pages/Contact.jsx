import React, { useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Notification, useToaster } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

const Contact = () => {
  const toast = useToaster()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

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
      <Notification type='success' header='Request Submitted' closable>
        We have received your details. Our team will contact you soon!
      </Notification>,
      { placement: 'bottomEnd', duration: 5000 }
    )
    
    console.log("Form Data Submitted:", formData);

    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    })
  }

  return (
    < div className='w-full' >
      {/* Header Section */}
      <div className='contact-us-header h-[70vh] flex flex-col gap-6 justify-center items-center text-white'>
        <h2 className='text-3xl sm:text-5xl'>Contact Us</h2>
        <div className='text-center text-sm sm:text-base px-4'>
          <p>Have a question or need export solutions?</p>
          <p>Reach out to us, and our team will get back to you quickly with the perfect solution!</p>
        </div>
      </div>

      <div className='max-w-7xl sm:w-3/4 md:w-1/2 px-4 mx-auto my-12 text-center'>
        <h2 className='text-3xl sm:text-4xl font-bold mb-4'>Get in touch</h2>
        <p className='leading-relaxed mb-12 text-sm sm:text-base text-gray-600'>
          Reach out to us and our team will connect with you promptly to meet your export needs.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 flex-wrap w-full'>
          <div className='flex-1 flex flex-col justify-center items-center gap-2 bg-gradient-to-r from-red-700 to bg-red-900 text-white px-4 py-2 rounded-2xl'>
            <LocalPhoneOutlinedIcon />
            <h3 className='font-semibold'>Phone</h3>
            <p className='text-sm sm:text-base'>03466745213</p>
          </div>
          <div className='flex-1 flex flex-col justify-center items-center gap-2 bg-gradient-to-r from-red-700 to bg-red-900 text-white px-4 py-2 rounded-2xl'>
            <EmailOutlinedIcon />
            <h3 className='font-semibold'>Email</h3>
            <p className='text-sm sm:text-base'>info@gog-industry.com</p>
          </div>
          <div className='flex-1 flex flex-col justify-center items-center gap-2 bg-gradient-to-r from-red-700 to bg-red-900 text-white px-4 py-2 rounded-2xl'>
            <LocationOnOutlinedIcon />
            <h3 className='font-semibold'>Office</h3>
            <p className='text-sm sm:text-base'>Akbar Abad, Sialkot - 51310 Pakistan</p>
          </div>
        </div>
      </div>

      {/* Contact Form & Map Section */}
      < section className='text-gray-600 body-font relative max-w-7xl mx-auto' >
        <div className='container px-5 py-16 mx-auto flex flex-col sm:flex-row sm:flex-nowrap flex-wrap'>
          {/* Map Section */}
          <div className='lg:w-2/3 md:w-1/2 w-full bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex flex-1 items-end justify-start relative'>
            <iframe
              width='100%'
              height='100%'
              className='absolute inset-0'
              frameBorder='0'
              title='map'
              marginHeight='0'
              marginWidth='0'
              scrolling='no'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3366.5851608740704!2d74.5248700112952!3d32.457037000160376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ec1c395237429%3A0x2a7c8c24b638fae3!2sAkbar%20Abad%20Rd%2C%20Sialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1733208512702!5m2!1sen!2s'
              style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
            ></iframe>
          </div>

          {/* Contact Form */}
          <form className='lg:w-1/3 md:w-1/2 flex flex-1 flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0' onSubmit={handleSubmit}>
            <h2 className='text-gray-900 text-2xl mb-1 font-medium title-font'>Request a quote</h2>

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
              Submit
            </button>
            <p className='text-xs text-gray-500 mt-3'>
              We may reach out to you via email or phone number.
            </p>
          </form>
        </div>
      </section >
    </div >
  );
};

export default Contact;
