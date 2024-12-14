import React from 'react'
import { Box, Typography, Container, Link } from '@mui/material';

const TermsAndConditions = () => {
  return (
      <Container sx={{
          maxWidth: '80rem',
          mx: 'auto',
          my: { xs: '8rem', sm: '0'},
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: '1rem'
      }}>
          <Typography variant="h4" gutterBottom>
              Terms and Conditions
          </Typography>
          <Typography variant="body1" paragraph>
              These terms govern your use of our website and services. By accessing or using our site, you agree to comply with these terms.
          </Typography>
          <Typography variant="h6" gutterBottom>
              Use of Our Services
          </Typography>
          <Typography variant="body2" paragraph>
              You agree to use our website only for lawful purposes and in a manner that does not infringe on the rights of others.
          </Typography>
          <Typography variant="h6" gutterBottom>
              Purchases and Payments
          </Typography>
          <Typography variant="body2" paragraph>
              All sales are final unless stated otherwise. Ensure all information provided during purchase is accurate.
          </Typography>
          <Typography variant="h6" gutterBottom>
              Limitation of Liability
          </Typography>
          <Typography variant="body2" paragraph>
              We are not liable for any damages arising from your use of our website, to the extent permitted by law.
          </Typography>
          <Typography variant="h6" gutterBottom>
              Contact Us
          </Typography>
          <Typography variant="body2" paragraph>
              For questions about these terms, please contact us at <Link href="mailto:info@gog-industry.com">info@gog-industry.com</Link>.
          </Typography>
      </Container>
  )
}

export default TermsAndConditions