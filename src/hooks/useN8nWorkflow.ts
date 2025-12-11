import { useState, useCallback } from 'react';
import { Product, ScanResult } from '@/types/product';

const WEBHOOK_URL = 'https://n8n-01.adspubli.com/webhook/bbf53a2e-61df-40d3-b4cb-67ddfc7dcaa0';

interface UseN8nWorkflow {
  executeWorkflow: (upc: string) => Promise<ScanResult>;
  isLoading: boolean;
  error: string | null;
}

export function useN8nWorkflow(): UseN8nWorkflow {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeWorkflow = useCallback(async (upc: string): Promise<ScanResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ upc }),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      
      // Map n8n response to our Product format
      const product: Product = {
        id: crypto.randomUUID(),
        upc,
        name: data.nombre || data.name || `Producto ${upc.slice(-4)}`,
        price: parseFloat(data.precio || data.price || 0),
        costPrice: parseFloat(data.costo || data.costPrice || 0),
        profit: parseFloat(data.ganancia || data.profit || 0),
        category: data.categoria || data.category || 'General',
        brand: data.marca || data.brand || '',
        stock: parseInt(data.stock || data.cantidad || 1),
        scannedAt: new Date(),
        isNew: data.isNew ?? !data.existente,
      };

      return {
        success: true,
        product,
        isExisting: data.existente ?? false,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al ejecutar el workflow';
      setError(message);
      return {
        success: false,
        error: message,
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    executeWorkflow,
    isLoading,
    error,
  };
}
