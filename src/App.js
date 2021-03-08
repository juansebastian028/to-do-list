import React,{useState} from 'react';
import { createGlobalStyle } from 'styled-components';
import {generate as id} from 'shortid';

import allColors from './styles/colors'
import FormTask from './components/formTask'
import Task from './components/Task'
const GlobalStyle = createGlobalStyle`
body{
  font-family: sans-serif;
  background-color: #222;
  color: ${allColors.mainColor};
  text-align: center;
  margin:0;
}`

const App = () => {

  //Declaro el estado para el Color Seleccionado
  const [colorSelected,setColor] = useState(allColors.colors[0]);
  //Declaro el estado de las tareas
  const [tasks, setTasks] = useState([]);

  //Este evento se encargara de establecer el color elegido para la tarea
  const handleChangeColor = (color) =>{
    setColor(color);
  }

  //Este evento se encargara de comprobar que el input no este vacio y de prevenir el comportamiento por defecto de los forms
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(e.target.title.value.trim() !== ''){
      //Creara una nueva tarea la cual por parametro recibirá el valor del input text
      createNewTask(e.target.title.value)
      //Limpiamos el input text
      e.target.title.value = ''
    }
  }

  //Creara una nueva tarea
  const createNewTask= (title) =>{
    //Creamos un objeto el cual sera la nueva tarea
    const newTask = {
      id: id(),
      title,
      color: colorSelected,
      done: false
    }
    //Creamos un nuevo arreglo al cual la agregamos lo que ya tenia tasks y la newTask
    const AllTasks = [...tasks,newTask];
    //Se la establecemos al estado de Tasks mediante el metodo setTasks
    setTasks(AllTasks);
  }

  //Este funcion se ejecutará cuando el checkbox de la tarea cambie, es decir ejecute su evento onChange
  const handleCompleteTask = (id) =>{
    //Le decimos a currentTask, que alamacenará lo que hay en el estado tasks
    const currentTasks = [...tasks];
    //Buscamos mediante el metodo find la id que se seleciono y buscamos la que coincida 
    const task = currentTasks.find(task=> task.id === id);
    //Seleccionamos su indice, es decir su posicion
    const index = currentTasks.indexOf(task);
    //Y le cambiamos el valor de done por su contrario, es decir si done: false, cambiará a done:true
    currentTasks[index].done = !currentTasks[index].done
    //Cambiamos el estado de la tareas
    setTasks(currentTasks);
  }

  const handleDeleteTask = (id) =>{
    let currentTasks = [...tasks];
    currentTasks = currentTasks.filter(task=> task.id !== id);
    setTasks(currentTasks);
  }
  return (
    <>
    <GlobalStyle/>
    <h1>To do list</h1>
    <FormTask handleChangeColor={handleChangeColor} handleSubmit={handleSubmit} colorSelected={colorSelected}/>
    {
      tasks.length===0 && <h2>Not Tasks yet</h2>
    }
    <div>
      {
        tasks.map((task)=>(
        <Task 
        title={task.title} 
        color={task.color} 
        done={task.done}
        key={id()}
        handleCompleteTask={()=>handleCompleteTask(task.id)}
        handleDeleteTask={()=>handleDeleteTask(task.id)}>
        </Task>
        ))
      }
    </div>
    </>
  );
}

export default App;
