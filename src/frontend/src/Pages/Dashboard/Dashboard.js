import React, { useState } from 'react';
import './Dashboard.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { SafetyCard } from './Components/SafetyCard';
import { BarChart } from './Components/Chart/BarChart';

export const Dashboard = () => {
    return(
        <div className='dashboard'>
            <div className='body'>
                <div className='graph-container center full-width'>
                    <div style={{width: '57.5%'}}>
                        <div className='full-width center'>Statistics Report</div>
                        <BarChart></BarChart>
                    </div>
                </div>
                <div className='action-container center' style={{width: '57.5%'}}>
                    <div className='axis-labels'>Axis</div>
                    <div><Link to='/form'><Button>Report an Incident</Button></Link></div>
                </div>
                <div className='safety-container center full-width'>
                    <div style={{width: '77.5%'}}>
                        <div className='full-width center'>Hazard Information</div>
                        <div className='safety-card-container full-width'>
                            <SafetyCard title={'First'} image={'First'} content={'First'}></SafetyCard>
                            <SafetyCard title={'Second'} image={'Second'} content={'Second'}></SafetyCard>
                            <SafetyCard title={'Third'} image={'Third'} content={'Third'}></SafetyCard>
                            <SafetyCard title={'Fourth'} image={'Fourth'} content={'Fourth'}></SafetyCard>
                            <SafetyCard title={'Fifth'} image={'Fifth'} content={'Fifth'}></SafetyCard>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer full-width'>
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