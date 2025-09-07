
import MainTemplate from "@components/templates/MainTemplate";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainTemplate>
      {children}
    </MainTemplate>
  );
}
