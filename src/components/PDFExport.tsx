import React from 'react';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Item {
  id: string;
  name: string;
  category: string;
  packed: boolean;
  quantity?: number;
}

interface Trip {
  id: string;
  name: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
}

interface PDFExportProps {
  trip: Trip | null;
  items: Item[];
  onExport: () => void;
}

export const PDFExport: React.FC<PDFExportProps> = ({
  trip,
  items,
  onExport,
}) => {
  const generatePDF = () => {
    // Create a simple HTML document for printing/PDF
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const packedItems = items.filter(item => item.packed);
    const unpackedItems = items.filter(item => !item.packed);
    
    const groupByCategory = (items: Item[]) => {
      return items.reduce((acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      }, {} as { [category: string]: Item[] });
    };

    const packedByCategory = groupByCategory(packedItems);
    const unpackedByCategory = groupByCategory(unpackedItems);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${trip?.name || 'Packing List'} - Pack Smart</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              color: #1e293b;
              font-size: 2.5rem;
            }
            .header .subtitle {
              color: #64748b;
              font-size: 1.1rem;
              margin: 10px 0;
            }
            .stats {
              display: flex;
              justify-content: space-around;
              background: #f8fafc;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 30px;
            }
            .stat {
              text-align: center;
            }
            .stat-number {
              font-size: 1.5rem;
              font-weight: bold;
              color: #1e293b;
            }
            .stat-label {
              color: #64748b;
              font-size: 0.9rem;
            }
            .category-section {
              margin-bottom: 30px;
            }
            .category-title {
              background: #3b82f6;
              color: white;
              padding: 10px 15px;
              border-radius: 6px;
              margin-bottom: 15px;
              font-weight: bold;
              text-transform: capitalize;
            }
            .packed .category-title {
              background: #10b981;
            }
            .item-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 10px;
              margin-bottom: 20px;
            }
            .item {
              display: flex;
              align-items: center;
              padding: 8px 12px;
              background: white;
              border: 1px solid #e2e8f0;
              border-radius: 6px;
            }
            .checkbox {
              width: 16px;
              height: 16px;
              border: 2px solid #cbd5e1;
              border-radius: 3px;
              margin-right: 10px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            .packed .checkbox {
              background: #10b981;
              border-color: #10b981;
              color: white;
            }
            .packed .checkbox::after {
              content: "✓";
              font-size: 12px;
            }
            .item-name {
              flex: 1;
            }
            .packed .item-name {
              text-decoration: line-through;
              color: #64748b;
            }
            .quantity {
              background: #e2e8f0;
              color: #475569;
              padding: 2px 6px;
              border-radius: 12px;
              font-size: 0.8rem;
              margin-left: 8px;
            }
            .section-header {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
            }
            .section-icon {
              width: 24px;
              height: 24px;
              margin-right: 10px;
            }
            .footer {
              text-align: center;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #e2e8f0;
              color: #64748b;
              font-size: 0.9rem;
            }
            @media print {
              body { margin: 0; }
              .stats { break-inside: avoid; }
              .category-section { break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${trip?.name || 'Packing List'}</h1>
            ${trip?.destination ? `<div class="subtitle">📍 ${trip.destination}</div>` : ''}
            ${trip?.startDate && trip?.endDate ? `
              <div class="subtitle">
                📅 ${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}
              </div>
            ` : ''}
          </div>

          <div class="stats">
            <div class="stat">
              <div class="stat-number">${items.length}</div>
              <div class="stat-label">Total Items</div>
            </div>
            <div class="stat">
              <div class="stat-number">${packedItems.length}</div>
              <div class="stat-label">Packed</div>
            </div>
            <div class="stat">
              <div class="stat-number">${unpackedItems.length}</div>
              <div class="stat-label">Remaining</div>
            </div>
            <div class="stat">
              <div class="stat-number">${Math.round((packedItems.length / items.length) * 100) || 0}%</div>
              <div class="stat-label">Complete</div>
            </div>
          </div>

          ${packedItems.length > 0 ? `
            <div class="section packed">
              <div class="section-header">
                <h2>✅ Packed Items</h2>
              </div>
              ${Object.entries(packedByCategory).map(([category, categoryItems]) => `
                <div class="category-section">
                  <div class="category-title">${category} (${categoryItems.length})</div>
                  <div class="item-grid">
                    ${categoryItems.map(item => `
                      <div class="item">
                        <div class="checkbox"></div>
                        <span class="item-name">${item.name}</span>
                        ${item.quantity && item.quantity > 1 ? `<span class="quantity">${item.quantity}</span>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${unpackedItems.length > 0 ? `
            <div class="section">
              <div class="section-header">
                <h2>📦 Items to Pack</h2>
              </div>
              ${Object.entries(unpackedByCategory).map(([category, categoryItems]) => `
                <div class="category-section">
                  <div class="category-title">${category} (${categoryItems.length})</div>
                  <div class="item-grid">
                    ${categoryItems.map(item => `
                      <div class="item">
                        <div class="checkbox"></div>
                        <span class="item-name">${item.name}</span>
                        ${item.quantity && item.quantity > 1 ? `<span class="quantity">${item.quantity}</span>` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="footer">
            <p>Generated by Pack Smart • ${new Date().toLocaleDateString()}</p>
            <p>Happy travels! ✈️</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print
    setTimeout(() => {
      printWindow.print();
    }, 500);

    onExport();
  };

  return (
    <Button
      onClick={generatePDF}
      variant="outline"
      className="flex items-center gap-2"
      disabled={items.length === 0}
    >
      <FileText className="h-4 w-4" />
      Export PDF
    </Button>
  );
};