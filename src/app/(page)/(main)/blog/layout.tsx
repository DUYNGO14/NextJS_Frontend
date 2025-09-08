
import { Box } from "@mui/material";
import { Metadata } from "next";
export const metadata : Metadata = {
  title: "Blogs Page",
  description: "This is the blog page layout",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box component={"div"}>
      {children}
    </Box>
  );
}
