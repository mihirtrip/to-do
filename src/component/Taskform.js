import React,{useState} from 'react'

function Taskform({onAdd}) {
    const[task,setTask] = useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        onAdd(task);
        setTask('');
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <button>+</button>
            <input type='text' value={task} onChange={e=> setTask(e.target.value)} placeholder='Enter new task here...'></input>
        </form>
    </div>
  )
}

export default Taskform