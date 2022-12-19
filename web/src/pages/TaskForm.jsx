import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { createTask, reset as taskReset } from '../features/tasks/taskSlice';

const TaskForm = () => {
  //sender, receiver, medication, patient, pharmacy
  //we need to type the receivers name, and it gets their id and sends it.
  const [formData, setFormData] = useState({
    receiver: '',
    medication: '',
    patient: '',
    pharmacy: '',
    reason: '',
  });

  const { receiver, medication, patient, pharmacy, reason } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isError: taskError,
    message: taskMessage,
    isSuccess: taskSuccess,
  } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (taskError) {
      console.log('taskerror --->', taskError);
      toast.error(taskMessage);
    }
    // if (taskSuccess) {
    //   navigate('/taskSuccess');
    // }

    return () => {
      dispatch(taskReset());
    };
  }, [taskError, taskSuccess, taskMessage, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('FORM DATA -->', formData);
    //this still isn't accountng for if user is not in database, fix later -> probably add useEffect and if (isError) for tasks, like the Login page. probably jsut delete the if statement
    dispatch(createTask(formData));
    //reset form
    // setFormData({
    //   receiver: '',
    //   patient: '',
    //   medication: '',
    //   pharmacy: '',
    //   reason: '',
    // });
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
              <input
                type='text'
                className='form-control'
                id='reason'
                name='reason'
                value={reason}
                placeholder='Reason for request'
                onChange={onChange}
              />
            </div>
            {/* <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='reason'
                name='reason'
                value={reason}
                placeholder='reason'
                onChange={onChange}
              />
            </div> */}

            <div className='form-group'>
              {/*adding two classes to our button */}
              <button
                type='submit'
                className='btn btn-block'
                style={{ backgroundColor: '#127CFC' }}
              >
                Save draft
              </button>
            </div>
            <div className='form-group'>
              {/*adding two classes to our button */}
              <button
                type='submit'
                className='btn btn-block'
                style={{ backgroundColor: '#127CFC' }}
              >
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
