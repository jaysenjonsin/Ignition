import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    //if registration is successful or if user is already logged in, navigate to the dashboard
    if (isSuccess || user) {
      navigate('/');
    }

    //after isError or isSuccess, we want to reset the auth state. so we will dispatch the reset action
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    dispatch(login(userData));
  };
  //allows us to type in our forms
  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className='loginContainer'>
        <div className='logo'>
          <img src={logo} alt='ignition logo' />
        </div>
        <div className='loginHeaderContainer'>
          <div className='loginHeader'>Ignition</div>
        </div>
        <section className='form'>
          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                id='username'
                name='username'
                value={username}
                placeholder='Enter your username'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input
                //notice type called password!
                type='password'
                className='form-control'
                id='password'
                name='password'
                value={password}
                placeholder='Enter your password'
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              {/*adding two classes to our button */}
              <button type='submit' className='btn btn-block'>
                Login
              </button>
            </div>
          </form>
        </section>
        <section className='links'>
          <div className='help password'>
            {/*Overwriting default link color of this link to white */}
            <Link to='/login/reset' style={{ color: 'white' }}>
              Forgot password?
            </Link>
          </div>
          <div className='help newAccount '>
            <Link to='/register'>Create new account</Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
