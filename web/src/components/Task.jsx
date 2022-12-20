import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import deleteButton from '../images/deleteButton.png';

//passing down the setState function as a prop!!
const Task = ({ task, selectedTask, setSelectedTask }) => {
  const dispatch = useDispatch();

  const setTaskData = (e) => {
    setSelectedTask(task);
  };
  return (
    <div
      className='task'
      onClick={setTaskData}
      style={{ backgroundColor: task === selectedTask ? '#E6EFFF' : 'white' }}
    >
      {new Date(task.createdAt).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })}
      Rx request for {task.patient} from {task.sender}
      sender: {task.sender} receiver: {task.receiver} medication:
      {task.medication} patient: {task.patient} pharmacy: {task.pharmacy}
      reason:{task.reason}
      <div>
        <img
          src={deleteButton}
          alt='delete button'
          onClick={() => dispatch(deleteTask(task._id))}
        />
      </div>
    </div>
  );
};

export default Task;
