
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, Settings, RefreshCw } from 'lucide-react';
import TokenSelector from './TokenSelector';
import SwapSettings from './SwapSettings';
import { useToast } from '@/hooks/use-toast';

interface Token {
  symbol: string;
  name: string;
  logo: string;
  price: number;
  balance: number;
}

const defaultTokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', logo: '🔷', price: 2000, balance: 1.5 },
  { symbol: 'USDC', name: 'USD Coin', logo: '💵', price: 1, balance: 5000 },
  { symbol: 'UNI', name: 'Uniswap', logo: '🦄', price: 6.5, balance: 100 },
  { symbol: 'LINK', name: 'Chainlink', logo: '🔗', price: 15, balance: 50 }
];

const TokenSwap = () => {
  const [fromToken, setFromToken] = useState<Token>(defaultTokens[0]);
  const [toToken, setToToken] = useState<Token>(defaultTokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const { toast } = useToast();

  const calculateToAmount = (amount: string) => {
    if (!amount || isNaN(Number(amount))) return '';
    const fromValue = Number(amount) * fromToken.price;
    const toValue = fromValue / toToken.price;
    return toValue.toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = async () => {
    if (!fromAmount || Number(fromAmount) === 0) {
      toast({
        title: "Error",
        description: "Please enter an amount to swap",
        variant: "destructive"
      });
      return;
    }

    if (Number(fromAmount) > fromToken.balance) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${fromToken.symbol}`,
        variant: "destructive"
      });
      return;
    }

    setIsSwapping(true);
    
    // Simulate swap transaction
    setTimeout(() => {
      setIsSwapping(false);
      toast({
        title: "Swap Successful!",
        description: `Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
      });
      setFromAmount('');
      setToAmount('');
    }, 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="glass-dark p-6 rounded-2xl border-2 border-purple-500/20 shadow-2xl animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Swap Tokens
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-purple-500/20 rounded-full transition-all duration-300"
          >
            <Settings className="w-5 h-5 text-purple-400" />
          </Button>
        </div>

        {showSettings && (
          <SwapSettings 
            slippage={slippage} 
            setSlippage={setSlippage}
            onClose={() => setShowSettings(false)}
          />
        )}

        <div className="space-y-1">
          {/* From Token */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">From</span>
              <span className="text-sm text-gray-400">
                Balance: {fromToken.balance} {fromToken.symbol}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Input
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                placeholder="0.0"
                className="text-2xl font-semibold bg-transparent border-none p-0 text-white placeholder:text-gray-500"
                type="number"
              />
              <TokenSelector
                selectedToken={fromToken}
                onTokenSelect={setFromToken}
                tokens={defaultTokens}
              />
            </div>
            <div className="text-sm text-gray-400 mt-1">
              ${fromAmount ? (Number(fromAmount) * fromToken.price).toFixed(2) : '0.00'}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center py-2">
            <Button
              onClick={handleSwapTokens}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-purple-500/20 rounded-full transition-all duration-300 hover:scale-110"
            >
              <ArrowUpDown className="w-5 h-5 text-purple-400" />
            </Button>
          </div>

          {/* To Token */}
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">To</span>
              <span className="text-sm text-gray-400">
                Balance: {toToken.balance} {toToken.symbol}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Input
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="text-2xl font-semibold bg-transparent border-none p-0 text-white placeholder:text-gray-500"
              />
              <TokenSelector
                selectedToken={toToken}
                onTokenSelect={setToToken}
                tokens={defaultTokens}
              />
            </div>
            <div className="text-sm text-gray-400 mt-1">
              ${toAmount ? (Number(toAmount) * toToken.price).toFixed(2) : '0.00'}
            </div>
          </div>
        </div>

        {/* Price Info */}
        {fromAmount && toAmount && (
          <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Rate</span>
              <span className="text-white">
                1 {fromToken.symbol} = {(toToken.price / fromToken.price).toFixed(6)} {toToken.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-400">Slippage Tolerance</span>
              <span className="text-white">{slippage}%</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={isSwapping || !fromAmount}
          className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSwapping ? (
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Swapping...</span>
            </div>
          ) : (
            'Swap'
          )}
        </Button>
      </Card>
    </div>
  );
};

export default TokenSwap;
