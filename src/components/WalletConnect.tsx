
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WalletConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('1.234');
  const { toast } = useToast();

  const connectWallet = async () => {
    // Simulate wallet connection
    setTimeout(() => {
      setIsConnected(true);
      setAddress('0x742d35Cc6432C4A2E8b3E36b93d...f5bA12');
      toast({
        title: "Wallet Connected!",
        description: "Successfully connected to MetaMask",
      });
    }, 1500);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress('');
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (!isConnected) {
    return (
      <Card className="glass-dark p-6 rounded-2xl border-2 border-purple-500/20 shadow-2xl mb-6">
        <div className="text-center">
          <div className="mb-4">
            <Wallet className="w-12 h-12 text-purple-400 mx-auto animate-bounce-slow" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Connect Wallet</h3>
          <p className="text-gray-400 mb-4">
            Connect your wallet to start swapping tokens
          </p>
          <Button
            onClick={connectWallet}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-xl neon-glow transition-all duration-300"
          >
            Connect MetaMask
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-dark p-4 rounded-2xl border-2 border-green-500/20 shadow-2xl mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                Connected
              </Badge>
            </div>
            <div className="text-sm text-gray-400">
              Balance: {balance} ETH
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={copyAddress}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-700/50 rounded-full"
          >
            <Copy className="w-4 h-4 text-gray-400" />
          </Button>
          <Button
            onClick={disconnectWallet}
            variant="ghost"
            size="sm"
            className="text-red-400 hover:bg-red-500/20 px-3 py-1 rounded-lg"
          >
            Disconnect
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WalletConnect;
