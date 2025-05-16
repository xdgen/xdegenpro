"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Wallet,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

export default function TraderDashboard() {
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <div className="flex min-h-screen flex-col p-6">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Xdegen Pro
              </span>
            </a>
            <nav className="hidden gap-6 md:flex">
              <a
                href="/trader"
                className="flex items-center text-lg font-medium"
              >
                Trader Dashboard
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {walletConnected ? (
              <Button variant="outline" size="sm" className="h-9">
                <Wallet className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline-block">0x1a2...3b4c</span>
                <span className="sm:hidden">0x1a2...3b4c</span>
              </Button>
            ) : (
              <Button
                onClick={() => setWalletConnected(true)}
                size="sm"
                className="h-9"
              >
                <Wallet className="mr-2 h-4 w-4" />
                <span>Connect Wallet</span>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex items-center gap-2 mb-6">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </a>
          </div>

          {!walletConnected ? (
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Connect Your Wallet</CardTitle>
                <CardDescription>
                  Connect your Solana wallet to access the trader dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 text-center">
                  <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    All transactions happen on-chain for full transparency
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setWalletConnected(true)}
                  className="w-full"
                >
                  Connect Wallet
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Tabs defaultValue="marketplace" className="space-y-6">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="marketplace">
                    Account Marketplace
                  </TabsTrigger>
                  <TabsTrigger value="challenge">Challenge</TabsTrigger>
                  <TabsTrigger value="trading">Trading</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    Balance: 250 USDC
                  </Badge>
                </div>
              </div>

              <TabsContent value="marketplace" className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Account Marketplace
                    </h2>
                    <p className="text-muted-foreground">
                      Browse available trading accounts and choose one that fits
                      your strategy
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        size: 200,
                        buyIn: 20,
                        target: "2x",
                        risk: "10%",
                        challenge: "$200 → $400",
                      },
                      {
                        size: 500,
                        buyIn: 50,
                        target: "3x",
                        risk: "10%",
                        challenge: "$500 → $1,000",
                      },
                      {
                        size: 1000,
                        buyIn: 100,
                        target: "2.5x",
                        risk: "5%",
                        challenge: "$1,000 → $2,000",
                      },
                      {
                        size: 300,
                        buyIn: 30,
                        target: "2x",
                        risk: "5%",
                        challenge: "$300 → $600",
                      },
                      {
                        size: 700,
                        buyIn: 70,
                        target: "2.5x",
                        risk: "7%",
                        challenge: "$700 → $1,400",
                      },
                    ].map((account, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <CardTitle>${account.size} Account</CardTitle>
                          <CardDescription>
                            Buy-in: ${account.buyIn} (10%)
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Profit Target
                              </p>
                              <p className="text-2xl font-bold">
                                {account.target}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Risk Limit</p>
                              <p className="text-2xl font-bold">
                                {account.risk}
                              </p>
                            </div>
                          </div>
                          <div className="rounded-lg bg-muted p-3">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Challenge</p>
                              <p className="text-sm">{account.challenge}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Buy Account (${account.buyIn})
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="challenge" className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Trading Challenge
                    </h2>
                    <p className="text-muted-foreground">
                      Complete the challenge to unlock your funded account
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Active Challenge</CardTitle>
                        <CardDescription>
                          $500 Account Challenge
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Starting Balance
                            </p>
                            <p className="text-2xl font-bold">$500</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Current Balance
                            </p>
                            <p className="text-2xl font-bold">$780</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Target</p>
                          <p className="text-2xl font-bold">$1,000</p>
                        </div>
                        <div className="rounded-lg bg-muted p-3 mt-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Progress</p>
                              <p className="text-sm">78% Complete</p>
                            </div>
                            <div className="h-2 w-24 rounded-full bg-primary/20">
                              <div className="h-full w-[78%] rounded-full bg-primary"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <a
                          href="/trader/trading"
                          className="w-full border bg-black p-2 text-white rounded-md"
                        >
                          Open Trading Terminal
                        </a>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Challenge Rules</CardTitle>
                        <CardDescription>
                          Requirements to pass the challenge
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Profit Target</p>
                              <p className="text-sm text-muted-foreground">
                                Reach $1,000 from starting $500
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Risk Limit</p>
                              <p className="text-sm text-muted-foreground">
                                Don't lose more than 10% ($50)
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                            <div>
                              <p className="font-medium">Time Limit</p>
                              <p className="text-sm text-muted-foreground">
                                Complete within 30 days
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4 mt-2">
                          <p className="text-sm font-medium">
                            What happens after the challenge?
                          </p>
                          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>Pass: Get access to real $500 account</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span>Fail: Lose your $50 buy-in fee</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trading" className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Live Trading
                    </h2>
                    <p className="text-muted-foreground">
                      Manage your funded trading account
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Status</CardTitle>
                        <CardDescription>$500 Funded Account</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Current Balance
                            </p>
                            <p className="text-2xl font-bold">$850</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Target</p>
                            <p className="text-2xl font-bold">$1,500</p>
                          </div>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Progress</p>
                              <p className="text-sm">35% Complete</p>
                            </div>
                            <div className="h-2 w-24 rounded-full bg-primary/20">
                              <div className="h-full w-[35%] rounded-full bg-primary"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <a
                          href="/trader/trading"
                          className="w-full border bg-black p-2 text-white rounded-md"
                        >
                          Open Trading Terminal
                        </a>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Safety Metrics</CardTitle>
                        <CardDescription>
                          Risk management status
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">Risk Limit</p>
                              <p className="text-sm font-medium">10% ($50)</p>
                            </div>
                            <div className="h-2 rounded-full bg-primary/20">
                              <div className="h-full w-[30%] rounded-full bg-amber-500"></div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Current drawdown: 3% ($15)
                            </p>
                          </div>

                          <div className="rounded-lg border p-3">
                            <div className="flex items-center space-x-2">
                              <ShieldAlert className="h-5 w-5 text-amber-500" />
                              <p className="text-sm font-medium">
                                Safety Bot Active
                              </p>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Automatic protection will trigger if losses reach
                              $50
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Profit Sharing</CardTitle>
                        <CardDescription>
                          When you hit the target
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              Your Share (60%)
                            </p>
                            <p className="text-sm font-medium">$600</p>
                          </div>
                          <div className="h-2 rounded-full bg-primary/20">
                            <div className="h-full w-[60%] rounded-full bg-green-500"></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">
                              Investor Share (40%)
                            </p>
                            <p className="text-sm font-medium">$400</p>
                          </div>
                          <div className="h-2 rounded-full bg-primary/20">
                            <div className="h-full w-[40%] rounded-full bg-blue-500"></div>
                          </div>
                        </div>

                        <div className="rounded-lg border p-3 mt-2">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <p className="text-sm font-medium">
                              Potential Payout
                            </p>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            $600 profit + $50 buy-in returned = $650 total
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Trades</CardTitle>
                      <CardDescription>Your trading activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                          <div>Pair</div>
                          <div>Type</div>
                          <div>Size</div>
                          <div>Entry/Exit</div>
                          <div>P/L</div>
                        </div>
                        {[
                          {
                            pair: "SOL/USDC",
                            type: "Long",
                            size: "$100",
                            entry: "22.45 / 24.30",
                            pl: "+$8.20",
                          },
                          {
                            pair: "BTC/USDC",
                            type: "Short",
                            size: "$150",
                            entry: "28,450 / 27,890",
                            pl: "+$12.50",
                          },
                          {
                            pair: "ETH/USDC",
                            type: "Long",
                            size: "$200",
                            entry: "1,850 / 1,820",
                            pl: "-$3.25",
                          },
                          {
                            pair: "AVAX/USDC",
                            type: "Long",
                            size: "$75",
                            entry: "12.80 / 13.45",
                            pl: "+$3.80",
                          },
                        ].map((trade, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-5 gap-4 p-4 border-b last:border-0"
                          >
                            <div>{trade.pair}</div>
                            <div
                              className={
                                trade.type === "Long"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {trade.type}
                            </div>
                            <div>{trade.size}</div>
                            <div>{trade.entry}</div>
                            <div
                              className={
                                trade.pl.startsWith("+")
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {trade.pl}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      Trading History
                    </h2>
                    <p className="text-muted-foreground">
                      Your past trading accounts and performance
                    </p>
                  </div>

                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Completed Accounts</CardTitle>
                        <CardDescription>
                          Your past funded accounts
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                            <div>Account Size</div>
                            <div>Buy-In</div>
                            <div>Target</div>
                            <div>Result</div>
                            <div>Payout</div>
                          </div>
                          {[
                            {
                              size: "$200",
                              buyIn: "$20",
                              target: "2x",
                              result: "Success",
                              payout: "$120",
                            },
                            {
                              size: "$500",
                              buyIn: "$50",
                              target: "2.5x",
                              result: "Failed",
                              payout: "$0",
                            },
                            {
                              size: "$300",
                              buyIn: "$30",
                              target: "2x",
                              result: "Success",
                              payout: "$180",
                            },
                          ].map((account, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-5 gap-4 p-4 border-b last:border-0"
                            >
                              <div>{account.size}</div>
                              <div>{account.buyIn}</div>
                              <div>{account.target}</div>
                              <div
                                className={
                                  account.result === "Success"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {account.result}
                              </div>
                              <div>{account.payout}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Challenge History</CardTitle>
                        <CardDescription>
                          Your past challenge attempts
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-md border">
                          <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                            <div>Account Size</div>
                            <div>Challenge</div>
                            <div>Date</div>
                            <div>Result</div>
                          </div>
                          {[
                            {
                              size: "$200",
                              challenge: "$200 → $400",
                              date: "Mar 15, 2025",
                              result: "Passed",
                            },
                            {
                              size: "$500",
                              challenge: "$500 → $1,250",
                              date: "Feb 28, 2025",
                              result: "Failed",
                            },
                            {
                              size: "$300",
                              challenge: "$300 → $600",
                              date: "Jan 10, 2025",
                              result: "Passed",
                            },
                            {
                              size: "$1,000",
                              challenge: "$1,000 → $2,000",
                              date: "Dec 05, 2024",
                              result: "Failed",
                            },
                          ].map((challenge, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-4 gap-4 p-4 border-b last:border-0"
                            >
                              <div>{challenge.size}</div>
                              <div>{challenge.challenge}</div>
                              <div>{challenge.date}</div>
                              <div
                                className={
                                  challenge.result === "Passed"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {challenge.result}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 Xdegen Pro. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="/terms"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
