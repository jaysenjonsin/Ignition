import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const [patientInfo, setPatientInfo] = useState(null);

  const onClick = (e) => {
    setPatientInfo(task);
    console.log(patientInfo);
  };
  return (
    <div className='task' onClick={onClick}>
      {new Date(task.createdAt).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      })}
      Rx request for {task.patient} from {task.sender}
      sender: {task.sender} receiver: {task.receiver} medication:
      {task.medication} patient: {task.patient} pharmacy: {task.pharmacy}
      reason:{task.reason}
      <button onClick={() => dispatch(deleteTask(task._id))}>X</button>
    </div>
  );
};

export default Task;
