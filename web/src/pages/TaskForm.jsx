import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { createTask } from '../features/tasks/taskSlice';

const TaskForm = () => {
  //sender, receiver, medication, patient, pharmacy
  //we need to type the receivers name, and it gets their id and sends it.
  const [formData, setFormData] = useState({
    receiver: '',
    medication: '',
    patient: '',
    pharmacy: '',
  });

  const { receiver, medication, patient, pharmacy } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({ formData }));

    //reset form
    setFormData({
      receiver: '',
      medication: '',
      patient: '',
      pharmacy: '',
    });
    navigate('/taskSuccess');
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <hr style={{ marginBottom: '-1px' }} />
      <Navbar />
      <section className='main'>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                //CHANGE TO DROPDOWN MENU IF THERE IS TIME
                type='text'
                className='form-control'
                id='receiver'
                name='receiver'
                value={receiver}
                placeholder='Medication request for'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='medication'
                name='medication'
                value={medication}
                placeholder=' medication'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='test'
                className='form-control'
                id='patient'
                name='patient'
                value={patient}
                placeholder=' patient'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='pharmacy'
                name='pharmacy'
                value={pharmacy}
                placeholder='pharmacy'
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              {/*adding two classes to our button */}
              <button type='submit' className='btn btn-block'>
                Save draft
              </button>
            </div>
            <div className='form-group'>
              {/*adding two classes to our button */}
              <button type='submit' className='btn btn-block'>
                Send to provider
              </button>
            </div>
          </form>
          <Link to='/'>back to dash</Link>
        </section>
      </section>
    </div>
  );
};

export default TaskForm;
