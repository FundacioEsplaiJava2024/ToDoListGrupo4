import React from 'react';
import { useTaskManager } from '../hook/useTaskManager';
import Aside from './aside';
import Columna from './Columna';
import Header from './header';

const Tablero: React.FC = () => {
  const {
    currentProject,
    projects,
    createProject,
    loadProject,
    updateProjectName,
    addTask,
    deleteTask,
    editTask,
    addColumn,
    deleteColumn,
    editColumnName,
    moveTask,
  } = useTaskManager();

  const handleCreateProject = () => {
    const name = prompt('Ingrese el nombre del nuevo proyecto:');
    if (name && name.trim() !== '') {
      createProject(name.trim());
    }
  };

  return (
    <>
      <Header projectName={currentProject.name} onProjectNameChange={updateProjectName} />
      <main>
        <Aside projects={projects} onCreateProject={handleCreateProject} onLoadProject={loadProject} />
        <div className='tablero'>
          <h2 className='plus'>
            <button onClick={() => addColumn(`Columna ${currentProject.columns.length + 1}`)} className="add-column-btn">
              +
            </button>
          </h2>
          {currentProject.columns.map((columna) => (
            <Columna
              key={columna.id}
              count={columna.tasks.length}
              tasks={columna.tasks}
              name={columna.name}
              columnId={columna.id}
              addTask={(taskName) => addTask(columna.id, taskName)}
              deleteTask={(taskId) => deleteTask(columna.id, taskId)}
              editTask={(taskId, newName) => editTask(columna.id, taskId, newName)}
              eliminarColumna={() => deleteColumn(columna.id)}
              editarNombreColumna={(nuevoNombre) => editColumnName(columna.id, nuevoNombre)}
              moveTask={moveTask}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Tablero;
