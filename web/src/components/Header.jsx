import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, logout } from '../features/auth/authSlice';

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
      {/* if user is undefined, we don't render anything. if it is defined, render their name --> option chaining. rememeber in user, we have access to everything sent from backend*/}
      hello hello hello name: {user?.name}, {user?.role}
      <button onClick={onLogout}>logout</button>
    </section>
  );
};

export default Header;
