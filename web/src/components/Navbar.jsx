import React from 'react';
import { Link } from 'react-router-dom';
import plus from '../images/plus.png';
import mail from '../images/mail.png';
import messages from '../images/messages.png';
import friends from '../images/friends.png';
import settings from '../images/settings.png';
const Navbar = () => {
  return (
    <>
      <nav className='navbar'>
        <ul className='navbar-nav'>
          <li
            className='nav-item'
            style={{
              backgroundColor: 'var(--main-button-color)',
            }}
          >
            <Link to='/taskForm' className='nav-link'>
              <img src={plus} alt='add task' />
            </Link>
          </li>

          <li className='nav-item'>
            <Link to='#' className='nav-link'>
              <img src={mail} alt='mail' />
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='#' className='nav-link'>
              <img src={messages} alt='message' />
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='#' className='nav-link'>
              <img src={friends} alt='friends' />
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='#' className='nav-link'>
              <img src={settings} alt='settings' />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
