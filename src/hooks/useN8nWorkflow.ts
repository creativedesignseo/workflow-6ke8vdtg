import { useState, useCallback } from 'react';
import { Product, ScanResult } from '@/types/product';

const WORKFLOW_ID = '6ke8vdTgNQMnMfZe';

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
      // This will be replaced with actual MCP tool call
      // For now, we'll simulate the workflow execution
      const response = await new Promise<ScanResult>((resolve) => {
        setTimeout(() => {
          // Simulated response - in production this calls the n8n workflow
          resolve({
            success: true,
            product: {
              id: crypto.randomUUID(),
              upc,
              name: `Producto ${upc.slice(-4)}`,
              price: Math.floor(Math.random() * 100) + 10,
              costPrice: Math.floor(Math.random() * 50) + 5,
              profit: Math.floor(Math.random() * 30) + 5,
              category: 'General',
              brand: 'Marca Demo',
              stock: 1,
              scannedAt: new Date(),
              isNew: Math.random() > 0.5,
            },
            isExisting: Math.random() > 0.5,
          });
        }, 1500);
      });

      return response;
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
