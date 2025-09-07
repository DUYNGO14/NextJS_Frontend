import { Footer } from "@components/containers";
import Header from "@components/containers/Header";
import { Box, Stack } from "@mui/material";

export default function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <Stack minHeight={"100vh"}>
      <Box component={"header"}>
        <Header />
      </Box>
      <Box component={"main"} sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Box component={"footer"}>
        <Footer />
      </Box>
    </Stack>
  )
}