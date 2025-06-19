
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import WalletConnect from '@/components/WalletConnect';
import TokenSwap from '@/components/TokenSwap';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <AnimatedBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            DefiSwap
          </h1>
          <p className="text-xl text-gray-300 mb-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            The Ultimate Token Swap Experience
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-400 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Low Fees</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Fast Swaps</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Secure</span>
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          <WalletConnect />
          <TokenSwap />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="glass-dark p-6 rounded-2xl border border-purple-500/20 text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl font-bold text-purple-400 mb-2">$2.4B</div>
            <div className="text-gray-400">Total Volume</div>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-blue-500/20 text-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-3xl font-bold text-blue-400 mb-2">150K+</div>
            <div className="text-gray-400">Users</div>
          </div>
          <div className="glass-dark p-6 rounded-2xl border border-pink-500/20 text-center animate-slide-up" style={{ animationDelay: '1s' }}>
            <div className="text-3xl font-bold text-pink-400 mb-2">500+</div>
            <div className="text-gray-400">Tokens</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Built with ❤️ for the DeFi community</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
