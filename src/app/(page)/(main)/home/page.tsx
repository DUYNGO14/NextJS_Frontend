
import { HeroSection } from '@components/containers/Home/HeroSection'
import Matches from '@components/containers/Home/Matches'
import RecentPost from '@components/containers/Home/RecentPost'
import { Box } from '@mui/material'
import React from 'react'

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <RecentPost />
      <Matches />
    </Box>
  )
}

export default HomePage
