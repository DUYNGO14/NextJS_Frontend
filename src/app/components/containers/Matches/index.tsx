'use client'

import { getMatchesAction, makeSelectMatches } from "@stores/reducers/matches";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MatchDataType } from "@/app/common/validation/matches.schema";
import PageLoading from "@/app/components/containers/PageLoading";
import useDateFormatter from "@/app/hooks/useDateFormatter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { 
  Box, 
  Button, 
  Container, 
  Pagination, 
  PaginationItem, 
  Paper, 
  Stack, 
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  IconButton
} from "@mui/material";
import Image from "next/image";
import { SportsSoccer } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
export default function Matches() {
  const dispatch = useDispatch();
  const formatter = useDateFormatter();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState('kickOff');
  const [sortOrder, setSortOrder] = useState('asc');
  const { isCalling, matches, pagination } = useSelector(makeSelectMatches);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(getMatchesAction({ page: pageNumber, limit: 5, sortBy: sortBy, sortOrder: sortOrder }));
  }, [pageNumber, sortBy, sortOrder, dispatch]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => { 
    setPageNumber(page); 
  };

  if (isCalling) return <PageLoading />;

  return (
    <Box sx={{ py: 2, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="md">
        <Paper 
          elevation={2} 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)'
          }}
        >
          {/* Header */}
          <Box 
            sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: 'white',
              py: 2,
              px: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1
            }}
          >
            <SportsSoccer />
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                textAlign: 'center',
                fontSize: { xs: '1.5rem', md: '2rem' }
              }}
            >
              Premier League Matches
            </Typography>
          </Box>

          {/* Matches List */}
          <Box sx={{ p: 2 }}>
            {matches && matches.length > 0 ? (
              matches.map((match: MatchDataType) => (
                <Card 
                  key={match.id} 
                  sx={{ 
                    mb: 2, 
                    borderRadius: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <Grid container alignItems="center" spacing={2}>
                      {!isMobile && (
                        <Grid item md={1}>
                          <Divider orientation="vertical" flexItem />
                        </Grid>
                      )}

                      {/* Teams */}
                      <Grid item xs={12} md={9} sx={{ textAlign: 'center' }}>
                        <Grid container alignItems="center" justifyContent="center" spacing={isMobile ? 1 : 3}>
                          {/* Home Team */}
                          <Grid item xs={5} sx={{ textAlign: 'right' }}>
                            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
                              <Typography variant="body1" noWrap>
                                {match.homeTeam}
                              </Typography>
                              <Box>
                                <Image
                                  src={match.homeLogo || '/placeholder-team-logo.png'}
                                  alt={match.homeTeam}
                                  width={50}
                                  height={50}
                                  style={{ objectFit: 'contain' }}
                                />
                              </Box>
                            </Stack>
                          </Grid>

                          {/* VS Separator */}
                          <Grid item xs={2}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Button sx={{ color: 'white' , backgroundColor: '#707171'}}>
                                {formatter.time(match.kickOff)}
                              </Button>
                            </Box>
                          </Grid>

                          {/* Away Team */}
                          <Grid item xs={5} sx={{ textAlign: 'left' }}>
                            <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1}>
                              <Box
                                sx={{
                                  width: 50,
                                  height: 50,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Image
                                  src={match.awayLogo || '/placeholder-team-logo.png'}
                                  alt={match.awayTeam}
                                  width={40}
                                  height={40}
                                  style={{ objectFit: 'contain' }}
                                />
                              </Box>
                               <Typography variant="body1" noWrap>
                                {match.awayTeam}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                        
                      </Grid>
                      <Grid item xs={12} md={1} sx={{ textAlign: "right" }}>
            <IconButton size="small">
              <KeyboardArrowDownIcon />
            </IconButton>
          </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No matches found
                </Typography>
              </Box>
            )}
          </Box>

          {/* Pagination */}
          {pagination && pagination.totalPage > 1 && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                py: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#fafafa'
              }}
            >
              <Pagination
                count={pagination.totalPage}
                page={pageNumber}
                onChange={handlePageChange}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}