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
  const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
    event.dataTransfer.setData('text', event.currentTarget.id);
    event.dataTransfer.effectAllowed = "move";
  }

  // Evita que se pueda soltar en cualquier sitio
  const enableDropping = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  // Termina de mover el div que se a agarrado previamente a otro sitio
  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    const id = event.dataTransfer.getData('text');
    event.currentTarget.appendChild(document.getElementById(id)!);
  }

const Columna: React.FC<ColumnaProps> = ({ count, tasks, taskName, handleInputChange, addTask, deleteTask }) => {
  return (
    <>
      <div className="parametros" >
        <h2 className='sub'>Idea <span>{count}</span></h2>
        <input type="text" value={taskName} onChange={handleInputChange} placeholder="Nombre de la tarea" />
        <button onClick={addTask} id='aggTarea'>+</button>
        <div className="listas" >
          <ul onDragOver={enableDropping} onDrop={handleDrop}>
            {tasks.map(task => (
              <li key={task.id} draggable="true" onDragStart={handleDragStart} id="01" >
                {task.name}
                <button onClick={() => deleteTask(task.id)}>Borrar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="parametros" >
        <h2 className='sub'>Iniciando</h2>
        <ul onDragOver={enableDropping} onDrop={handleDrop}>
        <li></li>
        </ul>
        </div>
      <div className="parametros" >
        <h2 className='sub'>Finalizado</h2>
        <ul onDragOver={enableDropping} onDrop={handleDrop}>
        <li></li>
        </ul>
        </div>
    </>
  );
};

export default Columna;
