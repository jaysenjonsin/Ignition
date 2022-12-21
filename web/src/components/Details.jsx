import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import medication from '../images/medication.png';
import pharmacy from '../images/pharmacy.png';
import { setSelectedTask } from '../features/tasks/taskSlice';
const Details = ({ tasks }) => {
  const { user, avatar } = useSelector((state) => state.auth);
  const { selectedTask } = useSelector((state) => state.tasks);
  return (
    <section className='details'>
      <div className='detailsContainer'>
        <h1 style={{ color: '#363636', fontSize: '1.5rem' }}>Details</h1>
        <div className='detailsContent'>
          <h2>Patient</h2>
          <div className='detailsCard'>
            <img src={avatar} style={{ width: '4rem' }} alt='avatar' />
            {tasks.length === 0 ? '' : selectedTask?.patient}
          </div>
          <h2 style={{ paddingTop: '.5em' }}>Medication</h2>
          <div className='detailsCard'>
            <img src={medication} style={{ width: '4rem' }} alt='medication' />
            {tasks.length === 0 ? (
              ''
            ) : (
              <>
                {selectedTask?.medication}
                <br />
                {selectedTask === null
                  ? ''
                  : 'Reason for request: ' + selectedTask?.reason}
              </>
            )}
          </div>
          <h2 style={{ paddingTop: '.5em' }}>Sent to</h2>
          <div style={{ display: 'flex' }}>
            <div className='detailsCard'>
              <img
                src={pharmacy}
                style={{ width: '4rem', height: 'fitContent' }}
                alt='pharmacy'
              />
              {tasks.length === 0 ? '' : selectedTask?.pharmacy}
            </div>
            <div>
              {user?.role === 'MD' || user?.role === 'DO' ? (
                <Link
                  to='/taskUpdate'
                  className='btn'
                  style={{ marginLeft: '100px' }}
                >
                  Finalize
                </Link>
              ) : (
                <Link
                  className='btn'
                  style={{ marginLeft: '100px' }}
                  to='/taskUpdate'
                >
                  Edit
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
