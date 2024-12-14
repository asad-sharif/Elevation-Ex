import React from 'react'
import { Box, Typography, Container, Link } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <Container sx={{
            maxWidth: '80rem',
            mx: 'auto',
            my: { xs: '5rem', sm: '0' },
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
            px: '1rem'
        }}>
            <Typography variant="h4" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
                We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Information We Collect
            </Typography>
            <Typography variant="body2" paragraph>
                We may collect personal information such as your name, email address, and payment details when you interact with our website.
            </Typography>
            <Typography variant="h6" gutterBottom>
                How We Use Your Information
            </Typography>
            <Typography variant="body2" paragraph>
                Your data is used to provide services, process payments, and improve your experience on our platform. We do not share your information without your consent.
            </Typography>
            <Typography variant="h6" gutterBottom>
                Contact Us
            </Typography>
            <Typography variant="body2" paragraph>
                For questions about this policy, please contact us at <Link href="mailto:info@gog-industry.com">info@gog-industry.com</Link>.
            </Typography>
        </Container>
    )
}

export default PrivacyPolicy