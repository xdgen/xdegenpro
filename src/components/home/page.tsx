import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col p-6">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <a href="/" className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl bg-green-600 from-purple-600 to-blue-500 bg-clip-text text-transparent">
                XPro
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <a
                href="/about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </a>
              <a
                href="/faq"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                FAQ
              </a>
              <a
                href="/contact"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Xdegen Pro
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A platform for crypto traders and investors, with built-in
                    training wheels and safety nets.
                  </p>
                </div>
                <div className="flex flex-col gap-4 md:flex-row">
                  <a href="/trader">
                    <Button
                      size="lg"
                      className="w-full bg-green-600 from-blue-600 to-indigo-600"
                    >
                      I'm a Trader
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                  <a href="/investor">
                    <Button size="lg" variant="outline" className="w-full">
                      I'm an Investor
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connect your Solana wallet to get started. All transactions
                  happen on-chain.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl border bg-gradient-to-b from-muted/50 to-muted p-6">
                  <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">How It Works</h2>
                      <p className="text-muted-foreground">
                        Traders get funded accounts with safety nets. Investors
                        fund accounts and share profits.
                      </p>
                    </div>
                    <div className="grid w-full max-w-sm gap-4">
                      <div className="flex items-center space-x-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="font-bold text-primary">1</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Connect Wallet
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Fully decentralized, no email/password needed
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="font-bold text-primary">2</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Choose Your Path
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Trade with investor funds or invest in skilled
                            traders
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 rounded-lg border p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="font-bold text-primary">3</span>
                        </div>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            Secure Trading
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Smart contracts ensure fair play and automatic
                            profit sharing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How Xdegen Pro Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A transparent, secure platform with built-in safety mechanisms
                  for both traders and investors
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center text-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4 border border-primary/20 rounded-md text-center flex flex-col justify-center items-center p-6">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  For Traders
                </div>
                <h3 className="text-2xl font-bold">
                  Trade with Investor Funds
                </h3>
                <p className="text-muted-foreground">
                  Browse available accounts, pay a small buy-in fee, pass a
                  challenge, and start trading with real funds.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Choose account sizes from $200 to $1,000+</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Pay only 10% of account size as buy-in</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Keep 70% of profits when you hit targets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Safety nets prevent catastrophic losses</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4 border border-primary/20 rounded-md text-center flex flex-col justify-center items-center p-6">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  For Investors
                </div>
                <h3 className="text-2xl font-bold">Fund Skilled Traders</h3>
                <p className="text-muted-foreground">
                  Create trading accounts, set profit targets and risk limits,
                  and earn passive income from successful traders.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Choose your investment amount and terms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Review trader applications and trading history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Earn 40% of profits when traders succeed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>
                      Automatic safety mechanisms protect your capital
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  The Xdegen Pro Advantage
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Smart contracts and automated systems ensure fair play for
                  everyone
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">Safety Bot</h3>
                  <p className="text-sm text-muted-foreground">
                    Automated system that enforces risk limits and profit
                    targets, preventing catastrophic losses.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                  </svg>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">Smart Contract Escrow</h3>
                  <p className="text-sm text-muted-foreground">
                    All funds are locked in secure smart contracts, ensuring
                    transparent and automatic profit distribution.
                  </p>
                </div>
              </div>
              <div className="rounded-xl border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-bold">Challenge System</h3>
                  <p className="text-sm text-muted-foreground">
                    Traders must prove their skills in a practice environment
                    before accessing real funds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
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
