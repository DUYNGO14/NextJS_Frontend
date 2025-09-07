import { CardMatchProps } from '@components/containers/Home/Matches/CardMatch'
import CardMatchCarousel from '@components/containers/Home/Matches/CardMatchCarousel'
import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const Matches = () => {
  const matches : CardMatchProps[] = [
    {
      id: 1,
      homeTeam: 'MAN UTD',
      awayTeam: 'Liverpool',
      date: '2023-08-01',
      time: '19:00',
      location: 'Old Trafford',
      league: 'Premier League',
      homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png',
      awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/800px-Chelsea_FC.svg.png',
      infoButton: 'Match Info',
    },
    {
      id: 2,
      homeTeam: 'Chelsea',
      awayTeam: 'MAN UTD',
      date: '2023-08-02',
      time: '20:00',
      location: 'Emirates Stadium',
      league: 'Premier League',
      homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/800px-Chelsea_FC.svg.png',
      awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png',
      infoButton: 'Match Review',
    },
    {
      id: 3,
      homeTeam: 'Liverpool',
      awayTeam: 'MAN UTD',
      date: '2023-08-03',
      time: '21:00',
      location: 'Anfield',
      league: 'Premier League',
      homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Liverpool_FC_crest.svg/800px-Liverpool_FC_crest.svg.png',      
      awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png',
      infoButton: 'Match Info',
    },
    {
      id: 4,
      homeTeam: 'Arsenal',
      awayTeam: 'MAN UTD',
      date: '2023-08-04',
      time: '22:00',
      location: 'Emirates Stadium',      
      league: 'Premier League',
      homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Arsenal_FC_crest.svg/800px-Arsenal_FC_crest.svg.png',
      awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png',
    },
    {
      id: 5,
      homeTeam: 'MAN CITY',
      awayTeam: 'MAN UTD',
      date: '2025-08-05',
      time: '23:00',
      location: 'Etihad Stadium',      
      league: 'Premier League',      
      homeLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Manchester_City_FC_crest.svg/800px-Manchester_City_FC_crest.svg.png',
      awayLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/800px-Manchester_United_FC_crest.svg.png',
      infoButton: 'Match Review',
    }
  ]
  return (
    <Box component="section" sx={{ pt: { xs: 1, md: 3 }, pb: { xs: 2, md: 4 } }}>
      <Container>
       <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
          mb={5}
        >
          <Typography
            variant="h3"
            component="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Matches
          </Typography>
            <MuiLink component={Link} href={"/matches"}>
              All Matches
            </MuiLink>
        </Stack>  
        {/* Card Match */}
        <CardMatchCarousel matches={matches} />
        
      </Container>
    </Box>
  )
}

export default Matches
