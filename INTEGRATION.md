# 🔗 Integración n8n Workflow - Lovable App

## 📊 Estado de la Integración

✅ **Workflow n8n**: ACTIVO  
✅ **Webhook URL**: Configurada  
✅ **Frontend Lovable**: Configurado  
✅ **Payload**: Corregido

---

## 🌐 Información del Workflow

### Detalles del Workflow
- **ID**: `6ke8vdTgNQMnMfZe`
- **Nombre**: SacanProfit V3 - FINAL GOLD copy (Corregido)
- **Estado**: ✅ ACTIVO
- **Versión**: 64
- **Nodos**: 14

### Webhook URL
```
https://n8n-01.adspubli.com/webhook/bbf53a2e-61df-40d3-b4cb-67ddfc7dcaa0
```

**Método**: `POST`

---

## 📤 Formato de Comunicación

### Request (Frontend → n8n)
```json
{
  "upc": "012345678901"
}
```

### Response (n8n → Frontend)
```json
{
  "upc": "012345678901",
  "title": "Nombre del Producto",
  "description": "Descripción del producto",
  "brand": "Marca",
  "total_price": 24.50,
  "unit_price": 2.04,
  "quantity": 12,
  "type": "PACK",
  "images": "https://...",
  "inventory_quantity": 1,
  "existente": false
}
```

---

## 🔄 Flujo del Workflow

1. **Recibe UPC** vía webhook POST
2. **Consulta Google Sheets** (inventario)
3. **Decisión**:
   - ✅ **Si existe**: Suma +1 al stock
   - ❌ **Si NO existe**:
     - Consulta UPC Item DB API
     - Procesa con AI Agent (OpenAI)
     - Parsea JSON
     - Crea nuevo item en Google Sheets
4. **Responde** con información del producto

---

## 🛠️ Cambios Realizados

### 1. Correcciones en el Workflow (vía API)
- ✅ Conectado `Simple Memory1` → `AI Agent1`
- ✅ Conectado `HTTP Request1` → `AI Agent1`
- ✅ Eliminado `Chat Trigger` no usado
- ✅ Eliminado `Basic LLM Chain` no usado
- ✅ Eliminado `Google Gemini Model` no usado
- ✅ Workflow activado

### 2. Correcciones en el Frontend
**Archivo**: `src/hooks/useN8nWorkflow.ts`

**Cambio**:
```typescript
// ❌ ANTES
body: JSON.stringify({ chatInput: upc })

// ✅ DESPUÉS
body: JSON.stringify({ upc })
```

---

## 🧪 Pruebas

### Probar el Webhook directamente
```bash
curl -X POST "https://n8n-01.adspubli.com/webhook/bbf53a2e-61df-40d3-b4cb-67ddfc7dcaa0" \
  -H "Content-Type: application/json" \
  -d '{"upc":"012345678901"}'
```

### Probar desde el Frontend
1. Ejecuta el proyecto Lovable:
   ```bash
   cd workflow-6ke8vdtg
   npm install
   npm run dev
   ```
2. Escanea un código UPC
3. El workflow procesará automáticamente

---

## 📁 Estructura del Proyecto Lovable

```
workflow-6ke8vdtg/
├── src/
│   ├── hooks/
│   │   └── useN8nWorkflow.ts    # ✅ Hook de integración con n8n
│   ├── pages/
│   │   └── Index.tsx            # Página principal con scanner
│   ├── components/
│   │   ├── scanner/
│   │   │   └── ScannerView.tsx  # Componente del escáner
│   │   └── product/
│   │       ├── ProductHistory.tsx
│   │       └── EditProductDialog.tsx
│   └── types/
│       └── product.ts           # Tipos TypeScript
└── package.json
```

---

## 🚀 Despliegue

### Opción 1: Lovable (Recomendado)
1. Los cambios ya están en GitHub
2. Abre [Lovable](https://lovable.dev)
3. El proyecto se actualizará automáticamente
4. Click en **Share → Publish** para desplegar

### Opción 2: Manual
```bash
npm run build
# Despliega la carpeta dist/ a tu hosting preferido
```

---

## 🔐 Credenciales Necesarias

El workflow n8n usa las siguientes credenciales (ya configuradas):

- ✅ **Google Sheets OAuth2** (ID: CXMyagjSsWT8e8JE)
- ✅ **OpenAI API** (ID: xIIemrnT0V7tswAj)
- ✅ **Google Gemini API** (ID: 4J531Wn4mkP5qLDe)

---

## 📝 Notas Importantes

1. **El workflow está ACTIVO** - Cualquier request al webhook será procesado
2. **Google Sheets** - El inventario se guarda en: `14ofhXZMHBqvcuagm2MYqINWqANBfAe9cckoYe8HUvcg`
3. **AI Processing** - Usa OpenAI GPT-4.1-mini para analizar productos
4. **UPC Item DB** - API externa para obtener información de productos

---

## 🐛 Troubleshooting

### El webhook no responde
- Verifica que el workflow esté activo en n8n
- Revisa los logs de ejecución en n8n UI

### Error de formato de datos
- Asegúrate de enviar `{"upc": "..."}` en el body
- Verifica que el UPC sea válido

### Productos no se guardan
- Revisa las credenciales de Google Sheets
- Verifica permisos de la hoja de cálculo

---

## 📞 Soporte

- **Repositorio**: https://github.com/creativedesignseo/workflow-6ke8vdtg
- **n8n Instance**: https://n8n-01.adspubli.com
- **Workflow ID**: 6ke8vdTgNQMnMfZe

---

## ✅ Checklist de Integración

- [x] Workflow corregido y activado
- [x] Webhook URL configurada
- [x] Frontend actualizado con payload correcto
- [x] Tipos TypeScript definidos
- [x] Hook useN8nWorkflow implementado
- [x] Componentes de UI listos
- [x] Cambios pusheados a GitHub
- [ ] Pruebas end-to-end
- [ ] Despliegue a producción

---

**Última actualización**: 2025-12-11  
**Versión del Workflow**: 64
