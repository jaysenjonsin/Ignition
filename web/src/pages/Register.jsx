import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
// import Spinner from '../components/Spinner';
const Register = () => {
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    username: '',
    password: '',
    password2: '',
  });

  const { role, name, email, username, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, /*isLoading,*/ message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }
    //make sure to invoke reset!! if not won't see error message after submitting invalid form
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //allows us to type in our forms
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    //prevent default behavior of page reload on submission
    e.preventDefault();

    if (
      role === 'MD' ||
      role === 'DO' ||
      role === 'doctor' ||
      role === 'patient' ||
      role === 'PA' ||
      role === 'NP' ||
      role === 'MA' ||
      role === 'test'
    ) {
      if (password !== password2) {
        toast.error('Passwords do not match.');
      } else {
        const userInfo = {
          role,
          name,
          email,
          username,
          password,
        };
        dispatch(register(userInfo));
      }
    } else {
      toast.error('please choose a correct role.');
    }
  };

  //not working: just flashing white screen
  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <>
      <div className='loginContainer'>
        <div className='logo'>
          <img src={logo} alt='ignition logo' />
        </div>
        <div className='registerHeaderContainer'>
          <div className='registerHeader'>Create a new account</div>
        </div>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                //change to drop down menu
                type='text'
                className='form-control'
                id='role'
                name='role'
                value={role}
                placeholder=' Role: MD, DO, MA, NP, PA, or patient'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='name'
                name='name'
                value={name}
                placeholder=' name'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='username'
                name='username'
                value={username}
                placeholder=' Username'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={email}
                placeholder=' Email'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Password'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                id='password2'
                name='password2'
                value={password2}
                placeholder='Confirm password'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-block'>
                Sign up
              </button>
            </div>
          </form>
        </section>
        <section className='links'>
          <div
            style={{
              marginTop: '-1rem',
            }}
          >
            <Link to='/login'>Already have an account?</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
