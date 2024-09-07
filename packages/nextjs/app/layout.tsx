import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient } from "@tanstack/react-query";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Funny Money",
  description: "make money, anon",
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {

  return (
    <html suppressHydrationWarning className="bg-background selection:bg-[#52ff72] selection:text-[#ff4ded]">
      <body>
        <ThemeProvider enableSystem>
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
