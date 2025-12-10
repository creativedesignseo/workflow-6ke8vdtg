import { Barcode, Workflow } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container max-w-lg mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
            <Barcode className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">SacanProfit</h1>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Workflow className="w-3 h-3" />
              <span>Conectado a n8n</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
