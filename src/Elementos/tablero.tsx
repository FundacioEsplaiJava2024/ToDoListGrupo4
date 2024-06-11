import React from 'react';

interface ColumnaProps {
  count: number;
  tasks: { id: number, name: string }[];
  taskName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  deleteTask: (taskId: number) => void;
}

  // Te permite agarrar el elementoDiv
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id);
    event.dataTransfer.effectAllowed = "move";
  }

  // Evita que se pueda soltar en cualquier sitio
  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  // Termina de mover el div que se a agarrado previamente a otro sitio
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    event.currentTarget.appendChild(document.getElementById(id)!);
  }

const Columna: React.FC<ColumnaProps> = ({ count, tasks, taskName, handleInputChange, addTask, deleteTask }) => {
  return (
    <>
      <div className="parametros"  onDragOver={enableDropping} onDrop={handleDrop}>
        <h2 className='sub'>Idea <span>{count}</span></h2>
        <input type="text" value={taskName} onChange={handleInputChange} placeholder="Nombre de la tarea" />
        <button onClick={addTask} id='aggTarea'>+</button>
        <div className="listas"  id="01"  draggable="true" onDragStart={handleDragStart}>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                {task.name}
                <button onClick={() => deleteTask(task.id)}>Borrar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="parametros"  onDragOver={enableDropping} onDrop={handleDrop}><h2 className='sub'>Iniciando</h2></div>
      <div className="parametros"  onDragOver={enableDropping} onDrop={handleDrop}><h2 className='sub'>Finalizado</h2></div>
    </>
  );
};

export default Columna;
