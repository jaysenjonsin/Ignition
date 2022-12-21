import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import deleteButton from '../images/deleteButton.png';
import pendingTask from '../images/pendingTask.png';
import { setSelectedTask } from '../features/tasks/taskSlice';
//passing down the setState function as a prop!!
const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { selectedTask } = useSelector((state) => state.tasks);
  const setTaskData = (e) => {
    dispatch(setSelectedTask(task));
  };
  return (
    <div
      className='task'
      onClick={setTaskData}
      style={{
        border: '1px solid #BABFC3',
        backgroundColor: task === selectedTask ? '#E6EFFF' : 'white',
      }}
    >
      <div>
        <img src={task?.status === 'pending' ? pendingTask : ''} alt='' />
      </div>
      {new Date(task?.createdAt).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })}
      Rx request for {task?.patient}
      {/* from {task.sender}
      sender: {task.sender} receiver: {task.receiver} medication:
      {task.medication} patient: {task.patient} pharmacy: {task.pharmacy}
      reason:{task.reason} */}
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

/*
constainer display: flex
  ul
   li image
   li  Task  ->date, patient
   li  x

  /ul
 */
