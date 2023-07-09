import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

export default function PDFGenerate({ htmlContent, movieRatingData, moviesData, salesData, snacksData }) {
  const pdfRef = useRef();

  const generatePDF = () => {
    html2canvas((pdfRef.current), { background: '#ffffff'}).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Datos de las películas más valoradas
      pdf.setFontSize(16);
      pdf.text('Películas más valoradas', 20, pdfHeight + 20);
      pdf.autoTable({
        startY: pdfHeight + 40,
        head: [['Película', 'Valoración Total']],
        body: movieRatingData.map(data => [data.label, data.pesima + data.mala + data.regular + data.buena + data.excelente])
      });

      // Datos de las ventas por multiplex
      pdf.setFontSize(16);
      pdf.text('Ventas por multiplex', 20, pdf.autoTable.previous.finalY + 20);
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 40,
        head: [['Multiplex', 'Ventas']],
        body: moviesData.map(data => [data.label, data.y])
      });

      // Datos de las películas más vistas
      pdf.setFontSize(16);
      pdf.text('Películas más vistas', 20, pdf.autoTable.previous.finalY + 20);
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 40,
        head: [['Película', 'Vistas']],
        body: salesData.map(data => [data.label, data.y])
      });

      // Datos de los snacks más vendidos
      pdf.setFontSize(16);
      pdf.text('Snacks más vendidos', 20, pdf.autoTable.previous.finalY + 20);
      pdf.autoTable({
        startY: pdf.autoTable.previous.finalY + 40,
        head: [['Snack', 'Cantidad']],
        body: snacksData.map(data => [data.label, data.y])
      });

      pdf.save('reporte.pdf');
    });
  };

  return (
    <div ref={pdfRef}>
      {htmlContent}
      <div className="text-center mt-4">
        <button onClick={generatePDF} className="px-4 py-2 bg-blue-500 text-white rounded">
          Generar Reporte PDF
        </button>
      </div>
    </div>
  );
}