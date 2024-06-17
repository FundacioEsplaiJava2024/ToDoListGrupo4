import React from 'react';
import { nanoid } from 'nanoid';

interface ColumnaProps {
  count: number;
  tasks: { id: number, name: string }[];
  taskName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  deleteTask: (taskId: number) => void;
  handleDragStart: (event: React.DragEvent<HTMLElement>) => void;
  enableDropping: (event: React.DragEvent<HTMLElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLElement>) => void;
}
const Columna: React.FC<ColumnaProps> = ({ count, tasks, taskName, handleInputChange, addTask, deleteTask, handleDragStart, enableDropping, handleDrop }) => {
  const generateUniqueId = (): string => nanoid();
  return (
    <>
      <div className="parametros" >
        <h2 className='sub'>Idea <span>{count}</span></h2>
        <input id='newTask' type="text" value={taskName} onInput={handleInputChange} placeholder="Nombre de la tarea" />
        <button onClick={addTask} id='aggTarea'>+</button>
        <div className="listas" >
          <ul onDragOver={enableDropping} onDrop={handleDrop}>
            <li className="nobullet"></li>
            {tasks.map(task => (
              <li key={task.id} draggable="true" onDragStart={handleDragStart} id={generateUniqueId()} >
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
          <li className="nobullet"></li>
        </ul>
      </div>
      <div className="parametros" >
        <h2 className='sub'>Finalizado</h2>
        <ul onDragOver={enableDropping} onDrop={handleDrop}>
          <li className="nobullet"></li>
        </ul>
      </div>
    </>
  );
};
export default Columna;






// import React from 'react';

// interface ColumnaProps {
//   count: number;
//   tasks: { id: number, name: string }[];
//   taskName: string;
//   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   addTask: () => void;
//   deleteTask: (taskId: number) => void;
//   updateID: (taskId: number) => void;
//   handleDragStart: (event: React.DragEvent<HTMLElement>) => void;
//   enableDropping: (event: React.DragEvent<HTMLElement>) => void;
//   handleDrop: (event: React.DragEvent<HTMLElement>) => void;
// }
// const Columna: React.FC<ColumnaProps> = ({ count, tasks, taskName, handleInputChange, addTask, deleteTask, handleDragStart, enableDropping, handleDrop, updateID }) => {
//   return (
//     <>
//       <div className="parametros" >
//         <h2 className='sub'>Idea <span>{count}</span></h2>
//         <input type="text" value={taskName} onChange={handleInputChange} id='inputTarea' placeholder="Nombre de la tarea" />
//         <button onClick={addTask} id='aggTarea'>+</button>
//         <div className="listas" >
//           <ul onDragOver={enableDropping} onDrop={handleDrop}>
//             <li className="nobullet"></li>
//             {tasks.map(task => (
//               <li key={task.id} draggable="true" onDragStart={handleDragStart} id={`${task.id}`} >
//                 {task.name}
//                 <button onClick={() => deleteTask(task.id)} id='deleteTarea'>Borrar</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <div className="parametros" >
//         <h2 className='sub'>Iniciando</h2>
//         <ul onDragOver={enableDropping} onDrop={handleDrop}>
//           <li className="nobullet"></li>
//         </ul>
//       </div>
//       <div className="parametros" >
//         <h2 className='sub'>Finalizado</h2>
//         <ul onDragOver={enableDropping} onDrop={handleDrop}>
//           <li className="nobullet"></li>
//         </ul>
//       </div>
//     </>
//   );
// };
// export default Columna;