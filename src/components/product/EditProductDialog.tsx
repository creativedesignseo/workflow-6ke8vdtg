import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product } from '@/types/product';

interface EditProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (product: Product) => void;
}

export function EditProductDialog({
  product,
  open,
  onOpenChange,
  onSave,
}: EditProductDialogProps) {
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        costPrice: product.costPrice,
        category: product.category,
        brand: product.brand,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleChange = (field: keyof Product, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (product) {
      onSave({
        ...product,
        ...formData,
        profit: (formData.price || 0) - (formData.costPrice || 0),
      });
      onOpenChange(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Editar Producto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nombre del Producto</Label>
            <Input
              id="edit-name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              className="bg-secondary border-0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-price">Precio Venta ($)</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                className="bg-secondary border-0 font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-cost">Costo ($)</Label>
              <Input
                id="edit-cost"
                type="number"
                step="0.01"
                value={formData.costPrice || ''}
                onChange={(e) => handleChange('costPrice', parseFloat(e.target.value) || 0)}
                className="bg-secondary border-0 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-brand">Marca</Label>
              <Input
                id="edit-brand"
                value={formData.brand || ''}
                onChange={(e) => handleChange('brand', e.target.value)}
                className="bg-secondary border-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoría</Label>
              <Input
                id="edit-category"
                value={formData.category || ''}
                onChange={(e) => handleChange('category', e.target.value)}
                className="bg-secondary border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-stock">Stock</Label>
            <Input
              id="edit-stock"
              type="number"
              value={formData.stock || ''}
              onChange={(e) => handleChange('stock', parseInt(e.target.value) || 0)}
              className="bg-secondary border-0 font-mono"
            />
          </div>

          {/* Calculated profit */}
          <div className="p-3 bg-success/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Ganancia Calculada</p>
            <p className="text-xl font-bold text-success">
              ${((formData.price || 0) - (formData.costPrice || 0)).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button
            className="flex-1 bg-primary shadow-lg shadow-primary/25"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
