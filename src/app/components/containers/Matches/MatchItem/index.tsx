/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
  Box,
  Divider,
  Button,
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { MatchDataType } from "@/app/common/validation/matches.schema";
import { useState } from "react";

interface MatchCardProps {
  match: MatchDataType;
  isMobile: boolean;
  formatter: any;
}

export default function MatchCard({ match, isMobile, formatter }: MatchCardProps) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  
  return (
    <Card
      key={match.id}
      sx={{
        mb: 2,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
        position: 'relative' // Thêm position relative cho card
      }}
    >
      <CardContent sx={{ py: { xs: 1.5, sm: 2 }, px: { xs: 1, sm: 2 } }}>
        <Grid container alignItems="center" spacing={{ xs: 1, sm: 2 }}>
          {/* Vertical divider - hidden on mobile */}
          {!isMobile && !isSm && (
            <Grid item md={1}>
              <Divider orientation="vertical" flexItem />
            </Grid>
          )}

          {/* Teams Section */}
          <Grid
            item
            xs={12}
            md={isMobile || isSm ? 12 : 10}
            sx={{ textAlign: "center" }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={{ xs: 0.5, sm: 1, md: 3 }}
            >
              {/* Home Team */}
              <Grid item xs={5} sx={{ textAlign: "right" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={{ xs: 0.5, sm: 1 }}
                >
                  <Typography
                    variant={isXs ? "body2" : "body1"}
                    noWrap
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      fontWeight: { xs: 500, md: 400 }
                    }}
                  >
                    {match.homeTeam}
                  </Typography>
                  <Box
                    sx={{
                      width: { xs: 32, sm: 40, md: 50 },
                      height: { xs: 32, sm: 40, md: 50 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Image
                      src={match.homeLogo || "/placeholder-team-logo.png"}
                      alt={match.homeTeam}
                      width={isXs ? 32 : isSm ? 40 : 50}
                      height={isXs ? 32 : isSm ? 40 : 50}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                </Stack>
              </Grid>
              
              {/* VS/Time Button */}
              <Grid item xs={2}>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#707171",
                      fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.75rem" },
                      borderRadius: "20px",
                      px: { xs: 1, sm: 1.5, md: 2 },
                      py: { xs: 0.5, sm: 0.75 },
                      minWidth: { xs: "auto", sm: "auto" },
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#5a5a5a",
                      }
                    }}
                  >
                    {formatter.time(match.kickOff)}
                  </Button>
                </Box>
              </Grid>

              {/* Away Team */}
              <Grid item xs={5} sx={{ textAlign: "left" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  spacing={{ xs: 0.5, sm: 1 }}
                >
                  <Box
                    sx={{
                      width: { xs: 32, sm: 40, md: 50 },
                      height: { xs: 32, sm: 40, md: 50 },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Image
                      src={match.awayLogo || "/placeholder-team-logo.png"}
                      alt={match.awayTeam}
                      width={isXs ? 32 : isSm ? 40 : 50}
                      height={isXs ? 32 : isSm ? 40 : 50}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                  <Typography
                    variant={isXs ? "body2" : "body1"}
                    noWrap
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      fontWeight: { xs: 500, md: 400 }
                    }}
                  >
                    {match.awayTeam}
                  </Typography>
                </Stack>
              </Grid>
              
              {/* Expanded Content - Location */}
              {show && (
                <Grid item xs={12}>
                  <Typography
                    variant={isXs ? "body2" : "body1"}
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      fontWeight: { xs: 500, md: 400 },
                      mt: { xs: 1, md: 2 },
                      color: 'text.secondary'
                    }}
                  >
                    📍 {match.location}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>

          {/* Desktop Icon - Only show on desktop */}
          {!isMobile && !isSm && (
            <Grid item md={1} sx={{ textAlign: "right" }}>
              <IconButton
                size="medium"
                onClick={handleClick}
                sx={{
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    backgroundColor: "rgba(0, 0, 0, 0.04)"
                  }
                }}
              >
                {show ? (
                  <KeyboardArrowUpIcon sx={{ fontSize: '1.5rem' }} />
                ) : (
                  <KeyboardArrowDownIcon sx={{ fontSize: '1.5rem' }} />
                )}
              </IconButton>
            </Grid>
          )}
        </Grid>
      </CardContent>
      
      {/* Mobile Icon - Positioned absolutely on mobile */}
      {(isMobile || isSm) && (
        <IconButton
          size={isXs ? "small" : "medium"}
          onClick={handleClick}
          sx={{
            position: 'absolute',
            top: { xs: 8, sm: 12 },
            right: { xs: 8, sm: 12 },
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
            }
          }}
        >
          {show ? (
            <KeyboardArrowUpIcon
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                color: '#666'
              }}
            />
          ) : (
            <KeyboardArrowDownIcon
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                color: '#666'
              }}
            />
          )}
        </IconButton>
      )}
    </Card>
  );
}