import React from 'react';
import { useTaskManager } from '../hook/useTaskManager';
import Aside from './aside';
import Columna from './Columna';

const Tablero: React.FC = () => {
  const {
    columns,
    addTask,
    deleteTask,
    editTask,
    addColumn,
    deleteColumn,
    editColumnName,
  } = useTaskManager();

  return (
    <>
      <main>
        <Aside />
        <div className='tablero'>
          {columns.map((columna) => (
            <Columna
              key={columna.id}
              count={columna.tasks.length}
              tasks={columna.tasks}
              name={columna.name}
              addTask={(taskName) => addTask(columna.id, taskName)}
              deleteTask={(taskId) => deleteTask(columna.id, taskId)}
              editTask={(taskId, newName) => editTask(columna.id, taskId, newName)}
              eliminarColumna={() => deleteColumn(columna.id)}
              editarNombreColumna={(nuevoNombre) => editColumnName(columna.id, nuevoNombre)}
            />
          ))}
          <span onClick={() => addColumn(`Columna ${columns.length + 1}`)} className="add-column-btn">
            Añadir Columna
          </span>
        </div>
      </main>
    </>
  );
};

export default Tablero;

