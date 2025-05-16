import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalletPortfolio } from "./wallet-portfolio";

export default function TradingPage() {
  // const [walletConnected, setWalletConnected] = useState(true);
  const [walletAddress, _setWalletAddress] = useState("xr...r5");
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [sellToken, setSellToken] = useState({
    symbol: "USDC",
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    balance: 0.40945,
    value: 0,
  });
  const [buyToken, setBuyToken] = useState({
    symbol: "SOL",
    icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    balance: 0.00206724,
    value: 0,
  });

  const togglePortfolio = () => {
    setShowPortfolio(!showPortfolio);
  };

  const swapTokens = () => {
    const temp = sellToken;
    setSellToken(buyToken);
    setBuyToken(temp);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0B0B0F] text-white p-4">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0B0B0F]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0B0B0F]/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">
                X<span className="text-green-400">Pro</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-1 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={togglePortfolio}
            >
              Portfolio
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none z-0"
          style={{
            backgroundImage: "url('https://jup.ag/images/jupiter-bg.jpg')",
          }}
        ></div>

        <div className="container relative z-10 py-8">
          <div className="max-w-md mx-auto">
            {/* <Tabs defaultValue="instant" className="mb-6">
              <TabsList className="grid grid-cols-3 bg-[#1C1C28] rounded-lg p-1">
                <TabsTrigger
                  value="instant"
                  className={cn(
                    "flex items-center gap-1 rounded-md data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400",
                    "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400"
                  )}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 5L21 12L13 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 12H3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Instant
                </TabsTrigger>
                <TabsTrigger
                  value="trigger"
                  className={cn(
                    "flex items-center gap-1 rounded-md data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400",
                    "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400"
                  )}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 6V12L16 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Trigger
                </TabsTrigger>
                <TabsTrigger
                  value="recurring"
                  className={cn(
                    "flex items-center gap-1 rounded-md data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400",
                    "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-400"
                  )}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 1L21 5L17 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 11V9C3 7.93913 3.42143 6.92172 4.17157 6.17157C4.92172 5.42143 5.93913 5 7 5H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 23L3 19L7 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 13V15C21 16.0609 20.5786 17.0783 19.8284 17.8284C19.0783 18.5786 18.0609 19 17 19H3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Recurring
                </TabsTrigger>
              </TabsList>
            </Tabs> */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs">
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 5L21 12L13 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Ultra V2
                <svg
                  className="h-3 w-3 ml-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 12H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 18H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <Button variant="ghost" className="p-1 h-auto text-gray-400">
                Path
              </Button>
            </div>

            {/* Selling Token */}
            <div className="bg-[#1C1C28] rounded-lg p-4 mb-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Selling</span>
                <span className="text-xs text-gray-500">
                  {sellToken.balance} {sellToken.symbol}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2C2C38] flex items-center justify-center overflow-hidden">
                    <img
                      src={sellToken.icon || "/placeholder.svg"}
                      alt={sellToken.symbol}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="font-medium">{sellToken.symbol}</span>
                  </div>
                </div>

                <div className="text-right">
                  <input
                    type="text"
                    value={sellToken.value || "0.00"}
                    onChange={(e) =>
                      setSellToken({
                        ...sellToken,
                        value: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="bg-transparent text-2xl text-right w-full focus:outline-none"
                    placeholder="0.00"
                  />
                  <div className="text-xs text-gray-500">$0</div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <Button
                  variant="ghost"
                  className="h-6 px-2 py-1 text-xs bg-[#2C2C38] text-gray-300 hover:bg-[#3C3C48]"
                >
                  HALF
                </Button>
                <Button
                  variant="ghost"
                  className="h-6 px-2 py-1 text-xs bg-[#2C2C38] text-gray-300 hover:bg-[#3C3C48]"
                >
                  MAX
                </Button>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-3 relative z-10">
              <Button
                variant="ghost"
                className="rounded-full w-8 h-8 bg-[#1C1C28] border border-gray-700 p-0 flex items-center justify-center"
                onClick={swapTokens}
              >
                Swap
              </Button>
            </div>

            {/* Buying Token */}
            <div className="bg-[#1C1C28] rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Buying</span>
                <span className="text-xs text-gray-500">
                  {buyToken.balance} {buyToken.symbol}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#2C2C38] flex items-center justify-center overflow-hidden">
                    <img
                      src={buyToken.icon || "/placeholder.svg"}
                      alt={buyToken.symbol}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="font-medium">{buyToken.symbol}</span>
                    buy
                  </div>
                </div>

                <div className="text-right">
                  <input
                    type="text"
                    value={buyToken.value || "0.00"}
                    onChange={(e) =>
                      setBuyToken({
                        ...buyToken,
                        value: Number.parseFloat(e.target.value) || 0,
                      })
                    }
                    className="bg-transparent text-2xl text-right w-full focus:outline-none"
                    placeholder="0.00"
                  />
                  <div className="text-xs text-gray-500">$0</div>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <Button className="w-full py-6 text-lg font-medium bg-green-500 hover:bg-green-600 text-black rounded-lg">
              Enter an amount
            </Button>
          </div>
        </div>
      </main>

      {/* Wallet Portfolio Sidebar */}
      {showPortfolio && (
        <WalletPortfolio
          onClose={togglePortfolio}
          walletAddress={walletAddress}
        />
      )}
    </div>
  );
}
