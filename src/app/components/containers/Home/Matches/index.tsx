'use client'
import { getMatchesAction, makeSelectMatchesData } from '@/app/stores/reducers/matches'
import CardMatchCarousel from '@components/containers/Home/Matches/CardMatchCarousel'
import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Matches = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMatchesAction({ page: 1, limit: 5 }));
  }, []);
  const matches = useSelector(makeSelectMatchesData);
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
