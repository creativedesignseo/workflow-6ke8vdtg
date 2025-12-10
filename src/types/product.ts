export interface Product {
  id: string;
  upc: string;
  name: string;
  price: number;
  costPrice?: number;
  profit?: number;
  category?: string;
  brand?: string;
  imageUrl?: string;
  stock?: number;
  scannedAt: Date;
  isNew?: boolean;
}

export interface ScanResult {
  success: boolean;
  product?: Product;
  error?: string;
  isExisting?: boolean;
}
