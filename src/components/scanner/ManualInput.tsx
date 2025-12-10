import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ManualInputProps {
  onSubmit: (code: string) => void;
  isProcessing: boolean;
}

export function ManualInput({ onSubmit, isProcessing }: ManualInputProps) {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() && !isProcessing) {
      onSubmit(code.trim());
      setCode('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="upc-input" className="text-sm font-medium text-muted-foreground">
          Código UPC / EAN
        </label>
        <Input
          id="upc-input"
          type="text"
          placeholder="Ingresa el código de barras..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="h-14 text-lg font-mono text-center tracking-widest bg-secondary border-0 focus-visible:ring-primary"
          disabled={isProcessing}
          autoComplete="off"
          inputMode="numeric"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-12 gap-2 text-base font-semibold bg-primary shadow-lg shadow-primary/25"
        disabled={!code.trim() || isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Buscando...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Buscar Producto
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ingresa el código UPC, EAN o SKU del producto
      </p>
    </form>
  );
}
