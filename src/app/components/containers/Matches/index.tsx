'use client'

import { MatchDataType } from "@/app/common/validation/matches.schema";
import MatchCard from "@/app/components/containers/Matches/MatchItem";
import PageLoading from "@/app/components/containers/PageLoading";
import useDateFormatter from "@/app/hooks/useDateFormatter";
import { SportsSoccer } from "@mui/icons-material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Pagination,
  PaginationItem,
  Paper,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { getMatchesAction, makeSelectMatches, reset } from "@stores/reducers/matches";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Matches() {
  const dispatch = useDispatch();
  const formatter = useDateFormatter();
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState('kickOff');
  const [sortOrder, setSortOrder] = useState('asc');
  const { isCalling, matches, pagination,isCallingPage } = useSelector(makeSelectMatches);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    dispatch(reset());
  },[])
  useEffect(() => {
    dispatch(getMatchesAction({ page: pageNumber, limit: 5, sortBy: sortBy, sortOrder: sortOrder }));
  }, [pageNumber, sortBy, sortOrder, dispatch]);

  const handlePageChange = () => { 
    setPageNumber(pageNumber+1); 
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
               <MatchCard key={match.id} match={match} isMobile={isMobile} formatter={formatter} />
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No matches found
                </Typography>
              </Box>
            )}
            {isCallingPage && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <CircularProgress />
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
                py: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#fafafa'
              }}
            >
              {/* <Pagination
                count={pagination.totalPage}
                page={pageNumber}
                onChange={handlePageChange}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              /> */}
              {
                pageNumber < pagination.totalPage && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                    onClick={handlePageChange}
                  >
                   Show more
                  </Button>
                )
              }
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}