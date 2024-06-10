import React, { useState } from 'react';
function tareas(){
const [count, setCount] = useState(0);// Se crea la variable para el contador   
const [tasks, setTasks] = useState([]);// Se crea la variable para poner el numero de las tareas que hay
const [taskName, setTaskName] = useState('');// Se crea la variable para poner el nombre de las tareas

const addTask = () => {// metodo para añadir las tareas
    if (taskName.trim() !== '') {// Verifica que el nombre nombre no esta vacio, si esta vacio no añadirá la tarea
      setTasks([...tasks, { id: tasks.length + 1, name: taskName }]);// actualiza las tasks, como id tiene la posición del array y como nombre el nombre que le pones a la tarea
      setTaskName('');// Vuelve a setear el campo de la tarea para que se pueda escribir una tarea nueva
      setCount(count + 1); // Incrementa el contador al añadir una tarea
    }//Crea una nueva lista de tareas que incluye todas las tareas anteriores más la nueva tarea.
  };

  const deleteTask = (taskId) => {// crea un metodo que coge el taskid como parámetro
    const updatedTasks = tasks.filter(task => task.id !== taskId);// filtro para eliminar solo la tarea que tenga el mismoid
    setTasks(updatedTasks);// actualiza la lista de tareas sin poner la eliminada
    setCount(count -1);// Resta una tarea al conteo
  };
}