import { useState, useCallback } from 'react';
import { Camera, Keyboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CameraScanner } from './CameraScanner';
import { ManualInput } from './ManualInput';
import { cn } from '@/lib/utils';

interface ScannerViewProps {
  onScan: (code: string) => void;
  isProcessing: boolean;
}

type ScanMode = 'camera' | 'manual';

export function ScannerView({ onScan, isProcessing }: ScannerViewProps) {
  const [mode, setMode] = useState<ScanMode>('camera');

  const handleScan = useCallback((code: string) => {
    if (!isProcessing) {
      onScan(code);
    }
  }, [onScan, isProcessing]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Mode Switcher */}
      <div className="flex gap-2 mb-4">
        <Button
          variant={mode === 'camera' ? 'default' : 'outline'}
          className={cn(
            "flex-1 gap-2 transition-all",
            mode === 'camera' && "bg-primary shadow-lg shadow-primary/25"
          )}
          onClick={() => setMode('camera')}
        >
          <Camera className="w-4 h-4" />
          Cámara
        </Button>
        <Button
          variant={mode === 'manual' ? 'default' : 'outline'}
          className={cn(
            "flex-1 gap-2 transition-all",
            mode === 'manual' && "bg-primary shadow-lg shadow-primary/25"
          )}
          onClick={() => setMode('manual')}
        >
          <Keyboard className="w-4 h-4" />
          Manual
        </Button>
      </div>

      {/* Scanner Content */}
      <div className="glass rounded-2xl p-4 shadow-xl">
        {mode === 'camera' ? (
          <CameraScanner onScan={handleScan} isProcessing={isProcessing} />
        ) : (
          <ManualInput onSubmit={handleScan} isProcessing={isProcessing} />
        )}
      </div>
    </div>
  );
}
