import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import taskGeneratorTab from '../images/taskGeneratorTab.png';
const TaskGenerator = () => {
  return (
    <div className='taskGeneratorMain'>
      <div className='taskGeneratorContainer'>
        <div className='taskGeneratorContent'>
          <h1>Create new task</h1>
          <p>Fill out these fields to get started.</p>
          <img src={taskGeneratorTab} style={{ padding: '2rem 0' }} alt='' />
          {/* <section className='form'>
            <form
              style={{
                display: 'flex',
                // flexWrap: 'wrap',
                padding: '50px 0',
                backgroundColor: 'white',
                borderRadius: '1rem',
                width: '100%',
              }}
            >
              <input type='text' name='' id='' placeholder='Request type' />
              <input type='text' name='' id='' placeholder='Recipient' />
              <div
                className='taskButtonContainer'
                style={{ display: 'flex', color: '#5C5F62' }}
              >
                Lets get started!
                <Link to='/taskForm' className='generateTaskButton'>
                  <button style={{ visibility: 'hidden' }}></button>
                  Generate task
                </Link>
              </div>
            </form>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default TaskGenerator;
