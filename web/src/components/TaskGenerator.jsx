import React from 'react';
import { Link } from 'react-router-dom';
const TaskGenerator = () => {
  return (
    <div className='taskGeneratorMain'>
      <div className='taskGeneratorContainer'>
        <div className='taskGeneratorContent'>
          <h1>Create new task</h1>
          <p>Fill out these fields to get started.</p>
          <Link to='/taskForm'>Generate task</Link>
        </div>
      </div>
    </div>
  );
};

export default TaskGenerator;
