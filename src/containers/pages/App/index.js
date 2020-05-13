import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Dashboard from '../Dashboard';
import Login from '../Login/index ';
import Register from '../Register';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux'; 

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/" exact component={Register}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
