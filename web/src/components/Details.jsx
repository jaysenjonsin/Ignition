import React from 'react';
import { useSelector } from 'react-redux';
import medication from '../images/medication.png';
import pharmacy from '../images/pharmacy.png';

const Details = ({ selectedTask, tasks }) => {
  const { avatar } = useSelector((state) => state.auth);
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
            {tasks.length === 0 ? '' : selectedTask?.medication}
          </div>
          <h2 style={{ paddingTop: '.5em' }}>Sent to</h2>
          {/* <div className='prepare' style={{ display: 'flex' }}> */}
          <div className='detailsCard'>
            <img src={pharmacy} style={{ width: '4rem' }} alt='pharmacy' />
            {tasks.length === 0 ? '' : selectedTask?.pharmacy}
          </div>
          {/* <div>hello</div> */}
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default Details;