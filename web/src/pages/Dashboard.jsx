import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import TaskGenerator from '../components/TaskGenerator';
import TaskContainer from '../components/TaskContainer';
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    //if user is not logged in, navigate to login page
    //logout button functionality is defined on the header compnent!
    //user presses logout button -> logout action is dispatched -> local memory cleared -> logout.isFulfilled
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  return (
    <>
      <div
        className='dashboardContainer'
      >
        <Header />
        <Navbar />
        <section
          className='main'
        >
          <TaskGenerator />
          <TaskContainer style={{ overflow: 'auto' }} />
        </section>
      </div>
    </>
  );
};

export default Dashboard;
