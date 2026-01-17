
import React, { useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Sheet, FileText, Printer } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ActionMenu, { ActionMenuOption } from "@/components/common/ActionMenu";
import * as XLSX from 'xlsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ColumnDef {
  key: string;
  header: string;
  width?: string;
  flex?: number;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface CommonTableProps {
  title: string;
  subtitle?: string;
  rowData: any[];
  colDefs: ColumnDef[];
  itemsPerPage?: number;
  className?: string;
  exportable?: boolean;
}

type SortOrder = 'asc' | 'desc' | null;

const CommonTable: React.FC<CommonTableProps> = ({
  title,
  subtitle,
  rowData,
  colDefs,
  itemsPerPage = 10,
  className = "",
  exportable = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortOrder) return rowData;

    return [...rowData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // Handle different data types
      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [rowData, sortColumn, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (columnKey: string) => {
    const column = colDefs.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    if (sortColumn === columnKey) {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
      } else if (sortOrder === 'desc') {
        setSortColumn(null);
        setSortOrder(null);
      } else {
        setSortOrder('asc');
      }
    } else {
      setSortColumn(columnKey);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (columnKey: string) => {
    const column = colDefs.find(col => col.key === columnKey);
    if (!column?.sortable) return null;

    if (sortColumn === columnKey) {
      return sortOrder === 'asc' ? (
        <ChevronUp className="ms-1 h-4 w-4" />
      ) : (
        <ChevronDown className="ms-1 h-4 w-4" />
      );
    }
    return <ChevronDown className="ms-1 h-4 w-4 opacity-30" />;
  };

  const getColumnStyle = (colDef: ColumnDef) => {
    if (colDef.width) {
      return { width: colDef.width };
    }
    if (colDef.flex) {
      return { flex: colDef.flex };
    }
    return {};
  };

  // Export to Excel
  const exportToExcel = () => {
    const exportData = sortedData.map(row => {
      const exportRow: any = {};
      colDefs.forEach(col => {
        exportRow[col.header] = row[col.key];
      });
      return exportRow;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${title}.xlsx`);
  };

  // Export to PDF with RTL support
  const exportToPDF = async () => {
    if (!tableRef.current) return;

    try {
      const canvas = await html2canvas(tableRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // Add Arabic font support if needed
      if (language === 'ar') {
        // Set RTL direction for Arabic
        pdf.setLanguage('ar');
      }

      const imgWidth = 297; // A4 landscape width in mm
      const pageHeight = 210; // A4 landscape height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${title}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Print functionality
  const handlePrint = () => {
    if (!tableRef.current) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const tableClone = tableRef.current.cloneNode(true) as HTMLElement;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="${language}" dir="${language === 'ar' ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px;
            direction: ${language === 'ar' ? 'rtl' : 'ltr'};
          }
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin-top: 20px;
          }
          th, td { 
            border: 1px solid #ddd; 
            padding: 8px; 
            text-align: ${language === 'ar' ? 'right' : 'left'};
          }
          th { 
            background-color: #f2f2f2; 
            font-weight: bold;
          }
          h1 { 
            color: #333; 
            margin-bottom: 10px;
          }
          p { 
            color: #666; 
            margin-bottom: 20px;
          }
          @media print {
            body { margin: 0; }
            @page { margin: 1cm; }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ''}
        ${tableClone.outerHTML}
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Export action menu options
  const exportOptions: ActionMenuOption[] = [
    {
      value: 'excel',
      label: t('table.export.excel'),
      onClick: exportToExcel,
      icon: <Sheet className="h-4 w-4" />
    },
    {
      value: 'pdf',
      label: t('table.export.pdf'),
      onClick: exportToPDF,
      icon: <FileText className="h-4 w-4" />
    },
    {
      value: 'print',
      label: t('table.export.print'),
      onClick: handlePrint,
      icon: <Printer className="h-4 w-4" />
    }
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
          {exportable && (
            <ActionMenu options={exportOptions} />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div ref={tableRef}>
            <Table>
              <TableHeader>
                <TableRow>
                  {colDefs.map((colDef) => (
                    <TableHead
                      key={colDef.key}
                      style={getColumnStyle(colDef)}
                      className={colDef.sortable ? "cursor-pointer select-none hover:bg-muted/50" : ""}
                      onClick={() => handleSort(colDef.key)}
                    >
                      <div className="flex items-center">
                        {colDef.header}
                        {getSortIcon(colDef.key)}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((row, index) => (
                  <TableRow key={index}>
                    {colDefs.map((colDef) => (
                      <TableCell key={colDef.key} style={getColumnStyle(colDef)}>
                        {colDef.render
                          ? colDef.render(row[colDef.key], row)
                          : row[colDef.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  >
                    {t('table.pagination.previous')}
                  </PaginationPrevious>
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  >
                    {t('table.pagination.next')}
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommonTable;
