import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Operator from './Operator';
import EditTask from './Operator/EditTask';
import ScheduleTask from './Operator/ScheduleTask';
import NewTask from './Operator/NewTask';
import Maintenance from './Maintenance';
import EditTaskM from './Maintenance/EditTaskM';
import NavBar from './NavBar';
import Tools from './Tools';
import LoginForm from './LoginForm';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Container } from 'semantic-ui-react';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/manage/" element={<NavBar />}>
            <Route path="operator/" element={<Operator />}/>
            <Route path="operator/edit/">
              <Route path=":taskId" element={<EditTask />} />
            </Route>
            <Route path="operator/schedule/">
              <Route path=":taskId" element={<ScheduleTask />} />
            </Route>
            <Route path="operator/new" element={<NewTask />} />
            <Route path="maintenance/" element={<Maintenance />} />
            <Route path="maintenance/edit/">
              <Route path=":taskId" element={<EditTaskM />} />
            </Route>
            <Route path="tools/" element={<Tools />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
