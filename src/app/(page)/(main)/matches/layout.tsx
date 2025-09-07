
import { Box } from "@mui/material";
import { Metadata } from "next";
export const metadata : Metadata = {
  title: "Matches Page",
  description: "This is the matches page layout",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box component={"div"}>
      {children}
    </Box>
  );
}
