
import { Box } from "@mui/material";
import { Metadata } from "next";
export const metadata : Metadata = {
  title: "Profile",
  description: "This is the profile page.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box component={"div"}>
      {children}
    </Box>
  );
}
