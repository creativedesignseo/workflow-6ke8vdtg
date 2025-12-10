import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { ScannerView } from '@/components/scanner/ScannerView';
import { ProductHistory } from '@/components/product/ProductHistory';
import { EditProductDialog } from '@/components/product/EditProductDialog';
import { useN8nWorkflow } from '@/hooks/useN8nWorkflow';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/product';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { executeWorkflow, isLoading } = useN8nWorkflow();
  const { toast } = useToast();

  const handleScan = useCallback(async (code: string) => {
    const result = await executeWorkflow(code);

    if (result.success && result.product) {
      setProducts((prev) => [result.product!, ...prev]);
      
      toast({
        title: result.isExisting ? 'Stock Actualizado' : 'Producto Agregado',
        description: `${result.product.name} - $${result.product.price.toFixed(2)}`,
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'No se pudo procesar el código',
        variant: 'destructive',
      });
    }
  }, [executeWorkflow, toast]);

  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product);
  }, []);

  const handleSaveProduct = useCallback((updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    
    toast({
      title: 'Producto Actualizado',
      description: `${updatedProduct.name} guardado correctamente`,
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Scanner Section */}
        <section>
          <ScannerView onScan={handleScan} isProcessing={isLoading} />
        </section>

        {/* Products History */}
        <section>
          <ProductHistory products={products} onEdit={handleEditProduct} />
        </section>
      </main>

      {/* Edit Dialog */}
      <EditProductDialog
        product={editingProduct}
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default Index;
