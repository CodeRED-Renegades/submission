import React, { useState } from 'react';
import './Dashboard.css';
import Grid from '@mui/material/Grid';
import { Navbar} from 'react-bootstrap';

import { SafetyCard } from './Components/SafetyCard';
import { BarChart } from './Components/Chart/BarChart';

export const Dashboard = () => {
    const [isChart, setIsChart] = useState(false);
    return(
        <div className='dashboard'>
            <Navbar bg="dark" variant="dark" expand="lg" className='navbar full-width'>
                <Navbar.Brand>Logo</Navbar.Brand>
                <div className='title'>
                    <Navbar.Brand>Safety Metrics</Navbar.Brand>
                </div>
                <Navbar.Brand>Social</Navbar.Brand>
            </Navbar>
            <div className='body center'>
                <Grid item md={10} sm={12}>
                    <div className='chart-container'>
                        <BarChart></BarChart>
                    </div>
                    <div className='safety-container'>
                        <SafetyCard title={'First'} image={'First'} content={'First'}></SafetyCard>
                        <SafetyCard title={'Second'} image={'Second'} content={'Second'}></SafetyCard>
                        <SafetyCard title={'Third'} image={'Third'} content={'Third'}></SafetyCard>
                    </div>
                </Grid>
            </div>
            <div className='footer'>
                <div className='information'>
                    <div>First</div>
                    <div>Second</div>
                    <div>Third</div>
                </div>
                <div className='trademark'>
                    <div>Trademark</div>
                </div>
            </div>
        </div>
    );
}