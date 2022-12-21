import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { reset, updateTask } from '../features/tasks/taskSlice';
import avatar from '../images/avatar.png';
const TaskUpdate = () => {
  //sender, receiver, medication, patient, pharmacy
  //we need to type the receivers name, and it gets their id and sends it.
  // const { receiver, medication, patient, pharmacy, reason } = useSelector(
  //   (state) => state.tasks
  // );

  // const location = useLocation();
  // const { selectedTask } = location.state;
  // console.log(selectedTask?.sender);
  const [formData, setFormData] = useState({
    receiver: '',
    medication: medication ? medication : '',
    patient: patient ? patient : '',
    pharmacy: pharmacy ? pharmacy : '',
    reason: reason ? reason : '',
  });

  const { receiver, medication, patient, pharmacy, reason } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, message /*isSuccess*/ } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    if (isError) {
      // console.log('taskerror --->', taskError);
      // console.log('MESSAGE ==>', message)
      toast.error(message);
    }

    dispatch(reset());

    // return () => {
    //   dispatch(reset());
    // };
  }, [isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log('FORM DATA -->', formData);

    dispatch(updateTask(formData));
    navigate('/taskSuccess');
  };
  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <hr style={{ marginBottom: '-1px' }} />
      <Navbar />
      <section className='main'>
        <section className='form' style={{ marginTop: '100px' }}>
          <form onSubmit={onSubmit}>
            <div className='form-group' style={{ display: 'flex' }}>
              {/* <div>
                <img src={avatar} alt='' />
              </div> */}
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
                id='medication'
                name='medication'
                value={medication}
                placeholder=' medication'
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
          <Link to='/'>back to dashboard</Link>
        </section>
      </section>
    </div>
  );
};

export default TaskUpdate;
