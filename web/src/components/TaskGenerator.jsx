import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const TaskGenerator = () => {
  return (
    <div className='taskGeneratorMain'>
      <div className='taskGeneratorContainer'>
        <div className='taskGeneratorContent'>
          <h1>Create new task</h1>
          <p>Fill out these fields to get started.</p>
          <section
            className='form'
          >
            <form style={{ display: 'flex', backgroundColor: 'white' }}>
              <input type='text' name='' id='' placeholder='Request type' />
              <input type='text' name='' id='' placeholder='Recipient' />
              <div className='taskButtonContainer' style={{ display: 'flex' }}>
                Lets get started!
                <Link to='/taskForm' className='generateTaskButton'>
                  <button style={{ visibility: 'hidden' }}></button>
                  Generate task
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskGenerator;
