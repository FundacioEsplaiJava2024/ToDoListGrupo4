import React, { useState } from 'react';
import Columna from './Columna';

interface TableroProps {
  count: number;
  tasks: { id: number; name: string }[];
  addTask: (taskName: string) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

interface ColumnaData {
  id: number;
  nombre: string;
}

const Tablero: React.FC<TableroProps> = ({ count, tasks, addTask, deleteTask, editTask }) => {
  const [columnas, setColumnas] = useState<ColumnaData[]>([
    { id: 1, nombre: 'Columna 1' },
  ]);

  const agregarColumna = () => {
    const nuevaColumnaId = Date.now(); // Genera un ID único basado en la fecha y hora actual
    setColumnas([...columnas, { id: nuevaColumnaId, nombre: `Columna ${columnas.length + 1}` }]);
  };

  const eliminarColumna = (columnaId: number) => {
    const nuevasColumnas = columnas.filter((col) => col.id !== columnaId);
    setColumnas(nuevasColumnas);
  };

  const editarNombreColumna = (columnaId: number, nuevoNombre: string) => {
    const nuevasColumnas = columnas.map((col) =>
      col.id === columnaId ? { ...col, nombre: nuevoNombre } : col
    );
    setColumnas(nuevasColumnas);
  };

  return (
    <div className='tablero'>
      {columnas.map((columna) => (
        <Columna
          key={columna.id}
          count={count}
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
          editTask={editTask}
          eliminarColumna={() => eliminarColumna(columna.id)}
          editarNombreColumna={(nuevoNombre) => editarNombreColumna(columna.id, nuevoNombre)}
          nombre={columna.nombre}
        />
      ))}
      <button onClick={agregarColumna} className="add-column-btn">Añadir Columna</button>
    </div>
  );
};

export default Tablero;
