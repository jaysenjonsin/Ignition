import React from 'react';
import { useSelector } from 'react-redux';
import medication from '../images/medication.png';
import pharmacy from '../images/pharmacy.png';

const Details = ({ selectedTask, tasks }) => {
  const { avatar } = useSelector((state) => state.auth);
  return (
    <section className='details'>
      <div className='detailsContainer'>
        <div className='detailsContent'>
          <h1 style={{ color: '#363636', fontSize: '1.5rem' }}>Details</h1>
          <h2>Patient</h2>
          <div className='detailsCard'>
            <img src={avatar} style={{ width: '3rem' }} alt='avatar' />
            {tasks.length === 0 ? '' : selectedTask?.patient}
          </div>
          <h2>Medication</h2>
          <div className='detailsCard'>
            <img src={medication} style={{ width: '3rem' }} alt='medication' />
            {tasks.length === 0 ? '' : selectedTask?.medication}
          </div>
          <h2>Sent to</h2>
          <div className='detailsCard'>
            <img src={pharmacy} style={{ width: '3.5rem' }} alt='pharmacy' />
            {tasks.length === 0 ? '' : selectedTask?.pharmacy}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
