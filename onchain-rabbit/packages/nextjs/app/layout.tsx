import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient } from "@tanstack/react-query";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import "~~/styles/globals.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "on-chain rabbit",
  description: "intent marketplace to explore the world onchain, as fast as a rabbit", 
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
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
