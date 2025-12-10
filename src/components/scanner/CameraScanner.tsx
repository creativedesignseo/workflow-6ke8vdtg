import { useEffect, useRef } from 'react';
import { Camera, CameraOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner';
import { cn } from '@/lib/utils';

interface CameraScannerProps {
  onScan: (code: string) => void;
  isProcessing: boolean;
}

export function CameraScanner({ onScan, isProcessing }: CameraScannerProps) {
  const elementId = 'barcode-scanner';
  const { isScanning, startScanning, stopScanning, error } = useBarcodeScanner(
    elementId,
    onScan
  );

  return (
    <div className="space-y-4">
      {/* Scanner Viewport */}
      <div className="relative aspect-video bg-secondary rounded-xl overflow-hidden">
        <div id={elementId} className="w-full h-full" />
        
        {!isScanning && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-secondary">
            <Camera className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground text-center px-4">
              Presiona el botón para activar la cámara
            </p>
          </div>
        )}

        {/* Scan overlay */}
        {isScanning && !isProcessing && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-32 border-2 border-primary rounded-lg">
              {/* Scan line animation */}
              <div className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent scan-line" />
              
              {/* Corner decorations */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br" />
            </div>
          </div>
        )}

        {/* Processing overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-sm font-medium">Procesando...</p>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
          {error}
        </div>
      )}

      {/* Control button */}
      <Button
        className={cn(
          "w-full h-12 gap-2 text-base font-semibold transition-all",
          isScanning 
            ? "bg-secondary text-secondary-foreground hover:bg-secondary/80" 
            : "bg-primary shadow-lg shadow-primary/25"
        )}
        onClick={isScanning ? stopScanning : startScanning}
        disabled={isProcessing}
      >
        {isScanning ? (
          <>
            <CameraOff className="w-5 h-5" />
            Detener Cámara
          </>
        ) : (
          <>
            <Camera className="w-5 h-5" />
            Activar Cámara
          </>
        )}
      </Button>
    </div>
  );
}
