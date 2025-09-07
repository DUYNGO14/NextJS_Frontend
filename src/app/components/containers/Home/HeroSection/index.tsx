import { logoSection } from '@/app/images';
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export function HeroSection() {
  // Fallback to remote image if local avatar doesn't exis

  return (
    <Box component="section" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 8 } }}>
      <Container>
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Text Content */}
          <Box sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: 600 }}>
            <Typography
              component="h1"
              variant="h3"
              fontWeight="bold"
              mb={3}
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: 1.2
              }}
            >
              Hi, I&apos;m Manchester United,<br /> a club football in England.
            </Typography>
            <Typography
              variant="h6"
              mb={4}
              color="text.secondary"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                px: { xs: 2, sm: 0 }
              }}
            >
              A passionate developer who loves building web applications and exploring new technologies.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Learn more
            </Button>
          </Box>

          {/* Avatar Image */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: { xs: 4, md: 0 }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 200, sm: 250, md: 300 },
                height: { xs: 200, sm: 250, md: 300 },
                borderRadius: '50%',
                overflow: 'hidden',
                //border: 4,
                //borderColor: 'primary.main',
                boxShadow: 3,
              }}
            >
              <Image
                src={logoSection}
                alt="DuyNgo"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}