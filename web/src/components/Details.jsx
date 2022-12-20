import React from 'react';
import { useSelector } from 'react-redux';
import medication from '../images/medication.png';
import pharmacy from '../images/pharmacy.png';

const Details = ({ selectedTask }) => {
  const { avatar } = useSelector((state) => state.auth);
  return (
    <section className='details'>
      <div className='detailsContainer'>
        <div className='detailsContent'>
          <h1 style={{ color: '#363636', fontSize: '1.5rem' }}>Details</h1>
          <h2>Patient</h2>
          <div className='detailsCard'>
            <img src={avatar} alt='avatar' />
            {selectedTask?.patient}
          </div>
          <h2>Medication</h2>
          <div className='detailsCard'>
            <img src={medication} alt='medication' />
            {selectedTask?.medication}
          </div>
          <h2>Sent to</h2>
          <div className='detailsCard'>
            <img src={pharmacy} alt='pharmacy' />
            {selectedTask?.pharmacy}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
