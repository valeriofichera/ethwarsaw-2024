"use client";

import { useContext, useEffect, useState } from "react";
import "../styles/globals.css";
// import { Alert } from "./ui/alert";
import Alerting from "./Alerting";
import { DesktopOnly } from "./DesktopOnly";
import RetroLoadingScreen from "./loading/RetroLoadingScreen";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider, useAccount } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { checkInvite } from "~~/services/funny/backendConnector";
import { FunnyProvider } from "~~/services/funny/funnyContext";
import { FunnyContext } from "~~/services/funny/funnyContext";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { SideBar } from "./SideBar";
import { LogOutPopUp } from "./LogOutPopUp";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const VisibleWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isVerified, setIsVerified] = useState(false);
  const { address } = useAccount();
  const context = useContext(FunnyContext);
  const { isLoading, setIsLoading }: any = context;

  useEffect(() => {
    (async () => {
      if (!address) {
        setIsVerified(false);
      } else {
        try {
          console.log(address);
          const invRes = await checkInvite(address, "");
          console.log(invRes.message.data);
          setIsVerified(invRes.message.data);
        } catch (err) {
          console.error(err);
        }
      }
      setIsLoading(false);
      console.log(isLoading, " ", isVerified);
    })();
  }, [address]);

  return isLoading ? (
    <RetroLoadingScreen />
  ) : (
    <>
      <Alerting identifier="login_success" />
      <div className="flex h-screen bg-background overflow-hidden">
        <LogOutPopUp />
        <DesktopOnly />
        <div className="sticky top-0 h-screen z-10">
          <SideBar />
        </div>
        <main className="p-6 relative flex flex-col flex-1 h-full overflow-auto">{children}</main>
      </div>
      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  // const [isVerified, setIsVerified] = useState(false);
  // const { address } = useAccount();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);
  // const verified = false;

  useEffect(() => {
    (async () => {
      // setIsVerified(await fetchUserData(address));
      setMounted(true);
    })();
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          avatar={BlockieAvatar}
          theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
        >
          <FunnyProvider>
            <VisibleWrapper>{children}</VisibleWrapper>
          </FunnyProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
