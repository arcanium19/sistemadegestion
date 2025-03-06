import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const BudgetCard = ({ budget, onDetails, onEdit, onDelete }) => {
  const handlePrintPDF = () => {
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Presupuesto", 105, 20, null, null, "center");

    // Datos de la empresa (columna izquierda)
    const companyData = [
      ["SOLIMOINOX"],
      ["25 de Mayo 2422"],
      ["San Miguel de Tucumán"],
      ["Teléfono: 381 155 457874"],
      ["Email: ssolimo@gmail.com"],
    ];

    // Datos del cliente (columna derecha)
    const clientData = [
      ["Nombre:", budget.client?.name || "-"],
      ["Dirección:", budget.client?.address || "-"],
      ["Teléfono:", budget.client?.contact || "-"],
      ["Email:", budget.client?.email || "-"],
    ];

    // Encabezado con tabla
    doc.autoTable({
      startY: 30,
      head: [],
      body: [
        [
          { content: "Datos de la empresa", styles: { halign: "left", fontStyle: "bold" } },
          { content: "Datos del cliente", styles: { halign: "left", fontStyle: "bold" } },
        ],
      ],
      theme: "plain",
      styles: { fontSize: 12 },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
      },
    });

    // Cuerpo con datos
    doc.autoTable({
      startY: doc.lastAutoTable.finalY,
      head: [],
      body: companyData.map((item, index) => [
        { content: item[0], styles: { halign: "left" } },
        { content: clientData[index] ? clientData[index][1] : "", styles: { halign: "left" } },
      ]),
      theme: "grid",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
      },
    });

    // Línea de separación
    // doc.line(10, doc.lastAutoTable.finalY + 10, 200, doc.lastAutoTable.finalY + 10);

    // Sección de proyecto (Fecha, Ubicación, Tipo de trabajo)
    const projectData = [
      ["Fecha presupuesto:", new Date(budget.createdAt).toLocaleDateString() || "-"],
      ["Ubicación:", budget.location || "-"],
      ["Tipo de trabajo:", budget.work_type || "-"],
    ];

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Datos del proyecto", ""]],
      body: projectData,
      theme: "grid",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: "bold" },
        1: { cellWidth: 130 },
      },
    });

    // Memoria descriptiva
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Memoria descriptiva"]],
      body: [
        ["Objetivo:", budget?.objective || "-"],
        ["Detalles finales:", budget?.finish_details || "-"],
        ["Accesorios:", budget?.accessories || "-"],
        ["Observaciones:", budget?.observations || "-"],
        ["Extras:", budget?.extra_details || "-"],
      ],
      theme: "grid",
      styles: { fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: "bold" },
        1: { cellWidth: 130 },
      },
    });

    // Tabla de materiales
    const materialColumns = ["Descripción", "Unidades", "Precio Unitario", "Total"];
    const materialRows = budget.materials.map((material) => [
      material.name || "-",
      material.quantity || "-",
      `$${material.unit_price.toFixed(2)}` || "-",
      `$${material.total.toFixed(2)}` || "-",
    ]);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [materialColumns],
      body: materialRows,
      theme: "striped",
      styles: { fontSize: 10 },
    });

    // Calcular total de materiales
    const totalMaterials = budget.materials.reduce(
      (acc, material) => acc + (material.total || 0),
      0
    );

    // Mostrar total general
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: $${totalMaterials.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20);

    // Pie de página con paginación
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" });
    }

    // Descargar PDF
    doc.save(`${budget?.name || "project"} - ${budget?.client?.name || "client"} - ${new Date(budget.createdAt).toLocaleDateString() || "-"}.pdf`);
  };

  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      {/* Información del presupuesto */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{budget.name}</h3>
        <p className="text-gray-600">Cliente: {budget.client?.name || "-"}</p>
        <p className="text-gray-600">
          Fecha: {new Date(budget.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-600 font-semibold">
          Total: ${budget.estimated_price || "-"}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onDetails}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
          Más Detalles
        </button>
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Eliminar
        </button>
        <button
          onClick={handlePrintPDF}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
        >
          Imprimir PDF
        </button>
      </div>
    </li>
  );
};

export default BudgetCard;




// import React from "react";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const BudgetCard = ({ budget }) => {
//   const handlePrintPDF = () => {
//     const doc = new jsPDF();

