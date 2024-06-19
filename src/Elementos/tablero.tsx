import React, { useState } from 'react';
import Columna from './Columna';

interface TableroProps {
  count: number;
  tasks: { id: number; name: string }[];
  addTask: (taskName: string, columnaId: number) => void;
  deleteTask: (taskId: number, columnaId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

interface ColumnaData {
  id: number;
  nombre: string;
  tareas: { id: number; name: string }[];
}

const Tablero: React.FC<TableroProps> = ({ count, tasks, addTask, deleteTask, editTask }) => {
  const [columnas, setColumnas] = useState<ColumnaData[]>([
    { id: 1, nombre: 'Columna 1', tareas: [] },
  ]);

  const agregarColumna = () => {
    const nuevaColumnaId = Date.now(); // Genera un ID único basado en la fecha y hora actual
    setColumnas([...columnas, { id: nuevaColumnaId, nombre: `Columna ${columnas.length + 1}`, tareas: [] }]);
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

  const addTaskToColumn = (columnaId: number, taskName: string) => {
    const nuevasColumnas = columnas.map((col) =>
      col.id === columnaId ? { ...col, tareas: [...col.tareas, { id: col.tareas.length + 1, name: taskName }] } : col
    );
    setColumnas(nuevasColumnas);
  };

  const handleDeleteTask = (taskId: number, columnaId: number) => {
    const nuevasColumnas = columnas.map((col) =>
      col.id === columnaId ? { ...col, tareas: col.tareas.filter((task) => task.id !== taskId) } : col
    );
    setColumnas(nuevasColumnas);
    deleteTask(taskId, columnaId);
  };

  const handleEditTask = (taskId: number, newName: string, columnaId: number) => {
    const nuevasColumnas = columnas.map((col) =>
      col.id === columnaId ? {
        ...col,
        tareas: col.tareas.map((task) => (task.id === taskId ? { ...task, name: newName } : task))
      } : col
    );
    setColumnas(nuevasColumnas);
    editTask(taskId, newName);
  };

  return (
    <div className='tablero'>
      {columnas.map((columna) => (
        <Columna
          key={columna.id}
          count={count}
          tasks={columna.tareas}
          addTask={(taskName) => addTaskToColumn(columna.id, taskName)}
          deleteTask={(taskId) => handleDeleteTask(taskId, columna.id)}
          editTask={(taskId, newName) => handleEditTask(taskId, newName, columna.id)}
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
