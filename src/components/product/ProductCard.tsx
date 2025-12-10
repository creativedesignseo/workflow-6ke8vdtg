import { useState } from 'react';
import { Check, Edit2, Package, TrendingUp, DollarSign, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const [showSuccess, setShowSuccess] = useState(true);

  return (
    <Card className="glass overflow-hidden fade-in">
      {/* Success Banner */}
      {showSuccess && (
        <div className="bg-success px-4 py-2 flex items-center justify-between success-pulse">
          <div className="flex items-center gap-2 text-success-foreground">
            <Check className="w-5 h-5" />
            <span className="font-semibold text-sm">
              {product.isNew ? '¡Producto Nuevo Agregado!' : 'Stock Actualizado +1'}
            </span>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="text-success-foreground/80 hover:text-success-foreground text-xs"
          >
            Ocultar
          </button>
        </div>
      )}

      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg leading-tight truncate">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              UPC: {product.upc}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 gap-1.5"
            onClick={() => onEdit(product)}
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatItem
            icon={DollarSign}
            label="Precio Venta"
            value={`$${product.price.toFixed(2)}`}
            highlight
          />
          <StatItem
            icon={Tag}
            label="Costo"
            value={product.costPrice ? `$${product.costPrice.toFixed(2)}` : '-'}
          />
          <StatItem
            icon={TrendingUp}
            label="Ganancia"
            value={product.profit ? `$${product.profit.toFixed(2)}` : '-'}
            className="text-success"
          />
          <StatItem
            icon={Package}
            label="Stock"
            value={product.stock?.toString() || '1'}
          />
        </div>

        {/* Meta info */}
        {(product.brand || product.category) && (
          <div className="flex flex-wrap gap-2">
            {product.brand && (
              <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                {product.brand}
              </span>
            )}
            {product.category && (
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                {product.category}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
}

function StatItem({ icon: Icon, label, value, highlight, className }: StatItemProps) {
  return (
    <div className={cn(
      "p-3 rounded-xl bg-secondary/50",
      highlight && "bg-primary/10"
    )}>
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className={cn(
        "font-bold text-lg",
        highlight && "text-primary",
        className
      )}>
        {value}
      </p>
    </div>
  );
}
