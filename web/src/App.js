import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginReset from './pages/PasswordReset';
import Register from './pages/Register';
import TaskEdit from './pages/TaskEdit';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

//injecting toastify directly since there was problems with css loader
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer } from 'react-toastify';

// CALL IT ONCE IN APP
if (typeof window !== 'undefined') {
  injectStyle();
}
import TaskForm from './pages/TaskForm';
import TaskSuccess from './pages/TaskSuccess';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login/reset' element={<LoginReset />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/taskform' element={<TaskForm />} />
          <Route path='/taskSuccess' element={<TaskSuccess />} />
          <Route path='/TaskEdit' element={<TaskEdit />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
