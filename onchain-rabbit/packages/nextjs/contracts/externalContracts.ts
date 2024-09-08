import { erc20Abi } from "viem";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";


const externalContracts = {
11155111: {
      ETH: {
        address: "0x2e5221B0f855Be4ea5Cefffb8311EED0563B6e87",
        abi: erc20Abi,
      },
      MyToken: {
        address: "0x9363489f02713642EFb0C0E8560590C8E548261F",
        abi: erc20Abi,
      },
    },
    
  } as const;


export default externalContracts satisfies GenericContractsDeclaration;
