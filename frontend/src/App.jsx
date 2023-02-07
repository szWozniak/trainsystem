import React from 'react';
import Main from './components/Main'
import Home from './components/Home';
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
