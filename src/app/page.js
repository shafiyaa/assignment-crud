'use client';

import { useState } from 'react';
import '../app/styles/style.scss';

const Page = () => {
  const [task, setTask] = useState({ id: Date.now(), name: '' });
  const [taskList, setTaskList] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const handleTaskName = (e) => {
    setTask({ ...task, name: e.target.value });
  };

  const AddTask = () => {
    if (task.name) {
      if (isUpdate) {
        // Update
        const updatedTaskList = taskList.map((t) =>
          t.id === currentTaskId ? { ...t, name: task.name } : t
        );
        setTaskList(updatedTaskList);
        setIsUpdate(false);
        setCurrentTaskId(null);
        setTask({ id: Date.now(), name: '' });
      } else {
        // Add
        setTaskList([...taskList, task]);
        setTask({ id: Date.now(), name: '' });
      }
    } else {
      alert('Input field is empty');
    }
  };

  const DeleteTask = (id) => {
    console.log('delete is calling');
    const remainingTask = taskList.filter((task) => task.id !== id);
    setTaskList(remainingTask);
  };

  const UpdateTask = (id) => {
    const taskToUpdate = taskList.find((task) => task.id === id);
    setTask(taskToUpdate);
    setIsUpdate(true);
    setCurrentTaskId(id);
  };

  return (
    <div className="main">
      <h1>CRUD APP</h1>

      <div className="input-div">
        <input
          type="text"
          value={task.name}
          onChange={(e) => handleTaskName(e)}
          placeholder="Add Task"
        />
        {isUpdate ? (
          <button onClick={AddTask} className="change-btn">
            Change
          </button>
        ) : (
          <button onClick={AddTask} className="add-btn">
            Add
          </button>
        )}
      </div>
      <div className='task-list'>
        {taskList.length > 0 &&
          taskList.map((task) => (
            <div key={task.id} className="tasks">
              <p>{task.name}</p>

              <div className='btn-div'>
                <button
                  className="delete-btn"
                  onClick={() => DeleteTask(task.id)}
                >
                  Delete
                </button>
                <button
                  className="update-btn"
                  onClick={() => UpdateTask(task.id)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
