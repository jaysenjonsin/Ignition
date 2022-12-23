import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import medication from '../images/medication.png';
import pharmacy from '../images/pharmacy.png';
import pendingTask from '../images/pendingTask.png';
import deniedTask from '../images/deniedTask.png';
import approvedTask from '../images/approvedTask.png';
// import { setSelectedTask } from '../features/tasks/taskSlice';
const Details = ({ tasks }) => {
  const { user, avatar } = useSelector((state) => state.auth);
  const { selectedTask } = useSelector((state) => state.tasks);
  return (
    <section className='details'>
      <div className='detailsContainer'>
        <h1 style={{ color: '#363636', fontSize: '1.5rem' }}>
          Details{' '}
          {!selectedTask ? (
            ''
          ) : (
            <>
              <span
                style={{
                  position: 'absolute',
                  color: '#848484',
                  fontSize: '1rem',
                  fontWeight: '400',
                  paddingLeft: '15em',
                  marginTop: '-.2rem',
                  // verticalAlign: 'middle',
                }}
              >
                {selectedTask?.status}
                <img
                  src={
                    selectedTask?.status === 'pending'
                      ? pendingTask
                      : selectedTask?.status === 'denied'
                      ? deniedTask
                      : approvedTask
                  }
                  //note: setting image position to absolute allows me to use margin top to center the image with the text!!! will not work unless position is absolute
                  style={{
                    width: '2rem',
                    position: 'absolute',
                    paddingLeft: '.5em',
                  }}
                  alt='status'
                />
              </span>
            </>
          )}
        </h1>
        <div className='detailsContent'>
          <h2>Patient</h2>
          <div className='detailsCard'>
            <img src={avatar} alt='avatar' />
            {tasks.length === 0 ? '' : selectedTask?.patient}
          </div>
          <h2 style={{ paddingTop: '2em' }}>Medication</h2>
          <div className='detailsCard'>
            <img src={medication} alt='medication' />
            {tasks.length === 0 ? (
              ''
            ) : (
              <>
                {selectedTask?.medication}
                <br />
                {/*if we didn't do this extra selectedTask check, then our patient card would always say -Request from ''... we only want it to say that if we have a task selected */}
                {selectedTask === null
                  ? ''
                  : '  -Request from: ' + selectedTask?.sender}
                <br />
                {selectedTask === null
                  ? ''
                  : '  -Reason for request: ' + selectedTask?.reason}
              </>
            )}
          </div>
          <h2 style={{ paddingTop: '2em' }}>Sent to</h2>
          <div style={{ display: 'flex' }}>
            <div className='detailsCard'>
              <img src={pharmacy} alt='pharmacy' />
              {tasks.length === 0 ? '' : selectedTask?.pharmacy}
            </div>
            <div style={{ marginTop: '-1.5em' }}>
              {user?.role === 'MD' || user?.role === 'DO' ? (
                <Link
                  to='/taskFinalize'
                  className='btn'
                  style={{ marginLeft: '1rem' }}
                >
                  Edit or Deny
                </Link>
              ) : (
                <Link
                  className='btn'
                  style={{ marginLeft: '100px', marginTop: '2.4em' }}
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
