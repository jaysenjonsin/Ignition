import React from 'react';

const Details = ({ task }) => {
  return (
    <section className='details'>
      <div className='detailsContainer'>
        <div className='detailsContent'>
          <h1 style={{ color: '#363636', fontSize: '1.5rem' }}>Details</h1>
          <h2 style={{ color: '#363636', fontSize: '1.1rem' }}>Patient</h2>
          <div
            className='patientCard'
            style={{ border: '0.5px solid #BABFC3', borderRadius: '.5rem' }}
          >
            {task ? task.patient : ''}
          </div>
          <h2 style={{ color: '#363636', fontSize: '1.1rem' }}>Medication</h2>
          <h2 style={{ color: '#363636', fontSize: '1.1rem' }}>Sent to</h2>
        </div>
      </div>
    </section>
  );
};

export default Details;
