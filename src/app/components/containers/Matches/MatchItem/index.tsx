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
  IconButton
} from "@mui/material";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MatchDataType } from "@/app/common/validation/matches.schema";

interface MatchCardProps {
  match: MatchDataType;
  isMobile: boolean;
  formatter: any;
}
export default function MatchCard({ match, isMobile, formatter }: MatchCardProps) {
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
          <Grid item xs={12} md={10} sx={{ textAlign: "center" }}>
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              spacing={isMobile ? 1 : 3}
            >
              {/* Home Team */}
              <Grid item xs={5} sx={{ textAlign: "right" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                  spacing={1}
                >
                  <Typography variant="body1" noWrap>
                    {match.homeTeam}
                  </Typography>
                  <Box>
                    <Image
                      src={match.homeLogo || "/placeholder-team-logo.png"}
                      alt={match.homeTeam}
                      width={50}
                      height={50}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                </Stack>
              </Grid>

              {/* VS / Kickoff */}
              <Grid item xs={2}>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#707171",
                      fontSize: "0.75rem",
                      borderRadius: "20px",
                      px: 2,
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
                  spacing={1}
                >
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src={match.awayLogo || "/placeholder-team-logo.png"}
                      alt={match.awayTeam}
                      width={40}
                      height={40}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                  <Typography variant="body1" noWrap>
                    {match.awayTeam}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          {/* Icon bên phải */}
          <Grid item xs={12} md={1} sx={{ textAlign: "right" }}>
            <IconButton size="small">
              <KeyboardArrowDownIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
