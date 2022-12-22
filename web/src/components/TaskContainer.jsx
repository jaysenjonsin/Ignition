import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTasks,
  reset,
  resetSelectedTask,
} from '../features/tasks/taskSlice';
import Details from './Details';
import Task from './Task';
const TaskContainer = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(getTasks());
    return () => {
      //clears the tasks when we leave the dashboard (dismount) --> helps prevent memory leaks, also app doesn't need this when navigating away since whenever we return to this page, a get request is sent again for all the tasks. ensure that the component's state is consistent with the user's current location and to help prevent memory leaks and improve performance.
      dispatch(reset());
    };
  }, [dispatch]);

  //unselects the selected task when component mounts. So after we finish updating the task and go back to the dashboard, the task that was just edited is no longer selected.
  useEffect(() => {
    dispatch(resetSelectedTask());
  }, []);

  // if (isLoading) return <h2>Loading...</h2>;
  return (
    <>
      <div className='information'>
        <div className='taskContainer' style={{ width: '65%' }}>
          <h2
            style={{
              fontFamily: 'inter',
              fontWeight: '700',
              fontSize: '2rem',
              color: '#363636',
              paddingLeft: '2.1em',
              paddingTop: '.5em',
            }}
          >
            Recent Tasks
          </h2>
          {tasks.length > 0 ? (
            <div className='tasks'>
              {tasks.map((task) => (
                <Task key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <div style={{ marginTop: '2em', marginLeft: '1em' }}>
              You have no tasks.
            </div>
          )}
        </div>
        <Details tasks={tasks} />
      </div>
    </>
  );
};

export default TaskContainer;

// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { getTasks, reset } from '../features/tasks/taskSlice';
// import Task from './Task'
// const TaskContainer = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { tasks, isLoading, isError, message } = useSelector(
//     (state) => state.tasks
//   );
//   useEffect(() => {
//     if (isError) {
//       console.log(message);
//     }

//     if (!user) {
//       navigate('/login');
//     }

//     //get tasks upon loading
//     dispatch(getTasks());

//     // clear tasks on unmount: In order to unmount, return a function.

//     return () => {
//       //make sure to get reset from taskSlice, not authSlice
//       dispatch(reset());
//     };
//   }, [user, navigate, dispatch, isError, message]);
//   return (
//     <>
//   <div>
//     TaskContainer
//   </div>
//   <div className="tasks">
//     {tasks.map((task)=> (
//       <Task key = {task._id} task = {task} />
//     ))}
//   </div>
//   </>
//   );
// };

// export default TaskContainer;
