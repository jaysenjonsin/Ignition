import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginReset from './pages/PasswordReset';
import Register from './pages/Register';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css"
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer} from "react-toastify";


// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
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
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
