import { Package } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductHistoryProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export function ProductHistory({ products, onEdit }: ProductHistoryProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
        <h3 className="font-semibold text-muted-foreground">
          Sin productos escaneados
        </h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Escanea un código de barras para comenzar
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">
          Productos Escaneados
        </h2>
        <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded-full">
          {products.length} items
        </span>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
