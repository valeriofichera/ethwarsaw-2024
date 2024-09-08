"use client";

// @refresh reset
import { useContext, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAccount } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";
import { checkInvite } from "~~/services/funny/backendConnector";
import { FunnyContext } from "~~/services/funny/funnyContext";
import { truncateStr } from "~~/services/funny/funnyUtils";
import Alerting from "~~/components/Alerting";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export let connectedAddress: string | null = null;

export const WhiteListConnectButton = (params: any) => {
  const [addressCopied, setAddressCopied] = useState(false);
  const { address } = useAccount();
  const { code } = params;
  const context = useContext(FunnyContext);

  const { verified, setIsVerified }: any = context;

  const handleVerification = async () => {
    // console.log("hi ", address, params.code);
    const invRes = await checkInvite(address || "", code);
    console.log(invRes);
    setIsVerified(invRes.message.data);
    // ToDo - show info in @ALERT
    // ToDo - e.g. correct alert if user have been verified or is already verified, negative if code has been already used or is incorrect
  };

  return (
    <div className="mt-4">
      <ConnectButton.Custom>
        {({ account, openConnectModal, mounted }) => {
          const connected = mounted && account;
          if (connected) {
            connectedAddress = account.address;
          } else {
            connectedAddress = null;
          }

          return (
            <>
              {(() => {
                if (!connected) {
                  return (
                    <>
                      <button
                        className="text-[#FF82EC] hover:text-blue-500 text-sm mt-2"
                        onClick={openConnectModal}
                        type="button"
                      >
                        whitelist wallet
                      </button>
                    </>
                  );
                }

                return (
                  <>
                    <div className="flex flex-col items-center mr-1">
                      <CopyToClipboard
                        text={account.address ? account.address : ""}
                        onCopy={() => {
                          setAddressCopied(true);
                          setTimeout(() => {
                            setAddressCopied(false);
                          }, 800);
                        }}
                      >
                        <div className="btn-sm !rounded-xl flex gap-3 py-3">
                          {addressCopied ? (
                            <CheckCircleIcon
                              className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <DocumentDuplicateIcon
                              className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                              aria-hidden="true"
                            />
                          )}
                          {/* <span className=" whitespace-nowrap">Copy address</span> */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-xs">
                                  Connected as:{" "}
                                  {account.address.length > 0 ? truncateStr(account.address) : account.address}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="bg-black/40 backdrop-blur-md">
                                <p className="text-xs">{account.address}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </CopyToClipboard>
                      <button
                        className="text-[#FF82EC] hover:text-blue-500 text-sm mt-2"
                        onClick={async () => {
                          await handleVerification();
                          window.location.reload();
                        }}
                      >
                        sign in
                      </button>
                      {!verified && <Alerting identifier="login_error" />}
                    </div>
                  </>
                );
              })()}
            </>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};
