"use client";


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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Wallet,
  CheckCircle,
  TrendingUp,
  ShieldAlert,
  UserCheck,
  UserX,
  Check,
  X,
  TrendingDown,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Progress } from "../ui/progress";


interface TraderApplication {
  id: string;
  traderId: string;
  accountAmount: number;
  successfulTrades: number;
  failedTrades: number;
  winRate: number;
  challengesPassed: number;
  totalChallenges: number;
  status: "pending" | "approved" | "declined";
}

const mockApplications: TraderApplication[] = [
  {
    id: "APP-001",
    traderId: "Trader #4",
    accountAmount: 500,
    successfulTrades: 2,
    failedTrades: 1,
    winRate: 67,
    challengesPassed: 2,
    totalChallenges: 3,
    status: "pending",
  },
  {
    id: "APP-002",
    traderId: "Trader #5",
    accountAmount: 300,
    successfulTrades: 1,
    failedTrades: 0,
    winRate: 100,
    challengesPassed: 2,
    totalChallenges: 3,
    status: "pending",
  },
  {
    id: "APP-003",
    traderId: "Trader #6",
    accountAmount: 1000,
    successfulTrades: 3,
    failedTrades: 2,
    winRate: 60,
    challengesPassed: 2,
    totalChallenges: 3,
    status: "pending",
  },
];

