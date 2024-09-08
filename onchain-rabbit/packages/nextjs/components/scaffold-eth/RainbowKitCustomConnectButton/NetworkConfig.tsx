import { rpcConfig } from "../../../config";
import { defineChain } from "viem";

export const AlephZero = defineChain({
  id: 2039,
  name: "Aleph Zero",
  nativeCurrency: {
    decimals: 18,
    name: "TZERO",
    symbol: "TZERO",
  },
  rpcUrls: {
    default: {
      http: [`https://rpc.alephzero.raas.gelato.cloud`],
      webSocket: [""],
    },
  },
  blockExplorers: {
    default: { name: "etherscan", url: "https://sepolia.etherscan.io/" },
  },
  testnet: true,
});

export const Mantle = defineChain({
  id: 5000,
  name: "Mantle",
  nativeCurrency: {
    decimals: 18,
    name: "MNT",
    symbol: "MNT",
  },
  rpcUrls: {
    default: {
      http: [`https://rpc.mantle.xyz`],
      webSocket: [""],
    },
  },
  blockExplorers: {
    default: { name: "mantleexplorer", url: "https://rpc.mantle.xyz" },
  },
  testnet: false,
});

export const Sei = defineChain({
  id: 1329,
  name: "Sei Network",
  nativeCurrency: {
    decimals: 18,
    name: "Sei",
    symbol: "Sei",
  },
  rpcUrls: {
    default: {
      http: [`https://evm-rpc.sei-apis.com`],
      webSocket: [""],
    },
  },
  blockExplorers: {
    default: { name: "sei", url: "https://evm-rpc.sei-apis.com" },
  },
  testnet: false,
});