//     // Encabezado
//     doc.setFontSize(16);
//     doc.setFont("helvetica", "bold");
//     doc.text("SOLIMOINOX", 105, 10, { align: "center" });

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.text(`Fecha: ${new Date(budget.createdAt).toLocaleDateString() || "-"}`, 10, 20);
//     doc.text(`Ubicación: ${budget.location || "-"}`, 10, 30);
//     doc.text(`Tipo de trabajo: ${budget.work_type || "-"}`, 10, 40);

//     // Información del cliente
//     doc.text(`Cliente: ${budget.client?.name || "-"}`, 10, 50);
//     doc.text(`Contacto: ${budget.client?.contact || "-"}`, 10, 60);
//     doc.text(`Dirección: ${budget.client?.address || "-"}`, 10, 70);

//     // Descripción del trabajo
//     doc.setFont("helvetica", "bold");
//     doc.text("Memoria descriptiva", 10, 80);
//     doc.setFont("helvetica", "normal");
//     doc.text(`Objetivo: ${budget.objective || "-"}`, 10, 90);
//     doc.text(`Detalles finales: ${budget.finish_details || "-"}`, 10, 100);
//     doc.text(`Accesorios: ${budget.accessories || "-"}`, 10, 110);
//     doc.text(`Observaciones: ${budget.observations || "-"}`, 10, 120);
//     doc.text(`Extras: ${budget.extra_details || "-"}`, 10, 130);

//     // Línea de separación
//     doc.line(10, 140, 200, 140);

//     // Tabla de materiales
//     const materialColumns = ["Material", "Proveedor", "Cantidad", "Precio Unitario", "Total"];
//     const materialRows = budget.materials.map((material) => [
//       material.name || "-",
//       material.provider || "-",
//       material.quantity || "-",
//       `$${material.unit_price.toFixed(2)}` || "-",
//       `$${material.total.toFixed(2)}` || "-",
//     ]);

//     doc.autoTable({
//       startY: 150,
//       head: [materialColumns],
//       body: materialRows,
//       theme: "striped",
//       margin: { top: 10 },
//       styles: { fontSize: 10 },
//     });

//     // Calcular total de materiales
//     const totalMaterials = budget.materials.reduce(
//       (acc, material) => acc + (material.total || 0),
//       0
//     );

//     // Tabla de gastos extras (opcional, puedes extenderla en el futuro)
//     const expensesColumns = ["Descripción", "Costo"];
//     const expensesRows = [
//       ["Transporte", 2000], // Ejemplo de transporte
//       ["Mano de obra", 5000], // Ejemplo de empleados
//     ];

//     const totalExpenses = expensesRows.reduce((acc, expense) => acc + expense[1], 0);

//     // Mostrar tabla de gastos extras
//     doc.autoTable({
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [expensesColumns],
//       body: expensesRows,
//       theme: "striped",
//       margin: { top: 10 },
//       styles: { fontSize: 10 },
//     });

//     // Calcular total general
//     const grandTotal = totalMaterials + totalExpenses;

//     // Mostrar total general
//     doc.setFont("helvetica", "bold");
//     doc.text(`TOTAL: $${grandTotal.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20);

//     // Pie de página con paginación
//     const pageCount = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pageCount; i++) {
//       doc.setPage(i);
//       doc.setFontSize(10);
//       doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: "center" });
//     }

//     // Descargar PDF
//     doc.save(`${budget.name || "presupuesto"} - ${budget.client.name}.pdf`);
//   };

//   return (
//     <li className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center">
//       <div>
//         <h3 className="text-lg font-bold text-gray-800">{budget.name}</h3>
//         <p className="text-gray-600">Cliente: {budget.client?.name || "-"}</p>
//         <p className="text-gray-600">Fecha: {new Date(budget.createdAt).toLocaleDateString()}</p>
//         <p className="text-gray-600 font-semibold">Total: ${budget.estimated_price || "-"}</p>
//       </div>
//       <div className="flex gap-2">
//         <button
//           onClick={onDetails}
//           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
//         >
//           Más Detalles
//         </button>
//         <button
//           onClick={onEdit}
//           className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
//         >
//           Editar
//         </button>
//         <button
//           onClick={onDelete}
//           className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
//         >
//           Eliminar
//         </button>
//         <button
//           onClick={handlePrintPDF}
//           className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition"
//         >
//           Imprimir PDF
//         </button>
//       </div>
//     </li>
//   );
// };

// export default BudgetCard;
