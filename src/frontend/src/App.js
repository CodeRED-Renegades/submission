import React from 'react';

import { Navbar } from 'react-bootstrap';
import { SafetyRoutes } from './Routes/SafetyRoutes';

function App() {
    return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg" className='navbar full-width'>
            <Navbar.Brand>Logo</Navbar.Brand>
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