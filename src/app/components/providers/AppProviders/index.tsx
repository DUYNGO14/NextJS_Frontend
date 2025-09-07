import PersistProvider from "@/app/components/providers/PersistProvider";
import Notification from "@components/containers/Notification";
import MuiThemeProviders from "@components/providers/MuiThemeProviders";
import ReduxProviders from "@components/providers/ReduxProviders";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProviders>
      <PersistProvider>
        <MuiThemeProviders>
          <Notification />
          {children}
        </MuiThemeProviders>
      </PersistProvider>
    </ReduxProviders>
  );
}
