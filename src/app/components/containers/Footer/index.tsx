'use client';

import {
  Email,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Twitter,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';


export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              DuyNgo Dev
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Creating beautiful and functional websites with modern technologies. 
              Let&apos;s bring your ideas to life!
            </Typography>
            
            {/* Social Media Links */}
            <Stack direction="row" spacing={1}>
              <IconButton 
                aria-label="Facebook" 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton 
                aria-label="Twitter" 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <Twitter />
              </IconButton>
              <IconButton 
                aria-label="Instagram" 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <Instagram />
              </IconButton>
              <IconButton 
                aria-label="LinkedIn" 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                aria-label="GitHub" 
                sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
              >
                <GitHub />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About
              </Link>
              <Link href="/projects" color="inherit" underline="hover">
                Projects
              </Link>
              <Link href="/blog" color="inherit" underline="hover">
                Blog
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Services
            </Typography>
            <Stack spacing={1}>
              <Link href="/services/web-development" color="inherit" underline="hover">
                Web Development
              </Link>
              <Link href="/services/react-apps" color="inherit" underline="hover">
                React Applications
              </Link>
              <Link href="/services/ui-design" color="inherit" underline="hover">
                UI/UX Design
              </Link>
              <Link href="/services/seo" color="inherit" underline="hover">
                SEO Optimization
              </Link>
              <Link href="/services/consulting" color="inherit" underline="hover">
                Consulting
              </Link>
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Get In Touch
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2">
                  123 Developer Street, Tech City
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">
                  +1 (234) 567-8900
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">
                  contact@duyngodev.com
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} DuyNgo Dev. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.7 }}>
            Made with ❤️ using Next.js and Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}