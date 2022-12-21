import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { reset, logout } from '../features/auth/authSlice';
import avatar from '../images/avatar.png';
import logo from '../images/logo.png';
const Header = () => {
  //we only need our user from our auth state!!!
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    localStorage.removeItem('user'); //this should be handled in logout, but there is bug where if we refresh page after logging in, it logs you back in because user wasn't removed from local storage
    dispatch(logout());
    dispatch(reset());

    navigate('/login');
    //NOTE: if we logout, it will not go back to login right away unless we go back to slice and add a case for logout.fulflled, where we need to set user to null.
  };
  return (
    <section className='header'>
      {/* if user is undefined, we don't render anything. if it is defined, render their name*/}
      <div className='headerContent' style={{ display: 'flex' }}>
        <Link to='/' style={{ paddingTop: '.5rem' }}>
          <img
            src={logo}
            alt='logo'
            style={{
              width: '1.3rem',
              height: '1.7rem',
              marginTop: '5px',
              marginLeft: '1rem',
              // paddingTop: '.2rem',
              float: 'left',
            }}
          />
        </Link>
        {/* causing text to go p: <Link to='/' style={{ textDecoration: 'none' }}> */}
        <div
          style={{
            color: '#323232',
            fontSize: '1.3rem',
            fontFamily: 'inter',
            fontWeight: '600',
            marginTop: 'auto',
            paddingLeft: '.5em',
          }}
        >
          ignition
        </div>
        {/* </Link> */}
        <div
          className='userInfo'
          style={{
            marginLeft: 'auto',
            marginBottom: 'auto',
            fontFamily: 'inter',
            display: 'flex',
            color: '#202223',
          }}
        >
          <img
            src={avatar}
            style={{
              width: '2rem',
              marginTop: '10px',
              verticalAlign: 'middle',
            }}
            //TEMPORARY LOGOUT
            onClick={onLogout}
            alt='avatar'
          />
          <div
            style={{
              // marginTop: 'auto',
              paddingTop: '.7em',
              fontSize: '.9rem',
              marginTop: '.5rem',
              paddingLeft: '.5em',
              paddingRight: '1em',
              display: 'inline-block',
            }}
          >
            {user?.name}, {user?.role}
          </div>
          {/* <button onClick={onLogout}>logout</button> */}
        </div>
      </div>
    </section>
  );
};

export default Header;
