import { useEffect, useState } from "react";
import { usePrepareContractWrite, useContractWrite, useAccount } from "wagmi";
import abi from "./web3/abi.json";

function MintNFT() {
  const [walletAddress, setWalletAddress] = useState("");
  const metadataURL =
    "https://ipfs.io/ipfs/bafybeih3b6aqffzx6yhiv4ohlgk4cp62saszb7doyg5k6r2drzny3n5uqy/1.json";
  const account = useAccount();

  useEffect(() => {
    async function fetchAccount() {
      if (account && account.address) {
        console.log(account.address, "account address metamask");
        setWalletAddress(account.address); // Assuming setWalletAddress is the setter for the account state
      }
    }

    fetchAccount();
  }, []);
  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "mintNFT",
    args: [walletAddress, metadataURL],
  });

  const { write } = useContractWrite(config);

  return (
    <div>
      <button onClick={() => write?.()}>Mint NFT</button>
    </div>
  );
}

export default MintNFT;
