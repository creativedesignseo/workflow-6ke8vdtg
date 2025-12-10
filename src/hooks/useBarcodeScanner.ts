import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface UseBarcodeScanner {
  isScanning: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => void;
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
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lastCodeRef = useRef<string | null>(null);
  const lastScanTimeRef = useRef<number>(0);

  const startScanning = useCallback(async () => {
    try {
      setError(null);
      
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(elementId);
      }

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 280, height: 150 },
          aspectRatio: 1.777,
        },
        (decodedText) => {
          const now = Date.now();
          // Prevent duplicate scans within 2 seconds
          if (decodedText !== lastCodeRef.current || now - lastScanTimeRef.current > 2000) {
            lastCodeRef.current = decodedText;
            lastScanTimeRef.current = now;
            setLastScannedCode(decodedText);
            onScan(decodedText);
          }
        },
        () => {
          // Ignore scan errors (no QR/barcode found)
        }
      );

      setIsScanning(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar la cámara';
      setError(message);
      setIsScanning(false);
    }
  }, [elementId, onScan]);

  const stopScanning = useCallback(() => {
    if (scannerRef.current && isScanning) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false);
      }).catch(() => {
        setIsScanning(false);
      });
    }
  }, [isScanning]);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return {
    isScanning,
    startScanning,
    stopScanning,
    lastScannedCode,
    error,
  };
}
