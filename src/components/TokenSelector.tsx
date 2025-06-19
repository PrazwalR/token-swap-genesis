
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChevronDown, Search } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  logo: string;
  price: number;
  balance: number;
}

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onTokenSelect,
  tokens,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = tokens.filter(
    token =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        className="flex items-center space-x-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-full px-3 py-2 transition-all duration-300 hover:scale-105"
      >
        <span className="text-2xl">{selectedToken.logo}</span>
        <span className="font-semibold text-white">{selectedToken.symbol}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-dark border-purple-500/20 max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Select Token</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredTokens.map((token) => (
                <Button
                  key={token.symbol}
                  onClick={() => handleTokenSelect(token)}
                  variant="ghost"
                  className="w-full p-4 h-auto hover:bg-purple-500/20 transition-all duration-300 justify-start"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <span className="text-2xl">{token.logo}</span>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white">{token.balance}</div>
                      <div className="text-sm text-gray-400">${token.price}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TokenSelector;
