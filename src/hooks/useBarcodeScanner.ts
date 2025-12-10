import { useState, useRef, useCallback } from 'react';

interface UseBarcodeScanner {
  isScanning: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => Promise<void>;
  lastScannedCode: string | null;
  error: string | null;
}

export function useBarcodeScanner(
  elementId: string,
  onScan: (code: string) => void
): UseBarcodeScanner {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<any>(null);
  const isTransitioningRef = useRef(false);
  const lastCodeRef = useRef<string | null>(null);
  const lastScanTimeRef = useRef<number>(0);

  const stopScanning = useCallback(async () => {
    if (!scannerRef.current || isTransitioningRef.current) return;
    
    try {
      isTransitioningRef.current = true;
      const state = scannerRef.current.getState();
      // State 2 = SCANNING
      if (state === 2) {
        await scannerRef.current.stop();
      }
      setIsScanning(false);
    } catch (err) {
      console.log('Stop error:', err);
    } finally {
      isTransitioningRef.current = false;
    }
  }, []);

  const startScanning = useCallback(async () => {
    if (isTransitioningRef.current) return;
    
    try {
      setError(null);
      isTransitioningRef.current = true;
      
      // Dynamic import
      const { Html5Qrcode } = await import('html5-qrcode');
      
      // Stop existing scanner if running
      if (scannerRef.current) {
        try {
          const state = scannerRef.current.getState();
          if (state === 2) {
            await scannerRef.current.stop();
          }
        } catch (e) {
          // Ignore
        }
        scannerRef.current = null;
      }

      // Create new scanner
      scannerRef.current = new Html5Qrcode(elementId);

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 280, height: 150 },
          aspectRatio: 1.777,
        },
        (decodedText: string) => {
          const now = Date.now();
          if (decodedText !== lastCodeRef.current || now - lastScanTimeRef.current > 2000) {
            lastCodeRef.current = decodedText;
            lastScanTimeRef.current = now;
            setLastScannedCode(decodedText);
            onScan(decodedText);
          }
        },
        () => {}
      );

      setIsScanning(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar la cámara';
      setError(message);
      setIsScanning(false);
    } finally {
      isTransitioningRef.current = false;
    }
  }, [elementId, onScan]);

  return {
    isScanning,
    startScanning,
    stopScanning,
    lastScannedCode,
    error,
  };
}
