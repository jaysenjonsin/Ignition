import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import deleteButton from '../images/deleteButton.png';
import pendingTask from '../images/pendingTask.png';
import { setSelectedTask } from '../features/tasks/taskSlice';
const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { selectedTask } = useSelector((state) => state.tasks);

  const handleDivClick = (e) => {
    // Dispatch the action to set selectedTask to task
    dispatch(setSelectedTask(task));
  };

  const handleDeleteClick = (e) => {
    //stop propagation prevents event from bubbling up to the parent div element
    e.stopPropagation();
    // Dispatch the action to delete the task and set selectedTask to null
    dispatch(deleteTask(task._id));
    //if we didn't have this, then Details would still show details of the deleted task even after deleting
    dispatch(setSelectedTask(null));
  };

  return (
    <div
      className='task'
      onClick={handleDivClick}
      style={{
        backgroundColor: task === selectedTask ? '#E6EFFF' : 'white',
      }}
    >
      <div style={{ paddingRight: '1em', paddingTop: '0.2em' }}>
        <img src={task?.status === 'pending' ? pendingTask : ''} alt='' />
      </div>
      {new Date(task?.createdAt).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })}
      <br />
      Rx request for {task?.patient}
      <div style={{ marginLeft: 'auto', paddingRight: '1.5em' }}>
        <img
          src={deleteButton}
          alt='delete button'
          onClick={handleDeleteClick}
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
