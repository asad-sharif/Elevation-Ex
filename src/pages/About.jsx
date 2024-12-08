import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Avatar,
  Button,
  Container,
  Fade,
  Slide,
} from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import FoundationIcon from '@mui/icons-material/Foundation';
import PublicIcon from '@mui/icons-material/Public';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import john from '../assets/john.jpg';
import jane from '../assets/jane.jpg';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid2';


const About = () => {
  return (
    <Box>
      {/* Header Section */}
      <div className='about-us-header h-[70vh] flex flex-col gap-6 justify-center items-center text-white'>
        <h2 className='text-3xl sm:text-5xl'>About Us</h2>
        <div className='text-center text-sm sm:text-base px-4'>
          <p>ELEVATION EX is the prominent entity of Pakistan.</p>
          <p>Established in 2010 in Sialkot, aiming to build the highest quality products with greatest value in Shoes and Leather Goods.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-12 px-4">
        <div className="mb-12 mx-auto text-center text-sm sm:text-xl">
          <p className="text-neutral-700 mt-4">ELEVATION EX is a team of dedicated and professional people and has the integrated business system that supports them. The members of the team have vast experience in the field of Shoes and Leather Goods. The team is fully devoted to face the market challenges and work hard to meet the expectations of the customers and believe in growing with them.</p>
        </div>

        {/* Journey Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: red[700],
            }}
          >
            Our Journey
          </Typography>
          <Timeline>
            {[
              { year: "2010", event: "Founded", icon: <FoundationIcon fontSize="large" /> },
              { year: "2015", event: "Expanded Facilities", icon: <Diversity1Icon fontSize="large" /> },
              { year: "2020", event: "International Expansion", icon: <PublicIcon fontSize="large" /> },
            ].map((item, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot sx={{ bgcolor: red[700], width: '80px', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {item.icon}
                  </TimelineDot>
                  {index < 2 && <TimelineConnector sx={{ height: '100px' }} />}
                </TimelineSeparator>
                <TimelineContent sx={{ mt: '40px' }}>
                  <Typography variant="h6" fontWeight="bold" color={red[700]}>
                    {item.year}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {item.event}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Box>

        {/* Meet Our Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: red[700],
              mb: '2rem',
            }}
          >
            Meet Our Team
          </Typography>
          
          <Grid container spacing={4} justifyContent={'center'}>
            {[
              {
                name: "John Doe",
                title: "Founder & CEO",
                img: john,
              },
              {
                name: "Jane Smith",
                title: "Lead Designer",
                img: jane,
              },
            ].map((member, index) => (
              <Grid key={index} item size={{ xs: 12, md: 4 }} >
                <Card sx={{ textAlign: "center", boxShadow: 3 }}>
                  <Avatar
                    alt={member.name}
                    src={member.img}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: "auto",
                      mt: 2,
                      boxShadow: 2,
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action Section */}
        <Paper
          elevation={3}
          sx={{
            py: 6,
            px: 2,
            textAlign: "center",
            bgcolor: red[700],
            color: "white",
            backgroundImage: "url('https://source.unsplash.com/1200x800/?team,collaboration')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography variant="h4" fontWeight="bold" mb={2}>
                Ready to Work With Us?
              </Typography>
              <Typography variant="body1" mb={4}>
                Let’s collaborate and take your business to new heights with our premium products and
                services.
              </Typography>
              <Button
                disableRipple
                variant="contained"
                sx={{
                  bgcolor: "white",
                  color: red[700],
                  "&:hover": { bgcolor: red[100] },
                }}
              >
                <Link to='/contact' style={{ textDecoration: 'none', color: red[700] }}>Contact Us Now</Link>
              </Button>
            </Box>
          </Fade>
        </Paper>
      </div>

    </Box>
  );
};

export default About;