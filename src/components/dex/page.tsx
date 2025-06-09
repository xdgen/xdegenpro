import React, { useState, useEffect, useRef } from 'react';
import { Search, TrendingUp, TrendingDown, Filter, Star, BarChart3, DollarSign, Activity, Volume2, Target, Settings } from 'lucide-react';

interface Token {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  market_cap_rank: number;
}

// interface TradingViewWidget {
//   symbol: string;
//   interval: string;
//   theme: string;
//   style: string;
//   locale: string;
//   toolbar_bg: string;
//   enable_publishing: boolean;
//   allow_symbol_change: boolean;
//   timezone: string;
// }

const DexPage: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [sortBy, setSortBy] = useState<'price' | 'volume' | 'market_cap'>('market_cap');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Fetch Solana meme coins from CoinGecko
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        // Fetch popular Solana tokens including meme coins
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=solana-ecosystem&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
        );
        const data = await response.json();
        
        // Filter for meme coins and popular Solana tokens
        const memeTokens = data.filter((token: Token) => 
          token.name.toLowerCase().includes('dog') ||
          token.name.toLowerCase().includes('cat') ||
          token.name.toLowerCase().includes('pepe') ||
          token.name.toLowerCase().includes('bonk') ||
          token.name.toLowerCase().includes('samo') ||
          token.symbol.toLowerCase().includes('doge') ||
          token.symbol.toLowerCase().includes('shib') ||
          token.symbol.toLowerCase().includes('bonk') ||
          token.symbol.toLowerCase().includes('samo') ||
          token.symbol.toLowerCase().includes('ray') ||
          token.symbol.toLowerCase().includes('sol')
        );
        
        setTokens(memeTokens.slice(0, 20));
        if (memeTokens.length > 0) {
          setSelectedToken(memeTokens[0]);
        }
      } catch (error) {
        console.error('Error fetching tokens:', error);
        // Fallback to basic Solana tokens if API fails
        setTokens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
    const interval = setInterval(fetchTokens, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Initialize TradingView chart
  useEffect(() => {
    if (selectedToken && chartContainerRef.current) {
      // Remove existing script
      if (scriptRef.current) {
        scriptRef.current.remove();
      }

      // Clear container
      chartContainerRef.current.innerHTML = '';

      // Create new script
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: true,
        symbol: `${selectedToken.symbol.toUpperCase()}USD`,
        interval: '15',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#000000',
        enable_publishing: false,
        backgroundColor: '#000000',
        gridColor: '#1a1a1a',
        hide_top_toolbar: false,
        hide_legend: false,
        save_image: false,
        container_id: 'tradingview_chart'
      });

      chartContainerRef.current.appendChild(script);
      scriptRef.current = script;
    }
  }, [selectedToken]);

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTokens = [...filteredTokens].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.current_price - a.current_price;
      case 'volume':
        return b.total_volume - a.total_volume;
      case 'market_cap':
      default:
        return b.market_cap - a.market_cap;
    }
  });

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toFixed(2)}`;
  };

  const formatMarketCap = (cap: number) => {
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`;
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`;
    if (cap >= 1e3) return `$${(cap / 1e3).toFixed(2)}K`;
    return `$${cap.toFixed(2)}`;
  };

  const toggleFavorite = (tokenId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(tokenId)) {
      newFavorites.delete(tokenId);
    } else {
      newFavorites.add(tokenId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo & Navigation */}
            <div className="flex items-center space-x-12">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-black rounded-sm"></div>
                </div>
                <span className="text-xl font-light text-white tracking-wide">XDegen</span>
              </div>

              {/* Navigation */}
              {/* <nav className="hidden lg:flex items-center space-x-8">
                <a href="#" className="text-white font-medium text-sm relative">
                  Trade
                  <div className="absolute -bottom-4 left-0 w-full h-px bg-white"></div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  Pools
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  Portfolio
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                  Analytics
                </a>
              </nav> */}
            </div>

            {/* Right Section - Stats & Actions */}
            <div className="flex items-center space-x-6">
              {/* Market Stats */}
              <div className="hidden md:flex items-center space-x-6 cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase tracking-wider ">SOL/USD</span>
                  <span className="text-sm font-medium text-white">$20.45</span>
                </div>
                
                <div className="w-px h-8 bg-white/10"></div>
                
                <div className="flex flex-col cursor-pointer">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">24H VOL</span>
                  <span className="text-sm font-medium text-white">$2.1B</span>
                </div>
                
                <div className="w-px h-8 bg-white/10"></div>
                
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">LIVE</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-3 cursor-pointer">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                  <Settings className="w-5 h-5" />
                </button>
                
                <div className="w-px h-6 bg-white/10"></div>
                
                <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all cursor-pointer">
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex space-x-6">
                <a href="#" className="text-white font-medium text-sm relative">
                  Trade
                  <div className="absolute -bottom-1 left-0 w-full h-px bg-white"></div>
                </a>
                <a href="#" className="text-gray-400 text-sm font-medium">Pools</a>
                <a href="#" className="text-gray-400 text-sm font-medium">Portfolio</a>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-xs text-gray-400">SOL</div>
                  <div className="text-sm font-medium text-white">$20.45</div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Token List */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-800 flex flex-col h-screen">
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-800 text-sm rounded px-2 py-1 border border-gray-700 focus:border-yellow-400 focus:outline-none"
                >
                  <option value="market_cap">Market Cap</option>
                  <option value="volume">Volume</option>
                  <option value="price">Price</option>
                </select>
              </div>
              <div className="text-xs text-gray-400">
                {sortedTokens.length} tokens
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 animate-pulse">
                    <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2">
                {sortedTokens.map((token) => (
                  <div
                    key={token.id}
                    onClick={() => setSelectedToken(token)}
                    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-800/70 ${
                      selectedToken?.id === token.id ? 'bg-yellow-400/10 border border-yellow-400/30' : ''
                    }`}
                  >
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-10 h-10 rounded-full"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/40/333/fff?text=${token.symbol.charAt(0)}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm truncate">{token.name}</h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(token.id);
                          }}
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              favorites.has(token.id) ? 'text-yellow-400 fill-current' : 'text-gray-400'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-400 uppercase">{token.symbol}</span>
                        <div className="flex items-center space-x-1">
                          {token.price_change_percentage_24h > 0 ? (
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-400" />
                          )}
                          <span
                            className={`text-xs ${
                              token.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            {token.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-medium">{formatPrice(token.current_price)}</span>
                        <span className="text-xs text-gray-400">{formatMarketCap(token.market_cap)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center - Chart */}
        <div className="flex-1 flex flex-col">
          {selectedToken && (
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedToken.image}
                    alt={selectedToken.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{selectedToken.name}</h2>
                    <span className="text-gray-400">{selectedToken.symbol.toUpperCase()}/USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{formatPrice(selectedToken.current_price)}</div>
                  <div className={`flex items-center space-x-1 ${
                    selectedToken.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedToken.price_change_percentage_24h > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{selectedToken.price_change_percentage_24h?.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 bg-gray-900/30">
            <div
              ref={chartContainerRef}
              className="w-full h-[500px]"
              style={{ minHeight: '400px' }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    {selectedToken ? 'Loading chart...' : 'Select a token to view chart'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trading Panel */}
        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-l border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h3 className="text-lg font-bold mb-4">Trade</h3>
            
            {/* Buy/Sell Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1 mb-4">
              <button
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  tradeType === 'buy'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  tradeType === 'sell'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sell
              </button>
            </div>

            {/* Market/Limit Toggle */}
            <div className="flex bg-gray-800 rounded-lg p-1 mb-4">
              <button
                onClick={() => setOrderType('market')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  orderType === 'market'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Market
              </button>
              <button
                onClick={() => setOrderType('limit')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  orderType === 'limit'
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Limit
              </button>
            </div>

            {/* Price Input (for limit orders) */}
            {orderType === 'limit' && (
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Amount Input */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Amount</label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Slippage */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400">Slippage</label>
                <span className="text-sm text-yellow-400">{slippage}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={slippage}
                onChange={(e) => setSlippage(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Trade Button */}
            <button
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                tradeType === 'buy'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                  : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800'
              }`}
            >
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedToken?.symbol.toUpperCase() || 'Token'}
            </button>
          </div>

          {/* Token Info */}
          {selectedToken && (
            <div className="p-4 space-y-4">
              <h4 className="font-medium text-gray-300">Token Info</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Market Cap</span>
                  </div>
                  <span className="text-sm font-medium">{formatMarketCap(selectedToken.market_cap)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">24h Volume</span>
                  </div>
                  <span className="text-sm font-medium">{formatMarketCap(selectedToken.total_volume)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Rank</span>
                  </div>
                  <span className="text-sm font-medium">#{selectedToken.market_cap_rank}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section - More Tokens */}
      <div className="border-t border-gray-800 p-4">
        <h3 className="text-lg font-bold mb-4">Trending Tokens</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tokens.slice(0, 6).map((token) => (
            <div
              key={token.id}
              onClick={() => setSelectedToken(token)}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 cursor-pointer hover:bg-gray-800/70 transition-all border border-gray-800 hover:border-yellow-400/30"
            >
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={token.image}
                  alt={token.name}
                  className="w-6 h-6 rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = `https://via.placeholder.com/24/333/fff?text=${token.symbol.charAt(0)}`;
                  }}
                />
                <span className="text-sm font-medium truncate">{token.symbol.toUpperCase()}</span>
              </div>
              <div className="text-xs text-gray-400 mb-1">{formatPrice(token.current_price)}</div>
              <div className={`text-xs flex items-center space-x-1 ${
                token.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {token.price_change_percentage_24h > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{token.price_change_percentage_24h?.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DexPage;