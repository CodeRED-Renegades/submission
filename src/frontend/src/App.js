import React from 'react';

import { Navbar } from 'react-bootstrap';
import { SafetyRoutes } from './Routes/SafetyRoutes';

function App() {
    return (
    <div>
        <Navbar bg="light" variant="light" expand="lg" className='navbar full-width'>
            <Navbar.Brand><img style={{height: '17.5px', width: 'auto'}} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/ConocoPhillips_Logo.svg/1200px-ConocoPhillips_Logo.svg.png'}></img></Navbar.Brand>
            <div className='title'>
                <Navbar.Brand>Safety Metrics</Navbar.Brand>
            </div>
            <Navbar.Brand>Social</Navbar.Brand>
        </Navbar>
        <SafetyRoutes></SafetyRoutes>
    </div>
  );
}

export default App;