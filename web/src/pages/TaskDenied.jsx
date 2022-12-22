import React from 'react';
import { Link } from 'react-router-dom';
import taskSuccessimg from '../images/taskSuccess';
import check from '../images/check';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import doneButton from '../images/doneButton.png';
import { useDispatch } from 'react-redux';
import { reset } from '../features/tasks/taskSlice';
const TaskDenied = () => {
  return (
    <>
      <div style={{ height: '100vh' }}>
        <Header />
        <Navbar />
        <div
          className='taskSuccess'
          style={{
            // marginTop: '10rem',
            marginLeft: '5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            className='taskSuccessContainer'
            style={{ marginTop: '3rem' }}
            // style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}
          >
            <div
              className='content'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* <div
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '700',
                  fontSize: '4rem',
                }}
              >
                Congratulations! <img src={check} alt='complete' />
              </div> */}
              <div
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: '500',
                  fontSize: '2rem',
                  color: '#363636',
                }}
              >
                Task has been denied.
              </div>

              <img src={taskSuccessimg} alt='successful task' />
              <div>
                <Link
                  to='/'

                  // style={{
                  //   textDecoration: 'none',
                  //   background: '#127CFC',
                  //   boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.03)',
                  //   backdropFilter: 'blur(40px)',
                  //   padding: '18px 16px',
                  //   borderRadius: '.5rem',
                  //   color: 'var(--white)',
                  // }}
                >
                  <img className='taskGeneratorTab' src={doneButton} alt='' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDenied;
