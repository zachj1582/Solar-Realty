import React from 'react';
import './App.css';
import Header from './Components/Header';
import routes from './routes'
import 'animate.css'
import 'react-notifications-component/dist/theme.css'

function App() {
  return (
    <div className="App">
      <Header/>
      {routes}
    </div>
  );
}

export default App;
