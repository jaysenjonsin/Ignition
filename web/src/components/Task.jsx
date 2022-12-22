import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../features/tasks/taskSlice';
import deleteButton from '../images/deleteButton.png';
import pendingTask from '../images/pendingTask.png';
import deniedTask from '../images/deniedTask.png';
import approvedTask from '../images/approvedTask.png';
import { setSelectedTask } from '../features/tasks/taskSlice';
const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { selectedTask } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);

  const formData = {
    sender: selectedTask?.senderId ?? '',
    receiver: selectedTask?.receiver ?? '',
    medication: selectedTask?.medication ?? '',
    patient: selectedTask?.patient ?? '',
    pharmacy: selectedTask?.pharmacy ?? '',
    reason: selectedTask?.reason ?? '',
    status: selectedTask?.status ?? '',
  };

  const handleDivClick = (e) => {
    // Dispatch the action to set selectedTask to task
    dispatch(setSelectedTask(task));
    console.log('SELECTED TASK ==>', selectedTask);
  };

  const handleDeleteClick = (e) => {
    //stop propagation prevents event from bubbling up to the parent div element
    e.stopPropagation();
    // Dispatch the action to delete the task and set selectedTask to null
    dispatch(deleteTask(task._id));
    //if we didn't have this, then Details would still show details of the deleted task even after deleting
    dispatch(setSelectedTask(null));
  };

  const approveRequest = async (e) => {
    e.stopPropagation();
    // e.preventDefault();
    try {
      window.location.reload();
      await dispatch(
        updateTask({
          0: {
            ...formData,
            status: 'approved',
          },
          1: selectedTask._id,
        })
      );
    } catch (err) {
      console.log(err);
    }
    // console.log('FORM DATA -->', formData);
  };

  return (
    <div
      className='task'
      onClick={handleDivClick}
      style={{
        backgroundColor: task === selectedTask ? '#E6EFFF' : 'white',
      }}
    >
      <div style={{ paddingTop: '.8em' }}>
        <img
          src={
            task?.status === 'pending'
              ? pendingTask
              : task?.status === 'denied'
              ? deniedTask
              : approvedTask
          }
          style={{ paddingLeft: '2em', paddingRight: '2em' }}
          alt=''
        />
      </div>
      {new Date(task?.createdAt).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })}
      <br />
      Rx request for {task?.patient}
      {/* {user?.role === 'MD' ? (
        <div style={{ marginLeft: 'auto', paddingRight: '1.5em' }}>
          <img src={deleteButton} />
        </div>
      ) : (
        ''
      )} */}
      <div style={{ marginLeft: 'auto', paddingRight: '1.5em' }}>
        <img
          src={deleteButton}
          alt='delete button'
          onClick={handleDeleteClick}
        />
        {user?.role === 'MD' ? (
          <div
            className='approveTask'
            onClick={approveRequest}
            style={{ marginLeft: 'auto' }}
          >
            ✓
          </div>
        ) : (
          ''
        )}
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
