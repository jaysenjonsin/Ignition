import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import taskGeneratorTab from '../images/taskGeneratorTab.png';
const TaskGenerator = () => {
  const [recipient, setrecipient] = useState('');

  const onSubmit = () => {
    e.preventDefault();
    localStorage.setItem('recipient', formData);
  };
  return (
    <div className='taskGeneratorMain'>
      <div className='taskGeneratorContainer'>
        <div className='taskGeneratorContent'>
          <h1>Create new task</h1>
          <p>Fill out these fields to get started.</p>
          <Link to='/taskForm'>
            <img
              className='taskGeneratorTab'
              src={taskGeneratorTab}
              style={{ padding: '2rem 0' }}
              alt='generate task'
            />
          </Link>
          {/* TASK GENERATOR TAB IN PROGRESS */}
          {/*MODIFY THE SECTION STYLE HERE, look at .form */}
          {/* <section>
            <form
              onSubmit={onSubmit}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // flexWrap: 'wrap',
                padding: '20px 0',
                backgroundColor: 'white',
                borderRadius: '1rem',
                width: '100%',
              }}
            >
              <input type='text' name='' id='' placeholder='Request type' />
              <input
                type='text'
                name='recipient'
                id='recipient'
                value={recipient}
                onChange={(e) => setrecipient(e.target.value)}
                placeholder='Recipient'
              />
              <div
                className='taskButtonContainer'
                style={{ display: 'flex', color: '#5C5F62' }}
              >
                <div>
                  Lets get started!
                  <Link to='/taskForm' className='generateTaskButton'>
                    <button
                      type='submit'
                      style={{ visibility: 'hidden' }}
                    ></button>
                    Generate task
                  </Link>
                </div>
              </div>
            </form>
          </section> */}
        </div>
      </div>
    </div>
  );
};

export default TaskGenerator;
