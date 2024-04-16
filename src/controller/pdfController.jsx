import { useState } from 'react';
import jsPDF from 'jspdf';
import './PDFGenerator.css'; // Importar el archivo CSS para estilos

const PDFGenerator = () => {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');

  const generatePDF = () => {
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    // Agregar el texto ingresado por el usuario al documento
    doc.text(text || '¡Hola, mundo!', 10, 10);

    // Guardar el documento como un archivo PDF
    doc.save(fileName || 'mi_documento.pdf');
  };

  return (
    <div className="pdf-generator-container">
      <input
        type="text"
        placeholder="Ingrese el texto para el PDF"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Ingrese el nombre del archivo"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <br />
      <button onClick={generatePDF}>Generar y Descargar PDF</button>
    </div>
  );
};

export default PDFGenerator;
