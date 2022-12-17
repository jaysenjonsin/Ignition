import React from 'react';

const Task = ({ task }) => {
  // receiver: '',
  // medication: '',
  // patient: '',
  // pharmacy: '',
  return (
    <>
      <div>
        sender: {task.sender.name} receiver: {task.receiver} medication:
        {task.medication} patient: {task.patient} pharmacy: {task.pharmacy}
      </div>
    </>
  );
};

export default Task;
