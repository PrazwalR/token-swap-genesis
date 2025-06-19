
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface SwapSettingsProps {
  slippage: number;
  setSlippage: (slippage: number) => void;
  onClose: () => void;
}

const SwapSettings: React.FC<SwapSettingsProps> = ({
  slippage,
  setSlippage,
  onClose,
}) => {
  const presetSlippages = [0.1, 0.5, 1.0];

  return (
    <Card className="mb-4 p-4 bg-gray-800/30 border border-gray-700/50 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Transaction Settings</h3>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="p-1 hover:bg-gray-700/50 rounded-full"
        >
          <X className="w-4 h-4 text-gray-400" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Slippage Tolerance
          </label>
          <div className="flex space-x-2 mb-2">
            {presetSlippages.map((preset) => (
              <Button
                key={preset}
                onClick={() => setSlippage(preset)}
                variant={slippage === preset ? "default" : "ghost"}
                size="sm"
                className={`px-3 py-1 text-sm ${
                  slippage === preset
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
              >
                {preset}%
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(Number(e.target.value))}
              className="bg-gray-700/50 border-gray-600/50 text-white text-sm"
              step="0.1"
              min="0"
              max="50"
            />
            <span className="text-sm text-gray-400">%</span>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Your transaction will revert if the price changes unfavorably by more than this percentage.
        </div>
      </div>
    </Card>
  );
};

export default SwapSettings;
