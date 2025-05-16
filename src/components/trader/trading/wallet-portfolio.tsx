"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface WalletPortfolioProps {
  onClose: () => void;
  walletAddress: string;
}

export function WalletPortfolio({
  onClose,
  walletAddress,
}: WalletPortfolioProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [tokens, _setTokens] = useState([
    {
      symbol: "SOL",
      name: "Solana",
      icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
      balance: 0.42,
      value: 42.35,
      change: 2.4,
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
      balance: 105.25,
      value: 105.25,
      change: 0,
    },
    {
      symbol: "JUP",
      name: "Jupiter",
      icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/logo.svg",
      balance: 150,
      value: 75.45,
      change: -1.2,
    },
    {
      symbol: "BONK",
      name: "Bonk",
      icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png",
      balance: 1250000,
      value: 25.75,
      change: 5.8,
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="bg-black/50 absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-[#0B0B0F] h-full overflow-auto">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">{walletAddress}</span>
            <Button variant="ghost" className="p-1 h-auto">
              Copy
            </Button>
          </div>

          <Button variant="ghost" className="p-1 h-auto" onClick={onClose}>
            X
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-60px)]">
            <h2 className="text-2xl font-bold mb-2">Loading...</h2>
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : (
          <div className="p-4">
            <Tabs defaultValue="portfolio">
              <TabsList className="grid grid-cols-2 bg-[#1C1C28] rounded-lg p-1 mb-6">
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-[#2C2C38] data-[state=active]:text-white"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  className="data-[state=active]:bg-[#2C2C38] data-[state=active]:text-white"
                >
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="mt-0">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">Total Balance</h3>
                    <Button
                      variant="ghost"
                      className="p-1 h-auto text-gray-400"
                    >
                      Bal
                    </Button>
                  </div>
                  <div className="text-2xl font-bold">$248.80</div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Tokens</h3>
                  <div className="space-y-4">
                    {tokens.map((token, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#1C1C28] hover:bg-[#2C2C38] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#2C2C38] flex items-center justify-center overflow-hidden">
                            <img
                              src={token.icon || "/placeholder.svg"}
                              alt={token.name}
                              className="w-8 h-8"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{token.symbol}</div>
                            <div className="text-sm text-gray-400">
                              {token.balance.toLocaleString()} {token.symbol}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ${token.value.toFixed(2)}
                          </div>
                          <div
                            className={`text-sm ${
                              token.change > 0
                                ? "text-green-500"
                                : token.change < 0
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            {token.change > 0 ? "+" : ""}
                            {token.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1C1C28] flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    No recent activity
                  </h3>
                  <p className="text-gray-400 max-w-xs">
                    Your recent transactions and trading activity will appear
                    here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
