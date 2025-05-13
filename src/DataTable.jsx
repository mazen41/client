import React from 'react';
import { useTranslation } from 'react-i18next';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DataTable = ({ 
  title, 
  data, 
  columns, 
  onRowClick, 
  createButtonText,
  onCreate,
  secondaryButtonText,
  onSecondaryAction
}) => {
  const { t } = useTranslation();

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const doc = new jsPDF(orientation, unit, size);
    
    doc.setFontSize(15);
    doc.text(title, 40, 40);
    
    const headers = columns.map(col => col.header);
    const rows = data.map(item => 
      columns.map(col => {
        if (col.accessor === 'status') {
          return t(`statuses.${item[col.accessor]}`);
        }
        if (col.accessor === 'paymentMethod') {
          return t(`paymentMethods.${item[col.accessor]}`);
        }
        return item[col.accessor];
      })
    );

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: 50,
      styles: {
        cellPadding: 5,
        fontSize: 10,
        valign: 'middle',
        halign: 'center'
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      }
    });

    doc.save(`${title}.pdf`);
  };

  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(`<h1 class="title is-4">${title}</h1>`);
    printWindow.document.write('<table class="table is-fullwidth is-striped">');
    
    // Table header
    printWindow.document.write('<thead><tr>');
    columns.forEach(col => {
      printWindow.document.write(`<th>${col.header}</th>`);
    });
    printWindow.document.write('</tr></thead>');
    
    // Table body
    printWindow.document.write('<tbody>');
    data.forEach(item => {
      printWindow.document.write('<tr>');
      columns.forEach(col => {
        let cellContent = item[col.accessor];
        if (col.accessor === 'status') {
          cellContent = t(`statuses.${item[col.accessor]}`);
        }
        if (col.accessor === 'paymentMethod') {
          cellContent = t(`paymentMethods.${item[col.accessor]}`);
        }
        printWindow.document.write(`<td>${cellContent}</td>`);
      });
      printWindow.document.write('</tr>');
    });
    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="box">
      <div className="level">
        <div className="level-left">
          <h1 className="title is-4">{title}</h1>
        </div>
        <div className="level-right">
          <div className="buttons">
            {onCreate && (
              <button className="button is-primary" onClick={onCreate}>
                {createButtonText}
              </button>
            )}
            {onSecondaryAction && secondaryButtonText && (
              <button className="button is-info" onClick={onSecondaryAction}>
                {secondaryButtonText}
              </button>
            )}
            <div className="dropdown is-hoverable is-right">
              <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>{t('export')}</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <CSVLink 
                    data={data} 
                    filename={`${title}.csv`}
                    className="dropdown-item"
                  >
                    {t('exportExcel')}
                  </CSVLink>
                  <a className="dropdown-item" onClick={exportPDF}>
                    {t('exportPDF')}
                  </a>
                  <a className="dropdown-item" onClick={printTable}>
                    {t('print')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              {columns.map(column => (
                <th key={column.accessor}>{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} onClick={() => onRowClick && onRowClick(row)}>
                {columns.map(column => {
                  if (column.accessor === 'status') {
                    return (
                      <td key={column.accessor}>
                        <span className={`tag ${getStatusClass(row[column.accessor])}`}>
                          {t(`statuses.${row[column.accessor]}`)}
                        </span>
                      </td>
                    );
                  }
                  if (column.accessor === 'paymentMethod') {
                    return (
                      <td key={column.accessor}>
                        {t(`paymentMethods.${row[column.accessor]}`)}
                      </td>
                    );
                  }
                  if (column.accessor === 'actions') {
                    return (
                      <td key={column.accessor}>
                        <div className="buttons">
                          <button className="button is-small is-info" title="View">
                            <span className="icon">
                              <i className="fas fa-eye"></i>
                            </span>
                          </button>
                          <button className="button is-small is-warning" title="Edit">
                            <span className="icon">
                              <i className="fas fa-edit"></i>
                            </span>
                          </button>
                          <button className="button is-small is-danger" title="Delete">
                            <span className="icon">
                              <i className="fas fa-trash"></i>
                            </span>
                          </button>
                        </div>
                      </td>
                    );
                  }
                  return <td key={column.accessor}>{row[column.accessor]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case 'completed': return 'is-success';
    case 'pending': return 'is-warning';
    case 'failed': return 'is-danger';
    case 'refunded': return 'is-info';
    case 'cancelled': return 'is-light';
    default: return '';
  }
};

export default DataTable;