import React, { useState } from 'react';
import Columna from './Columna';


interface TableroProps {
  count: number;
  tasks: { id: number, name: string }[];
  taskName: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
}

const Tablero: React.FC<TableroProps> = ({ count, tasks, taskName, handleInputChange, addTask, deleteTask, editTask }) => {

  return (
    <div className='apartados'>
      <Columna
        count={count}
        tasks={tasks}
        taskName={taskName}
        handleInputChange={handleInputChange}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
}

export default Tablero;
