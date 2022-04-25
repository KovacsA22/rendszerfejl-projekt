import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Operator from './Operator';
import OperatorNavBar from './Operator/NavBar';
import NewTask from './Operator/NewTask';
import Maintenance from './Maintenance';
import MaintenanceNavBar from './Maintenance/NavBar';
import Tools from './Tools';
import ToolsNavBar from './Tools/NavBar';
import LoginForm from './LoginForm';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { Container } from 'semantic-ui-react';
import EditTask from './Operator/EditTask';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/manage/">
          <Route path="operator/" element={
            <>
              <OperatorNavBar />
              <Container style={{ marginTop: '7em' }}>
                <Operator />
              </Container>
            </>}
          />
          <Route path="operator/edit/">
            <Route path=":taskId" element={
            <>
              <OperatorNavBar />
              <Container style={{ marginTop: '7em' }}>
                <EditTask />
              </Container>
            </>} />
          </Route>
          <Route path="operator/new" element={
            <>
              <OperatorNavBar />
              <Container style={{ marginTop: '7em' }}>
                <NewTask />
              </Container>
            </>}
          />
          <Route path="maintenance/" element={
            <>
              <MaintenanceNavBar />
              <Container style={{ marginTop: '7em' }}>
                <Maintenance />
              </Container>
            </>}
          />
          <Route path="tools/" element={
            <>
              <ToolsNavBar />
              <Container style={{ marginTop: '7em' }}>
                <Tools />
              </Container>
            </>}
          />
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
