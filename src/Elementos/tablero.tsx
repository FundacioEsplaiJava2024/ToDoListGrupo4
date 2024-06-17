// tablero.tsx (o columna.tsx)
import React, { useState } from 'react';
import Aside from './aside';
import Columna from './Columna';


interface TableroProps {
  count: number;
  tasks: { id: number, name: string }[];
  addTask: () => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

const Tablero: React.FC<TableroProps> = ({ count, tasks, addTask, deleteTask, editTask }) => {

  return (
    <Aside />
    <div className='apartados'>
      <Columna
        count={count}
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default Tablero;
