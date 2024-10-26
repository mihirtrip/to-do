import './App.css';
import Taskform from './component/Taskform';
import List_task from './component/List_task';
import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const addTask = (name) => {
    setTasks((prev) => {
      return [...prev, { id: Date.now(), name: name, done: false }]; // Generate unique ID
    });
  };

  const updateTaskDone = (taskIndex, newDone) => {
    setTasks((prev) => {
      const newTask = [...prev];
      newTask[taskIndex].done = newDone;
      return newTask;
    });
  };

  const numberComplete = tasks.filter((t) => t.done).length;
  const total = tasks.length;

  function getMessage() {
    const percentage = (numberComplete / total) * 100;
    if (percentage === 0) {
      return 'Please start doing your chores';
    } else if (total === 0) {
      return 'No tasks';
    } else if (percentage > 0 && percentage < 50) {
      return 'More to go for halfway';
    } else if (percentage === 50) {
      return 'You are halfway there';
    } else if (percentage > 50 && percentage < 100) {
      return 'Just a few left';
    } else {
      return 'Hoola!!! You have completed all the tasks';
    }
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => {
      return prev.filter((_, index) => index !== indexToRemove);
    });
  }

  return (
    <main>
      <h1>{numberComplete}/{total} tasks complete</h1>
      <h2>{getMessage()}</h2>
      <Taskform onAdd={addTask} />
      {tasks.map((task, index) => (
        <List_task
          {...task}
          key={task.id} // Use the generated unique ID for the key
          onTrash={() => removeTask(index)}
          onToggle={done => updateTaskDone(index, done)}
        />
      ))}
    </main>
  );
}

export default App;
