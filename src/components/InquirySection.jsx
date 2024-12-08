import { Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';


const InquirySection = () => {
    return (
        <Box
            sx={{
                bgcolor: 'rgba(0, 0, 0, 0.05)', // Light gray background
                py: 8, // Vertical padding
                px: { xs: 2, md: 4 }, // Responsive horizontal padding
                maxWidth: '80rem',
                mx: 'auto',
                borderRadius: 2,
            }}
        >
            <Typography
                variant="h4"
                component="h2"
                textAlign="center"
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 2 }}
            >
                Get in Touch with Us
            </Typography>
            <Typography
                variant="body1"
                textAlign="center"
                sx={{ mb: 6, maxWidth: '600px', mx: 'auto', color: 'gray' }}
            >
                Whether you’re interested in our products, need a quote for bulk orders, or have specific requirements, our team is here to assist you. Fill out the form below, and we’ll get back to you shortly.
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        variant="outlined"
                        required
                        sx={{ bgcolor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        required
                        type="email"
                        sx={{ bgcolor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Subject"
                        variant="outlined"
                        sx={{ bgcolor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        required
                        multiline
                        rows={4}
                        sx={{ bgcolor: 'white' }}
                    />
                </Grid>
                <Grid item xs={12} textAlign="center">
                    <Button
                        variant="contained"
                        color="customRed"
                        size="large"
                        sx={{ px: 6, py: 1.5, textTransform: 'capitalize', fontWeight: 'bold' }}
                    >
                        Send Inquiry
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default InquirySection;
