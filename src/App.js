import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Tasks } from './components/Tasks';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { AddTask } from './components/AddTask';
import './App.css';

function App() {
const [tasks, setTasks] = useState([]);
const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const getTasks = async () => {
    const taskFromServer = await fetchTasks()
    setTasks(taskFromServer);
  }
  getTasks();
}, [])

const handleForm = () => setShowButton(!showButton);

const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data;
}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  return data;
}

// const deleteTask = (id) => {
//   setTasks(tasks.filter((task) => task.id !== id));
// }

const deleteTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })

  res.status === 200 ? setTasks(tasks.filter((task) => task.id !== id)) : alert('Error deleting task')
}
// const addTask = (task) => {
//   const id = tasks.length + 1;
//   const newTask = {id, ...task};
//   setTasks([...tasks, newTask]);
// }

const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type' : 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json();
  setTasks([...tasks, data]);
}

// const toggleReminder = (id) => {
//   setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
// }

const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id);
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder };

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask),
  })

  const data = await res.json();

  setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
}

  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker Pro' onAdd={handleForm} showAdd={showButton} />
        <Route path='/' exact render={(props) => (
          <>
            {showButton && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
          ) : (
            <p>No Tasks to show</p>
          )}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
