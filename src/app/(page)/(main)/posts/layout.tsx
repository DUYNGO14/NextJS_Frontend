
import { Box } from "@mui/material";
import { Metadata } from "next";
export const metadata : Metadata = {
  title: "Posts Page",
  description: "This is the posts page layout",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box component={"div"}>
      {children}
    </Box>
  );
}
