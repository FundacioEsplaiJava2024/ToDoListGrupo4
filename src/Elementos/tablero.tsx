// tablero.tsx (o columna.tsx)
import React, { useState } from 'react';
import Aside from './aside';
import Columna from './Columna';


interface Task {
  id: number;
  name: string;
}

interface Column {
  id: number;
  name: string;
  tasks: Task[];
}

interface TableroProps {

  count: number;
  tasks: { id: number, name: string }[];
  addTask: (taskName:string) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number, newName: string) => void;
  column: Column;
  deleteColumn: (columnId: number) => void;
  editColumnName: (columnId: number, newName: string) => void;
}

const Tablero: React.FC<TableroProps> = ({ count, tasks, addTask, deleteTask, editTask }) => {
  column,
  deleteColumn,
  editColumnName,
  const [editColumnNameState, setEditColumnNameState] = useState<boolean>(false);
  const [newColumnName, setNewColumnName] = useState<string>(column.name);



  const handleColumnNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewColumnName(event.target.value);
  };

  const handleSaveColumnName = () => {
    if (newColumnName.trim() !== '') {
      editColumnName(column.id, newColumnName);
      setEditColumnNameState(false);
    }
  };

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
      />
    </div>
    </main>
    </>

  );
}

export default Tablero;