export default function InvestorDashboard() {

  const [applications, setApplications] =
  useState<TraderApplication[]>(mockApplications);
  // const [activeTab, setActiveTab] = useState("Applications");

  const handleApprove = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: "approved" as const } : app
      )
    );
  };

  const handleDecline = (applicationId: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: "declined" as const } : app
      )
    );
  };

  // const getWinRateColor = (winRate: number) => {
  //   if (winRate >= 80) return "text-green-600";
  //   if (winRate >= 60) return "text-yellow-600";
  //   return "text-red-600";
  // };

  const getWinRateBadgeVariant = (winRate: number) => {
    if (winRate >= 80) return "default";
    if (winRate >= 60) return "secondary";
    return "destructive";
  };
  return (
    <div className="flex min-h-screen flex-col p-4 ">
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
                href="/investor"
                className="flex items-center text-lg font-medium"
              >
                Investor Dashboard
              </a>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="outline" size="sm" className="h-9">
              <Wallet className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline-block">0x1a2...3b4c</span>
              <span className="sm:hidden">0x1a2...3b4c</span>
            </Button>
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

          <Tabs defaultValue="dashboard" className="space-y-6">
            <div className="flex flex-col gap-y-5 justify-between items-center lg:flex-row">
              {" "}
              {/* <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Completed Investments</CardTitle>
                      <CardDescription>
                        Past funded accounts and their outcomes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                          <div>Account Size</div>
                          <div>Target</div>
                          <div>Trader</div>
                          <div>Result</div>
                          <div>Your Profit</div>
                          <div>Date</div>
                        </div>
                        {[
                          {
                            size: "$500",
                            target: "3x",
                            trader: "Trader #7",
                            result: "Success",
                            profit: "+$400",
                            date: "Mar 10, 2025",
                          },
                          {
                            size: "$200",
                            target: "2x",
                            trader: "Trader #8",
                            result: "Failed",
                            profit: "-$20",
                            date: "Feb 15, 2025",
                          },
                          {
                            size: "$1,000",
                            target: "2.5x",
                            trader: "Trader #9",
                            result: "Success",
                            profit: "+$600",
                            date: "Jan 20, 2025",
                          },
                          {
                            size: "$300",
                            target: "2x",
                            trader: "Trader #10",
                            result: "Failed",
                            profit: "-$30",
                            date: "Dec 05, 2024",
                          },
                        ].map((investment, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-6 gap-4 p-4 border-b last:border-0"
                          >
                            <div>{investment.size}</div>
                            <div>{investment.target}</div>
                            <div>{investment.trader}</div>
                            <div
                              className={
                                investment.result === "Success"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {investment.result}
                            </div>
                            <div
                              className={
                                investment.profit.startsWith("+")
                                  ? "text-green-500"
                                  : "text-red-500"
                              }
                            >
                              {investment.profit}
                            </div>
                            <div>{investment.date}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Summary</CardTitle>
                      <CardDescription>
                        Overall investment performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-lg border p-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">
                              Total Investments
                            </p>
                            <p className="text-2xl font-bold">$4,500</p>
                            <p className="text-xs text-muted-foreground">
                              Across 8 accounts
                            </p>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Total Returns</p>
                            <p className="text-2xl font-bold text-green-500">
                              +$950
                            </p>
                            <p className="text-xs text-muted-foreground">
                              21% overall return
                            </p>
                          </div>
                        </div>

                        <div className="rounded-lg border p-4">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Success Rate</p>
                            <p className="text-2xl font-bold">62.5%</p>
                            <p className="text-xs text-muted-foreground">
                              5 of 8 accounts profitable
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div> */}
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="create">Create Account</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Balance: 2,500 USDC
                </Badge>
              </div>
            </div>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Investor Dashboard
                  </h2>
                  <p className="text-muted-foreground">
                    Manage your investment accounts and track trader performance
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portfolio Overview</CardTitle>
                      <CardDescription>Your investment summary</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Total Invested</p>
                          <p className="text-2xl font-bold">$1,800</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Total Returns</p>
                          <p className="text-2xl font-bold text-green-500">
                            +$320
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Active Accounts</p>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Active Traders</CardTitle>
                      <CardDescription>
                        Currently trading your funds
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Trader #1",
                            account: "$500",
                            progress: "65%",
                            status: "On Track",
                          },
                          {
                            name: "Trader #2",
                            account: "$300",
                            progress: "40%",
                            status: "On Track",
                          },
                          {
                            name: "Trader #3",
                            account: "$1,000",
                            progress: "15%",
                            status: "Warning",
                          },
                        ].map((trader, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div>
                              <p className="font-medium">{trader.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {trader.account} Account
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm">
                                {trader.progress} Complete
                              </p>
                              <p
                                className={`text-xs ${
                                  trader.status === "Warning"
                                    ? "text-amber-500"
                                    : "text-green-500"
                                }`}
                              >
                                {trader.status}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Available Funds</CardTitle>
                      <CardDescription>Funds ready to invest</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Wallet Balance</p>
                        <p className="text-2xl font-bold">2,500 USDC</p>
                      </div>
                      <div className="rounded-lg border p-3">
                        <p className="text-sm font-medium">Quick Actions</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <Button size="sm" variant="outline">
                            Deposit
                          </Button>
                          <Button size="sm" variant="outline">
                            Withdraw
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Investments</CardTitle>
                    <CardDescription>
                      Your currently funded accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                        <div>Account Size</div>
                        <div>Profit Target</div>
                        <div>Risk Limit</div>
                        <div>Trader</div>
                        <div>Progress</div>
                        <div>Status</div>
                      </div>
                      {[
                        {
                          size: "$500",
                          target: "3x",
                          risk: "10%",
                          trader: "Trader #1",
                          progress: "65%",
                          status: "Active",
                        },
                        {
                          size: "$300",
                          target: "2x",
                          risk: "5%",
                          trader: "Trader #2",
                          progress: "40%",
                          status: "Active",
                        },
                        {
                          size: "$1,000",
                          target: "2.5x",
                          risk: "5%",
                          trader: "Trader #3",
                          progress: "15%",
                          status: "At Risk",
                        },
                      ].map((account, i) => (
                        <div
                          key={i}
                          className="grid grid-cols-6 gap-4 p-4 border-b last:border-0"
                        >
                          <div>{account.size}</div>
                          <div>{account.target}</div>
                          <div>{account.risk}</div>
                          <div>{account.trader}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-16 rounded-full bg-primary/20">
                                <div
                                  className={`h-full rounded-full ${
                                    account.status === "At Risk"
                                      ? "bg-amber-500"
                                      : "bg-primary"
                                  }`}
                                  style={{ width: account.progress }}
                                ></div>
                              </div>
                              <span className="text-xs">
                                {account.progress}
                              </span>
                            </div>
                          </div>
                          <div
                            className={
                              account.status === "At Risk"
                                ? "text-amber-500"
                                : "text-green-500"
                            }
                          >
                            {account.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Create Investment Account
                  </h2>
                  <p className="text-muted-foreground">
                    Set up a new account for traders to apply for
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Details</CardTitle>
                      <CardDescription>
                        Configure your investment parameters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="account-size">Account Size</Label>
                        <Select defaultValue="500">
                          <SelectTrigger id="account-size">
                            <SelectValue placeholder="Select account size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="200">$200</SelectItem>
                            <SelectItem value="300">$300</SelectItem>
                            <SelectItem value="500">$500</SelectItem>
                            <SelectItem value="700">$700</SelectItem>
                            <SelectItem value="1000">$1,000</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Amount of capital the trader will manage
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="profit-target">Profit Target</Label>
                        <Select defaultValue="3">
                          <SelectTrigger id="profit-target">
                            <SelectValue placeholder="Select profit target" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2x (Double)</SelectItem>
                            <SelectItem value="2.5">2.5x</SelectItem>
                            <SelectItem value="3">3x (Triple)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          How much profit the trader needs to make
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="risk-limit">Risk Limit</Label>
                        <Select defaultValue="10">
                          <SelectTrigger id="risk-limit">
                            <SelectValue placeholder="Select risk limit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="15">15%</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Maximum loss before account is closed
                        </p>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="challenge-target">
                          Challenge Target
                        </Label>
                        <Select defaultValue="2">
                          <SelectTrigger id="challenge-target">
                            <SelectValue placeholder="Select challenge target" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1.5">1.5x</SelectItem>
                            <SelectItem value="2">2x (Double)</SelectItem>
                            <SelectItem value="2.5">2.5x</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Target for the trader's challenge phase
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Create Account</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Account Summary</CardTitle>
                      tsx file="app/investor/page.tsx" continued
                      <CardDescription>
                        Preview of your investment account
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Account Size
                              </p>
                              <p className="text-xl font-bold">$500</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Buy-In Price
                              </p>
                              <p className="text-xl font-bold">$50 (10%)</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Profit Target
                              </p>
                              <p className="text-xl font-bold">3x ($1,500)</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Risk Limit</p>
                              <p className="text-xl font-bold">10% ($50)</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm font-medium">Challenge</p>
                            <p className="text-xl font-bold">$500 → $1,000</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <p className="font-medium">
                          Profit Breakdown (On Success)
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm">Total Profit</p>
                            <p className="text-sm font-medium">$1,000</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">Your Share (40%)</p>
                            <p className="text-sm font-medium text-green-500">
                              $400
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">Trader Share (60%)</p>
                            <p className="text-sm font-medium">$600</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">Platform Fee (1%)</p>
                            <p className="text-sm font-medium">$10</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <div className="flex items-center space-x-2">
                          <ShieldAlert className="h-5 w-5 text-primary" />
                          <p className="font-medium">Safety Mechanisms</p>
                        </div>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Auto-stop if losses reach 10%</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Smart contract escrow for all funds</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Automatic profit distribution</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              {/* <div className="grid gap-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Trader Applications
                  </h2>
                  <p className="text-muted-foreground">
                    Review and approve traders who want to use your funds
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Applications</CardTitle>
                    <CardDescription>
                      Traders waiting for your approval
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        id: "APP-001",
                        account: "$500",
                        trader: "Trader #4",
                        history: "2 Successful / 1 Failed",
                        winRate: "67%",
                      },
                      {
                        id: "APP-002",
                        account: "$300",
                        trader: "Trader #5",
                        history: "1 Successful / 0 Failed",
                        winRate: "100%",
                      },
                      {
                        id: "APP-003",
                        account: "$1,000",
                        trader: "Trader #6",
                        history: "3 Successful / 2 Failed",
                        winRate: "60%",
                      },
                    ].map((application, i) => (
                      <Card key={i}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle>Application {application.id}</CardTitle>
                            <Badge>{application.account} Account</Badge>
                          </div>
                          <CardDescription>
                            {application.trader}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">
                                  Trading History
                                </p>
                                <p className="text-sm">{application.history}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Win Rate</p>
                                <p className="text-sm">{application.winRate}</p>
                              </div>
                            </div>
                            <div className="rounded-lg bg-muted p-3">
                              <p className="text-sm font-medium">
                                Challenge Performance
                              </p>
                              <div className="mt-2 flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <p className="text-sm">
                                  Passed 2 of 3 challenges
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-[48%]"
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Decline
                          </Button>
                          <Button size="sm" className="w-[48%]">
                            <UserCheck className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </CardContent>
                </Card>
              </div> */}

              {/* Main Content */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Trader Applications
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Review and approve traders who want to use your funds
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Pending Applications
                    </CardTitle>
                    <CardDescription>
                      Traders waiting for your approval (
                      {
                        applications.filter((app) => app.status === "pending")
                          .length
                      }{" "}
                      pending)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="font-semibold">
                              Application
                            </TableHead>
                            <TableHead className="font-semibold">
                              Account
                            </TableHead>
                            <TableHead className="font-semibold">
                              Trading History
                            </TableHead>
                            <TableHead className="font-semibold">
                              Win Rate
                            </TableHead>
                            <TableHead className="font-semibold">
                              Challenge Progress
                            </TableHead>
                            <TableHead className="font-semibold text-center">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {applications.map((app) => (
                            <TableRow
                              key={app.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="font-medium text-gray-900">
                                    {app.id}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {app.traderId}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className="bg-gray-900 text-white border-gray-900"
                                >
                                  ${app.accountAmount.toLocaleString()} Account
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-2 text-sm">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-green-600">
                                      {app.successfulTrades} Successful
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2 text-sm">
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                    <span className="text-red-600">
                                      {app.failedTrades} Failed
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={getWinRateBadgeVariant(app.winRate)}
                                  className="font-semibold"
                                >
                                  {app.winRate}%
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="space-y-2 min-w-[120px]">
                                  <div className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600" />
                                    <span className="text-sm text-green-600">
                                      Passed {app.challengesPassed} of{" "}
                                      {app.totalChallenges} challenges
                                    </span>
                                  </div>
                                  <Progress
                                    value={
                                      (app.challengesPassed /
                                        app.totalChallenges) *
                                      100
                                    }
                                    className="h-2"
                                  />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-center space-x-2">
                                  {app.status === "pending" ? (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDecline(app.id)}
                                        className="hover:bg-red-50 hover:border-red-200 hover:text-red-700"
                                      >
                                        <X className="w-4 h-4 mr-1" />
                                        Decline
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => handleApprove(app.id)}
                                        className="bg-gray-900 hover:bg-gray-800 text-white"
                                      >
                                        <Check className="w-4 h-4 mr-1" />
                                        Approve
                                      </Button>
                                    </>
                                  ) : (
                                    <Badge
                                      variant={
                                        app.status === "approved"
                                          ? "default"
                                          : "destructive"
                                      }
                                      className="capitalize"
                                    >
                                      {app.status}
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <div className="grid gap-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    Investment History
                  </h2>
                  <p className="text-muted-foreground">
                    Past investments and performance records
                  </p>
                </div>

                <Card className="overflow-x-auto">
                  <CardHeader>
                    <CardTitle>Completed Investments</CardTitle>
                    <CardDescription>
                      Past funded accounts and their outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Account Size</TableHead>
                            <TableHead>Target</TableHead>
                            <TableHead>Trader</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Your Profit</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            {
                              size: "$500",
                              target: "3x",
                              trader: "Trader #7",
                              result: "Success",
                              profit: "+$400",
                              date: "Mar 10, 2025",
                            },
                            {
                              size: "$200",
                              target: "2x",
                              trader: "Trader #8",
                              result: "Failed",
                              profit: "-$20",
                              date: "Feb 15, 2025",
                            },
                            {
                              size: "$1,000",
                              target: "2.5x",
                              trader: "Trader #9",
                              result: "Success",
                              profit: "+$600",
                              date: "Jan 20, 2025",
                            },
                            {
                              size: "$300",
                              target: "2x",
                              trader: "Trader #10",
                              result: "Failed",
                              profit: "-$30",
                              date: "Dec 05, 2024",
                            },
                          ].map((investment, i) => (
                            <TableRow key={i}>
                              <TableCell>{investment.size}</TableCell>
                              <TableCell>{investment.target}</TableCell>
                              <TableCell>{investment.trader}</TableCell>
                              <TableCell
                                className={
                                  investment.result === "Success"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {investment.result}
                              </TableCell>
                              <TableCell
                                className={
                                  investment.profit.startsWith("+")
                                    ? "text-green-500"
                                    : "text-red-500"
                                }
                              >
                                {investment.profit}
                              </TableCell>
                              <TableCell>{investment.date}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
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
