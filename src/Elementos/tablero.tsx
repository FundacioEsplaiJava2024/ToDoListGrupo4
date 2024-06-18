import React, { useState } from 'react';
import Columna from './Columna';

interface TableroProps {
  count: number;
  tasks: { id: number; name: string }[];
  addTask: (taskName: string) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

const Tablero: React.FC<TableroProps> = ({ count, tasks, addTask, deleteTask, editTask }) => {
  const [columnas, setColumnas] = useState<{ id: number; nombre: string }[]>([
    { id: 1, nombre: 'Columna 1' },
  ]); // Inicialmente tenemos una columna

  const agregarColumna = () => {
    const nuevaColumnaId = columnas.length + 1;
    setColumnas([...columnas, { id: nuevaColumnaId, nombre: `Columna ${nuevaColumnaId}` }]);
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
    <>
      <div className='apartados'>
        {columnas.map((columna) => (
          <div key={columna.id} className='columna'>
            <h3>{columna.nombre}</h3>
            <Columna
              count={count}
              tasks={tasks}
              addTask={addTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
            <button onClick={() => eliminarColumna(columna.id)}>Eliminar Columna</button>
            <button onClick={() => {
              const nuevoNombre = prompt('Ingrese el nuevo nombre de la columna:', columna.nombre);
              if (nuevoNombre) {
                editarNombreColumna(columna.id, nuevoNombre);
              }
            }}>Editar Nombre</button>
          </div>
        ))}
      </div>
      <button onClick={agregarColumna}>Añadir Columna</button>
    </>
  );
};

export default Tablero;
