import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import Aside from './aside';
import Columna from './Columna';


interface TableroProps {
  count: number;
  tasks: { id: number, name: string }[];
  addTask: (taskName:string) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
  handleDragStart: (event: React.DragEvent<HTMLElement>) => void;
  enableDropping: (event: React.DragEvent<HTMLElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLElement>) => void;
}

const Tablero: React.FC<TableroProps> = ({ count, tasks, addTask, deleteTask, editTask, handleDragStart, handleDrop, enableDropping }) => {

  return (
    <>
    <main>
    <Aside/>
    <div className='apartados'>
      <Columna
        count={count}
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        editTask={editTask}
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        enableDropping={enableDropping}
      />
    </div>
    </main>
    </>
  );
}

export default Tablero;
