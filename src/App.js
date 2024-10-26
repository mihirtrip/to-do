import './App.css';
import Taskform from './component/Taskform';
import List_task from './component/List_task';
import { useEffect, useState } from 'react';


function App() {
  const [tasks,setTasks] = useState([]);
  useEffect(()=>{
    
    localStorage.setItem('tasks',JSON.stringify(tasks));
    // console.log(tasks)
    
  },[tasks])

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        setTasks(JSON.parse(savedTasks));  // Only parse if there are saved tasks
    }
}, []);
 


  const addTask=(name)=>{
    setTasks(prev=>{
      return [...prev,{name:name,done:false}];
    });
  }

    const updateTaskDone =(taskIndex,newDone)=> {
      setTasks(prev=>{
        const newtask = [...prev];
        newtask[taskIndex].done = newDone;
        return newtask;
      });
    }
    const numberComplete = tasks.filter(t =>t.done).length;
    const total = tasks.length;


    function getmessage(){
      const percentage = numberComplete/total *100;
      if(percentage===0){
        return 'Please start doing your chors'

      }
      else if(total===0){
        return 'not task';
      }
      else if(percentage >0 && percentage<50){
        return 'more to go for halfway';
      }
      else if(percentage===50){
        return 'you are halfway there';
      }
      else if(percentage>50 && percentage<100){
        return 'just few left';
      }
      else{
        return'hoola!!! you have completed all the task';
      }
      
    }
    function removeTask(indexToRemove){
      setTasks(prev=>{
        return prev.filter((taskobject,index)=>index!==indexToRemove);
      })
    }
    
    

    return (
      <main>
        <h1>{numberComplete}/{total} task complete</h1>
        <h2>{getmessage()}</h2>
        <Taskform onAdd={addTask}/>
        {tasks.map((task,index) => (
          <List_task {...task} 
          // onRename={newname=>renametask(index,newname)}
          key = {task}
          onTrash={()=>removeTask(index)}
          onToggle={done => updateTaskDone(index,done)} />
        ))}
      </main> 
    );
  }

  export default App;
